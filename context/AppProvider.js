//Inside the AuthContext file.
import { useState, createContext, useContext, useMemo } from "react";
import { useAuth } from "./AuthContext";
import useFirestore from "../hooks/useFirestore";

const appContextDefaults = {
  rooms: [],
  selectedRoom: {},
  members: [],
  isAddRoomVisible: false,
  setIsAddRoomVisible: () => {},
  isInviteMemberVisible: false,
  setIsInviteMemberVisible: () => {},
  selectedRoomId: "",
  setSelectedRoomId: () => {},
};
export const AppContext = createContext(appContextDefaults);

export function useApp() {
  return useContext(AppContext);
}

// Inside AppProvider
export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState("");

  const { user } = useAuth();

  /**
   * {
   *  name: "room name",
   * description: "room description",
   * members: [uid1, uid2, ...]
   * }
   */
  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user?.uid,
    };
  }, [user?.uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", usersCondition);

  const value = {
    rooms,
    selectedRoom,
    members,
    isAddRoomVisible,
    setIsAddRoomVisible,
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    setSelectedRoomId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
