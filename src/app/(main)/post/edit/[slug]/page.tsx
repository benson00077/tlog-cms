import React, { Suspense } from 'react'
import PostDetail from './PostDetail'
import LoadingBackDrop from '@/app/_components/LoadingBackDrop'
import { fetchPostsSlugs } from '@/app/(main)/_lib/utils'

export const dynamic = 'force-static'
export const dynamicParams = false

/** Return a list of `params` to populate the [slug] dynamic segment */
export async function generateStaticParams() {
  const ids = await fetchPostsSlugs(1, 10)

  //FIXME: `npm run build` would somehow send { slug: `[slug]` } or { slug: %5Bslug%5D } down to Page and make apollo call api.
  //Error on static export build: Error occurred prerendering page "/post/edit/[slug]".
  // ref: https://github.com/vercel/next.js/issues/45220
  // ref: https://github.com/vercel/next.js/discussions/53893
  // ref: https://github.com/vercel/next.js/issues/46098
  //Error on static export dev  : Error: Page "/(main)/post/edit/[slug]/page" is missing exported function "generateStaticParams()", which is required with "output: export" config.
  // ref: https://github.com/vercel/next.js/issues/54393
  //  \__ workaround: https://github.com/vercel/next.js/issues/48022#issuecomment-1517432608
  return ids.map((id) => ({
    slug: id,
  }))
}

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