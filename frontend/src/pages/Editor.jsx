import React, { useEffect, useState } from "react";
import socket from "../socket";

const Editor = () => {
  const [content, setContent] = useState("");
  const documentId = "12345"; // later dynamic via params

  useEffect(() => {
    // Join document room
    socket.emit("join-document", documentId);

    // Receive updates
    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("receive-changes");
    };
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setContent(newValue);

    // Send changes to server
    socket.emit("send-changes", {
      documentId,
      content: newValue,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Real-Time Document Editor
        </h1>

        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-[500px] p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
};

export default Editor;
