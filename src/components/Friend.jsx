import { Button } from "./Button";

export function Friend({ friend, selected, handleSelect }) {
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
