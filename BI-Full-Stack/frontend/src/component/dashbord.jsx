import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashbord() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [columns, setColumns] = useState([]);

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setColumns(res.data.columns);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleQuerySubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/query", { query });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error processing query:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Main Centered Box with Shadow */}
          <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-lg border border-gray-200">
            {/* Header Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Chat with Your Data 📊</h1>
              <p className="text-gray-700 text-sm mt-2">Upload your data file and ask queries</p>
            </div>

            {/* Inner Content Box */}
            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-md">
              {/* File Upload Box */}
              <label className="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 cursor-pointer shadow-sm hover:shadow-md transition">
                <span className="text-sm font-semibold">Upload a File</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>

              {/* Available Columns Display */}
              {columns.length > 0 && (
                <p className="text-gray-700 text-sm mt-3 text-center">
                  <span className="font-semibold">Available columns:</span> {columns.join(", ")}
                </p>
              )}

              {/* Query Input Box */}
              <input
                type="text"
                placeholder="Enter your query..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-4 p-3 w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />

              {/* Submit Button */}
              <button
                onClick={handleQuerySubmit}
                className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Submit Query 🚀
              </button>

              {/* Response Box */}
              {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md">
                  <p className="font-semibold text-gray-800">Response:</p>
                  <p className="text-sm text-gray-700">{response}</p>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
