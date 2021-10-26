import React from 'react';
import Header from '../../component/Header/Header';
import { useRouter } from 'next/router';

import { Modal, Button, FormControl } from 'react-bootstrap';

function Layout({ children }) {
    const router = useRouter();

    const [modalShow, setModalShow] = React.useState(false);

    const [ newRoom, setNewRoom ] = React.useState("");

    function modalHandler() {
        setModalShow(true);
    }

    function createBoardHandler() {
        let id = newRoom;
        console.log(newRoom);
        setModalShow(false);
        setNewRoom("");
        //id room will goes here
        router.push(`/${id}`);
    }

    return (
        <div className="">
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Creating new Room...
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>What will be the name for your room</h5>
                    <FormControl
                        placeholder="Enter Room's name here"
                        aria-label="Room's Name"
                        aria-describedby="basic-addon1"
                        value={newRoom}
                        onChange={(event) => setNewRoom(event.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setModalShow(false); setNewRoom("");}}>Cancel</Button>
                    <Button onClick={createBoardHandler}>Create Now!</Button>
                </Modal.Footer>
            </Modal>
            <Header createBoard={modalHandler} />
            {React.cloneElement(children, { modalHandler: modalHandler })}
            {/* Footer */}
        </div>
    )
}

export default Layout;