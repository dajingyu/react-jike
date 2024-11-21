// src/components/FileViewer/index.js
import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { Table as AntTable } from 'antd';
import FileViewer from 'react-file-viewer';
// import 'antd/dist/antd.css'; // 引入 Ant Design 的样式

const FileViewerComponent = ({ url, type }) => {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const fetchExcelData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'file.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      if (type === 'excel') {
        ExcelRenderer(file, (err, resp) => {
          if (err) {
            console.error('Error rendering Excel:', err);
            setError('Error rendering Excel file');
          } else {
            setRows(resp.rows);
            setCols(resp.cols);
          }
          setLoading(false);
        });
      } else {
        const urlObject = URL.createObjectURL(blob);
        setFileUrl(urlObject);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching the file:', error);
      setError('Error fetching the file');
      setLoading(false);
    }
  };

  const columns = cols.map((col, index) => ({
    title: col,
    dataIndex: index.toString(),
    key: index.toString(),
  }));

 const dataSource = rows.map((row, rowIndex) => ({
  key: rowIndex.toString(),
  ...row.reduce((acc, cell, cellIndex) => ({ ...acc, [cellIndex.toString()]: cell }), {}),
}));

  return (
    <div>
      <button onClick={fetchExcelData} disabled={loading}>
        {loading ? 'Loading...' : 'Load File'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {type === 'excel' && rows.length > 0 && (
        <AntTable
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 10 }}
          loading={loading}
        />
      )}
      {type !== 'excel' && fileUrl && (
        <FileViewer
          fileType={type}
          filePath={fileUrl}
          onError={(e) => console.log(e)}
        />
      )}
    </div>
  );
};

export default FileViewerComponent;