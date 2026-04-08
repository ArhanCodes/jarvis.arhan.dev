import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Docs from './Docs.jsx'

const path = window.location.pathname
const Component = path.startsWith('/docs') ? Docs : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Component />
  </StrictMode>,
)
