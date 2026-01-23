import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import API from './services/api';
import PrivateRoute from './routes/PrivateRoute';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function AppRoutes() {
  const navigate = useNavigate();

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
      navigate('/dashboard');
    } catch (error) {
      alert('Erro no login: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleRegister = async (formData) => {
    try {
      const endpoint = formData.userType === 'driver' ? '/drivers' : '/parents';

      const response = await API.post(endpoint, {
        name_parent: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        phone: formData.phone,
        password: formData.password
      });

      alert(`Cadastro realizado : ${response.data.message}`);
      navigate('/login');
    } catch (error) {
      alert('Erro ao se cadastrar: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister} />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;