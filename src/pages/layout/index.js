// src/pages/layout/index.js
import React from 'react';
import ExcelViewer from '../components/ExcelViewer';
import ExcelViewerXlsx from '../components/ExcelViewerXlsx';
import ReactFileCiewer from '../components/ReactFileCiewer';

const Layout = () => {
  const excelUrl = 'https://iav-platform-1254257443.cos.ap-nanjing.myqcloud.com/file/ruxuedong_c9402bf2-2465-478e-8cf6-2a371ac56549.xlsx';
  // const excelUrl ='https://blackstone-jy-test-1254257443.cos.ap-guangzhou.myqcloud.com/test/JcmMkSdyPy1vSbvRDsZdq08o62SIDPHS.pdf'
  // const excelUrl = 'https://blackstone-jy-test-1254257443.cos.ap-guangzhou.myqcloud.com/test/WB%20%E9%83%A8%E7%BD%B2%E6%96%87%E6%A1%A3.docx'
  const type = 'excel';
  // const type = 'pdf';
  // const type = 'docx';
  
  console.log("ExcelViewer",ExcelViewer);
  return (
    <div>
      <h1>方案1：xlsx插件预览excel</h1>
      <ExcelViewerXlsx url={excelUrl} />

    <hr/>
      <h1>方案2：react-excel-renderer插件预览excel</h1>
      <ExcelViewer url={excelUrl} />

    <hr/>
    <h1>方案13：react-file-viewer插件</h1>

    <h2>预览excel</h2>
    <ReactFileCiewer url={excelUrl} type={type} />
    <h2>预览pdf或者docx</h2>
    <ReactFileCiewer url={excelUrl} type={type} />

    <hr/>
    {/* <h1>方案2：iframe</h1>

    <iframe src={excelUrl} width="100%" height="500px" title="Excel Preview"></iframe> */}
    </div>
  );
};

export default Layout;