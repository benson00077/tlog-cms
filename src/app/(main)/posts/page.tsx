import { Suspense } from "react"
import PostList from "./PostList"
import PostTableInfo from "@/app/_components/PostsTableInfo"
import { PostsTable } from "@/app/_components/PostsTable"

export default function Home() {
  return (
    <>
      <section className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
        <PostTableInfo />
      </section>
      <section >
        <Suspense fallback={<PostsTable posts={{
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
        }} />}>
        {/* <Suspense fallback={<PostsTable posts={} />}> */}
          <PostList />
        </Suspense>
      </section>
    </>
  )
}
