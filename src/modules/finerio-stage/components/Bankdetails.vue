<script setup lang="ts">

import { ref } from 'vue';
import DisconnectModalConfirmation from './disconnectModalConfirmation.vue';

const props = defineProps<{
  bank: any;
}>();

const emit = defineEmits<{
  disconnectBank: []
}>();

const showDisconnectModal = ref(false);

const handleDisconnectClick = () => {
  showDisconnectModal.value = true;
};

const handleModalConfirm = () => {
  emit("disconnectBank");
  showDisconnectModal.value = false;
};

const handleModalClose = () => {
  showDisconnectModal.value = false;
};

const hasLogo = (bankName: string) => {
  return ['Neodigi Bank', 'TekCredit', 'Flexfinia'].includes(bankName);
};
</script>

<template>
  <div class="bank-details-container-wrapper">
    <div class="bank-details-container">
      <div class="bank-logo-container">
        <div class="bank-logo">
          <div class="logo-container" :class="{ 'has-logo': hasLogo(bank.name) }" :style="!hasLogo(bank.name) ? { backgroundColor: bank.bankColor } : {}">
            <img v-if="bank.name === 'Neodigi Bank'" src="/src/assets/logos/neodigi-bank-logo.png" alt="Neodigi Bank" class="bank-logo-image" />
            <img v-else-if="bank.name === 'TekCredit'" src="/src/assets/logos/tekcredit-logo.png" alt="TekCredit" class="bank-logo-image" />
            <img v-else-if="bank.name === 'Flexfinia'" src="/src/assets/logos/flexfinia-logo.png" alt="Flexfinia" class="bank-logo-image" />
            <span v-else class="bank-initials">{{ bank.bankInitials || bank.name?.charAt(0) || '?' }}</span>
          </div>
        </div>
        <div class="bank-name">
          <h3>{{ props.bank.name }}</h3>
        </div>
      </div>

      <div class="conection-details-container">
        <div class="title">
          <span>Detalles de la conexión</span>
        </div>

        <div class="details">
          <div class="state">
            <span>Estado</span>
            <v-chip
              :color="props.bank.status === 'CONECTADO' ? 'success' : 'error'"
              >{{ props.bank.status }}</v-chip
            >
          </div>

          <div class="initial-date">
            <span>Fecha de inicio</span>
            <span>{{ props.bank.initialDate }}</span>
          </div>

          <div class="expiration-date">
            <span>Fecha de expiración</span>
            <span>{{ props.bank.expirationDate }}</span>
          </div>
        </div>

        <div class="data-access-container">
          <div class="title">
            <span>Datos a los que se tiene acceso</span>
          </div>

          <div class="personal-data-container">
            <div class="personal-data-title">
              <v-icon size="17">mdi-card-account-details-outline</v-icon>
              <h4 class="">Datos personales</h4>
            </div>

            <div class="personal-data-content">
              <span
                >Incluye información básica para identificarte de manera única
                como:</span
              >

              <ul>
                <li><span>Nombre completo.</span></li>
                <li>
                  <span>Tipo de identificación personal (DNI, pasaporte).</span>
                </li>
                <li><span>Número de identificación.</span></li>
                <li>
                  <span
                    >Otros datos relevantes que puedan ser requeridos según el
                    propósito del servicio.</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <div class="account-data-container">
            <div class="account-data-title">
              <v-icon size="17">mdi-wallet-outline</v-icon>
              <h4 class="">Cuentas</h4>
            </div>

            <div class="account-data-content">
              <span
                >Acceso a la información relacionada con tus cuentas bancarias,
                incluyendo:</span
              >

              <ul>
                <li><span>Número de cuenta.</span></li>
                <li><span>Saldos disponibles y promedio.</span></li>
                <li>
                  <span
                    >Tipos de cuenta (ahorros, corriente, entre otros).</span
                  >
                </li>
                <li>
                  <span
                    >Detalles de prestamos asociados, como montos pendientes y
                    fechas de pago.</span
                  >
                </li>
                <li><span>Otra información vinculada a tus cuentas.</span></li>
              </ul>
            </div>
          </div>

          <div class="transaction-data-container">
            <div class="transaction-data-title">
              <v-icon size="17">mdi-receipt-text-outline</v-icon>
              <h4 class="">Transacciones</h4>
            </div>

            <div class="transaction-data-content">
              <span
                >Detalles de los detalles de tus movimientos financieros para un
                análisis más completo, tales como:</span
              >

              <ul>
                <li><span>Transacciones de pago realizadas.</span></li>
                <li>
                  <span>Fecha, monto y descripción de cada operación.</span>
                </li>
                <li>
                  <span>Identificación del emisor o receptor del pago.</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="share-plazos-container">
            <div class="share-plazos-title">
              <v-icon size="17">mdi-calendar-range</v-icon>
              <h4 class="">Plazos a compartir</h4>
            </div>

            <div class="share-plazos-content">
              <span
                >Tus datos serán compartidos durante un periodo de 12 meses,
                salvo que decidas revocar la autorización y cancelar la conexión
                antes de dicho plazo.</span
              >
            </div>
          </div>
        </div>

        <div class="utilization-data-container">
          <div class="title">
            <span>Modo que se utilizarán los datos</span>
          </div>

          <div class="finalidad-data-container">
            <div class="finalidad-data-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#01113E"
              >
                <path
                  d="M400-320q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm-40-120v-280h80v280h-80Zm-140 0v-200h80v200h-80Zm280 0v-160h80v160h-80ZM824-80 597-307q-41 32-91 49.5T400-240q-134 0-227-93T80-560q0-134 93-227t227-93q134 0 227 93t93 227q0 56-17.5 106T653-363l227 227-56 56Z"
                ></path>
              </svg>
              <h4 class="">Finalidad</h4>
            </div>

            <div class="finalidad-data-content">
              <span
                >Los datos serán utilizados para la gestión de tus finanzas de
                manera integral: desde el seguimiento de ingresos y gastos, la
                categorización de transacciones, el análisis de consumo, hasta
                la creación de presupuestos y otras funciones similares, dentro
                del periodo de vigencia acordado.</span
              >
            </div>
          </div>

          <div class="third-receptor-data-container">
            <div class="processing-data-title">
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeSmall css-13afyex"
                focusable="false"
                aria-hidden="true"
                height="20px"
                width="20px"
                viewBox="0 0 24 24"
                data-testid="SettingsOutlinedIcon"
              >
                <path
                  d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"
                ></path>
              </svg>
              <h4 class="">Procesamiento</h4>
            </div>

            <div class="processing-data-content">
              <span
                >Se recopilarán y procesarán los datos financieros del usuario,
                para ser enviados al tercero encargado de cumplir con la
                finalidad de uso definida.</span
              >
            </div>
          </div>

          <div class="third-receptor-data-container">
            <div class="third-receptor-data-title">
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeSmall css-13afyex"
                focusable="false"
                height="20px"
                width="20px"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="PolylineOutlinedIcon"
              >
                <path
                  d="M15 16v1.26l-6-3v-3.17L11.7 8H16V2h-6v4.9L7.3 10H3v6h5l7 3.5V22h6v-6zM12 4h2v2h-2zM7 14H5v-2h2zm12 6h-2v-2h2z"
                ></path>
              </svg>
              <h4 class="">Tercero receptor de datos</h4>
            </div>

            <div class="processing-data-content">
              <span
                >El tercero receptor será responsable de utilizar la información
                financiera proporcionada exclusivamente para cumplir con la
                finalidad establecida, garantizando el estricto cumplimiento de
                las normativas aplicables.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="buttons-container">
       <button class="disconnect-button" @click="handleDisconnectClick" variant="outlined" color="error">
         <span>Desconectar</span>
       </button>
     </div>

     <DisconnectModalConfirmation
       :show="showDisconnectModal"
       @confirm="handleModalConfirm"
       @close="handleModalClose"
     />
   </div>
</template>

<style scoped>
.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.buttons-container .disconnect-button {
  transition: all 0.2s;
  width: 100%;
  background: transparent;
  border: 1px solid #d32f2f;
  color: #d32f2f;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 14px;
  cursor: pointer;
}

.buttons-container .disconnect-button:hover {
  background: #d32f2f0a;
}

.bank-details-container {
  width: 100%;
  max-height: 80vh; /* altura máxima del 80% del viewport height */
  overflow-y: auto; /* habilita el scroll vertical */
  padding-right: 16px; /* espacio para el scrollbar */
  scrollbar-width: thin; /* scrollbar delgado para Firefox */
}

/* Estilos del scrollbar para Chrome/Safari */
.bank-details-container::-webkit-scrollbar {
  width: 8px;
}

.bank-details-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}

.bank-details-container::-webkit-scrollbar-thumb {
  border-radius: 4px;
}

.bank-logo-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.bank-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.logo-container.has-logo {
  background-color: white;
}

.bank-logo-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.bank-initials {
  color: white;
  font-size: 16px;
  font-weight: 600;
}

.conection-details-container {
  display: flex;
  flex-direction: column;
}

.conection-details-container .title {
  padding-top: 20px;
  padding-bottom: 20px;
}

.conection-details-container .title span {
  font-size: 20px;
  font-weight: 500;
}

.details {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.details span {
  font-size: 13px;
  font-weight: 500;
}

.details div {
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.details .state {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.details .initial-date {
  display: flex;
  justify-content: space-between;
}

.details .expiration-date {
  display: flex;
  justify-content: space-between;
}

.data-access-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.data-access-container .title span,
.utilization-data-container .title span {
  font-size: 20px;
  font-weight: 500;
}

.personal-data-container,
.account-data-container,
.transaction-data-container,
.share-plazos-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.personal-data-title,
.account-data-title,
.transaction-data-title,
.share-plazos-title {
  display: flex;
  gap: 5px;
  align-items: center;
}

.personal-data-title h4,
.account-data-title h4,
.transaction-data-title h4,
.share-plazos-title h4 {
  margin: 0;
  font-weight: bolder;
}

.personal-data-content span,
.account-data-content span,
.transaction-data-content span,
.share-plazos-content span {
  font-size: 12px;
}

.utilization-data-container,
.third-receptor-data-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.finalidad-data-container,
.processing-data-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.finalidad-data-title,
.processing-data-title,
.third-receptor-data-title {
  display: flex;
  gap: 5px;
  align-items: center;
}

.finalidad-data-title h4,
.processing-data-title h4,
.third-receptor-data-title h4 {
  margin: 0;
  font-weight: bolder;
}

.finalidad-data-content span,
.processing-data-content span,
.third-receptor-data-content span {
  font-size: 12px;
}
</style>
