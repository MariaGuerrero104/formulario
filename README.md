# Formulario de Registro con Barra de Progreso

Un formulario completo con validación en tiempo real y barra de progreso visual.

## Características principales

- **Barra de progreso interactiva**: Muestra el porcentaje completado y cambia de color
- **Validación en tiempo real**: Detecta errores mientras el usuario escribe
- **Diseño moderno y responsive**: Se adapta a diferentes tamaños de pantalla
- **Experiencia de usuario mejorada**: 
  - Efectos visuales al interactuar
  - Feedback claro para errores
  - Animación durante el envío

## Tecnologías utilizadas

- HTML5 (estructura semántica)
- CSS3 (Flexbox, Grid, variables CSS, animaciones)
- JavaScript (ES6, validación de formularios)

## Cómo usar

1. Clona este repositorio
2. Abre el archivo `index.html` en tu navegador
3. Completa el formulario:
   - La barra de progreso se actualizará automáticamente
   - Los campos obligatorios están marcados con *
   - Verás mensajes de error si es necesario

## Personalización

### Colores
Modifica las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --accent-color: #4895ef;
    --success-color: #4cc9f0;
    --error-color: #f72585;
    --warning-color: #f8961e;
}
```

### Campos del formulario
Edita el archivo `index.html` para agregar o quitar campos.

### Validación
Modifica las funciones en `js/script.js` para cambiar las reglas de validación.

## Vista previa

![Captura del formulario](preview.png)

## Licencia

MIT License