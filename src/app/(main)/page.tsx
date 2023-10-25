"use client"

import { gql } from "@apollo/client"
// import { getClient } from "../_lib/client"
import { User } from '../_lib/types'
import { FormEvent } from "react"

type loginVar = {
  email: string,
  password: string
}
const loginQuery = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      _id
      username
      access_token
      role
      createdAt
      updatedAt
    }
  }
`

export default function Login() {
  const login = async (email: string, password: string) => {
    //FIXME: getClient on for Server Component
    // const { data } = getClient().query<User, loginVar>({query: loginQuery, variables: {email, password}})
    // return data
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const res = await login(email, password)
    console.log('res', res)
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="userCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your id</label>
          <input id="userCode" name="userCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[A-Za-z0-9]{1,20}" placeholder="ironman@email.com" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        {/* <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div> */}
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">🚀 Let me in !</button>
      </form>
    </main>
  )
}
