import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBarPr(){
    return(
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Ecualización de codices</Navbar.Brand>
                    <Navbar.Toggle />
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