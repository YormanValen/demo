<template>
  <div class="entity-dashboard">
    <div class="dashboard-content">
      <div class="content-header">
        <h1 class="page-title">Estadísticas</h1>
        <div class="date-range">
          <span>Fecha inicial: 2025-09-01</span>
          <span>Experian CaaS (EXPERIAN)</span>
          <span>Fecha Final: 2025-09-26</span>
        </div>
      </div>
        <div class="analytics-section">
          <h2 class="section-title">Estado final transacciones</h2>
          
          <div class="chart-container">
            <div class="pie-chart loading-chart">
              <svg width="300" height="300" viewBox="0 0 300 300">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                    <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgb(120, 60, 140)" />
                    <stop offset="100%" stop-color="rgb(200, 70, 145)" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="rgb(140, 80, 160)" />
                    <stop offset="100%" stop-color="rgb(220, 95, 165)" />
                  </linearGradient>
                </defs>
                <!-- Pie chart segments -->
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="url(#gradient1)"
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
                  stroke="url(#gradient2)"
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
                  stroke="url(#gradient3)"
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
            
            <div class="chart-legend loading-legend">
              <div class="legend-item loading-item">
                <div class="legend-color blue"></div>
                <span>CANCELADO</span>
                <span class="percentage">31.8%</span>
              </div>
              <div class="legend-item loading-item">
                <div class="legend-color red"></div>
                <span>EN PROCESO</span>
                <span class="percentage">18.2%</span>
              </div>
              <div class="legend-item loading-item">
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
          
        </div>

        <div class="charts-grid">
          <div class="chart-card modern-card">
            <div class="card-header">
              <h3>Estado de consentimiento</h3>
              <p>Distribución actual de consentimientos</p>
            </div>
            <div class="chart-content">
              <div class="consent-pie-chart">
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <defs>
                    <linearGradient id="consentGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                      <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                    </linearGradient>
                    <linearGradient id="consentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(120, 60, 140)" />
                      <stop offset="100%" stop-color="rgb(200, 70, 145)" />
                    </linearGradient>
                    <linearGradient id="consentGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(140, 80, 160)" />
                      <stop offset="100%" stop-color="rgb(220, 95, 165)" />
                    </linearGradient>
                    <linearGradient id="consentGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="rgb(160, 100, 180)" />
                      <stop offset="100%" stop-color="rgb(240, 115, 185)" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="url(#consentGrad1)" stroke="white" stroke-width="3" class="chart-segment"/>
                  <path d="M 100,100 L 100,20 A 80,80 0 0,1 155,45 z" fill="url(#consentGrad2)" stroke="white" stroke-width="3" class="chart-segment"/>
                  <path d="M 100,100 L 155,45 A 80,80 0 0,1 180,100 z" fill="url(#consentGrad3)" stroke="white" stroke-width="3" class="chart-segment"/>
                  <path d="M 100,100 L 180,100 A 80,80 0 0,1 155,155 z" fill="url(#consentGrad4)" stroke="white" stroke-width="3" class="chart-segment"/>
                </svg>
              </div>
              <div class="consent-stats">
                <div class="stat-item">
                  <div class="stat-color" style="background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125))"></div>
                  <div class="stat-info">
                    <span class="stat-label">Solicitado</span>
                    <span class="stat-value">40%</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-color" style="background: linear-gradient(21deg, rgb(120, 60, 140), rgb(200, 70, 145))"></div>
                  <div class="stat-info">
                    <span class="stat-label">En proceso</span>
                    <span class="stat-value">25%</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-color" style="background: linear-gradient(21deg, rgb(140, 80, 160), rgb(220, 95, 165))"></div>
                  <div class="stat-info">
                    <span class="stat-label">Otorgados</span>
                    <span class="stat-value">20%</span>
                  </div>
                </div>
                <div class="stat-item">
                  <div class="stat-color" style="background: linear-gradient(21deg, rgb(160, 100, 180), rgb(240, 115, 185))"></div>
                  <div class="stat-info">
                    <span class="stat-label">Revocados</span>
                    <span class="stat-value">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card modern-card">
            <div class="card-header">
              <h3>Ingresos mensuales</h3>
              <p>Comparativo últimos 6 meses</p>
            </div>
            <div class="chart-content">
              <div class="revenue-chart">
                <div class="revenue-bars">
                  <div class="revenue-bar" data-month="Ene" data-value="$15,200" style="height: 60%"></div>
                  <div class="revenue-bar" data-month="Feb" data-value="$20,400" style="height: 80%"></div>
                  <div class="revenue-bar" data-month="Mar" data-value="$10,100" style="height: 40%"></div>
                  <div class="revenue-bar" data-month="Abr" data-value="$17,800" style="height: 70%"></div>
                  <div class="revenue-bar" data-month="May" data-value="$22,900" style="height: 90%"></div>
                  <div class="revenue-bar" data-month="Jun" data-value="$12,700" style="height: 50%"></div>
                </div>
                <div class="revenue-labels">
                  <span>Ene</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Abr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
              <div class="revenue-summary">
                <div class="summary-item">
                  <span class="summary-label">Promedio</span>
                  <span class="summary-value">$16,500</span>
                </div>
                <div class="summary-item">
                  <span class="summary-label">Mejor mes</span>
                  <span class="summary-value">Mayo</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card modern-card">
            <div class="card-header">
              <h3>Próximos a vencerse</h3>
              <p>Consentimientos que vencen en 30 días</p>
            </div>
            <div class="chart-content">
              <div class="expiry-chart">
                <div class="expiry-number">
                  <span class="big-number">1,247</span>
                  <span class="number-label">Por vencer</span>
                </div>
                <div class="expiry-trend">
                  <svg width="300" height="80" viewBox="0 0 300 80">
                    <defs>
                      <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgb(97, 40, 120)" />
                        <stop offset="100%" stop-color="rgb(186, 45, 125)" />
                      </linearGradient>
                      <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="rgba(186, 45, 125, 0.3)" />
                        <stop offset="100%" stop-color="rgba(186, 45, 125, 0.05)" />
                      </linearGradient>
                    </defs>
                    <path d="M 20,60 Q 70,40 120,35 T 220,20 L 280,15 L 280,70 L 20,70 Z" fill="url(#areaGrad)" class="trend-area"/>
                    <path d="M 20,60 Q 70,40 120,35 T 220,20 L 280,15" fill="none" stroke="url(#trendGrad)" stroke-width="3" class="trend-line"/>
                    <circle cx="20" cy="60" r="4" fill="url(#trendGrad)" class="trend-point"/>
                    <circle cx="70" cy="45" r="4" fill="url(#trendGrad)" class="trend-point"/>
                    <circle cx="120" cy="35" r="4" fill="url(#trendGrad)" class="trend-point"/>
                    <circle cx="170" cy="28" r="4" fill="url(#trendGrad)" class="trend-point"/>
                    <circle cx="220" cy="20" r="4" fill="url(#trendGrad)" class="trend-point"/>
                    <circle cx="280" cy="15" r="4" fill="url(#trendGrad)" class="trend-point"/>
                  </svg>
                </div>
              </div>
              <div class="expiry-details">
                <div class="detail-item urgent">
                  <span class="detail-number">89</span>
                  <span class="detail-label">Esta semana</span>
                </div>
                <div class="detail-item warning">
                  <span class="detail-number">234</span>
                  <span class="detail-label">Próximos 7 días</span>
                </div>
              </div>
            </div>
          </div>

          <div class="chart-card modern-card">
            <div class="card-header">
              <h3>Actividad reciente</h3>
              <p>Transacciones de las últimas 24 horas</p>
            </div>
            <div class="chart-content">
              <div class="activity-metrics">
                <div class="metric-item">
                  <div class="metric-icon">
                    <div class="pulse-dot"></div>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">2,847</span>
                    <span class="metric-label">Transacciones</span>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon">
                    <div class="success-dot"></div>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">98.2%</span>
                    <span class="metric-label">Tasa de éxito</span>
                  </div>
                </div>
                <div class="metric-item">
                  <div class="metric-icon">
                    <div class="warning-dot"></div>
                  </div>
                  <div class="metric-info">
                    <span class="metric-value">51</span>
                    <span class="metric-label">Errores</span>
                  </div>
                </div>
              </div>
              <div class="activity-chart">
                <div class="activity-bars">
                  <div class="activity-bar" style="height: 30%"></div>
                  <div class="activity-bar" style="height: 60%"></div>
                  <div class="activity-bar" style="height: 45%"></div>
                  <div class="activity-bar" style="height: 80%"></div>
                  <div class="activity-bar" style="height: 65%"></div>
                  <div class="activity-bar" style="height: 90%"></div>
                  <div class="activity-bar" style="height: 75%"></div>
                  <div class="activity-bar" style="height: 55%"></div>
                </div>
                <div class="activity-timeline">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                </div>
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
  max-width: 1400px;
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
  max-width: 1400px;
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
  background: linear-gradient(21deg, rgb(140, 80, 160) 0%, rgb(220, 95, 165) 100%);
}

.legend-color.red {
  background: linear-gradient(21deg, rgb(120, 60, 140) 0%, rgb(200, 70, 145) 100%);
}

.legend-color.orange {
  background: linear-gradient(21deg, rgb(97, 40, 120) 0%, rgb(186, 45, 125) 100%);
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
  color: rgb(140, 80, 160);
}

.status-label.processing {
  color: rgb(120, 60, 140);
}

.status-label.completed {
  color: rgb(97, 40, 120);
}


.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
}

@media (max-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.modern-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(186, 45, 125, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.modern-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(186, 45, 125, 0.15);
}

.card-header {
  margin-bottom: 20px;
  text-align: left;
}

.card-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.card-header p {
  font-size: 13px;
  color: #6b7280;
  margin: 0;
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Consent Chart Styles */
.consent-pie-chart {
  display: flex;
  justify-content: center;
}

.consent-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.stat-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.stat-label {
  font-size: 14px;
  color: #374151;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

/* Revenue Chart Styles */
.revenue-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.revenue-bars {
  display: flex;
  align-items: end;
  gap: 12px;
  height: 120px;
  padding: 0 8px;
}

.revenue-bar {
  flex: 1;
  background: linear-gradient(to top, rgb(97, 40, 120), rgb(186, 45, 125));
  border-radius: 4px 4px 0 0;
  min-height: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.revenue-bar:hover {
  filter: brightness(1.1);
  transform: scale(1.05);
}

.revenue-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
  padding: 0 8px;
}

.revenue-summary {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.summary-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.summary-value {
  font-size: 16px;
  font-weight: 600;
  color: rgb(97, 40, 120);
}

/* Expiry Chart Styles */
.expiry-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.expiry-number {
  text-align: center;
}

.big-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.number-label {
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

.expiry-details {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex: 1;
  padding: 12px;
  border-radius: 8px;
}

.detail-item.urgent {
  background: rgba(239, 68, 68, 0.1);
}

.detail-item.warning {
  background: rgba(245, 158, 11, 0.1);
}

.detail-number {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.detail-label {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
}

/* Activity Chart Styles */
.activity-metrics {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.metric-icon {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}

.pulse-dot {
  width: 100%;
  height: 100%;
  background: linear-gradient(21deg, rgb(97, 40, 120), rgb(186, 45, 125));
  border-radius: 50%;
}

.success-dot {
  background: #10b981;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.warning-dot {
  background: #f59e0b;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.metric-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.metric-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.metric-label {
  font-size: 13px;
  color: #6b7280;
}

.activity-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-bars {
  display: flex;
  align-items: end;
  gap: 6px;
  height: 60px;
}

.activity-bar {
  flex: 1;
  background: linear-gradient(to top, rgba(97, 40, 120, 0.7), rgba(186, 45, 125, 0.9));
  border-radius: 2px 2px 0 0;
  min-height: 4px;
}

.activity-timeline {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #9ca3af;
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

/* Modern animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.8) rotate(-10deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(186, 45, 125, 0.2);
  }
  50% {
    box-shadow: 0 0 20px rgba(186, 45, 125, 0.4), 0 0 30px rgba(186, 45, 125, 0.1);
  }
}

@keyframes countUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modern-card {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.modern-card:nth-child(1) { animation-delay: 0.1s; }
.modern-card:nth-child(2) { animation-delay: 0.2s; }
.modern-card:nth-child(3) { animation-delay: 0.3s; }
.modern-card:nth-child(4) { animation-delay: 0.4s; }

.chart-segment {
  animation: popIn 0.8s ease-out;
  animation-fill-mode: both;
}

.chart-segment:nth-child(2) { animation-delay: 0.6s; }
.chart-segment:nth-child(3) { animation-delay: 0.8s; }
.chart-segment:nth-child(4) { animation-delay: 1.0s; }
.chart-segment:nth-child(5) { animation-delay: 1.2s; }

.revenue-bar {
  animation: scaleIn 0.7s ease-out;
  animation-fill-mode: both;
  transform-origin: bottom;
}

.revenue-bar:nth-child(1) { animation-delay: 0.7s; }
.revenue-bar:nth-child(2) { animation-delay: 0.8s; }
.revenue-bar:nth-child(3) { animation-delay: 0.9s; }
.revenue-bar:nth-child(4) { animation-delay: 1.0s; }
.revenue-bar:nth-child(5) { animation-delay: 1.1s; }
.revenue-bar:nth-child(6) { animation-delay: 1.2s; }

.trend-area {
  animation: scaleIn 1s ease-out 0.8s both;
  transform-origin: bottom left;
}

.trend-line {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: drawPath 1.5s ease-out 1s both;
}

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

.trend-point {
  animation: popIn 0.4s ease-out both;
}

.trend-point:nth-child(4) { animation-delay: 1.3s; }
.trend-point:nth-child(5) { animation-delay: 1.4s; }
.trend-point:nth-child(6) { animation-delay: 1.5s; }
.trend-point:nth-child(7) { animation-delay: 1.6s; }
.trend-point:nth-child(8) { animation-delay: 1.7s; }
.trend-point:nth-child(9) { animation-delay: 1.8s; }

.big-number {
  animation: countUp 0.8s ease-out 0.5s both;
}

.pulse-dot {
  animation: pulse 2s ease-in-out infinite;
}

.activity-bar {
  animation: scaleIn 0.5s ease-out both;
  transform-origin: bottom;
}

.activity-bar:nth-child(1) { animation-delay: 0.9s; }
.activity-bar:nth-child(2) { animation-delay: 1.0s; }
.activity-bar:nth-child(3) { animation-delay: 1.1s; }
.activity-bar:nth-child(4) { animation-delay: 1.2s; }
.activity-bar:nth-child(5) { animation-delay: 1.3s; }
.activity-bar:nth-child(6) { animation-delay: 1.4s; }
.activity-bar:nth-child(7) { animation-delay: 1.5s; }
.activity-bar:nth-child(8) { animation-delay: 1.6s; }

.stat-item {
  animation: slideInUp 0.5s ease-out both;
}

.stat-item:nth-child(1) { animation-delay: 1.4s; }
.stat-item:nth-child(2) { animation-delay: 1.5s; }
.stat-item:nth-child(3) { animation-delay: 1.6s; }
.stat-item:nth-child(4) { animation-delay: 1.7s; }

</style>