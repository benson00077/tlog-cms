
export type Posts = {
  total: string
  page: number
  pageSize: number
  items: PostItem[]
}

export type PostItem = {
  title: string
  _id: string
  prev: PostItem | null
}

export type User = {
  _id: string
  username: string
  access_token: string
  role: number
  createdAt: string
  updatedAt: string
}