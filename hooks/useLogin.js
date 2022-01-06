import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function useLogin() {
  const router = useRouter()

  return useMutation(({
    email,
    password
  }) => {
    return axios.post('https://reqres.in/api/login', {
      email,
      password
    })
  }, {
    onSuccess: () => {
      router.push("/users");
    }
  })
}