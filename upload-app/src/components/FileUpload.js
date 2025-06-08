import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload-file",
        formData
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Upload an Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && (
        <div>
          <h3>Prediction Result:</h3>
          <p>
            <strong>Filename:</strong> {response.filename}
          </p>
          <p>
            <strong>Label:</strong> {response.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
