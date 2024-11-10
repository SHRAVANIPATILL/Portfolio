import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ResumeDisplay({ filename }) {
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    if (filename) {
      setFileUrl(`/file/${filename}`);
    }
  }, [filename]);

  return (
    <div>
      <h2>View Resume</h2>
      {fileUrl ? (
        <iframe src={fileUrl} width="100%" height="600px" title="Resume"></iframe>
      ) : (
        <p>No resume available</p>
      )}
    </div>
  );
}

export default ResumeDisplay;
