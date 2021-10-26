import { Container, Navbar, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

function Header({ createBoard }) {
    const router = useRouter();

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => { router.push('/') }}>Chello</Navbar.Brand>
                <Navbar.Toggle />
                <Button onClick={createBoard} variant="info">Create Room</Button>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: Bách
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;