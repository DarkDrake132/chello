import {
  Container,
  Navbar,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";

import Avatar from "@atlaskit/avatar";

import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const router = useRouter();

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Account actions</Popover.Header>
      <Popover.Body>
        <Button onClick={logout} variant="danger">
          Log out
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <Navbar variant="dark" style={{ fontWeight: "bold", borderBottom: "1px solid black"}}>
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer", color: "black" }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src="/logo.png" alt="Chello Logo" width="20" height="20" />
          Chello
        </Navbar.Brand>
        <Navbar.Toggle />
        {user ? (
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="focus"
              placement="bottom"
              overlay={popover}
            >
              <Button style={{ background: 'white', border: 'none' }}>
                <div className="d-flex">
                  <Avatar src={user?.photoURL} size="small" alt="Bach" />
                  <p
                    style={{
                      marginLeft: "1rem",
                      color: "black",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {user?.displayName}
                  </p>
                </div>
              </Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
