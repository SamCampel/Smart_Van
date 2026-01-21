import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="page-dashboard">
            <div className="dashboard-card">

                <div className="dashboard-header">
                    <div>
                        <h2 className="dashboard-title">RouteGuardian</h2>
                        <p className="dashboard-subtitle">Monitoramento de rotas escolares</p>
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="metric-card">
                        <span>Motoristas ativos</span>
                        <strong>5</strong>
                    </div>

                    <div className="metric-card">
                        <span>Rotas monitoradas</span>
                        <strong>12</strong>
                    </div>

                    <div className="metric-card">
                        <span>Alertas de segurança</span>
                        <strong>2</strong>
                    </div>
                </div>

                <div className="map-container">
  <iframe
    title="Mapa"
    src="https://www.google.com/maps?q=-23.55052,-46.633309&z=14&output=embed"
    width="100%"
    height="320"
    style={{ border: 0 }}
    loading="lazy"
  />
</div>

<div style={{ marginTop: '12px', textAlign: 'center' }}>
  <strong>Distância estimada:</strong> 6,4 km
</div>

<div style={{ marginTop: '16px', textAlign: 'center' }}>
  <p><strong>Motoristas disponíveis próximos:</strong></p>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li>🚐 Carlos – 1,2 km</li>
    <li>🚐 Ana – 1,8 km</li>
    <li>🚐 Marcos – 2,5 km</li>
  </ul>
</div>



            </div>
        </div>
    );
}

export default Dashboard;
