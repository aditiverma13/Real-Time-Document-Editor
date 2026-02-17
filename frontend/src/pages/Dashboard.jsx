import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { userDataContext } from "../context/UserContext";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userData } = useContext(userDataContext);

  // ===============================
  // FETCH ALL DOCUMENTS
  // ===============================
  const fetchDocuments = async () => {
    try {
      // FIX: Updated endpoint to match backend route '/my-docs'
      const res = await axios.get(
        "http://localhost:5000/api/documents/my-docs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDocuments(res.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CREATE NEW DOCUMENT
  // ===============================
  const createDocument = async () => {
    try {
      // FIX: Updated endpoint to match backend route '/create'
      const res = await axios.post(
        "http://localhost:5000/api/documents/create",
        {
          title: "Untitled Document",
          content: "", // Start with empty content
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Successfully created? Navigate immediately to the new editor
      if (res.data && res.data._id) {
        navigate(`/document/${res.data._id}`);
      }

    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document. Please try again.");
    }
  };

  // Initial Load
  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] text-white px-10 py-12">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {userData?.name || "User"}
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your collaborative workspace
            </p>
          </div>

          <button
            onClick={createDocument}
            className="px-7 py-3 rounded-xl font-medium
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 
            transition-all duration-300"
          >
            + New Document
          </button>
        </div>

        {/* Document List Section */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <p className="text-gray-400 animate-pulse">Loading workspace...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="bg-white/5 p-12 rounded-xl border border-white/10 text-center">
            <h3 className="text-xl text-gray-300 font-semibold mb-2">No documents yet</h3>
            <p className="text-gray-500 mb-6">Create your first document to get started.</p>
            <button 
              onClick={createDocument}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Create one now
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc._id}
                onClick={() => navigate(`/document/${doc._id}`)}
                className="group p-6 rounded-xl bg-white/5 border border-white/10
                hover:border-purple-500/50 hover:bg-white/[0.07] 
                cursor-pointer transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <h3 className="text-lg font-semibold relative z-10 group-hover:text-blue-200 transition-colors">
                  {doc.title}
                </h3>
                
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400 relative z-10">
                   <span>Last edited:</span>
                   <span>{new Date(doc.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;