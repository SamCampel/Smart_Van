import { useState } from 'react';
import '../styles/auth.css';

function Register({ onBack, onRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
        userType: 'parent',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name_parent: formData.name,
            cpf: formData.cpf,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        };

        onRegister(payload);
    };

    return (
        <div className="page-auth">
            <div className="auth-card">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <button className="btn btn-outline-secondary mb-3 btn-back" onClick={onBack}>
                            ← Voltar
                        </button>

                        <h3 className="auth-title">Cadastrar no RouteGuardian</h3>
                        <p className="auth-subtitle">Crie sua conta!</p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Tipo de Cadastro</label>
                                <select
                                    name="userType"
                                    className="form-select"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    disabled // apenas responsável por enquanto
                                >
                                    <option value="parent">Responsável</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Nome Completo</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">CPF (somente números)</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Telefone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-warning w-100">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;