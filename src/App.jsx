import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setFormIsClose] = useState(true)

  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const deleteUserById = id => {
    const URL = `${baseURL}/users/${id}/`
    axios.delete(URL)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const updateUserById = (id, data) => {
    const URL = `${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        getAllUsers()
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const handleOpenForm = () => {
    setFormIsClose(false)
  }

  return (
    <div className="App">

      <div className='app__container-title'>
        <h1 className='app__title'>Users CRUD</h1>
        <button onClick={handleOpenForm} className='app__btn'>Create New User</button>
      </div>

      <div className={`form-container ${formIsClose && 'disable__form'}`}>
        <FormUsers createNewUser={createNewUser} updateInfo={updateInfo} updateUserById={updateUserById} setUpdateInfo={setUpdateInfo} setFormIsClose={setFormIsClose} />
      </div>


      <div className='users-container'>
        {
          users?.map(user => (
            <UserCard key={user.id} user={user} deleteUserById={deleteUserById} setUpdateInfo={setUpdateInfo} setFormIsClose={setFormIsClose} />
          ))
        }
      </div>
    </div>
  )
}

export default App
