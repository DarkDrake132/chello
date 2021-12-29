import { useState } from "react";
import { useRouter } from "next/router";
import { useApp } from "../../context/AppProvider";
import { addMember, removeMember } from "../../firebase/service";

import BoardLayout from "../../hoc/BoardLayout/BoardLayout";
import {
  Button,
  Popover,
  OverlayTrigger,
  Modal,
  FormControl,
} from "react-bootstrap";
import Avatar from "@atlaskit/avatar";

export default function Board() {
  const router = useRouter();
  const [newMember, setNewMember] = useState("");
  const { members, isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId } = useApp();

  function handleChange(e) {
    e.preventDefault();
    setNewMember(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!addMember(router.query.board, newMember)) {
      alert("Không tim thấy user hợp lệ")
    } else {
      setNewMember("");
      setIsInviteMemberVisible(false);
    }
  }

  function handleRemoveMember(memberId) {
    removeMember(router.query.board, memberId)
  }

  const popover = (id, displayName) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{displayName}</Popover.Header>
      <Popover.Body>
        <Button variant="danger" onClick={() => handleRemoveMember(id)}>Xóa thành viên khỏi room</Button>
      </Popover.Body>
    </Popover>
  );

  const avatar = members.map((member) => {
    return (
      <OverlayTrigger
        key={member.uid}
        trigger="click"
        placement="bottom"
        overlay={popover(member.uid, member.displayName)}
      >
        <Avatar src={member.photoURL} onClick={() => {}} />
      </OverlayTrigger>
    );
  });

  return (
    <BoardLayout>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isInviteMemberVisible}
        onHide={() => setIsInviteMemberVisible(false)}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Adding new member
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Type to find user</h5>
          <FormControl
            placeholder="Nhập tên người dùng"
            aria-label="Room's Name"
            aria-describedby="basic-addon1"
            name="name"
            required
            value={newMember}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setIsInviteMemberVisible(false);
              setNewMember("");
            }}
          >
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)}>
            Thêm thành viên!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex float-end m-2">
        <Button className="pr-1" onClick={() => setIsInviteMemberVisible(true)}>
          Mời thêm thành viên
        </Button>
        <div className="mx-2"></div>
        {avatar}
      </div>
    </BoardLayout>
  );
}
