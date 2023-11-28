import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DictionaryProvider } from './context/DictionaryContext'
import { DarkModeProvider } from './context/DarkModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <DictionaryProvider>
        <App />
      </DictionaryProvider>
    </DarkModeProvider>
  </React.StrictMode>,
)
