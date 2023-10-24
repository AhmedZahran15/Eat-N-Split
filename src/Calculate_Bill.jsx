import "./styles.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [service, setService] = useState(0);
  const [friend, setFriend] = useState(0);
  const tip = (bill * (Number(service) + Number(friend))) / 2 / 100;
  const total = Number(bill) + tip;
  return (
    <div>
      <Line text="How much was the bill?">
        <TextBox state={bill} setState={setBill} />
      </Line>
      <Line text="How did you like the service?">
        <Dropdown state={service} setState={setService} />
      </Line>
      <Line text="How did your friend like the service?">
        <Dropdown state={friend} setState={setFriend} />
      </Line>
      {total > 0 && (
        <>
          <Message text={`You pay $${total} ($${bill} + $${tip} tip)`} />
          {<Button setStates={[setBill, setService, setFriend]} />}
        </>
      )}
    </div>
  );
}
function Line({ text, state, children }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Message text={text} />
      {children}
    </div>
  );
}
function Dropdown({ state, setState }) {
  return (
    <select value={state} onChange={(e) => setState(e.target.value)}>
      <option value="0">0%</option>
      <option value="5">5%</option>
      <option value="10">10%</option>
      <option value="20">20%</option>
    </select>
  );
}
function Message({ text }) {
  return <span style={{ fontWeight: "bolder" }}>{text}</span>;
}
function TextBox({ state, setState }) {
  return (
    <div>
      <input
        value={state}
        type="text"
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  );
}
function Button({ setStates }) {
  return (
    <button
      onClick={() => {
        setStates.forEach((setState) => setState(0));
      }}
    >
      Reset
    </button>
  );
}
