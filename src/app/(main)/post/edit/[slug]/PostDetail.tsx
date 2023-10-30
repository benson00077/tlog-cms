"use client"
import { gql } from '@/__generated__/gql'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import React, { FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { redirect } from 'next/navigation'
import { timeStampFilter, formDataToObject, getDirtyFlds, pruneProperties } from './utils'

const getPostByIdQuery = gql(/* GraphQL */`
  query GetPostById($input: ID!) {
    getPostById(id: $input) {
      _id
      title
      summary
      tags
      content
      posterUrl
      createdAt
      updatedAt
      isPublic
      prev {
        title
        _id
      }
    } 
  }
`
)

const updatePostById = gql(/* GraphQL */`
  mutation UpdatePostById($input: UpdatePostInput!) {
    updatePostById(input: $input) {
      _id
      title
      summary
      tags
      content
      posterUrl
      createdAt
      updatedAt
      lastModifiedDate
      isPublic
      like
      pv
      prev {
        title
        _id
      }
    }
  }
`)

const inputFlds = {
  title: 'title',
  tags: 'tags',
}

const textAreaFlds = {
  summary: 'summary',
  content: 'content',
  posterUrl: 'posterUrl',
}

const selectFlds = {
  isPublic: {
    name: "isPublic",
    option1: "Public",
    option2: "Draft"
  },
}

/** Not register them on input cause readOnly */
const timeFlds = {
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
}


type Prpos = {
  postId: string
}
function PostDetail({ postId }: Prpos) {
  const { data, error } = useSuspenseQuery(getPostByIdQuery, {
    variables: { input: postId }
  })
  const post = data.getPostById
  const [updatePost, mutationResult] = useMutation(updatePostById)

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const fTags = (formData.get(inputFlds.tags) as string).split(',')
    const fIsPublic = formData.get(selectFlds.isPublic.name) === selectFlds.isPublic.option1

    const updatedFormObj = formDataToObject(formData)
    const prunedPost = pruneProperties(post, ['tags', 'isPublic', 'createdAt', 'updatedAt'])
    const prunedFormObj = pruneProperties(updatedFormObj, ['tags', 'isPublic'])
    const changes = getDirtyFlds<typeof prunedPost>(prunedPost, prunedFormObj)

    /** Just udpate tags and isPublic even no actual changes because I'm too lazy to do diff */
    const input = {
      ...changes,
      tags: fTags,
      isPublic: fIsPublic
    }

    updatePost({
      variables: {
        input: {
          id: post._id,
          ...input
        }
      }
    })
    const postDetailRoute = '/posts'
    window.location.replace(window.location.origin + postDetailRoute)
  }

  return (
    <form onSubmit={handleSumbit} className='p-8'>
      <div className="grid grid-cols-6 gap-6">

        {Object.values(inputFlds).map((val) => {
          return (
            <div className='col-span-6 sm:col-span-3' key={val}>
              <div className="mb-2 block">
                <Label
                  htmlFor={val}
                  value={val}
                />
              </div>
              <TextInput
                defaultValue={post[val as keyof typeof inputFlds]}
                id={val}
                name={val}
                sizing="md"
                type="text"
              />
            </div>
          )
        })}

        <div
          className="col-span-6"
          id="textarea"
        >
          <div className="mb-2 block">
            <Label
              htmlFor={textAreaFlds.posterUrl}
              value={textAreaFlds.posterUrl}
            />
          </div>
          <Textarea
            id={textAreaFlds.posterUrl}
            name={textAreaFlds.posterUrl}
            defaultValue={post.posterUrl}
            required
            rows={2}
          />
        </div>


        <div
          className="col-span-6"
          id="textarea"
        >
          <div className="mb-2 block">
            <Label
              htmlFor={textAreaFlds.summary}
              value={textAreaFlds.summary}
            />
          </div>
          <Textarea
            id={textAreaFlds.summary}
            name={textAreaFlds.summary}
            defaultValue={post.summary}
            required
            rows={3}
          />
        </div>

        <div
          className="col-span-6"
          id="textarea"
        >
          <div className="mb-2 block">
            <Label
              htmlFor={textAreaFlds.content}
              value={textAreaFlds.content}
            />
          </div>
          <Textarea
            id={textAreaFlds.content}
            name={textAreaFlds.content}
            defaultValue={post.content}
            required
            rows={20}
          />
        </div>

        {Object.values(timeFlds).map((val) => {
          return (
            <div className='col-span-6 sm:col-span-3' key={val}>
              <div className="mb-2 block">
                <Label htmlFor={val} value={val} />
              </div>
              <TextInput
                readOnly
                id={val}
                sizing="md"
                //@ts-ignore
                placeholder={timeStampFilter(post[val])}
                type="text"
              />
            </div>
          )
        })}


        <div className='col-span-6 sm:col-start-4 sm:col-end-7'>
          <div className="mb-2 block">
            <Label
              htmlFor={selectFlds.isPublic.name}
              value="Select post status"
            />
          </div>
          <Select
            id={selectFlds.isPublic.name} name={selectFlds.isPublic.name}
            required
          >
            <option selected={post.isPublic}>
              {selectFlds.isPublic.option1}
            </option>
            <option selected={!post.isPublic}>
              {selectFlds.isPublic.option2}
            </option>
          </Select>
        </div>

      </div>

      <Button type="submit">
        Submit
      </Button>

    </form>
  )
}

export default PostDetail