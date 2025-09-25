import React, { useState } from 'react';

function Login({ onBack, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('driver');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password, userType);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
            ← Voltar
          </button>
          
          <h2 className="text-center">Entrar no SmartVan</h2>
          
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

            <button type="submit" className="btn btn-success w-100">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;   