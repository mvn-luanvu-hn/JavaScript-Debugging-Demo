import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import useLogin from '../hooks/useLogin'

export default function Home() {
  const [email, setEmail] = useState('george.bluth@reqres.in')
  const [password, setPassword] = useState('123456')
  const { mutateAsync: login, isLoading } = useLogin()

  return (
    <section className="flex justify-center items-center h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white rounded p-6 space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Log In</h2>
      </div>
      <div>
        <input value={email} onChange={(evt) => setEmail(evt.target.value)} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Email" />
      </div>
      <div>
        <input value={password} onChange={(evt) => setPassword(evt.target.value)} className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="password" placeholder="Password" />
      </div>
      <div>
        <button disabled={isLoading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200" onClick={() => login({email, password})}>{isLoading ? 'Logging In' : 'Log In'}</button>
      </div>
    </div>
  </section>
  )
}
