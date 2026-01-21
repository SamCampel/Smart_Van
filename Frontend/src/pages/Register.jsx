import { useState } from 'react';
import '../styles/auth.css';

function Register({ onBack, onRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        cpf: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cpf') {
            const onlyNumbers = value.replace(/\D/g, '').slice(0, 11);
            setFormData({ ...formData, cpf: onlyNumbers });
            setErrors({ ...errors, cpf: '' });
        } else if (name === 'password') {
            setFormData({ ...formData, password: value });
            setErrors({ ...errors, password: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = {};

        if (formData.cpf.length !== 11) {
            newErrors.cpf = 'CPF deve ter exatamente 11 dígitos';
            hasError = true;
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

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
                                <label className="form-label">CPF (11 dígitos, apenas números)</label>
                                <input
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    value={formData.cpf}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.cpf && <small className="text-danger">{errors.cpf}</small>}
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
                                {errors.password && <small className="text-danger">{errors.password}</small>}
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