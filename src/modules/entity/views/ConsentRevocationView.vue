<template>
  <div class="entity-dashboard">
    <div class="content-header">
      <h1 class="page-title">Revocación de Consentimientos</h1>
    </div>

    <div class="dashboard-content">
      <div class="revocation-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Fecha de Revocación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="revocation in revocations" :key="revocation.id">
              <td>{{ revocation.id }}</td>
              <td>{{ revocation.name }}</td>
              <td>{{ revocation.email }}</td>
              <td>{{ revocation.revocationDate }}</td>
              <td>
                <button class="process-button" @click="processRevocation(revocation.id)">
                  Procesar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const revocations = ref([
  {
    id: 1001,
    name: 'Gabriela Ruiz',
    email: 'gabriela.ruiz@example.com',
    revocationDate: '19 abril 2024'
  },
  {
    id: 1002,
    name: 'Carolina Morales',
    email: 'carolina.morales@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1003,
    name: 'Alejandro Silva',
    email: 'alejandro.silva@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1004,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1005,
    name: 'Andrea Gómez',
    email: 'andrea.gomez@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1006,
    name: 'Francisco Torres',
    email: 'francisco.torres@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1008,
    name: 'Laura Mendoza',
    email: 'laura.mendoza@example.com',
    revocationDate: '14 abril 2024'
  },
  {
    id: 1009,
    name: 'Santiago Ramos',
    email: 'santiago.ramos@example.com',
    revocationDate: '14 abril 2024'
  }
])


const processRevocation = (id: number) => {
  console.log('Processing revocation for ID:', id)
}

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
  margin: 0;
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

.revocation-table {
  margin-bottom: 30px;
  overflow-x: auto;
}

.revocation-table table {
  width: 100%;
  border-collapse: collapse;
}

.revocation-table th,
.revocation-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.revocation-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.revocation-table td {
  font-size: 14px;
  color: #6b7280;
}

.process-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.process-button:hover {
  background: #2563eb;
}

.selected-consents {
  margin-bottom: 30px;
}

.section-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.column-headers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.consent-rows {
  border: 1px solid #e5e7eb;
  border-top: none;
}

.consent-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.consent-row:last-child {
  border-bottom: none;
}

.consent-data {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.activo {
  background: #dcfce7;
  color: #166534;
}

.action-button {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.action-button:hover {
  background: #f3f4f6;
  color: #374151;
}

.action-buttons {
  margin-top: 30px;
}

.info-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: linear-gradient(21deg, rgb(186, 45, 125) 0%, rgb(186, 45, 125) 100%);
  border-radius: 6px;
}

.info-icon {
  font-size: 16px;
}

.info-item span {
  font-size: 12px;
  color: white;
  flex: 1;
}

.download-btn {
  background: white;
  color: rgb(186, 45, 125);
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.download-btn:hover {
  background: #f9fafb;
}

@media (max-width: 768px) {

  .section-header,
  .consent-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .column-headers,
  .consent-data {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .info-buttons {
    grid-template-columns: 1fr;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>