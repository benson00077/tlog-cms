'use client'
import { PostsTable } from '@/app/_components/PostsTable'
import React from 'react'

function PostListFallback() {
  return (
    <PostsTable
      mode='view'
      onGridEdit={() => { }}
      posts={{
        total: '11',
        page: 1,
        pageSize: 10,
        items: [...new Array(10).fill(null)].map((_, i) => {
          return {
            _id: '' + i,
            title: "...Loading...",
            summary: "...Summary...",
            content: '',
            posterUrl: '',
            tags: ['...Loading...'],
            lastModifiedDate: '',
            isPublic: true,
            createdAt: '',
            updatedAt: ''
          }
        })
      }}
    />
  )
}

export default PostListFallback