import logo from './logo.svg';
import './App.css';
import Input from './Page';
import ResultDisplay from './ResultDisplay';

function App() {
  var test;
  const handleInputSubmit = async (value) => {
    console.log('Submitted value:', value);
    const data = {
      url : value
    }
    const response = await fetch('http://localhost:4000/url', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
    const responseJson = await response.json();
    test = responseJson.shortUrl;
  }

  return (
    <div className="App">
      <div style={{ padding: '20px' }}>
        <Input onSubmit={handleInputSubmit}></Input>
        <ResultDisplay shortUrl={test}></ResultDisplay>
      </div>

    </div>
  );
}

export default App;
