import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBarPr(){
    return(
        <>
            <Navbar className="background-turquesa" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Ecualización de codices</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <Nav.Link href="/gallery_options" className="nav-links">Crear Galeria</Nav.Link>
                        <Nav.Link href="/delete_gallery" className="nav-links">Eliminar galeria</Nav.Link>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Hola: <a href="#login">Jesus Garcia</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBarPr;