import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    console.warn(user)
    const history = useHistory()
    function logout(){
        localStorage.clear()
        history.push('/login')
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Settly</Navbar.Brand>
                <Nav className="me-auto navbar-wrapper">
                    {
                        localStorage.getItem('user-info') ? 
                        <>
                            <Link to="/"> View Clients</Link> 
                            <Link to="/add">Add Client</Link> 
                        </>
                        :
                        <>               
                            <Link to="/login">Login</Link> 
                            <Link to="/register">Register</Link> 
                        </>
                    }
                </Nav>
                {
                    localStorage.getItem('user-info') ? 
                    <Nav>
                        <NavDropdown title={user && user.name}>
                            <NavDropdown.Item onClick = {logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    : null
                }
            </Navbar>
        </div>
    )
}

export default Header