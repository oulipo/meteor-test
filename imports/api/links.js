import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId })
  })
}

// resource.action : links.insert
Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })
  
    Links.insert({
      _id: shortid.generate(), 
      url, 
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null 
    })
  },
  'links.setVisibility'(_id, visible) {
    // check if user is logged in. Throw an error if not.
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    // _id is a string with length > 1
    // visible is a boolean
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible })

    // Links.update - where _id and this.userId metch the doc
    // set visible property
    Links.update({ _id, userId: this.userId }, { $set: {visible} })
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id })
    Links.update({_id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
})
