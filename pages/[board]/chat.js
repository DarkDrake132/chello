import { useApp } from "../../context/AppProvider";

import BoardLayout from "../../hoc/BoardLayout/BoardLayout";
import ChatWindow from "../../component/ChatWindow";

const ChatRoom = () => {
  const { selectedRoom } = useApp();

  return (
    <BoardLayout>
      <ChatWindow selectedRoom={selectedRoom} />
    </BoardLayout>
  );
};

export default ChatRoom;
