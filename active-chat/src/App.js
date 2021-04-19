import logo from './logo.svg';
import './App.css';
const SERVER = "http://127.0.0.1:8080";
const cors = require('cors');
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


function App() {
    var socket = socketClient (SERVER);

class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
        chats: [],

        }

      }

      getChats = () => {
   // fetch to the backend
   fetch(baseUrl + "/chats")
   .then(res => { return res.json()
   }).then(data => {
     this.setState({
       chats: data,
     })
    })

     render() {
        return (
        <div classname="App"></div>
            <header></header>


                <p>test</p>


    );
‍ }
}


export default App;
