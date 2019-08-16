import './index.css';
import React, { Component } from 'react';
import Stage from '../components/Stage';
export default class App extends Component {
  state = { msg: [] };
  componentDidMount() {
    const socket = window.io('http://localhost:3000/');
    this.socket = socket;
    let user = {}, room, client;
    let log  = this.log;
    socket.on('connect', (c) => {
      log('connect ...'+ socket.id);
      socket.on('user', u => {
        user = u;
        log('用户ID'+ u.uid)
      });
      this.joinroom(1);//自动加入房号1
    });
    socket.on('message', msg => {
      if(msg.type =='TALK'){
        log(msg.body)
      }
    });
  }
  log = (args) => {
    console.log(args)
    let msg  = this.state.msg;
    msg.push(args);
    this.setState({msg})
  }
  joinroom(num) {
    //加入房间号为1的房间
    this.socket.emit('join', num);
  }
  send() {
    let msg = document.getElementById('msg').value;
    this.socket.emit('message', { type: 'TALK', body: msg })
  }
  render() {
    return (
      <div>
        <input type="text" id="msg" />
        <input type="button" value="发送"  onClick={this.send.bind(this)} />
        <div id="log">
        {this.state.msg.map( (item,index) => {
          return <li key={index}>{typeof item ==='object' ?JSON.stringify(item):item}</li>
        })}
        </div>
        <Stage></Stage>
      </div>
    );
  }
}
