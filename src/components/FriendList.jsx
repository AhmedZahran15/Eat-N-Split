import { useState } from "react";
import { Friends } from "../App";
import { Friend } from "./Friend";
import { FormSplitBill } from "./FormSplitBill";
import { AddFriend } from "./AddFriend";

export function FriendList({ friends, onAdd }) {
  const [selected, setSelected] = useState("");
  const [addFriend, setAddFriend] = useState(false);

  function handleSelect(friend) {
    if (selected.id === friend.id) setSelected("");
    else {
      setSelected(friend);
      setAddFriend(false);
    }
  }

  function handleSplitBill(diff, whoPaid) {
    Friends.map((friend) => {
      if (friend.id === selected.id) {
        if (whoPaid === "you") friend.owe -= diff;
        else friend.owe += diff;
      }
    });
    setSelected("");
  }
  return (
    <>
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <Friend
              friend={friend}
              key={friend.name}
              selected={selected.id === friend.id}
              handleSelect={handleSelect}
            />
          ))}
        </ul>
        <AddFriend
          addFriend={addFriend}
          setAddFriend={setAddFriend}
          onAdd={onAdd}
          setSelected={setSelected}
        />
      </div>
      {selected && (
        <FormSplitBill
          key={selected.id}
          selectedFriend={selected}
          onSplitBill={handleSplitBill}
        />
      )}
    </>
  );
}
