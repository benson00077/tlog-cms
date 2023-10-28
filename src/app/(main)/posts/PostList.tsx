"use client"
import { gql } from '@/__generated__/gql'
import { PostsTable } from '@/app/_components/PostsTable'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import React from 'react'

const postsQuery = gql(/* GraphQL */`
  query GetPosts($input: PaginationInput!) {
    getPosts(input: $input) {
      total
      page
      pageSize
      items {
        _id
        posterUrl
        title
        summary
        content
        tags
        lastModifiedDate
        isPublic
        createdAt
        updatedAt
        prev {
          _id
        }
        next {
          _id
        }
      }
    } 
  }
`)

function PostList() {
  const { data, error } = useSuspenseQuery(postsQuery, { variables: { input: { page: 1, pageSize: 10 } } })
  return (
    <PostsTable posts={data.getPosts} />
  )
}

export default PostList