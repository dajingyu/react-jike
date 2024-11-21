// src/pages/components/pdfView/index.js
import React, { useState } from 'react';
import FileViewer from 'react-file-viewer';

const PdfViewer = ({ url }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPdf = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
      setFileUrl(urlObject);
    } catch (error) {
      console.error('Error fetching the PDF:', error);
      setError('Error fetching the PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPdf} disabled={loading}>
        {loading ? 'Loading...' : 'Load PDF'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fileUrl && (
        <FileViewer
          fileType="pdf"
          filePath={fileUrl}
          onError={(e) => console.log(e)}
        />
      )}
    </div>
  );
};

export default PdfViewer;