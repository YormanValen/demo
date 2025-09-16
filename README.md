# Portal de Registro - Vue 3 + TypeScript + Vite

Este proyecto adopta una estructura inspirada en **Screaming Architecture**, donde el dominio dicta la organización del código.

## Estructura principal
```
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
```

- **modules/**: Cada módulo representa un flujo del negocio. El módulo `registro` contiene la vista, componentes, servicios mock y un store reactivo para el formulario de registro.
- **shared/**: Capas transversales reutilizables: componentes de UI, composables genéricos, servicios comunes y estilos globales.
- **router/**: Configuración de rutas que expone las vistas de los módulos de dominio.

## Scripts disponibles
- `npm run dev`: levanta el entorno de desarrollo.
- `npm run build`: ejecuta `vue-tsc` y construye la aplicación para producción.
- `npm run preview`: sirve la build generada para revisión.

## Próximos pasos
- Sustituir los servicios mock por integraciones reales.
- Incorporar nuevos módulos siguiendo la misma convención de carpetas.
- Añadir pruebas unitarias para servicios y stores a medida que crezca la lógica de negocio.
