"use client"
import React, { useContext } from 'react'
import { Button } from 'flowbite-react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { BiSolidBookReader, BiSolidEditAlt } from "react-icons/bi";
import { OnEditCtx } from './OnEditCtxWrapper';
import { gql } from '@/__generated__/gql';
import { useMutation } from '@apollo/client';


const updatePostsByIds = gql(/* GraphQL */`
mutation UpdatePostsByIds($input: UpdatePostsInput!) {
  updatePostsByIds(input: $input) {
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

function PostListActions() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const isViewMode = mode === 'view'

  const { onEditCtx, setOnEditCtx } = useContext(OnEditCtx)
  const submittable = onEditCtx.posts.length > 0

  const [ updatePosts, mutationResult ] = useMutation(updatePostsByIds)

  return (
    <Button.Group >
      <Button title={`Mode: ${mode}`} onClick={() => {
        router.replace(pathname + `?mode=${isViewMode ? 'edit' : 'view'}`)
      }}>
        {isViewMode ? <BiSolidBookReader size={16} /> : <BiSolidEditAlt size={16} />}
        <span className='pl-2'> Mode </span>
      </Button>
      <Button
        onClick={() => {
          updatePosts({
            variables: {
              input: onEditCtx
            }
          }).then(() => {
            router.replace(pathname + `?mode=view`)
          }).catch((err) => {console.error(err)})
        }}
        disabled={isViewMode || (!isViewMode && !submittable)}>
        Save
      </Button>
    </Button.Group>
  )
}

export default PostListActions