import { useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'

function handleCreateUser(user) {
  console.log('before calling API')
  axios.post('https://reqres.in/api/users', user)
}

export default function Create() {
  const { register, handleSubmit } = useForm();

  const createUser = useCallback((user) => {
    console.log('before adding id', user)
    // console.log('before adding id', JSON.parse(JSON.stringify(user)))

    user.id = 100

    console.log('after adding id', user)

    if (document.cookie.match(/debugging/)) {
      console.log('debug email', user.email)
    }

    handleCreateUser()
  }, [])

  return (
    <form onSubmit={handleSubmit(createUser)} className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Create user</h2>
        </div>
        <div>
          <input {...register("email")} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Email" />
        </div>
        <div>
          <input {...register("first_name")} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="First name" />
        </div>
        <div>
          <input {...register("last_name")} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Last name" />
        </div> 
        <div>
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">Create</button>
        </div>
      </div>
    </form>
  )
}