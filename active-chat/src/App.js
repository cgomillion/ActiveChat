import React, { Component } from 'react'
import './App.css';
import Nav from './components/Nav'
const SERVER = "http://127.0.0.1:8080";
// const cors = require('cors');
app.use(cors())


console.log(process.env.NODE_ENV)
let baseUrl = ''

// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}



    var socket = socketClient (SERVER);
    class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
          topics:[],
          modalOpen: false,
          holidayToBeEdit:{},
          description:'',
          name: '',
          userLogedIn: false
        }

      }

      getTopics = () => {
        // fetch to the backend
        fetch(baseUrl + "/topics",{
          credentials: "include"
        })
        .then(res => {
          if (res.status===200){
            return res.json()
          }
          else {
            return []
          }
        }).then(data => {
          this.setState({
            topics: data,
          })
         })
      }

      addTopic = (newTopic) => {
        const copyTopic = [...this.state.topics]
        copyTopic.push(newTopic)
        this.setState({
          topics: copyTopic,
        })
      }

      loggingUser = async (e) => {
        console.log('logingUser')
        e.preventDefault()
        const url = baseUrl + '/users/login'
        const logindBody = {
          username: e.target.username.value,
          password: e.target.password.value
        }
        try {

          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(logindBody),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: "include"
          })

          if (response.status === 200) {
            this.getTopics()
          }
        }
        catch (err) {
          console.log('Error => ', err);
        }
      }

      register = async (e) => {
        e.preventDefault()
        const url = baseUrl + '/users/signup'
        try {
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              username: e.target.username.value,
              password: e.target.password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (response.status === 200) {
            this.getTopics()
          }
        }
        catch (err) {
          console.log('Error => ', err);
        }
      }

      deleteTopic = async (id) => {
        const url = baseUrl + '/holidays/' + id

        try{
          const response = await fetch( url, {
            method: 'DELETE',
            credentials: "include"
          })

          if (response.status===200){

            const findIndex = this.state.holidays.findIndex(holiday => holiday._id === id)
            const copyHolidays = [...this.state.holidays]
            copyHolidays.splice(findIndex, 1)

            this.setState({
              holidays: copyHolidays
            })
          }

        }
        catch(err){
          console.log('Error => ', err);
        }
      };loggingUser = async (e) => {
    e.preventDefault()
    const url = baseUrl + '/users/login'
    const logindBody = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(logindBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include" // SENDING COOKIES
      })

      if (response.status === 200) {
        this.getHolidays()
      }
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }


    handleSubmit = async (e) => {
      e.preventDefault()
        const url = baseUrl + '/holidays/' + this.state.topicToBeEdit._id
        try{
          const response = await fetch( url , {
            method: 'PUT',
            body: JSON.stringify({
              name: e.target.name.value,
              description: e.target.description.values
            }),
            headers: {
              'Content-Type' : 'application/json'
            },
            credentials: "include"
          })

          if (response.status===200){
            const updatedTopic = await response.json()
            const findIndex = this.state.topics.findIndex(topics => topics._id === updatedtopic.data._id)
            const copyTopics = [...this.state.topics]
            copyTopics[findIndex] = updatedTopics.data
            this.setState({
              holidays: copyHolidays,
              modalOpen:false
            })
          }
        }
        catch(err){
          console.log('Error => ', err);
        }
      }
      componentDidMount() {
    this.getTopics()
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (topics)=>{
    this.setState({
      modalOpen:true,
      name: topic.name,
      topicToBeEdit:topic,
    })
  }


      render () {

        return (
          <div className="App">
            <Nav loggingUser={this.loggingUser} register={this.register}/>

              <h1>Test </h1>
              <NewForm baseUrl={ baseUrl } addTopic={ this.addTopic } />

              <TopicsTable
                topics={this.state.topics}

                deleteTopic={this.deleteTopic}
                showEditForm={this.showEditForm}
                />
              <br/>
              <br/>

              {this.state.modalOpen &&

                <form onSubmit={this.handleSubmit}>
                  <label>Name: </label>
                  <input name="name" value={this.state.name} onChange={this.handleChange}/> <br/>

                  <label>Description: </label>
                  <input name="description" value={this.state.description} onChange={this.handleChange}/>

                  <button>submit</button>

                </form>
              }
          </div>
        );
      }
    }

export default App;
