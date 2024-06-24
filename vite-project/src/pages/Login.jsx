import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
})
    const loginUser = async (e) => {
        e.preventDeafult()
        const {email, password} = data
        try{
          const {data} = await axios.post('/Login', {
            email, password
          })
          if(data.error){
            toast.error(data.error)
        }else{
            setData({})
            toast.success('Login Sucessfull...welcome')
            navigate('/')
        }
        } catch(error){
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={loginUser}>
            <label>Email</label>
            <input type='email' placeholder='Enter Email...' value={data.name} onChange={(e) => setData({...data, email: e.target.value})}/>
            <label>Password</label>
            <input type='text' placeholder='Enter Password...' value={data.name} onChange={(e) => setData({...data, password: e.target.value})}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}
