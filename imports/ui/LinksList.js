import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Links } from '../api/links'
import LinksListItem from './LinksListItem'
import { Session } from 'meteor/session'

export default class LinksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      links: []
    }
  }
  
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch()
      this.setState({ links })
      console.log('New links', links)
    })
    console.log('componentDidMount LinksList')
  }

  componentWillUnmount() {
    this.linksTracker.stop()
    console.log('componentWillUnmount LinksList')
  }

  renderLinksListItems() {
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    })
  }
  
  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          {this.renderLinksListItems()}
        </div>
      </div>
    )
  }
}