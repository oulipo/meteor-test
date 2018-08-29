import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal'

export default class AddLink extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()
    const { url } = this.state

    Meteor.call('links.insert', url, (error, result) => {
      if (!error) {
        this.handleModalClose()
      } else {
        this.setState({ error: error.reason })
      }
    })
      
  }

  handleModalClose() {
    this.setState({ url: '', isOpen: false, error: '' })
  }

  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
            <input
              type="text"
              placeholder="URL"
              ref="url"
              onChange={this.onChange.bind(this)}
              value={this.state.url} />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}> Cancel</button>
          </form>
          
        </Modal>
      </div>
    )
  }
}