import Header from './Header'
import { PostsTable } from './PostsTable'

export default async function Home() {
  return (
    <>
      <Header />
      <PostsTable />
    </>
  )
}
