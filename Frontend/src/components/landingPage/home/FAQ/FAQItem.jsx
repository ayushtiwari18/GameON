import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`faq-item-landing ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="faq-question-landing">
        <span>{question}</span>
        <span className="arrow">{isOpen ? "▲" : "▶"}</span>
      </div>
      {isOpen && <div className="faq-answer-landing">{answer}</div>}
    </div>
  );
};

export default FAQItem;
