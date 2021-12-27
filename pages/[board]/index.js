import BoardLayout from "../../hoc/BoardLayout/BoardLayout";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import AvatarGroup from "@atlaskit/avatar-group";
import Avatar from "@atlaskit/avatar";

export default function Board() {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And some <strong>amazing</strong> content. very engaging. right?
      </Popover.Body>
    </Popover>
  );
  const data = [
    {
      email: "test@abc.com",
      key: "1",
      name: "Test User",
    },
    {
      email: "test@abc.com",
      key: "2",
      name: "Test User",
    },
    {
      email: "test@abc.com",
      key: "3",
      name: "Test User",
    },
  ];

  const avatar = data.map((ele, index) => {
    return (
      <OverlayTrigger
        key={ele.key}
        trigger="click"
        placement="bottom"
        overlay={popover}
      >
        <Avatar name={ele.name} onClick={() => console.log(index)} />
      </OverlayTrigger>
    );
  });

  return (
    <BoardLayout>
      <div className="d-flex float-end m-2">
        <Button className="pr-1">Mời thêm thành viên</Button>
        <div className="mx-2"></div>
        {avatar}
      </div>
    </BoardLayout>
  );
}
