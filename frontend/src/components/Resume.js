import React, { useState } from 'react';
import axios from 'axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(''); // Upload status state

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);

    setUploadStatus('Uploading...'); // Set status to uploading

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201) {
        setUploadStatus('Upload Successful!');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setUploadStatus('Upload Failed. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload Resume</button>
      </form>
      
      {/* Display the upload status */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ResumeUpload;
