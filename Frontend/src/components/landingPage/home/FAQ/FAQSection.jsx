import React, { useState } from "react";
import FAQItem from "./FAQItem";
import "./FAQSection.css";

const FAQSection = () => {
  const faqData = [
    {
      question: "How do I register as a player?",
      answer:
        'You can register by clicking the "Join Now" button on the homepage, filling in your details, selecting your sport, and verifying your email. Once registered, you can explore academies, join teams, and participate in tournaments.',
    },
    {
      question: "Can an academy register multiple teams for tournaments?",
      answer:
        "Yes, an academy can register multiple teams for different tournaments, provided they meet the eligibility criteria set by the tournament organizers.",
    },
    {
      question: "Is there a fee for joining a tournament?",
      answer:
        "Tournament fees vary depending on the event. Some tournaments are free, while others may require a registration fee.",
    },
    {
      question: "How do I find and join an academy?",
      answer:
        "You can browse available academies on our platform, view their details, and apply to join based on your preferences and skill level.",
    },
    {
      question: "How do I reset my password if I forget it?",
      answer:
        'Click on the "Forgot Password" link on the login page and follow the instructions to reset your password via email.',
    },
  ];

  return (
    <div className="faq-section-landing">
      <h2 className="faq-title-landing">Frequently Asked Questions</h2>
      <div className="faq-container-landing">
        <div className="faq-list-landing">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
