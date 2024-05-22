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
import Setting from './components/setting/Setting.jsx'
import History from './components/history/History.jsx'
import Playlist from './components/playlist/Playlist.jsx'
import ViewPlaylist from './components/playlist/ViewPlaylist.jsx'
import AllPlaylist from './components/playlist/AllPlaylist.jsx'
import Chat from './components/community/Chat.jsx'
import Sidebar from './components/Home/Sidebar.jsx'
import AuthLayout from './components/Auth/AuthLayout.jsx'

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
        path:'/sidebar',
        element:<Sidebar/>
      },
      {
        path:'/home',
        element: <AuthLayout authentication>
          {" "}
          <Home />
        </AuthLayout>,
        children: [
          {
            path: '/home',
            element:<AuthLayout authentication>
            {" "}
            <GetAllVideos/>
          </AuthLayout>,
          },
          {
            path: '/home/:videoId',
            element:<AuthLayout authentication>
            {" "}
            <CurrentVideo/>
          </AuthLayout>,
          },
          {
            path: '/home/yourchannel',
            element:<AuthLayout authentication>
            {" "}
            <YourChannel/>
          </AuthLayout>,
          },
          {
            path:'/home/setting',
            element:<AuthLayout authentication>
            {" "}
            <Setting/>
          </AuthLayout>,
          },
          {
            path:'/home/history',
            element:<AuthLayout authentication>
            {" "}
            <History/>
          </AuthLayout>,
          },
          {
            path:'/home/community',
            element:<AuthLayout authentication>
            {" "}
            <Chat/>
          </AuthLayout>,
          },
          {
            path:'/home/playlist',
            element:<AuthLayout authentication>
            {" "}
            <Playlist/>
          </AuthLayout>,
            children:[
              {
                path:'/home/playlist',
                element:<AuthLayout authentication>
            {" "}
            <AllPlaylist/>
          </AuthLayout>,
              },
              {
                path:'/home/playlist/:playlistId',
                element:<AuthLayout authentication>
            {" "}
            <ViewPlaylist/>
          </AuthLayout>,
              }
            ]

          },
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
