<template>
  <div v-if="show" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Verificación de Código</h3>
        <button class="close-button" @click="closeModal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="phone-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
            <path fill-rule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3h6.75c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <p class="otp-message">
          Hemos enviado un código de verificación al número:
        </p>
        <p class="phone-number">XXXX{{ maskedPhone }}</p>
        
        <div class="otp-inputs">
          <input 
            v-for="(_, index) in otpDigits" 
            :key="index"
            v-model="otpDigits[index]"
            :ref="el => otpInputs[index] = el as HTMLInputElement"
            type="text"
            maxlength="1"
            class="otp-input"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @paste="handlePaste"
          />
        </div>
        
        <div v-if="error" class="error-message">
          Código incorrecto. Inténtalo de nuevo.
        </div>
        
        <div v-if="success" class="success-message">
          ¡Código verificado correctamente!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick, computed } from 'vue'

interface Props {
  show: boolean
  phoneNumber: string
}

interface Emits {
  (e: 'close'): void
  (e: 'verified'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const otpDigits = reactive<string[]>(['', '', '', '', '', ''])
const otpInputs = ref<HTMLInputElement[]>([])
const error = ref(false)
const success = ref(false)

const maskedPhone = computed(() => {
  if (!props.phoneNumber) return ''
  return props.phoneNumber.slice(-3)
})

const handleInput = async (index: number, event: Event) => {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/[^0-9]/g, '')
  
  if (value.length > 1) {
    otpDigits[index] = value.slice(-1)
  } else {
    otpDigits[index] = value
  }
  
  if (value && index < 5) {
    await nextTick()
    otpInputs.value[index + 1]?.focus()
  }
  
  checkOtp()
}

const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').replace(/[^0-9]/g, '') || ''
  
  for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
    otpDigits[i] = pastedData[i]
  }
  
  checkOtp()
}

const checkOtp = () => {
  const enteredOtp = otpDigits.join('')
  
  if (enteredOtp.length === 6) {
    if (enteredOtp === '123456') {
      success.value = true
      error.value = false
      setTimeout(() => {
        emit('verified')
        closeModal()
      }, 1500)
    } else {
      error.value = true
      success.value = false
      setTimeout(() => {
        clearOtp()
        error.value = false
      }, 2000)
    }
  }
}

const clearOtp = () => {
  for (let i = 0; i < 6; i++) {
    otpDigits[i] = ''
  }
  otpInputs.value[0]?.focus()
}

const closeModal = () => {
  clearOtp()
  error.value = false
  success.value = false
  emit('close')
}

watch(() => props.show, (newValue) => {
  if (newValue) {
    nextTick(() => {
      otpInputs.value[0]?.focus()
    })
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  background: linear-gradient(135deg, #2981fd 0%, #3b82f6 50%, #1e40af 100%);
  color: white;
  border-radius: 12px 12px 0 0;
}

.modal-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close-button svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 32px 24px 24px;
  text-align: center;
}

.phone-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.phone-icon svg {
  width: 48px;
  height: 48px;
  color: #2981fd;
}

.otp-message {
  color: #374151;
  font-size: 16px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.phone-number {
  color: #2981fd;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 32px;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.otp-input {
  width: 50px;
  height: 50px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.otp-input:focus {
  outline: none;
  border-color: #2981fd;
  box-shadow: 0 0 0 3px rgba(41, 129, 253, 0.1);
}

.otp-input:not(:placeholder-shown) {
  border-color: #2981fd;
  background-color: #f8fafc;
}

.error-message {
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  margin-top: 16px;
}

.success-message {
  color: #059669;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  margin-top: 16px;
}

@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    margin: 20px;
  }
  
  .otp-inputs {
    gap: 8px;
  }
  
  .otp-input {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .modal-body {
    padding: 24px 16px 16px;
  }
}
</style>