function Home({ onNavigate }) {
  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">🚌 SmartVan</h1>
      <p className="text-center text-muted">Sistema de Transporte Escolar</p>
      
      <div className="text-center mt-4">
        <button 
          className="btn btn-success me-3"
          onClick={() => onNavigate('login')}
        >
          Entrar
        </button>
        
        <button 
          className="btn btn-outline-warning"
          onClick={() => onNavigate('register')}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Home;