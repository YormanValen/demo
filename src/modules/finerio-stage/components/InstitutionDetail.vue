<template>
  <div class="connected-accounts">
    <div class="accounts-content">
      <div class="header-section">
        <button class="back-button" @click="handleBack">
          <v-icon size="24" color="#001340">mdi-arrow-left</v-icon>
        </button>
      </div>

      <bank-details 
        v-if="institutionsStore.connectedInstitutions.length > 0" 
        :bank="institutionsStore.connectedInstitutions[0]" 
        @disconnectBank="() => handleDisconnectBank(institutionsStore.connectedInstitutions[0].id)" />
      <div v-else class="no-institutions">
        <p>No hay entidades conectadas</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useInstitutionsStore } from "../../financial/stores/institutions.store";
import BankDetails from "../components/Bankdetails.vue";
const router = useRouter();
const institutionsStore = useInstitutionsStore();


const handleDisconnectBank = (bankId: number) => {
  institutionsStore.removeInstitution(bankId);
  router.push("/financial/connected-accounts");
};

const handleBack = () => {
  router.push("/financial/connected-accounts");
};


</script>

<style scoped>
.connected-accounts {
  min-height: 100vh;
  width: 100vw;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}

.accounts-content {
  display: flex;
  align-items: flex-start;
  gap: 1.5vw;
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  width: 100%;
}

.header-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #f1f5f9;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #001340;
  margin: 0;
}

.no-institutions {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  font-size: 16px;
}
</style>
