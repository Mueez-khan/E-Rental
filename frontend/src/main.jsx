import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./redux/store"
import App from './App.jsx'
import './index.css'
import {Toaster} from "react-hot-toast"
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
    <BrowserRouter>
    <App></App>
    <Toaster/>
    </BrowserRouter>
    </Provider>

)
