import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/header'
import { Form } from './components/form'
import { Topics } from './components/topics'
import { Benefits } from './components/benefits'
import { How } from './components/how'
import { Examples } from './components/examples'
import { FAQ } from './components/faq'
import { Footer } from './components/footer'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <Form />
    <Topics />
    <Benefits />
    <How />
    <Examples />
    <FAQ />
    <Footer />
  </StrictMode>,
)
