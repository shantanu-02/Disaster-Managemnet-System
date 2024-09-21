import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I assist you today? Please select a question:" }
  ]);
  
  // Predefined questions and answers
  const allQuestions = [
    { question: "What is React?", answer: "React is a JavaScript library for building user interfaces." },
    { question: "What is JSX?", answer: "JSX is a syntax extension for JavaScript that looks similar to XML/HTML." },
    { question: "How does useState work?", answer: "useState is a Hook that lets you add React state to function components." },
  ];

  const [remainingQuestions, setRemainingQuestions] = useState(allQuestions);
  const messagesEndRef = useRef(null); // Reference to scroll to

  const handleQuestionClick = (question) => {
    const userMessage = { from: "user", text: question.question };
    const botResponse = { from: "bot", text: question.answer };

    const updatedQuestions = remainingQuestions.filter(
      (q) => q.question !== question.question
    );

    setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    setRemainingQuestions(updatedQuestions);
  };

  return (
    <div className="max-w-[25%] mx-auto bg-gray-100 shadow-lg rounded-lg p-2 h-80 flex flex-col justify-between">
      <div className="h-[90%] overflow-y-auto bg-white p-2 rounded-lg scrollbar-hide">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-1 p-1 rounded-lg max-w-max text-sm ${
              message.from === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-green-100 text-left"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {remainingQuestions.length > 0 ? (
        <div className="flex overflow-x-auto space-x-2 py-2">
          {remainingQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-xs whitespace-nowrap"
            >
              {question.question}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Ask a question..."
            className="border border-gray-300 rounded-lg p-2 flex-1"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-0.5">
            Ask
          </button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
