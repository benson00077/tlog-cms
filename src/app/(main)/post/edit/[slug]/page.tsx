import React, { Suspense } from 'react'
import PostDetail from './PostDetail'
import LoadingBackDrop from '@/app/_components/LoadingBackDrop'


export default function Page({ params }: { params: { slug: string } }) {
  const postId = params.slug

  return (
    <>
      <Suspense fallback={<LoadingBackDrop />}>
        <PostDetail postId={postId} />
      </Suspense>
    </>
  )
}