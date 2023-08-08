"use client";

import { FaSun, FaMoon } from 'react-icons/fa';

import { useTypewriter, Cursor } from 'react-simple-typewriter';

import AuthForm from "./components/AuthForm";

import React, {useState} from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const lightModeClasses = `
    bg-gray-100
    text-gray-900
  `;

  const darkModeClasses = `
    bg-black
    text-gray-100
  `;

  const titleClasses = `mt-6 text-center text-xl font-medium italic tracking-tight ${
    darkMode ? "text-gray-100" : "text-gray-900"
  }`;

  const [text] = useTypewriter({
    words: ['Log in to your account.', 'Sign in to connect.', 'Chat with your friends.', ],
    loop: true,
    typeSpeed: 220,
    deleteSpeed: 80
  });

  return (
    <div
      className={`flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 ${
        darkMode ? darkModeClasses : lightModeClasses
      }`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1
          className='text-center text-4xl font-bold bg-gradient-to-r from-blue-500
          via-purple-500
          to-pink-500
          text-transparent
          bg-clip-text'
        >
          Ahoy!
        </h1>
        <p
          className={titleClasses}
        >
          ‎ <span>{text}</span>
        </p>
      </div>
      <AuthForm />
      <button
        className="absolute top-4 right-4 p-2 rounded-md"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  )
}
