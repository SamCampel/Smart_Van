import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import API from './services/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = async (email, password, userType) => {
    try {
      const response = await API.post('/login', {
        email,
        password,
        userType
      });

      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));

      alert(`Login realizado como ${response.data.data.user.name}`);

      setCurrentPage('dashboard');

    } catch (error) {
      alert('Erro no login: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegister = async (formData) => {
    try {
      const endpoint = formData.userType === 'driver' ? '/drivers' : '/parents';

      const response = await API.post(endpoint, {
        name_driver: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        password: formData.password
      });


      alert(`Cadastro realizado : ${response.data.message}`);

      setCurrentPage('login');
    } catch (error) {
      alert('Erro ao se cadastrar: ' + (error.response?.data?.message || error.message));
    }

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