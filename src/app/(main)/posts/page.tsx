import { Suspense } from "react"
import PostList from "./PostList"
import PostTableInfo from "@/app/_components/PostsTableInfo"
import OnEditCtxWrapper from "./OnEditCtxWrapper"
import PostListFallback from "./PostListFallback"

export default function Posts() {
  return (
    <OnEditCtxWrapper>
      <section className='px-4 py-2 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
        <PostTableInfo />
      </section>
      <section >
        <Suspense fallback={<PostListFallback />}>
          <PostList />
        </Suspense>
      </section>
    </OnEditCtxWrapper>
  )
}
