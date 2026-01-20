import '../styles/auth.css';

function Home({ onNavigate }) {
  return (
    <div className="page-auth">
      <div className="auth-card text-center">

        <h1 className="text-primary text-center">RouteGuardian</h1>
        <p className="text-center text-muted">Serviços de Transporte Escolar</p>

        <div className="text-center mt-4">
          <button
            className="btn btn-success btn-main me-3"
            onClick={() => onNavigate('login')}
          >
            Entrar
          </button>

          <button
            className="btn btn-outline-warning btn-main"
            onClick={() => onNavigate('register')}
          >
            Cadastrar
          </button>
        </div>
      </div>

    </div>
  );
}

export default Home;