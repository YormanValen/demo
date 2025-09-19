<script setup lang="ts">
const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  confirm: [];
  close: [];
}>();

const handleConfirm = () => {
  emit("confirm");
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <v-dialog v-model="props.show" width="400px" persistent>
    <v-card class="disconnect-modal">
      <v-icon class="close-icon" @click="handleClose">mdi-close</v-icon>

      <v-card-title class="modal-title">
        <span>¿Estás seguro que quieres desconectar esta institución?</span>
      </v-card-title>

      <v-divider class="modal-divider" color="#01113e"></v-divider>

      <v-card-text class="modal-content">
        <p class="primary-text">
          Al realizarlo se dejarán de sincronizar tus datos financieros.
        </p>
        <p class="secondary-text">
          Podrás volver a conectar tu institución cuando lo necesites
        </p>
      </v-card-text>

      <v-card-actions class="modal-actions">
        <button class="confirm-button" @click="handleConfirm">
          Sí, desconectar
        </button>
        <button class="cancel-button" @click="handleClose">Volver</button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.disconnect-modal {
  width: 400px;
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
  border-radius: 16px !important;
}

.modal-divider {
  height: 1px;
  background-color: #01113e;
}

.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 16px !important;
  text-wrap: wrap;
  text-align: center;
  margin-top: 16px;
  padding: 16px 40px;
  color: #01113e;
}

.close-icon {
  position: absolute;
  right: 1vw;
  top: 1vw;
  cursor: pointer;
  color: #666;
}

.modal-content {
  padding: 16px 40px !important;
  color: #01113e;
}

.modal-content .primary-text {
  margin: 0px;
  font-family: "Plus Jakarta Sans", Roboto, sans-serif;
  line-height: 1.5;
  color: rgb(1, 17, 62);
  text-align: center;
  font-size: 14px !important;
  font-weight: 600;
}

.secondary-text {
  margin: 0px;
  font-family: "Plus Jakarta Sans", Roboto, sans-serif;
  line-height: 1.5;
  color: rgb(1, 17, 62);
  text-align: center;
  font-size: 12px !important;
  font-weight: 400 !important;
}

.modal-actions {
  padding: 16px 40px !important;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.confirm-button {
  flex: 1;
  width: 100%;
  border: none;
  background-color: #d32f2f;
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  text-transform: none !important;
  cursor: pointer;
  border-radius: 8px;
}

.cancel-button {
    width: 100%;        
    font-size: 14px;
    padding: 10px 20px;
    border: 1px solid #01113e;
    color: #01113e;
    flex: 1;
    background-color: white;
    text-transform: none !important;
    cursor: pointer;
    border-radius: 8px;
}
</style>
