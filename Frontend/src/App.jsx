import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email, password, userType) => {
    console.log('Login attempt:', { email, userType });
    alert(`Login realizado como ${userType}: ${email}`);
  }

  const handleRegister = (formData) => {
    console.log('Cadastrando:', formData);
    alert(`Cadastro simulado: ${formData.name} como ${formData.userType}`);
  };

  return (
    <div>
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'login' && (
        <Login
          onBack={() => handleNavigate('home')}
          onLogin={handleLogin}
        />
      )}
      {currentPage === 'register' && (
        <Register
          onBack={() => handleNavigate('home')}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

export default App;