import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Pagination from 'react-bootstrap/Pagination'
import { useHeaderContext } from './HeaderContext'
import Form from 'react-bootstrap/Form'
import useApi from './ApiHook'

interface Post {
  id:number, 
  title:string,
  body:string
  user:{
    name:string,
    id:number
  }
}

function Posts() {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<20 | 50>(20)
  const query = useHeaderContext()
  const posts = useApi<Post>(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}&q=${query}&_expand=user`)

  function nextPage(){
    if (posts.length > 0) {
      setPage(page + 1)
    }
  }

  function prevPage(){
    if (page>1) {
      setPage(page - 1)
    }
  }

  function changeLimit(e:React.ChangeEvent<HTMLSelectElement>){
    setPage(1)
    setLimit(e.target.value==="50"?50:20)
  }

  useEffect(()=>{
    setPage(1)
  },[query])

  return (
    <div className="text-center mx-4">
      <h1 className="my-4">Posts</h1>
      {posts.length < 1 ? (<div className="mb-4">No more results...</div>) : null}
      {posts.map(p => {
        return (
          <Card key={p.id} className="mb-4">
            <Card.Body>
              <Card.Title className="mb-4">
                {p.title}
              </Card.Title>
              <Card.Text>
                Written by: <a href={`/users?selectedUser=${p.user.id}`}>{p.user.name}</a>
              </Card.Text>
              <Card.Text>
                {p.body}
              </Card.Text>
            </Card.Body>
          </Card>
        )
      })}
      <div className="d-flex justify-content-center">
        <Pagination className="w-auto me-4">
          <Pagination.Prev onClick={prevPage} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage} />
        </Pagination>
        <Form.Select className="w-auto h-100" aria-label="Results per page" onChange={changeLimit}>
          <option>Results per page (default 20)</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Select>

      </div>
    </div>
  )

}

export default Posts