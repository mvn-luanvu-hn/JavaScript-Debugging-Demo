import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

export default function Users() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data, isLoading, error } = useQuery('users', () => {
    return axios.get('https://reqres.in/api/users')
  }, {
    refetchOnWindowFocus: false
  })

  console.log('data', data)
  console.log('isLoading', isLoading)
  console.warn('error', error)

  const navigateToCreate = useCallback(() => {
    router.push('/users/create')
  }, [router])

  const deleteUser = useCallback((id) => {
    if (!confirm('Do you want to delete this user?')) {
      return
    }

    if (id === 1) {
      throw new Error('Can not delete user')
    } else {
      queryClient.setQueryData('users', (data) => {
        data.data.data = data.data.data.filter((user) => user.id !== id)

        return data
      })
    }
  }, [queryClient])

  return (
  <div className="bg-white p-8 rounded-md w-full">
    <div className=" flex items-center justify-between pb-6">
      <div>
        <h2 className="text-gray-600 font-semibold">Users</h2>
        <span className="text-xs">All users</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="lg:ml-40 ml-10 space-x-8">
          <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={navigateToCreate}>Create</button>
        </div>
      </div>
    </div>
    {data && (
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    First name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.data.map(user => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">{user.first_name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.last_name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => deleteUser(user.id)} className="bg-red-500	px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Delete</button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}