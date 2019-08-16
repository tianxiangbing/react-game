import Taro, { Component } from '@tarojs/taro'
import { View, Text,Input,Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  state = { msg: [] };

  componentWillMount () { }

  componentDidMount () { 
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

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

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
  render () {
    return (
      <View className='index section components-page'>
         <Text>flex-direction: row 横向布局</Text>
        <View className='flex-wrp' style='flex-direction:row;'>
          <View className='flex-item demo-text-1'/>
          <View className='flex-item demo-text-2'/>
          <View className='flex-item demo-text-3'/>
        </View>
        <Text>flex-direction: column 纵向布局</Text>
        <View className='flex-wrp' style='flex-direction:column;'>
          <View className='flex-item flex-item-V demo-text-1'/>
          <View className='flex-item flex-item-V demo-text-2'/>
          <View className='flex-item flex-item-V demo-text-3'/>
        </View>
        <Input type="text" id="msg" />
        <Button className="btn-send" onClick={this.send.bind(this)}>发送</Button>
        <div id="log">
        {this.state.msg.map( (item,index) => {
          return <li key={index}>{typeof item ==='object' ?JSON.stringify(item):item}</li>
        })}
        </div>
      </View>
    )
  }
}
