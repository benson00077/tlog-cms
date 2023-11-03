"use client"
import React, { useState } from 'react'
import { Table } from 'flowbite-react'
import { GetPostsQuery, Post } from '@/__generated__/graphql'
import Link from 'next/link'
import Image from 'next/image'
import { BiSolidToggleRight, BiSolidToggleLeft } from 'react-icons/bi'

type Props = {
  posts: GetPostsQuery['getPosts']
  onGridEdit: (id: string, val: Partial<Post>) => void
  mode: string | null
}
export function PostsTable(props: Props) {
  const { posts: { items }, onGridEdit, mode } = props
  const isEditMode = mode === 'edit'

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
        <Table.HeadCell
          // onClick={() => setIsColStatusEdit(!isColStatusEdit)}
          className='cursor-pointer group relative hover:text-purple-400 select-none'>
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
              <Table.Cell className='px-0'>
                {
                  isEditMode
                    ? <IsPublicToggler
                      onClickCb={(val: boolean) => {
                        onGridEdit(item._id, { _id: item._id, isPublic: val })
                      }}
                      isActive={item.isPublic} description={['public', 'private']} />
                    : item.isPublic
                      ? <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-green-400 mr-2'></div> published </div>
                      : <div className='flex items-center'><div className='h-2.5 w-2.5 rounded-full bg-red-400 mr-2'></div> draft </div>
                }
              </Table.Cell>
              <Table.Cell>
                <Link href={`/post/edit/${item._id}`} className="block text-gray-900 bg-white border text-center border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <p>Edit</p>
                </Link>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>

    </Table>
  )
}

type IsPublicTogglerProps = {
  isActive: boolean
  description: string[]
  onClickCb: (val: boolean) => void
}
function IsPublicToggler({ isActive, description, onClickCb }: IsPublicTogglerProps) {
  const [active, setActive] = useState(isActive)
  return (
    <div
      onClick={() => {
        const curr = !active
        setActive(curr)
        onClickCb(curr)
      }}
      className='flex items-center hover:cursor-pointer select-none'>
      {active ? <BiSolidToggleRight size={30} className="fill-green-400" /> : <BiSolidToggleLeft size={30} className="fill-red-400" />}
      <span className='pl-2.5'>
        {active ? description[0] : description[1]}
      </span>
    </div>
  )
}