import {
  Container,
  Navbar,
  Button,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useRouter } from "next/router";

import Avatar from "@atlaskit/avatar";

import { useAuth } from "../../context/AuthContext";

function Header({ createBoard }) {
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
    <Navbar bg="primary" variant="dark" style={{ fontWeight: "bold" }}>
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
        >
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
              <Button>
                <div>
                  <Avatar src={user?.photoURL} size="small" alt="Bach" />
                  <Navbar.Text
                    style={{
                      marginLeft: "1rem",
                      color: "white",
                    }}
                  >
                    {user?.displayName}
                  </Navbar.Text>
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
