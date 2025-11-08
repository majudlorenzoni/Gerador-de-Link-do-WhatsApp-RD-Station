import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import Form from './components/form'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Form />
  </StrictMode>,
)
