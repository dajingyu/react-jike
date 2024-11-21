// src/components/ExcelViewerXlsx/index.js
import React, { useState } from 'react';
import * as XLSX from 'xlsx/xlsx.mjs';
import { Table } from 'react-bootstrap'; // 可以使用你喜欢的表格库

const ExcelViewerXlsx = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExcelData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      console.log(blob);

      // 将 Blob 转换为 ArrayBuffer
      const arrayBuffer = await new Response(blob).arrayBuffer();
      console.log(arrayBuffer);

      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // 假设我们只处理第一个工作表
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setData(json);
    } catch (error) {
      console.error('Error fetching the file:', error);
      setError('Error fetching the file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchExcelData} disabled={loading}>
        {loading ? 'Loading...' : 'Load Excel'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ExcelViewerXlsx;