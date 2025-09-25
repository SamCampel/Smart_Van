import { useState } from 'react';

function Register({ onBack, onRegister }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        userType: 'driver'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <button className="btn btn-outline-secondary mb-3" onClick={onBack}>
                        ← Voltar
                    </button>

                    <h2 className="text-center">Cadastrar no SmartVan</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Tipo de Cadastro</label>
                            <select
                                name="userType"
                                className="form-select"
                                value={formData.userType}
                                onChange={handleChange}
                            >
                                <option value="driver">Motorista</option>
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
    );
}

export default Register;