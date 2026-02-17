import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import socket, { connectSocket, disconnectSocket } from "../socket";
import axios from "axios";

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Untitled Document");
  const [status, setStatus] = useState("Saved");
  const [showHistory, setShowHistory] = useState(false); // Toggle History Panel
  const [history, setHistory] = useState([]); // Store versions

  const saveTimeoutRef = useRef(null);

  // ... (Keep existing Socket.io logic here) ...

  // NEW: Fetch History Function
  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/documents/${id}/history`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setHistory(res.data);
      setShowHistory(true);
    } catch (error) {
      console.error("Error fetching history");
    }
  };

  // NEW: Restore Version Function
  const restoreVersion = (oldContent) => {
    if(window.confirm("Are you sure? This will overwrite current changes.")){
      setContent(oldContent);
      socket.emit("send-changes", oldContent); // Broadcast restore
      socket.emit("save-document", oldContent); // Save restore
      setShowHistory(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    setStatus("Saving...");
    socket.emit("send-changes", value);

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      socket.emit("save-document", value);
      setStatus("Saved");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-[#0f172a] text-white pt-20">
        
        {/* Main Editor Area */}
        <div className={`flex-1 flex flex-col px-10 py-6 transition-all ${showHistory ? "w-2/3" : "w-full"}`}>
          
          <div className="flex justify-between items-center mb-6 bg-white/5 p-4 rounded-xl">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <span className="text-xs text-green-400">{status}</span>
            </div>
            
            <div className="flex gap-4">
              {/* History Button */}
              <button 
                onClick={fetchHistory}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition"
              >
                🕐 History
              </button>
              
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
              >
                Back
              </button>
            </div>
          </div>

          <textarea
            value={content}
            onChange={handleChange}
            className="flex-1 bg-[#1e293b]/50 border border-white/10 rounded-xl p-8 resize-none outline-none font-mono text-gray-300"
            placeholder="Start typing..."
          />
        </div>

        {/* NEW: Version History Sidebar */}
        {showHistory && (
          <div className="w-80 bg-[#111827] border-l border-white/10 p-6 overflow-y-auto slide-in-right">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Version History</h2>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              {history.map((ver, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-purple-500/50 transition">
                  <p className="text-xs text-gray-400 mb-2">
                    {new Date(ver.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                    {ver.content.substring(0, 50)}...
                  </p>
                  <button 
                    onClick={() => restoreVersion(ver.content)}
                    className="text-xs w-full py-1 bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/30"
                  >
                    Restore this version
                  </button>
                </div>
              ))}
              {history.length === 0 && <p className="text-gray-500">No history found.</p>}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Editor;

