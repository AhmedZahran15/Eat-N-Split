import { useState } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

export function AddFriend({ addFriend, setAddFriend, onAdd, setSelected }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newID = crypto.randomUUID();
    const newFriend = {
      id: newID,
      img: "",
      name: "",
      owe: 0,
    };
    newFriend.img = `${image}?=${newID}}`;
    newFriend.name = name;
    onAdd(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
    setAddFriend(false);
  }
  return (
    <>
      {addFriend && (
        <form className="form-add-friend" onSubmit={handleSubmit}>
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
          <Button text="Add" />
        </form>
      )}

      <Button
        text={addFriend ? "Close" : "Add friend"}
        onclick={() => {
          setAddFriend(!addFriend);
          setSelected("");
        }}
      />
    </>
  );
}
