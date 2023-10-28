"use client"
import { PostsTable } from '@/app/_components/PostsTable';
import PostTableInfo from '@/app/_components/PostsTableInfo';
import { gql } from '@/__generated__/gql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';

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

export default function Home() {
  const { data, error } = useSuspenseQuery(postsQuery, { variables: { input: { page: 1, pageSize: 10 } } })
  return (
    <>
      <section className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
        <PostTableInfo />
      </section>
      <section>
        <PostsTable posts={data.getPosts} />
      </section>
    </>
  )
}
