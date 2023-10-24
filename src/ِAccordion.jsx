import "./styles.css";
import { useState } from "react";
const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}

function Accordion({ data }) {
  const [isOpen, setIsOpen] = useState(null);
  function toggle(number) {
    setIsOpen((prev) => (number === prev ? null : number));
  }
  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          number={index + 1}
          toggle={toggle}
        >
          {isOpen === index + 1 ? (
            <div className="content-box">
              <p>{item.text}</p>
            </div>
          ) : null}
        </AccordionItem>
      ))}
    </div>
  );
}
function AccordionItem({ item, number, toggle, children }) {
  function handleToggle(number) {
    toggle(number);
  }
  return (
    <div
      className={`item ${children ? "open" : ""}`}
      onClick={() => handleToggle(number)}
    >
      <span className="number">{number < 9 ? "0" + number : number}</span>
      <span className="title">{item.title}</span>
      <span className="icon">{children ? "-" : "+"}</span>
      {children}
    </div>
  );
}


/* * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: sans-serif;
    color: #343a40;
    line-height: 1;
  }
  
  .accordion {
    width: 700px;
    margin: 100px auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .item {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    padding: 20px 24px;
    padding-right: 48px;
    cursor: pointer;
    border-top: 4px solid #fff;
    border-bottom: 4px solid #fff;
  
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 24px;
    row-gap: 32px;
    align-items: center;
  }
  
  .number {
    font-size: 24px;
    font-weight: 500;
    color: #ced4da;
  }
  
  .title,
  .icon {
    font-size: 24px;
    font-weight: 500;
  }
  
  .content-box {
    grid-column: 2 / -1;
    padding-bottom: 16px;
    line-height: 1.6;
  }
  
  .content-box ul {
    color: #868e96;
    margin-left: 16px;
    margin-top: 16px;
  
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
OPEN STATE 
  .open {
    border-top: 4px solid #087f5b;
  }
  
  .open .number,
  .open .title {
    color: #087f5b;
  } */