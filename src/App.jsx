/* eslint-disable react/prop-types */
import { useState } from "react";
import "./styles.css";

const Friends = [
  { id: 1551, img: "https://i.pravatar.cc/47", name: "Daniel", owe: 25 },
  { id: 5124, img: "https://i.pravatar.cc/49", name: "Jon", owe: 0 },
  { id: 5251, img: "https://i.pravatar.cc/48", name: "Mira", owe: -50 },
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

function Button({ text, onclick }) {
  return (
    <button className="button" onClick={onclick}>
      {text}
    </button>
  );
}
function FormInput({ label, disabled, name, value, onchange }) {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        disabled={disabled}
        value={value}
        onChange={(e) => onchange(e.target.value)}
      />
    </>
  );
}
function FriendList({ friends, onAdd }) {
  const [selected, setSelected] = useState("");
  const [addFriend, setAddFriend] = useState(false);

  function handleSelect(friend) {
    if (selected.id === friend.id) setSelected("");
    else setSelected(friend);
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
        />
      </div>
      {selected && (
        <FormSplitBill
          selectedFriend={selected}
          onSplitBill={handleSplitBill}
        />
      )}
    </>
  );
}
function AddFriend({ addFriend, setAddFriend, onAdd }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/50");
  function handleSubmit(e) {
    e.preventDefault();
    const newFriend = {
      id: Math.floor(Math.random() * 10000),
      img: "",
      name: "",
      owe: 0,
    };
    if (name && image) {
      newFriend.img = image;
      newFriend.name = name;
    } else return;
    onAdd(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/50");
    setAddFriend(false);
  }
  return (
    <>
      <hr />
      {addFriend && (
        <form className="form-add-friend form">
          <FormInput
            label="👫 Friend name"
            name="name"
            disabled={false}
            value={name}
            onchange={setName}
          />
          <FormInput
            label="🌄 Image URL"
            name="image"
            value={image}
            disabled={false}
            onchange={setImage}
          />
          <Button text="Add" onclick={handleSubmit} />
        </form>
      )}

      <Button
        text={addFriend ? "Close" : "Add friend"}
        onclick={() => setAddFriend(!addFriend)}
      />
    </>
  );
}
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [friendExpense, setFriendExpense] = useState("");
  const [whoPaid, setWhoPaid] = useState("you");
  function handleSubmit(e) {
    e.preventDefault();
    if (bill && myExpense) {
      if (whoPaid === "you") {
        onSplitBill(friendExpense, whoPaid);
      } else {
        onSplitBill(myExpense, whoPaid);
      }
    } else return;
  }
  return (
    <>
      <form className="form-split-bill form">
        <h2>Split a bill with {selectedFriend.name}</h2>
        <FormInput
          label="💰 Bill value"
          name="bill"
          disabled={false}
          value={bill}
          onchange={setBill}
        />
        <label htmlFor="expense">🧍‍♀️ Your expense</label>
        <input
          type="text"
          name="expense"
          value={myExpense}
          disabled={false}
          onChange={(e) => {
            setMyExpense(Number(e.target.value) ? Number(e.target.value) : 0);
            setFriendExpense(
              Number(bill - e.target.value) ? Number(bill - e.target.value) : 0
            );
          }}
        />
        <FormInput
          label={`👫 ${selectedFriend.name}'s expense`}
          name="friend-expense"
          value={friendExpense}
          disabled={true}
        />
        <label htmlFor="whopays">🤑 Who is paying the bill</label>
        <select
          name="whopays"
          value={whoPaid}
          onChange={(e) => setWhoPaid(e.target.value)}
        >
          <option value="you">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button text="Split bill" onclick={handleSubmit} />
      </form>
    </>
  );
}
function Friend({ friend, selected, handleSelect }) {
  function HandleShowBillSplit() {
    handleSelect(friend);
  }
  return (
    <li className={selected ? "selected" : ""}>
      <img src={friend.img} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={friend.owe < 0 ? "green" : friend.owe > 0 ? "red" : ""}>
        {friend.owe > 0
          ? `You owe ${friend.name} $${friend.owe}`
          : friend.owe < 0
          ? `${friend.name} owes you $${Math.abs(friend.owe)}`
          : `${friend.name} is all settled up!`}
      </p>
      <Button
        text={selected ? "Close" : "Select"}
        onclick={HandleShowBillSplit}
      />
    </li>
  );
}
