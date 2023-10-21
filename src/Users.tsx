import { useEffect } from "react"
import { useHeaderContext } from "./HeaderContext"
import Card from "react-bootstrap/esm/Card"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { useSearchParams } from "react-router-dom"
import useApi from "./ApiHook"

interface User {
  id:number,
  name:string,
  email:string,
  phone:string,
  website:string
  company:{
    name:string
  }
}

interface Photos {
  userId: number,
  photos: {
    thumbnailUrl: string
  }[]
}

function Users() {
  const query = useHeaderContext()
  const [params, ] = useSearchParams()
  const selectedUser = params.get('selectedUser') || '' 
  const users = useApi<User>(`https://jsonplaceholder.typicode.com/users?q=${query}`)
  const photos = useApi<Photos>(`https://jsonplaceholder.typicode.com/albums?_embed=photos`)

  useEffect(() => {
    document.getElementById(selectedUser)?.scrollIntoView()
  }, [users, selectedUser])

  return (
    <div className="text-center mx-4">
      <h1 className="my-4">Users</h1>
      {users.length < 1 ? (<div className="mb-4">No results...</div>) : null}
      <Row>
        {users.map(p => {
          return (
            <Col key={p.id} xs="4">
              <Card id={p.id.toString()} className={`mb-4 ${parseInt(selectedUser)===p.id?'selected-user':''}`}>
                <div className="d-flex justify-content-center">
                  <Card.Img className="w-25 rounded m-4" variant="top" src={photos[p.id]?.photos[0].thumbnailUrl} />
                </div>
                <Card.Body>
                  <Card.Title className="mb-4">
                    {p.name}
                  </Card.Title>
                  <Card.Text>
                      Email: {p.email}<br />
                      Phone: {p.phone}<br />
                      Website: {p.website}<br />
                      Company: {p.company.name}<br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </div>
  )

}

export default Users