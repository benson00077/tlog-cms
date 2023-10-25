
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
