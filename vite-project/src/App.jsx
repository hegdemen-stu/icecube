
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicRoom from './pages/PublicRoom';
import Navbar from './components/navbar';
import ChatPublic from './pages/ChatPublic';
import axios from 'axios';
import { Toaster} from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
      <>
        <Navbar/>
        <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/PublicRoom' element={<PublicRoom/>}/>
          <Route path='/ChatPublic' element={<ChatPublic/>}/>
        </Routes>
      </>
  )
}

export default App
