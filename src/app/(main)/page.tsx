"use client"

import { useLazyQuery } from "@apollo/client"
import { FormEvent } from "react"
import { gql } from "@/__generated__/gql"
import { useRouter } from "next/navigation"
import { Toast } from "flowbite-react"
import { HiFire } from 'react-icons/hi';
import { useAuth } from "./_lib/AuthWrapper"
import { jwtLogin } from "./_lib/utils"

export default function Login() {
  const inputIds = { email: 'email', password: 'password' }
  const router = useRouter()
  const { jwt, setJwt } = useAuth()
  // const [userLogin, { loading, error, data }] = useLazyQuery(loginQuery, {
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: ({ login }) => {
  //   },
  // });

  // window.localStorage.setItem('token', login.access_token)
  // //TODO: store for user id
  // window.localStorage.setItem('userId', login._id)
  // router.push("/posts")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get(inputIds.email) as string;
    const password = data.get(inputIds.password) as string;
    // userLogin({ variables: { input: { email, password } } })
    try {
      const jwt = await jwtLogin(email, password)
      setJwt(jwt)
      window.localStorage.setItem('token', jwt)
      //TODO: store for user id
      router.push("/posts")
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your id</label>
          <input id={inputIds.email} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ironman@email.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type={inputIds.password} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div> */}
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {/* {loading ? 'Logging in...' : '🚀 Let me in !'} */}
          🚀 Let me in !
        </button>
      </form>
      {/* {error && <Toast >
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          <HiFire className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          {error.message}
        </div>
        <Toast.Toggle />
      </Toast>} */}

    </main>
  )
}
