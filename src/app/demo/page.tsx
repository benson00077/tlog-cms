import { gql } from '@apollo/client';
import { getClient } from './_lib/client';
import { Posts } from '../_lib/types';
import PostTableInfo from '../_components/PostsTableInfo';
import { PostsTable } from '../_components/PostsTable';

const postsQuery = gql`
  query {
    posts (input : {
      page: 1
      pageSize: 10
    }) {
      total
      page
      pageSize
      items {
        title
        _id
        prev {
          title
          _id
        }
      }
    }
  }
`

export default async function Home() {
  const { data } = await getClient().query<{ posts: Posts }>({ query: postsQuery });
  return (
    <>
      <section className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
        <PostTableInfo />
      </section>
      <section>
        <PostsTable posts={data.posts} />
      </section>
    </>
  )
}
