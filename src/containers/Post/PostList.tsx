import PostTable from "./PostTable";


const data = [{
  id: '123',
  posterUrl: 'http://12341/3/14,1 234; 13',
  title: 'title ',
  summary: 'sum',
  content: 'qjwioefjpqi 2109 u109 u140 14 1j2409 content content content content content',
  tags: ['this', 'is', 'tag'],
  lastModifiedDate: '2022/01/27',
  like: 1,
  pv: 2,
  isPublic: true,
  createdAt: '2022/01/28',
  updatedAt: '2020/01/28'
},
{
  id: '3333',
  posterUrl: 'http://12341/3/14,1 234; 13',
  title: 'title ',
  summary: 'sum',
  content: 'qjwioefjpqi 2109 u109 u140 14 1j2409 content content content content content',
  tags: ['this', 'is', 'tag'],
  lastModifiedDate: '2022/01/27',
  like: 1,
  pv: 2,
  isPublic: true,
  createdAt: '2022/01/28',
  updatedAt: '2020/01/28'
}]


function Post() {
  return (
    <PostTable
      dataSource={data}
    />
  );
}

export default Post;
