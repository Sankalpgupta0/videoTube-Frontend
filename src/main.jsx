import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store+slice/store.js'

import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Home from './components/Home/Home.jsx'
import GetAllVideos from '../src/components/video/GetAllVideos.jsx'
import CurrentVideo from './components/video/CurrentVideo.jsx'
import YourChannel from './components/YourChannel/YourChannel.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/home',
        element: <Home />,
        children: [
          {
            path: '/home',
            element: <GetAllVideos/>,
          },
          {
            path: '/home/:videoId',
            element: <CurrentVideo />
          },
          {
            path: '/home/yourchannel',
            element: <YourChannel />
          }
        ]
      },
      
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
