import { useState } from "react";
import { Button } from "./Button";
import { FormInput } from "./FormInput";

export function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [whoPaid, setWhoPaid] = useState("you");
  const friendExpense = bill ? Number(bill) - myExpense : 0;
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
      <form className="form-split-bill" onSubmit={handleSubmit}>
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
          id="expense"
          value={myExpense}
          disabled={false}
          onChange={(e) => {
            setMyExpense(
              Number(e.target.value) > bill ? myExpense : Number(e.target.value)
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
          id="whopays"
          value={whoPaid}
          onChange={(e) => setWhoPaid(e.target.value)}
        >
          <option value="you">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <Button text="Split bill" />
      </form>
    </>
  );
}
