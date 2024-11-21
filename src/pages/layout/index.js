// src/pages/layout/index.js
import React from 'react';
import ExcelViewer from '../components/ExcelViewer';
import ExcelViewerXlsx from '../components/ExcelViewerXlsx';
import ReactFileCiewer from '../components/ReactFileCiewer';

const Layout = () => {
  const excelUrl = 'https://iav-platform-1254257443.cos.ap-nanjing.myqcloud.com/file/ruxuedong_c9402bf2-2465-478e-8cf6-2a371ac56549.xlsx';

  const type = 'excel';
  console.log("ExcelViewer",ExcelViewer);
  return (
    <div>
      <h1>方案1：xlsx插件预览excel</h1>
      <ExcelViewerXlsx url={excelUrl} />

    <hr/>
      <h1>方案1：react-excel-renderer插件预览excel</h1>
      <ExcelViewer url={excelUrl} />

    <hr/>
    <h1>方案1：react-file-viewer插件预览excel</h1>
      <ReactFileCiewer url={excelUrl} type={type} />

    <hr/>
    <h1>方案2：iframe</h1>

    <iframe src={excelUrl} width="100%" height="500px" title="Excel Preview"></iframe>
    </div>
  );
};

export default Layout;