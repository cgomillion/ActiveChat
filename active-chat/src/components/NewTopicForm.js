import React, { Component } from 'react'

export default class NewForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    // console.log(event.target.value)
    this.setState({
      name: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    // fetch
    fetch(this.props.baseUrl + '/topics', {
      method: 'POST',
      body: JSON.stringify({name: this.state.name}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    }).then( res => {
      return res.json()
    }).then( data => {
      this.props.addTopic(data)
      this.setState({
        name: ''
      })
    }).catch (error => console.error({'Error': error}))
  }


  
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name of Topic: </label>
        <input type="text" id="name" name="name" onChange={ (evt) => this.handleChange(evt) } value={ this.state.name } />
        <input type="submit" value="Add a Topic to Chat About" />
      </form>
    )
  }
}