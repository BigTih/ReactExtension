import React, { useState } from 'react';
import './App.css'; // Adjust the CSS file as needed

function App() {
  const [url, setUrl] = useState(''); // State to hold the URL input by the user
  const [report, setReport] = useState(''); // State to hold the response from the backend
  const [generatingReport, setGeneratingReport] = useState(false);

  // Function to handle sending the URL to the Flask backend
  const handleSendUrl = () => {
    setGeneratingReport(true);
    fetch('http://127.0.0.1:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setReport(data); // Update the state with the response data
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <div className="body-content">
      {!generatingReport ? (
        <div className='left-side'>
          <h1>Welcome to Bias Detector</h1>
          <p>Analyze an article and receive a report of detected bias</p>
          <button className='startbutton' onClick={handleSendUrl}>Get Started</button>
        </div>
        ) : (
          // This is the content shown when generatingReport is true
          <div className='left-side'>
            <h1>Generating Report</h1>
            {report && <div>{JSON.stringify(report)}</div>}
          </div>
        )}
      </div>  
    </div>
  );
}

export default App;
