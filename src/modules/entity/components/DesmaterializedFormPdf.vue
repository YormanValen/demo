<script setup lang="ts">
import { ref } from 'vue'
// Store is optional: we try to import it at runtime if available
import { QR_BASE64, FOOTER_LOGO_BASE64 } from '@/assets/images'
import jsPDF from 'jspdf'

type DatosSolicitante = {
  tipoDocumento?: string
  numeroIdentificacion?: string
  primerNombre?: string
  primerApellido?: string
  fechaExpedicion?: string // DD/MM/AAAA
  celular?: string
  correo?: string
}

type SolicitudCredito = {
  tipoCredito?: string
  ingresosMensuales?: string
  otrosIngresos?: string
  montoSolicitado?: string
  actividadEconomica?: string
  antiguedad?: string
  estadoCivil?: string
  nivelEducativo?: string
  gastosMensuales?: string
  numeroRadicacion?: string
}

type DatosGenerales = {
  fechaTramite?: { dia?: string, mes?: string, anio?: string }
}

// Template and styling system
type Position = {
  x: number
  y: number
}

type Size = {
  width: number
  height: number
}

type TextStyle = {
  font?: 'helvetica' | 'times' | 'courier'
  style?: 'normal' | 'bold' | 'italic'
  size: number
  color: [number, number, number] // RGB
}

type BoxStyle = {
  fillColor: [number, number, number]
  borderColor: [number, number, number]
  borderWidth: number
  radius?: number
}

type SectionConfig = {
  container?: {
    position: Position
    size: Size
    style: BoxStyle
  }
  header: {
    text: string
    position: Position
    size: Size
    style: TextStyle & BoxStyle
  }
  fields: Array<{
    id: string
    label: string
    labelPosition: Position
    inputPosition: Position
    inputSize: Size
    labelStyle: TextStyle
    inputStyle: BoxStyle
  }>
}

type PDFTemplate = {
  name: string
  pageSize: { width: number, height: number }
  margins: { top: number, right: number, bottom: number, left: number }
  header: {
    height: number
    backgroundColor: [number, number, number]
    waveColor: [number, number, number]
    logoText: string
    logoStyle: TextStyle
    logoPosition: Position
  }
  sections: {
    datosGenerales: SectionConfig
    datosSolicitante: SectionConfig
    solicitudCredito: SectionConfig
  }
  footer: {
    legalText: {
      content: string
      style: TextStyle
      position: Position
    }
    brandText: {
      content: string
      style: TextStyle
      position: Position
    }
    qr?: {
      position: Position
      size: number
    }
    logo?: {
      position: Position
      size: Size
    }
  }
}

const props = defineProps<{
  datosGenerales: DatosGenerales
  solicitante: DatosSolicitante
  solicitud: SolicitudCredito
  // ya no se usan URLs dinámicas para el footer
  // se importan assets estáticos arriba
  descargarNombre?: string
  label?: string
  template?: PDFTemplate // Optional custom template
}>()

const emit = defineEmits<{
  (e: 'pdf-ready', payload: { blob: Blob; url: string; nombre: string }): void
}>()

const isGenerating = ref(false)
const generatedFecha = ref<{ dia: string; mes: string; anio: string } | null>(null)
const generatedRadicacion = ref<string | null>(null)

function getNowDateParts() {
  const now = new Date()
  const dia = String(now.getDate()).padStart(2, '0')
  const mes = String(now.getMonth() + 1).padStart(2, '0')
  const anio = String(now.getFullYear())
  return { dia, mes, anio }
}

function generateRadicacion(len = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let out = ''
  for (let i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length))
  return out
}

// Default template configuration
const defaultTemplate: PDFTemplate = {
  name: 'Formulario Desmaterializado Default',
  pageSize: { width: 210, height: 297 }, // A4
  margins: { top: 15, right: 15, bottom: 15, left: 15 },
  header: {
    height: 45,
    backgroundColor: [39, 13, 52], // #270D34
    waveColor: [152, 40, 129], // #982881
    logoText: '"Vive la transformación y descubre el poder de Open Finance"',
    logoStyle: {
      font: 'helvetica',
      style: 'normal',
      size: 12,
      color: [255, 255, 255]
    },
    logoPosition: { x: 15, y: 20 }
  },
  sections: {
    datosGenerales: {
      container: {
        position: { x: 15, y: 60 },
        size: { width: 180, height: 45 },
        style: { fillColor: [255, 255, 255], borderColor: [160, 160, 160], borderWidth: 0.5, radius: 3 }
      },
      header: {
        text: 'DATOS GENERALES DEL TRAMITE',
        position: { x: 15, y: 55 },
        size: { width: 180, height: 8 },
        style: {
          font: 'helvetica',
          style: 'bold',
          size: 11,
          color: [255, 255, 255],
          fillColor: [111, 61, 138],
          borderColor: [111, 61, 138],
          borderWidth: 0
        }
      },
      fields: [
        {
          id: 'fechaTramite',
          label: 'Fecha del trámite',
          labelPosition: { x: 20, y: 70 },
          inputPosition: { x: 20, y: 76 },
          inputSize: { width: 20, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'numeroRadicacion',
          label: 'Número de radicación:',
          labelPosition: { x: 120, y: 75 },
          inputPosition: { x: 120, y: 78 },
          inputSize: { width: 60, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        }
      ]
    },
    datosSolicitante: {
      container: {
        position: { x: 15, y: 125 },
        size: { width: 180, height: 70 },
        style: { fillColor: [255, 255, 255], borderColor: [160, 160, 160], borderWidth: 0.5, radius: 3 }
      },
      header: {
        text: 'DATOS DEL SOLICITANTE',
        position: { x: 15, y: 120 },
        size: { width: 180, height: 8 },
        style: {
          font: 'helvetica',
          style: 'bold',
          size: 11,
          color: [255, 255, 255],
          fillColor: [111, 61, 138],
          borderColor: [111, 61, 138],
          borderWidth: 0
        }
      },
      fields: [
        {
          id: 'tipoDocumento',
          label: 'Tipo de documento',
          labelPosition: { x: 20, y: 134 },
          inputPosition: { x: 20, y: 137 },
          inputSize: { width: 55, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'numeroIdentificacion',
          label: 'Número de identificación',
          labelPosition: { x: 80, y: 134 },
          inputPosition: { x: 80, y: 137 },
          inputSize: { width: 55, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'primerNombre',
          label: 'Primer nombre',
          labelPosition: { x: 140, y: 134 },
          inputPosition: { x: 140, y: 137 },
          inputSize: { width: 52, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'primerApellido',
          label: 'Primer apellido',
          labelPosition: { x: 20, y: 156 },
          inputPosition: { x: 20, y: 159 },
          inputSize: { width: 55, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'fechaExpedicion',
          label: 'Fecha de expedición documento',
          labelPosition: { x: 80, y: 156 },
          inputPosition: { x: 80, y: 159 },
          inputSize: { width: 55, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'celular',
          label: 'Número celular',
          labelPosition: { x: 140, y: 156 },
          inputPosition: { x: 140, y: 159 },
          inputSize: { width: 52, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'correo',
          label: 'Correo electrónico',
          labelPosition: { x: 20, y: 178 },
          inputPosition: { x: 20, y: 181 },
          inputSize: { width: 80, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        }
      ]
    },
    solicitudCredito: {
      container: {
        position: { x: 15, y: 215 },
        size: { width: 180, height: 30 },
        style: { fillColor: [255, 255, 255], borderColor: [160, 160, 160], borderWidth: 0.5, radius: 3 }
      },
      header: {
        text: 'SOLICITUD DE CRÉDITO',
        position: { x: 15, y: 205 },
        size: { width: 180, height: 8 },
        style: {
          font: 'helvetica',
          style: 'bold',
          size: 11,
          color: [255, 255, 255],
          fillColor: [111, 61, 138],
          borderColor: [111, 61, 138],
          borderWidth: 0
        }
      },
      fields: [
        {
          id: 'ingresosMensuales',
          label: 'Ingresos Mensuales promedio',
          labelPosition: { x: 20, y: 223 },
          inputPosition: { x: 20, y: 226 },
          inputSize: { width: 85, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        },
        {
          id: 'montoSolicitado',
          label: 'Monto Solicitado',
          labelPosition: { x: 110, y: 223 },
          inputPosition: { x: 110, y: 226 },
          inputSize: { width: 70, height: 8 },
          labelStyle: { size: 9, color: [0, 0, 0] },
          inputStyle: { fillColor: [255, 255, 255], borderColor: [120, 120, 120], borderWidth: 0.5, radius: 2 }
        }
      ]
    }
  },
  footer: {
    legalText: {
      content: 'Plataforma vigilada por la superintendencia financiera y regida por las leyes colombianas sobre el tratamientos de datos.\nDataCrédito Experian. 2025.',
      style: { size: 6, color: [0, 0, 0] },
      position: { x: 105, y: 260 }
    },
    brandText: {
      content: '',
      style: { size: 24, color: [111, 61, 138], style: 'bold' },
      position: { x: 150, y: 240 }
    },
    qr: {
      position: { x: 15, y: 252 },
      size: 28
    },
    logo: {
      position: { x: 165, y: 250 },
      size: { width: 35, height: 32 }
    }
  }
}


// Helper functions using template styles
function applyTextStyle(doc: jsPDF, style: TextStyle) {
  doc.setFont(style.font || 'helvetica', style.style || 'normal')
  doc.setFontSize(style.size)
  doc.setTextColor(...style.color)
}

function applyBoxStyle(doc: jsPDF, style: BoxStyle) {
  doc.setFillColor(...style.fillColor)
  doc.setDrawColor(...style.borderColor)
  doc.setLineWidth(style.borderWidth)
}

function drawStyledLabel(doc: jsPDF, text: string, position: Position, style: TextStyle) {
  applyTextStyle(doc, style)
  doc.text(text, position.x, position.y, { baseline: 'alphabetic' })
}

function formatValueForPdf(value: any): string {
  if (value === undefined || value === null) return ''
  if (value instanceof Date) {
    const d = value
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = String(d.getFullYear())
    return `${dd}/${mm}/${yyyy}`
  }
  // If it's a string that serializes a Date, keep as-is
  return String(value)
}

function drawStyledInputBox(doc: jsPDF, position: Position, size: Size, style: BoxStyle, value?: any) {
  applyBoxStyle(doc, style)
  if (style.radius && style.radius > 0) {
    doc.roundedRect(position.x, position.y, size.width, size.height, style.radius, style.radius, 'FD')
  } else {
    doc.rect(position.x, position.y, size.width, size.height, 'FD')
  }

  // Draw value if provided
  if (value) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const text = formatValueForPdf(value)
    doc.text(text, position.x + 2, position.y + size.height - 2)
  }
}

function drawStyledSectionHeader(doc: jsPDF, config: SectionConfig['header']) {
  // Draw background
  applyBoxStyle(doc, config.style)
  doc.rect(config.position.x, config.position.y, config.size.width, config.size.height, 'F')

  // Draw text
  applyTextStyle(doc, config.style)
  doc.text(config.text, config.position.x + 2, config.position.y + 5.5)
}

function drawStyledSectionContainer(doc: jsPDF, container?: SectionConfig['container']) {
  if (!container) return
  applyBoxStyle(doc, container.style)
  const r = container.style.radius ?? 0
  if (r > 0) {
    doc.roundedRect(container.position.x, container.position.y, container.size.width, container.size.height, r, r, 'S')
  } else {
    doc.rect(container.position.x, container.position.y, container.size.width, container.size.height, 'S')
  }
}

async function drawTemplatedHeader(doc: jsPDF, template: PDFTemplate) {
  const header = template.header
  const pageWidth = template.pageSize.width

  try {
    // Try to load and use the actual SVG from assets
    const svgContent = `<svg width="2561" height="195" viewBox="0 0 2561 195" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2560.5 0H0V184L181 170.5C683 146.5 810 150.5 954 149.5C1069.2 148.7 1491.33 170.5 1688 181.5C1761 185.833 1945.2 194.5 2098 194.5C2250.8 194.5 2470 177.5 2560.5 169V0Z" fill="#270D34"/>
<path d="M713 145.611C578.6 142.811 181.667 158.778 0 167.111V181.611L332 162.111C353.167 160.444 440.2 155.911 619 151.111C842.5 145.111 1133 153.111 1162 153.111C1191 153.111 1734.5 182.611 1995.5 193.111C2204.3 201.511 2458.5 179.944 2559.5 168.111L2559 166.111H2556.5C2517.83 168.778 2393.9 175.811 2207.5 182.611C1974.5 191.111 1488 157.611 1232 150.111C1027.2 144.111 800.667 144.611 713 145.611Z" fill="#982881"/>
</svg>`

    // Convert SVG to image
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.src = url

    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
    })

    // Scale SVG to fit the header with high DPI
    const dpi = 6 // Increase for higher quality

    // Create high resolution canvas
    const canvas = document.createElement('canvas')
    canvas.width = pageWidth * dpi
    canvas.height = header.height * dpi
    const ctx = canvas.getContext('2d')!

    // Set high quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // Scale the context for high DPI
    ctx.scale(dpi, dpi)

    // Draw the SVG image scaled to fit
    ctx.drawImage(img, 0, 0, pageWidth, header.height)

    // Add to PDF with high quality
    const imageData = canvas.toDataURL('image/png', 1.0) // Max quality
    doc.addImage(imageData, 'PNG', 0, 0, pageWidth, header.height, undefined, 'SLOW')

    URL.revokeObjectURL(url)

  } catch (e) {
    console.warn('Could not load SVG header, using fallback', e)
    // Fallback: draw manual header
    doc.setFillColor(...header.backgroundColor)
    doc.rect(0, 0, pageWidth, header.height, 'F')

    // Wave pattern
    doc.setFillColor(...header.waveColor)
    const baseY = header.height * 0.6

    for (let x = 0; x < pageWidth; x += 2) {
      const wave1 = Math.sin(x * 0.02) * 2
      const wave2 = Math.sin(x * 0.015 + 1) * 1.5
      const currentHeight = baseY + wave1 + wave2
      doc.rect(x, currentHeight, 2, header.height - currentHeight, 'F')
    }
  }

  // Add logo text over the header
  applyTextStyle(doc, header.logoStyle)
  const logoLines = header.logoText.split('\n')
  logoLines.forEach((line, index) => {
    doc.text(line, header.logoPosition.x, header.logoPosition.y + (index * header.logoStyle.size * 0.8))
  })
}

async function addQrToFooter(doc: jsPDF, x = 170, y = 235, size = 28) {
  try {
    doc.addImage(QR_BASE64, 'PNG', x, y, size, size)
  } catch (e) {
    console.warn('No se pudo cargar el QR del footer', e)
  }
}

async function addImageToFooter(doc: jsPDF, x = 160, y = 242, width = 35, height = 20) {
  try {
    doc.addImage(FOOTER_LOGO_BASE64, 'PNG', x, y, width, height)
  } catch (e) {
    console.warn('No se pudo cargar la imagen del logo del footer', e)
  }
}

let cachedPdfStore: any | null = null
async function ensurePdfStoreLoaded() {
  if (cachedPdfStore) return
  try {
    const mod: any = await import('@/stores/formData')
    cachedPdfStore = mod?.useFormDataStore ? mod.useFormDataStore() : null
  } catch {
    cachedPdfStore = null
  }
}

// Mock data completo para segunda prioridad
const mockData = {
  solicitante: {
    tipoDocumento: 'Cédula de Ciudadanía',
    numeroIdentificacion: '1234567890',
    primerNombre: 'Carlos',
    primerApellido: 'Rodríguez',
    fechaExpedicion: '15/03/2010',
    celular: '3001234567',
    correo: 'carlos.rodriguez@email.com'
  },
  solicitud: {
    tipoCredito: 'Crédito de Consumo',
    ingresosMensuales: '$2.500.000',
    otrosIngresos: '$500.000',
    montoSolicitado: '$15.000.000',
    actividadEconomica: 'Empleado',
    antiguedad: '5 años',
    estadoCivil: 'Soltero',
    nivelEducativo: 'Universitario',
    gastosMensuales: '$1.800.000',
    numeroRadicacion: 'RAD123456'
  },
  datosGenerales: {
    fechaTramite: { dia: '25', mes: '01', anio: '2025' }
  }
}

function getFieldValue(fieldId: string): string {
  const store = cachedPdfStore
  switch (fieldId) {
    case 'tipoDocumento':
      return store?.solicitante?.tipoDocumento || mockData.solicitante.tipoDocumento || props.solicitante?.tipoDocumento || 'Cédula de Ciudadanía'
    case 'numeroIdentificacion':
      return store?.solicitante?.numeroIdentificacion || mockData.solicitante.numeroIdentificacion || props.solicitante?.numeroIdentificacion || ''
    case 'primerNombre':
      return store?.solicitante?.primerNombre || mockData.solicitante.primerNombre || props.solicitante?.primerNombre || ''
    case 'primerApellido':
      return store?.solicitante?.primerApellido || mockData.solicitante.primerApellido || props.solicitante?.primerApellido || ''
    case 'fechaExpedicion':
      return store?.solicitante?.fechaExpedicion || mockData.solicitante.fechaExpedicion || props.solicitante?.fechaExpedicion || ''
    case 'celular':
      return store?.solicitante?.celular || mockData.solicitante.celular || props.solicitante?.celular || ''
    case 'correo':
      return store?.solicitante?.correo || mockData.solicitante.correo || props.solicitante?.correo || ''
    case 'montoSolicitado':
      return store?.solicitud?.montoSolicitado || mockData.solicitud.montoSolicitado || props.solicitud?.montoSolicitado || ''
    case 'gastosMensuales':
      return store?.solicitud?.gastosMensuales || mockData.solicitud.gastosMensuales || props.solicitud?.gastosMensuales || ''
    case 'ingresosMensuales':
      return store?.solicitud?.ingresosMensuales || mockData.solicitud.ingresosMensuales || props.solicitud?.ingresosMensuales || ''
    case 'otrosIngresos':
      return store?.solicitud?.otrosIngresos || mockData.solicitud.otrosIngresos || props.solicitud?.otrosIngresos || ''
    case 'actividadEconomica':
      return store?.solicitud?.actividadEconomica || mockData.solicitud.actividadEconomica || props.solicitud?.actividadEconomica || ''
    case 'antiguedad':
      return store?.solicitud?.antiguedad || mockData.solicitud.antiguedad || props.solicitud?.antiguedad || ''
    case 'estadoCivil':
      return store?.solicitud?.estadoCivil || mockData.solicitud.estadoCivil || props.solicitud?.estadoCivil || ''
    case 'nivelEducativo':
      return store?.solicitud?.nivelEducativo || mockData.solicitud.nivelEducativo || props.solicitud?.nivelEducativo || ''
    case 'tipoCredito':
      return store?.solicitud?.tipoCredito || mockData.solicitud.tipoCredito || props.solicitud?.tipoCredito || ''
    case 'numeroRadicacion':
      return generatedRadicacion.value || store?.solicitud?.numeroRadicacion || mockData.solicitud.numeroRadicacion || props.solicitud?.numeroRadicacion || ''
    case 'fechaTramite':
      const fecha = generatedFecha.value || store?.datosGenerales?.fechaTramite || mockData.datosGenerales.fechaTramite || props.datosGenerales?.fechaTramite
      return `${fecha?.dia || ''} ${fecha?.mes || ''} ${fecha?.anio || ''}`
    default:
      return ''
  }
}

async function generarPDF(): Promise<Blob> {
  // Try to load PDF store (optional) and generate current date + radicación
  await ensurePdfStoreLoaded()
  generatedFecha.value = getNowDateParts()
  generatedRadicacion.value = generateRadicacion()
  isGenerating.value = true
  try {
    const template = props.template || defaultTemplate
    const doc = new jsPDF({
      unit: 'mm',
      format: [template.pageSize.width, template.pageSize.height]
    })

    // Draw header
    await drawTemplatedHeader(doc, template)

    // Draw sections
    Object.values(template.sections).forEach(sectionConfig => {
      // Draw container first (border/background)
      drawStyledSectionContainer(doc, sectionConfig.container)
      // Draw section header
      drawStyledSectionHeader(doc, sectionConfig.header)

      // Draw section fields
      sectionConfig.fields.forEach(field => {
        // Draw label
        drawStyledLabel(doc, field.label, field.labelPosition, field.labelStyle)

        // Handle special cases for date fields
        if (field.id === 'fechaTramite') {
          // Draw individual date components
          const fecha = generatedFecha.value || getNowDateParts()

          // Día
          drawStyledLabel(doc, 'Día', { x: field.labelPosition.x, y: field.labelPosition.y + 4 }, field.labelStyle)
          drawStyledInputBox(doc,
            { x: field.inputPosition.x, y: field.inputPosition.y + 4 },
            { width: 20, height: 8 },
            field.inputStyle,
            fecha?.dia
          )

          // Mes
          drawStyledLabel(doc, 'Mes', { x: field.labelPosition.x + 25, y: field.labelPosition.y + 4 }, field.labelStyle)
          drawStyledInputBox(doc,
            { x: field.inputPosition.x + 25, y: field.inputPosition.y + 4 },
            { width: 20, height: 8 },
            field.inputStyle,
            fecha?.mes
          )

          // Año
          drawStyledLabel(doc, 'Año', { x: field.labelPosition.x + 50, y: field.labelPosition.y + 4 }, field.labelStyle)
          drawStyledInputBox(doc,
            { x: field.inputPosition.x + 50, y: field.inputPosition.y + 4 },
            { width: 25, height: 8 },
            field.inputStyle,
            fecha?.anio
          )
        } else {
          // Draw regular input box
          const value = field.id === 'numeroRadicacion'
            ? (generatedRadicacion.value || generateRadicacion())
            : getFieldValue(field.id)
          drawStyledInputBox(doc, field.inputPosition, field.inputSize, field.inputStyle, value)
        }
      })
    })

    // Draw footer on same page
    const legalLines = template.footer.legalText.content.split('\n')
    // Centrar el texto legal en el ancho disponible entre QR y Logo, con padding de 10mm
    applyTextStyle(doc, template.footer.legalText.style)
    const qrCfg = template.footer.qr
    const logoCfg = template.footer.logo
    const padding = 10
    const left = (qrCfg?.position.x ?? 15) + (qrCfg?.size ?? 28) + padding
    const right = (logoCfg?.position.x ?? 165) - padding
    const availableWidth = Math.max(0, right - left)
    const centerX = left + availableWidth / 2

    legalLines.forEach((line, index) => {
      const y = template.footer.legalText.position.y + (index * template.footer.legalText.style.size * 1.2)
      doc.text(line, centerX, y, { align: 'center', baseline: 'alphabetic' })
    })

    // Draw brand text
    if (template.footer.brandText.content) {
      const brandLines = template.footer.brandText.content.split('\n')
      brandLines.forEach((line, index) => {
        const brandStyle = { ...template.footer.brandText.style }
        if (index > 0) {
          brandStyle.size = 8
          brandStyle.color = [120, 120, 120]
          brandStyle.style = 'normal'
        }

        drawStyledLabel(doc, line,
          {
            x: template.footer.brandText.position.x,
            y: template.footer.brandText.position.y + (index * brandStyle.size * 1.2)
          },
          brandStyle
        )
      })
    }

    // QR en el footer (opcional)
    // QR (estático importado)
    if (template.footer.qr) {
      await addQrToFooter(doc, template.footer.qr.position.x, template.footer.qr.position.y, template.footer.qr.size)
    }

    // Logo a la derecha (estático importado)
    if (template.footer.logo) {
      await addImageToFooter(
        doc,
        template.footer.logo.position.x,
        template.footer.logo.position.y,
        template.footer.logo.size.width,
        template.footer.logo.size.height
      )
    }

    const blob = doc.output('blob') as Blob
    const nombre = props.descargarNombre ?? 'FormularioDesmaterializado.pdf'
    const url = URL.createObjectURL(blob)
    // Emitimos para que el visor del proyecto lo consuma
    emit('pdf-ready', { blob, url, nombre })
    return blob
  } finally {
    isGenerating.value = false
  }
}

defineExpose({ generarPDF })
</script>

<template>
  <button class="download-btn" :disabled="isGenerating" @click="generarPDF">
    {{ isGenerating ? 'Generando…' : (props.label ?? '📄 Formulario desmaterializado') }}
  </button>
</template>

<style scoped>
.download-btn {
  background: transparent;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  display: inline-block;
}

.download-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
