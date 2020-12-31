import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const username = useFormInput('');
  const password = useFormInput('');

  const [error, setError] = useState(null);

  const handleLogin = () => {

    axios.post('http://localhost:4000/api/v1/login', { username: username.value, password: password.value }).then(response => {
      setError('Correcto');
    }).catch(error => {
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Error");
    });
  }

  return (
    <div className="App">
      
      <h1>Login example</h1>
      <div>
        <div>
          <label htmlFor="user">Usuario</label>
        </div>
        <div>
          <input id="user" type="text" {...username} />
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div>
          <label htmlFor="pass">Contraseña</label>
        </div>
        <div>
          <input id="pass" type="password" {...password} />
        </div>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value='Login' onClick={handleLogin} /><br />
    </div>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange
  };
}

export default App;
