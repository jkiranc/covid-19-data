import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Carousel from './carousel'


function ChatbotFLow() {
  return (
    <ChatBot
    floating ={false}
    steps={[
      {
        id: '1',
        message: 'Hi! Welcome to Venus Home Appliances! Please Enter your Name.',
        end: false,
        trigger: '2'
      },{
        id: '2',
        user: true,
        trigger: '3'
      },{
        id: '3',
        message: 'Thanks {previousValue}. What would you like to do?',
        trigger:'4'
      },{
        id: '4',
        component: (
          <Carousel option='menu'/>),
        waitAction: true,
        trigger: '5'
      },{
        id: '5',
        message: 'Hi! Welcome to Venus Home Appliances! Please Enter your Name.',
        end: true,
        trigger: '2'
      }
    ]}/>
  )
}

export default ChatbotFLow;
