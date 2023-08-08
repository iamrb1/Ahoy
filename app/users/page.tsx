"use client"
import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import EmptyState from "../components/EmptyState"
import Modal from "../components/Modal";

import Image from "next/image";

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'

const API_KEY = ""

const systemMessage = {
  role: "system",
  content: "Explain all concepts as a pirate and captain of the ship."
}

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const lightModeClasses = `
    bg-white
    text-gray-900
  `;

  const darkModeClasses = `
    bg-black
    text-gray-100
  `;

  const [messages, setMessages] = useState([
    {
      message: "Hello I am Sparrow, your best mate and pirate!",
      sender: "ChatGPT"
    }
  ])

  const [typing, setTyping] = useState(false)

  const handleSend = async (message: string) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setTyping(true);

    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages: { message: string; sender: string }[]) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role="assistant";
      } else {
        role="user";
      }
      return { role: role, content: messageObject.message }
    });


    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
     console.log(data); 
    
     setMessages(
      [...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]
     );
     setTyping(false);
    });
  }

  const handleModalOpen = () => {
    setIsOpen(true);
  }

  const handleModalClose = () => {
    setIsOpen(false);
  }

  return (
    <div className={`hidden lg:block lg:pl-80 h-full ${darkMode ? darkModeClasses : lightModeClasses}`}>
      <EmptyState darkMode={darkMode} />
      <button
        className="absolute top-4 right-4 p-2 rounded-md"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      <button
        className="absolute top-4 right-12 p-1 rounded-md bg-pink-500 text-white text-sm"
        onClick={handleModalOpen}
      >
        <Image
          alt="chatbot"
          height="20"
          width="30"
          className="mx-auto w-auto"
          src="/images/chatbot.png"
        />
      </button>
      <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className='App' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ position: "relative", height: "600px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior='smooth'
                typingIndicator={typing ? <TypingIndicator content="Sparrow is typing" /> : null}
              >
                {messages.map((message, i) => {
                  // @ts-ignore
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput placeholder='Enter your message...' onSend={(message) => handleSend(message)}/>
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
      </Modal>
    </div>
  );
}

export default Users;
