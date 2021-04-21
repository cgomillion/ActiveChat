import socketClient  from "socket.io-client";
import React, { Component } from 'react'
import './chat.scss';
import Nav from './components/Nav';
import TopicList from './components/TopicList';
import ChatsPanel from './components/ChatsPanel';

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
          channels: null,
          socket: null,
          channel: null,
          // modalOpen: false,
          // userLogedIn: false
        }

      }
      socket;

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
    
          console.log(response)
          console.log("BODY: ",response.body)
    
          if (response.status === 200) {
            this.getHolidays()
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
            this.getHolidays()
          }
        }
        catch (err) {
          console.log('Error => ', err);
        }
      }

      componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = socketClient(baseUrl);
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('channel', channel => {
            
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            this.setState({ channels });
        });
        socket.on('message', message => {
            
            let channels = this.state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        fetch('http://localhost:3003/topics/getTopics').then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
        })
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.socket.emit('channel-join', id, ack => {
        });
    }

    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    }

    render() {

        return (
            <div className='chat-app'>
                <Nav loggingUser={this.loggingUser} register={this.register}/>
                <TopicList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                <ChatsPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
            </div>
        );
    }
    }

export default App;
