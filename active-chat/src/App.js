import socketClient  from "socket.io-client";
import React, { Component } from 'react'
import './App.css';
import Nav from './components/Nav';
import TopicsTable from './components/TopicsTable';
import NewForm from './components/NewTopicForm';
const SERVER = "http://127.0.0.1:8080";



console.log(process.env.NODE_ENV)
let baseUrl = ''

// more on React environment variables
// https://create-react-app.dev/docs/adding-custom-environment-variables/
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}


;
    class App extends Component {
      
     

      constructor(props) {
        super(props)
        this.state = {
          topics:[],
          modalOpen: false,
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
        const url = baseUrl + '/topics/' + id

        try{
          const response = await fetch( url, {
            method: 'DELETE',
            credentials: "include"
          })

          if (response.status===200){

            const findIndex = this.state.topics.findIndex(topic => topic._id === id)
            const copyTopics = [...this.state.topics]
            copyTopics.splice(findIndex, 1)

            this.setState({
              topics: copyTopics
            })
          }

        }
        catch(err){
          console.log('Error => ', err);
        }
      };


    handleSubmit = async (e) => {
      e.preventDefault()
        const url = baseUrl + '/topics/' + this.state.topicToBeEdit._id
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
            const updatedTopics = await response.json()
            const findIndex = this.state.topics.findIndex(topics => topics._id === updatedTopics.data._id)
            const copyTopics = [...this.state.topics]
            copyTopics[findIndex] = updatedTopics.data
            this.setState({
              topics: copyTopics,
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
    var socket = socketClient (SERVER);
    socket.on('connection', () => {
        console.log(`I'm connected with the back-end`);
});
  }

  handleChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showEditForm = (topics)=>{
    this.setState({
      modalOpen:true,
      name: topics.name,
      topicToBeEdit:topics,
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
