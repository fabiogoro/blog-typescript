import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


function Header({setQuery}:{setQuery:(query:string)=>void}) {
  const [search, setSearch] = useState<string>('')
  
  const changeQuery = ()=>{
    setQuery(search)
  }

  const changeSearch = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }

  const submitQuery = (e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault()
    changeQuery()
  }

  return (
    <form onSubmit={submitQuery}>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="./">
            Blog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <input
              className="form-control mx-4"
              aria-label="Search"
              placeholder="Filter"
              name="q"
              id="q"
              value={search}
              onChange={changeSearch}
              type="search"
            />{' '}
            <button
              className="btn btn-secondary"
              onClick={changeQuery}
              style={{ position: 'relative', left: -60 }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <Nav className="me-auto justify-content-end">
              <Nav.Link href="./posts">Posts</Nav.Link>
              <Nav.Link href="./users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </form>
  )

}

export default Header
