import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom"

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Search from './pages/Search.jsx'
import Collection from './pages/Collection.jsx'

import './index.css'
import Tvshow from './pages/Tvshow.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home/>}/>
          <Route path='movie/:id' element={<Movie/>}/>
          <Route path='serie/:id' element={<Tvshow/>}/>
          <Route path='collection/:id' element={<Collection/>}/>
          <Route path='search' element={<Search/>}/>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
