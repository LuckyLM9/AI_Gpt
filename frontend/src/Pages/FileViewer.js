
import React, { useState } from 'react';
import './FileViewer.css';
import Navbar from '../components/Navbar';
 function FileViewer() {
  const [fileContent, setFileContent] = useState('');
   const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
     reader.onload = (e) => {
      const content = e.target.result;
      setFileContent(content);
    };
     reader.readAsText(file);
  };
   const handleSaveContent = () => {
    const element = document.createElement('a');
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'modified_file.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
   return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Carica e Modifica File</h2>
        <input type="file" accept=".doc,.docx,.txt" onChange={handleFileUpload} />
        <form>
          <textarea
            className="white-text"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
            rows={10}
            cols={50}
          />
        </form>
        <button className="button" onClick={handleSaveContent}>Salva sul computer</button>
      </div>
    </>
  );
}
 export default FileViewer;