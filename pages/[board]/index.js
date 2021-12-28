import { useState, useEffect, useMemo } from "react";
import { useApp } from "../../context/AppProvider";
import { debounce } from "lodash";

import BoardLayout from "../../hoc/BoardLayout/BoardLayout";
import { Button, Popover, OverlayTrigger, Modal, FormControl, Form, Spin } from "react-bootstrap";
import Avatar from "@atlaskit/avatar";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Form.Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size='small' src={opt.photoURL}>
            {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </option>
      ))}
    </Form.Select>
  );
}

function fetchUserList(search, curMembers) {
  return fetch(`/api/users?search=${search}`)
    .then((res) => res.json())
    .then((res) => {
      return res.map((user) => {
        if (curMembers.includes(user.uid)) {
          return null;
        }
        return {
          value: user.uid,
          label: user.displayName,
          photoURL: user.photoURL,
        };
      });
    });
}

export default function Board() {
  const [newMember, setNewMember] = useState("");
  const [value, setValue] = useState([])
  const { members, isInviteMemberVisible, setIsInviteMemberVisible } = useApp();

  function handleChange(e) {
    e.preventDefault();
    setNewMember(e.target.value);
  }

  const popover = (id, displayName) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{displayName}</Popover.Header>
      <Popover.Body>
        <Button variant="danger">Xóa thành viên khỏi room</Button>
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
          <DebounceSelect 
            mode="multiple"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên các thành viên"
            fetchOptions={fetchUserList}
            onChange={newValue => setValue(newValue)}
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
          <Button onClick={() => setIsInviteMemberVisible(false)}>Thêm thành viên!</Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex float-end m-2">
        <Button className="pr-1" onClick={() => setIsInviteMemberVisible(true)}>Mời thêm thành viên</Button>
        <div className="mx-2"></div>
        {avatar}
      </div>
    </BoardLayout>
  );
}
