Open Finance Demo - MVP de Solicitud de Crédito Multiplataforma

Este proyecto es un MVP demostrativo para un software de solicitud de crédito con conexión multiplataforma bancaria.
Está construido con Vue 3 + TypeScript + Vite y adopta una estructura inspirada en Screaming Architecture, donde el dominio dicta la organización del código.

📂 Estructura principal
src/
  modules/
    registro/
      components/
      services/
      stores/
      types/
      views/
  router/
  shared/
    components/
    composables/
    layouts/
    services/
    styles/


modules/: Cada módulo representa un flujo del negocio. El módulo registro contiene la vista, componentes, servicios mock y un store reactivo para el formulario de registro.

shared/: Capas transversales reutilizables: componentes de UI, composables genéricos, servicios comunes y estilos globales.

router/: Configuración de rutas que expone las vistas de los módulos de dominio.
