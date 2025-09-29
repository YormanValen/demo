<template>
  <div class="entity-dashboard">
    <div class="content-header">
      <h1 class="page-title">Reportes Analíticos</h1>
        <div class="date-range">
          <span>Fecha inicial: 2025-09-01</span>
          <span>Experian CaaS (EXPERIAN)</span>
          <span>Fecha Final: 2025-09-26</span>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="analytics-section">
          <h2 class="section-title">Estado final transacciones</h2>
          
          <div class="chart-container">
            <div class="pie-chart">
              <svg width="300" height="300" viewBox="0 0 300 300">
                <!-- Pie chart segments -->
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="60"
                  stroke-dasharray="188.4 376.8"
                  stroke-dashoffset="0"
                  transform="rotate(-90 150 150)"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#ef4444"
                  stroke-width="60"
                  stroke-dasharray="113.04 376.8"
                  stroke-dashoffset="-188.4"
                  transform="rotate(-90 150 150)"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="#3b82f6"
                  stroke-width="60"
                  stroke-dasharray="75.36 376.8"
                  stroke-dashoffset="-301.44"
                  transform="rotate(-90 150 150)"
                />
              </svg>
              <div class="chart-center">
                <div class="center-text">
                  <div class="percentage">50%</div>
                  <div class="label">FINALIZADO</div>
                </div>
              </div>
            </div>
            
            <div class="chart-legend">
              <div class="legend-item">
                <div class="legend-color blue"></div>
                <span>CANCELADO</span>
                <span class="percentage">31.8%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color red"></div>
                <span>EN PROCESO</span>
                <span class="percentage">18.2%</span>
              </div>
              <div class="legend-item">
                <div class="legend-color orange"></div>
                <span>FINALIZADO</span>
                <span class="percentage">50%</span>
              </div>
            </div>
          </div>
          
          <div class="status-definitions">
            <div class="definition-item">
              <span class="status-label canceled">CANCELADO:</span>
              <span>corresponde a las transacciones que se cancelaron y no finalizaron su proceso</span>
            </div>
            <div class="definition-item">
              <span class="status-label processing">PROCESO:</span>
              <span>corresponde a las transacciones que se encuentran en un proceso</span>
            </div>
            <div class="definition-item">
              <span class="status-label completed">FINALIZADO:</span>
              <span>corresponde a las transacciones que se concluyeron de forma exitosa</span>
            </div>
          </div>
          
          <div class="chart-type-selector">
            <div class="selector-item">
              <span>Tipo de gráfica</span>
              <span>Gráfica de torta</span>
              <button class="return-btn">Volver</button>
            </div>
          </div>
        </div>

        <div class="charts-grid">
          <div class="chart-card">
            <h3>Estado de consentimiento</h3>
            <p>(solicitado, en proceso, otorgados, revocados, no vigentes)</p>
            <div class="chart-placeholder">
              <div class="mini-pie-chart">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="#3b82f6" stroke="white" stroke-width="2"/>
                  <path d="M 60,60 L 60,10 A 50,50 0 0,1 95,30 z" fill="#ef4444" stroke="white" stroke-width="2"/>
                  <path d="M 60,60 L 95,30 A 50,50 0 0,1 110,60 z" fill="#f59e0b" stroke="white" stroke-width="2"/>
                  <path d="M 60,60 L 110,60 A 50,50 0 0,1 95,90 z" fill="#10b981" stroke="white" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div class="chart-card">
            <h3>Ingresos mensuales</h3>
            <div class="chart-placeholder">
              <div class="bar-chart">
                <div class="bar" style="height: 60%"></div>
                <div class="bar" style="height: 80%"></div>
                <div class="bar" style="height: 40%"></div>
                <div class="bar" style="height: 70%"></div>
                <div class="bar" style="height: 90%"></div>
                <div class="bar" style="height: 50%"></div>
              </div>
            </div>
          </div>
          
          <div class="chart-card">
            <h3>Próximos a vencerse</h3>
            <div class="chart-placeholder">
              <div class="line-chart">
                <svg width="200" height="100" viewBox="0 0 200 100">
                  <polyline
                    points="10,80 50,60 90,40 130,30 170,20"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-width="3"
                  />
                  <circle cx="10" cy="80" r="3" fill="#3b82f6"/>
                  <circle cx="50" cy="60" r="3" fill="#3b82f6"/>
                  <circle cx="90" cy="40" r="3" fill="#3b82f6"/>
                  <circle cx="130" cy="30" r="3" fill="#3b82f6"/>
                  <circle cx="170" cy="20" r="3" fill="#3b82f6"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.entity-dashboard {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.content-header {
  margin-bottom: 30px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 10px 0;
}

.date-range {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #6b7280;
}

.dashboard-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.analytics-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 30px;
}

.chart-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;
}

.pie-chart {
  position: relative;
  width: 300px;
  height: 300px;
}

.chart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-text .percentage {
  font-size: 36px;
  font-weight: bold;
  color: #1f2937;
}

.center-text .label {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.legend-color.blue {
  background: #3b82f6;
}

.legend-color.red {
  background: #ef4444;
}

.legend-color.orange {
  background: #f59e0b;
}

.legend-item .percentage {
  margin-left: auto;
  font-weight: 600;
  color: #1f2937;
}

.status-definitions {
  background: #dcfce7;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.definition-item {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
}

.definition-item:last-child {
  margin-bottom: 0;
}

.status-label {
  font-weight: 600;
  min-width: 100px;
}

.status-label.canceled {
  color: #3b82f6;
}

.status-label.processing {
  color: #ef4444;
}

.status-label.completed {
  color: #f59e0b;
}

.chart-type-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f9fafb;
  border-radius: 6px;
}

.selector-item {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: #374151;
}

.return-btn {
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.return-btn:hover {
  opacity: 0.9;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.chart-card {
  background: #f9fafb;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
}

.chart-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 5px 0;
}

.chart-card p {
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 20px 0;
}

.chart-placeholder {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mini-pie-chart {
  width: 120px;
  height: 120px;
}

.bar-chart {
  display: flex;
  align-items: end;
  gap: 8px;
  height: 100px;
}

.bar {
  width: 20px;
  background: linear-gradient(to top, #3b82f6, #60a5fa);
  border-radius: 2px 2px 0 0;
  min-height: 10px;
}

.line-chart {
  width: 200px;
  height: 100px;
}

@media (max-width: 1024px) {
  .chart-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .date-range {
    flex-direction: column;
    gap: 5px;
  }
  
  .chart-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .pie-chart {
    width: 250px;
    height: 250px;
    margin: 0 auto;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-type-selector .selector-item {
    flex-direction: column;
    gap: 10px;
  }
}
</style>