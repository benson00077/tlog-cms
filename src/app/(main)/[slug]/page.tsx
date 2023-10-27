"use client"
import React, { Suspense } from 'react'
import { useQuery } from "@apollo/client"
import { gql } from "@/__generated__/gql"
import { PostDetail } from '@/app/_components/PostDetail'

const getPostByIdQuery = gql(/* GraphQL */`
  query GetPostById($input: ID!) {
    getPostById(id: $input) {
      _id
      title
      summary
      tags
      prev {
        title
        _id
      }
    } 
  }
`
)

export default function Page({ params }: { params: { slug: string } }) {
  const postId = params.slug
  const { loading, error, data, refetch } = useQuery(getPostByIdQuery, {
    variables: { input: postId },
  });

  console.log(33, data)

  return (
    <>
      <div className='text-gray-600'>{data ? data.getPostById.summary : <PostDetail />}</div>
    </>
  )
}