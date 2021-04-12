import React, {useState} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'

const Steam = () => {
  
  const [data,setData]=useState(null)
  const [output,setOutput]=useState(null)

  function getData(val)
  {
    setData(val.target.value)
  }
  function queryData()
  {
    axios.get(`http://localhost:5000/api/app/${data}`).then(res => {
      console.log(res.data);
      setOutput(res.data);
    })
  }
    return (
      <div className="App">
        <header className="App-header">
        <div>
          <h1>Testing REST API on Steam Page</h1>
          <p>Enter an App ID to get App Name</p>
          <h2>{data}</h2>
          <input type="text" onChange={(e) => getData(e)} />
          <p></p>
          <Button variant="contained" color="secondary" onClick={() => queryData()} >Click To Query</Button>
          <h2>{output}</h2>
        </div>
        </header>
      </div>
       
    );
}
 
export default Steam;