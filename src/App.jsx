/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles.css";
import { FriendList } from "./components/FriendList";
const ids = [crypto.randomUUID(), crypto.randomUUID(), crypto.randomUUID()];
export const Friends = [
  {
    id: ids[0],
    img: `https://i.pravatar.cc/48?=${ids[0]}`,
    name: "Daniel",
    owe: 25,
  },
  {
    id: ids[1],
    img: `https://i.pravatar.cc/48?=${ids[1]}`,
    name: "Jon",
    owe: 0,
  },
  {
    id: ids[2],
    img: `https://i.pravatar.cc/48?=${ids[2]}`,
    name: "Mira",
    owe: -50,
  },
];

export default function App() {
  const [friends, setFriends] = useState(Friends);
  function addFriend(newFriend) {
    setFriends((prev) => [...prev, newFriend]);
  }
  return (
    <div className="app">
      <FriendList friends={friends} onAdd={addFriend} />
    </div>
  );
}
