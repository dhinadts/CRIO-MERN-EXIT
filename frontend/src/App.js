import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ResignationForm from './components/Employee/ResignationForm';
import ExitInterview from './components/Employee/ExitInterview';
import ResignationList from './components/Admin/ResignationList';
import ExitResponses from './components/Admin/ExitResponses';

function App() {
  const [role, setRole] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setRole(null);
  };

  if (!role) {
    return (
      <div>
        {showRegister ? <Register /> : <Login setRole={setRole} />}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? "Back to Login" : "Register"}
        </button>
      </div>
    );
  }

  if (role === 'Employee') {
    return (
      <div>
        <button onClick={logout}>Logout</button>
        <ResignationForm />
        <ExitInterview />
      </div>
    );
  }

  if (role === 'HR') {
    return (
      <div>
        <button onClick={logout}>Logout</button>
        <ResignationList />
        <ExitResponses />
      </div>
    );
  }

  return <h2>Unknown role</h2>;
}

export default App;
