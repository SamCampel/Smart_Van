import React, { useState } from 'react';
import '../styles/auth.css';

function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('driver');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, userType);
  };

  return (
  <div className="page-auth">
    <div className="auth-card">

      <button
        className="btn btn-outline-secondary mb-3 btn-back"
        onClick={onBack}
      >
        ← Voltar
      </button>

      <h2 className="auth-title">Entrar no RouteGuardian</h2>
      <p className="auth-subtitle">Acesse sua conta</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de Usuário</label>
          <select
            className="form-select"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="driver">Motorista</option>
            <option value="parent">Responsável</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success btn-main w-100">
          Entrar
        </button>
      </form>

    </div>
  </div>
);

}

export default Login;   