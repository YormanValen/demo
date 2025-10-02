import { defineStore } from 'pinia'

export type TxClass = 'credit' | 'debit'

export interface TransactionRecord {
  id: string
  date: string // ISO yyyy-mm-dd
  amount: number // positive for credit, negative for debit
  class: TxClass
  className: 'Crédito' | 'Débito'
  description: string
  bankId: number
}

type RecordsByBank = Record<number, TransactionRecord[]>

const make = (bankId: number, id: string, date: string, amount: number, description: string): TransactionRecord => {
  const cls: TxClass = amount >= 0 ? 'credit' : 'debit'
  return {
    id,
    date,
    amount,
    class: cls,
    className: cls === 'credit' ? 'Crédito' : 'Débito',
    description,
    bankId
  }
}

const STORAGE_KEY = 'ti_transactions_by_bank'

export const useTxStore = defineStore('ti-transactions', {
  state: () => ({
    recordsByBank: {} as RecordsByBank
  }),

  getters: {
    byBank: (state) => (bankId: number) => state.recordsByBank[bankId] || [],
    combined: (state) => {
      const all: TransactionRecord[] = []
      Object.values(state.recordsByBank).forEach(arr => all.push(...arr))
      return all.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    }
  },

  actions: {
    setBankTransactions(bankId: number, records: TransactionRecord[]) {
      this.recordsByBank[bankId] = records
      this.saveToLocalStorage()
    },

    addTransaction(bankId: number, record: TransactionRecord) {
      if (!this.recordsByBank[bankId]) this.recordsByBank[bankId] = []
      this.recordsByBank[bankId].push(record)
      this.saveToLocalStorage()
    },

    ensureSeedFor(bankIds: number[]) {
      // Seed demo data for any bank without records
      bankIds.forEach((id) => {
        if (this.recordsByBank[id] && this.recordsByBank[id].length) return
        switch (id) {
          case 1: // Neodigi
            this.recordsByBank[id] = [
              make(1, 'ND-001', '2024-01-15', 2500000, 'Depósito nómina mensual'),
              make(1, 'ND-002', '2024-01-14', -45500, 'Supermercado Central Plaza'),
              make(1, 'ND-003', '2024-01-13', -120000, 'Pago servicios públicos'),
              make(1, 'ND-004', '2024-01-12', 150750, 'Reembolso compra'),
              make(1, 'ND-005', '2024-01-11', -89990, 'Restaurante La Terraza'),
              make(1, 'ND-006', '2024-01-10', -25000, 'Cajero automático ATM'),
              make(1, 'ND-007', '2024-01-09', 500000, 'Transferencia recibida'),
              make(1, 'ND-008', '2024-01-08', -67300, 'Farmacia San Rafael'),
              make(1, 'ND-009', '2024-01-07', -200000, 'Seguro vehicular mensual'),
              make(1, 'ND-010', '2024-01-06', 75250, 'Cashback tarjeta crédito'),
            ]
            break
          case 2: // TekCredit
            this.recordsByBank[id] = [
              make(2, 'TC-011', '2024-01-15', 350000, 'Pago cliente'),
              make(2, 'TC-012', '2024-01-14', -32000, 'Panadería El Trigal'),
              make(2, 'TC-013', '2024-01-13', -150000, 'Plan de telefonía móvil'),
              make(2, 'TC-014', '2024-01-12', 98000, 'Bonificación cashback'),
              make(2, 'TC-015', '2024-01-11', -45000, 'Gasolinera Primax'),
              make(2, 'TC-016', '2024-01-10', -65000, 'Cine y snacks'),
              make(2, 'TC-017', '2024-01-09', 210000, 'Transferencia recibida amigo'),
              make(2, 'TC-018', '2024-01-08', -43000, 'Librería Central'),
              make(2, 'TC-019', '2024-01-07', -300000, 'Electrodomésticos hogar'),
              make(2, 'TC-020', '2024-01-06', 125000, 'Reembolso proveedor'),
            ]
            break
          case 3: // Flexfinia
            this.recordsByBank[id] = [
              make(3, 'FF-021', '2024-01-15', 1200000, 'Venta online'),
              make(3, 'FF-022', '2024-01-14', -22000, 'Retiro rápido'),
              make(3, 'FF-023', '2024-01-13', -125000, 'Cuota gimnasio'),
              make(3, 'FF-024', '2024-01-12', 210000, 'Transferencia recibida'),
              make(3, 'FF-025', '2024-01-11', -89000, 'Ropa y accesorios'),
              make(3, 'FF-026', '2024-01-10', -73000, 'Comida a domicilio'),
              make(3, 'FF-027', '2024-01-09', 90000, 'Devolución marketplace'),
              make(3, 'FF-028', '2024-01-08', -54000, 'Tienda mascotas'),
              make(3, 'FF-029', '2024-01-07', -110000, 'Mantenimiento auto'),
              make(3, 'FF-030', '2024-01-06', 60000, 'Premio fidelidad'),
            ]
            break
          default:
            // Generate realistic transactions for any bank
            this.recordsByBank[id] = [
              make(id, `${id}-001`, '2024-01-15', 1800000, 'Salario mensual'),
              make(id, `${id}-002`, '2024-01-14', -95000, 'Supermercado Los Alpes'),
              make(id, `${id}-003`, '2024-01-13', -180000, 'Servicios públicos'),
              make(id, `${id}-004`, '2024-01-12', 125000, 'Transferencia recibida'),
              make(id, `${id}-005`, '2024-01-11', -67500, 'Restaurante El Mirador'),
              make(id, `${id}-006`, '2024-01-10', -40000, 'Retiro ATM'),
              make(id, `${id}-007`, '2024-01-09', 250000, 'Bonificación empresa'),
              make(id, `${id}-008`, '2024-01-08', -56000, 'Farmacia Cruz Verde'),
              make(id, `${id}-009`, '2024-01-07', -150000, 'Seguro médico'),
              make(id, `${id}-010`, '2024-01-06', 85000, 'Cashback compras'),
            ]
            break
        }
      })
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recordsByBank))
      } catch (e) {
        console.warn('Failed saving tx store:', e)
      }
    },

    loadFromLocalStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) this.recordsByBank = JSON.parse(raw)
      } catch (e) {
        console.warn('Failed loading tx store:', e)
      }
    },

    clearAll() {
      this.recordsByBank = {}
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
    }
  }
})
