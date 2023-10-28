"use client"
import React from 'react'
import { Table } from 'flowbite-react'
import { GetPostsQuery } from '@/__generated__/graphql'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  posts: GetPostsQuery['getPosts']
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
          Poster
        </Table.HeadCell>
        <Table.HeadCell>
          Tags
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
                <Image alt={item.title} width={50} height={50} src={item.posterUrl} />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.tags.map((tag) => {
                  return (
                    <span key={tag}
                      className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {tag}
                    </span>
                  )
                })}
              </Table.Cell>
              <Table.Cell>
                {
                  item.isPublic
                    ? <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-green-400 mr-2'></div> published </div>
                    : <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-red-400 mr-2'></div> draft </div>
                }
              </Table.Cell>
              <Table.Cell>
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <Link href={`/${item._id}`}>
                    <p>Edit</p>
                  </Link>
                </button>

              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}