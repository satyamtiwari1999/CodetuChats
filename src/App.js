import { useState } from 'react';
import './App.css'
import MessageInput from './MessageInput'
import logo from './codetu.PNG'


function App() {
    // listing all the messages
    let [all_msg, setAllMsg] = useState([])
    let [name, setName] = useState('')
    let [room_id, setRoomId] = useState('')
    let [info, setInfo] = useState(false)
    // each message will have an id, a text message, an author , a room_id and a count of number of people
    if(info){
        return (
            <div className="main-container">
                {/* <h1 className="app-heading">Codetu Chat Room</h1> */}
                <div className="active-members-count">
                    <div>{all_msg.length ? all_msg[all_msg.length - 1].count : 0}</div>
                    <ion-icon name="people-outline"></ion-icon>
                </div>
                
                {/* <div className="message-whole"> */}
                    {
                        
                        all_msg.map((msg) => {

                            let class_msg = msg.author === name.toUpperCase() ? "message-grey" : "message-blue"
                            console.log(msg.author, name);

                            return (
                                <div className="message-outer-container">
                                    <div className={class_msg}> <div className="message-sender">{msg.author}</div>{msg.text}</div>
                                </div>
                            )
                        })
                    }
                {/* </div> */}

                {/* <div className="message-outer-container">

                    <div className="message-grey"> <div className="message-sender">Satyam</div>Hello there</div>

                </div> */}
                <MessageInput
                    name={name}
                    room_id={room_id}
                    all_msg={all_msg}
                    setAllMsg={setAllMsg}/>
            </div>
        )
    }
    else{
        return (
            <div className="login-page">
                <img src={logo}></img>
                <input autoComplete="off" className="login-field" type="text" placeholder="Enter Name" value={name} onChange={(e) => {
                    setName(e.target.value)
                }}></input>
                <input autoComplete="off" className="login-fields" type="text" placeholder="Enter Room Id" value={room_id} onChange={(e) => {
                    setRoomId(e.target.value)
                }}></input>

                <button className="login-button" onClick={() => {
                    setInfo(true)
                }}>Enter</button>
            </div>
        )
    }
}

export default App;
