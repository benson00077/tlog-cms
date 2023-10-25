"use client"
import React from 'react'
import { Table } from 'flowbite-react'
import { Posts } from '../_lib/types'

type Props = {
  posts: Posts
}
export function PostsTable(props: Props) {
  const { posts: { items } } = props
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>
          Title
        </Table.HeadCell>
        <Table.HeadCell>
          Color
        </Table.HeadCell>
        <Table.HeadCell>
          Category
        </Table.HeadCell>
        <Table.HeadCell>
          Status
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Edit
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {items.map((item, i) => {
          return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item._id}>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.title}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item._id}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Laptop
              </Table.Cell>
              <Table.Cell>
                {i % 4 === 0
                  ? <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-red-500 mr-2'></div> draft </div>
                  : <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-green-400 mr-2'></div> published </div>
                }
              </Table.Cell>
              <Table.Cell>
                <a
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  href="/tables"
                >
                  <p>Edit</p>
                </a>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}