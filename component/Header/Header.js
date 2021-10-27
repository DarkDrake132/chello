import { Container, Navbar, Button, Image, Popover, OverlayTrigger } from 'react-bootstrap';
import { useRouter } from 'next/router';

function Header({ createBoard }) {
    const router = useRouter();

    const popover = (
        <Popover id="popover-basic">
          <Popover.Header as="h3">Popover right</Popover.Header>
          <Popover.Body>
            <Button variant="danger">Log out</Button>
          </Popover.Body>
        </Popover>
    );

    return (
        <Navbar bg="primary" variant="dark" style={{ fontWeight: 'bold' }}>
            <Container>
                <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => { router.push('/') }}>Chello</Navbar.Brand>
                <Navbar.Toggle />
                <Button onClick={createBoard} variant="info">Create Room</Button>
                <Navbar.Collapse className="justify-content-end">
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button>
                        <Image src={`https://png.pngtree.com/png-vector/20190225/ourmid/pngtree-vector-female-avatar-icon-png-image_702460.jpg`} alt="Bach" width="30rem" height="30rem" roundedCircle />
                        <Navbar.Text style={{ marginLeft: '1rem', color: 'white'}}>Bach Donny</Navbar.Text>
                    </Button>
                </OverlayTrigger>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;