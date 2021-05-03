import { useEffect, useState } from "react"
import './MessageInput.css'

// connection setup with the server using a socket
let port = process.env.PORT || 3000
var io = require('socket.io-client');
var socket = io.connect(`/`, {reconnect: true});
let temp_list_msgs = []

function MessageInput(props){

    // Setting all variables got from props
    // let all_msg = props.all_msg
    let setAllMsg = props.setAllMsg
    let name = props.name.toUpperCase()
    let room_id = props.room_id

    // hook on curr_messages
    let [curr_message, setCurr_Message] = useState("")

    // receiving messages from the server
    const recieveData = (data) => {
        // if(temp_list_msgs.length === 10){
        //     temp_list_msgs.shift()
        // }
        temp_list_msgs.push(data)
        setAllMsg([...temp_list_msgs])
        // console.log(temp_list_msgs);
    }

    // function to send message
    function sendMessage(){
        // send message to the server
        let message = {id: Math.ceil(Math.random(10) * 1000000), text: curr_message, author: name, room_id: room_id, count: 0}
        socket.emit('message', message)
        setCurr_Message("")
    }

    // hook use effect
    useEffect(() => {
        let message = {id: Math.ceil(Math.random(10) * 1000000), text: `${name} Has Joined The Room`, author: name, room_id: room_id, count: 0}
        // console.log('Sending to Server...');
        socket.emit('message', message)


        // listen to the server for any incoming message
        socket.on('forward', (data) => {
            // console.log('Receiving from server...');
            recieveData(data)
        })
    }, [])

    return (
        <div className="outer-container-input">
            <input autoComplete="off" type="text" placeholder="Type Here" value={curr_message} onChange={(event) => {
                setCurr_Message(event.target.value)
            }}></input>
            <button onClick={() => {sendMessage()}}><i class="gg-atlasian"></i></button>
        </div>
    )
}

export default MessageInput
