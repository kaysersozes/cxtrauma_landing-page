# CxTrauma - Plataforma de Órdenes Médicas Gratuitas

Plataforma web médica para solicitar órdenes gratuitas de resonancia magnética en la Quinta Región de Chile.

## Descripción

CxTrauma es una plataforma médica profesional que permite a los pacientes solicitar órdenes médicas de resonancia magnética sin costo alguno. Los usuarios pueden visualizar los centros médicos disponibles en la Quinta Región de Chile y enviar solicitudes que serán procesadas por especialistas certificados en traumatología.

## Características Principales

### Mapa Interactivo
- Visualización de la Quinta Región de Chile centrada en Valparaíso
- 3 centros médicos disponibles con marcadores personalizados
- Popups informativos con detalles de cada centro
- Integración con Leaflet.js y OpenStreetMap

### Centros Médicos Disponibles

1. **Hospital Naval - Valparaíso**
   - Especialista: Dr. García Rodríguez
   - Área: Traumatología
   - Coordenadas: -33.0364, -71.6297

2. **Clínica Viña del Mar**
   - Especialista: Dr. Silva López
   - Área: Traumatología
   - Coordenadas: -33.0246, -71.5516

3. **Hospital Gustavo Fricke - Quilpué**
   - Especialista: Dr. Morales Castro
   - Área: Traumatología
   - Coordenadas: -33.0479, -71.4394

### Formulario de Solicitud
- Validación en tiempo real de todos los campos
- Validación de RUT chileno con algoritmo de dígito verificador
- Formato automático de RUT y teléfono
- Validación de email y teléfono móvil chileno
- Mensajes de error descriptivos
- Mensaje de confirmación al enviar

### Validaciones Implementadas

- **Nombre Completo:** Mínimo 3 caracteres
- **RUT:** Formato XX.XXX.XXX-X con dígito verificador válido
- **Teléfono:** Formato +56 9 XXXX XXXX
- **Email:** Formato estándar de email
- **Centro Médico:** Selección obligatoria

## Stack Tecnológico

- **HTML5:** Estructura semántica
- **CSS3:** Grid, Flexbox, animaciones y transiciones
- **JavaScript Vanilla (ES6+):** Funcionalidades sin dependencias
- **Leaflet.js 1.9.4:** Biblioteca de mapas interactivos (CDN)
- **OpenStreetMap:** Tiles para el mapa

## Estructura del Proyecto

```
Mapa/
├── index.html          # Página principal
├── styles.css          # Estilos profesionales
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentación
```

## Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar Leaflet.js y tiles de OpenStreetMap)

### Instalación

1. **Clonar o descargar el proyecto:**
   ```bash
   cd Mapa
   ```

2. **Abrir el proyecto:**
   - Simplemente abre `index.html` en tu navegador web
   - O usa un servidor local (recomendado):

   **Opción 1 - Python:**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Opción 2 - Node.js:**
   ```bash
   npx http-server -p 8000
   ```

   **Opción 3 - PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Acceder a la aplicación:**
   - Abre tu navegador y visita: `http://localhost:8000`

## Cómo Usar la Plataforma

### Para Pacientes

1. **Explorar Centros Médicos:**
   - Al cargar la página, verás un mapa centrado en la Quinta Región
   - Haz clic en los marcadores azules para ver información de cada centro
   - Lee los detalles del especialista y ubicación

2. **Solicitar Orden Médica:**
   - Haz clic en "Solicitar Orden Gratuita" en cualquier popup del mapa
   - Se abrirá un formulario modal
   - El centro médico se preseleccionará automáticamente

3. **Completar el Formulario:**
   - **Nombre Completo:** Ingresa tu nombre completo
   - **RUT:** Escribe tu RUT (se formateará automáticamente)
   - **Teléfono:** Ingresa tu número móvil (formato +56 9 XXXX XXXX)
   - **Email:** Proporciona un correo válido
   - **Centro Médico:** Verifica o cambia el centro seleccionado

4. **Enviar Solicitud:**
   - Haz clic en "Enviar Solicitud"
   - Se validarán todos los campos
   - Verás un mensaje de confirmación al completarse
   - El modal se cerrará automáticamente después de 4 segundos

5. **Revisar Datos Enviados:**
   - Abre la consola del navegador (F12)
   - Verás un resumen completo de tu solicitud
   - Los datos también se guardan en localStorage

## Funcionalidades Técnicas

### JavaScript

#### Validación de RUT Chileno
```javascript
// Algoritmo completo de validación con dígito verificador
validateRUT(rut) // Retorna true/false
```

#### Formateo Automático
- **RUT:** Agrega puntos y guión automáticamente
- **Teléfono:** Formatea a +56 9 XXXX XXXX

#### Almacenamiento Local
- Las solicitudes se guardan en `localStorage`
- Clave: `cxtrauma_requests`
- Formato: Array de objetos JSON

#### Console Logging
Cada solicitud genera un log detallado:
```
==================================================
NUEVA SOLICITUD DE ORDEN MÉDICA
==================================================
Datos del Paciente:
  Nombre: Juan Pérez González
  RUT: 12.345.678-9
  Teléfono: +56 9 1234 5678
  Email: juan@ejemplo.com

Centro Médico Seleccionado:
  Centro: Hospital Naval
  Ubicación: Valparaíso
  Especialista: Dr. García Rodríguez

Fecha de Solicitud: 21/10/2025 14:30:45
Estado: PENDING
==================================================
```

### CSS

#### Variables CSS Personalizadas
- Colores consistentes con tema médico
- Espaciados modulares
- Sombras y transiciones suaves

#### Diseño Responsive
- **Desktop:** Vista completa con mapa amplio
- **Tablet:** Adaptación de grid y espaciados
- **Mobile:** Stack vertical, mapa optimizado

#### Animaciones
- Fade-in para modal
- Slide-down para contenido del modal
- Hover effects en botones y enlaces
- Loading spinner animado

## Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-blue: #2563eb;      /* Color principal */
    --success-green: #10b981;      /* Color de éxito */
    --error-red: #ef4444;          /* Color de error */
}
```

### Agregar Nuevos Centros Médicos

Edita el array `MEDICAL_CENTERS` en `script.js`:

```javascript
const MEDICAL_CENTERS = [
    {
        id: 'nuevo-centro',
        name: 'Nombre del Centro',
        location: 'Ciudad',
        coordinates: [latitud, longitud],
        doctor: 'Dr. Nombre Apellido',
        specialty: 'Especialidad'
    },
    // ...centros existentes
];
```

No olvides agregar la opción correspondiente en el HTML:

```html
<option value="nuevo-centro">Nombre del Centro - Ciudad</option>
```

### Modificar Configuración del Mapa

Edita `MAP_CONFIG` en `script.js`:

```javascript
const MAP_CONFIG = {
    center: [-33.0472, -71.6127],  // Coordenadas del centro
    zoom: 10,                       // Nivel de zoom inicial
    maxZoom: 18,                    // Zoom máximo
    minZoom: 8                      // Zoom mínimo
};
```

## Características de Accesibilidad

- Etiquetas ARIA para modal
- Labels asociados a inputs
- Navegación por teclado (ESC para cerrar modal)
- Contraste de colores WCAG AA
- Mensajes de error descriptivos
- Focus states visibles

## Compatibilidad de Navegadores

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Optimizaciones

- **Rendimiento:**
  - Uso de CDN para Leaflet.js
  - CSS optimizado con variables
  - JavaScript modular y eficiente

- **SEO:**
  - HTML semántico
  - Meta tags descriptivos
  - Estructura jerárquica de headings

- **UX:**
  - Validación en tiempo real
  - Feedback visual inmediato
  - Loading states durante envío
  - Cierre automático de modal

## Próximas Características (Roadmap)

- [ ] Integración con backend real
- [ ] Envío de emails de confirmación
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración para médicos
- [ ] Histórico de solicitudes del paciente
- [ ] Notificaciones push
- [ ] Descarga de órdenes en PDF
- [ ] Sistema de citas online
- [ ] Chat en vivo con especialistas
- [ ] Integración con sistemas hospitalarios

## Solución de Problemas

### El mapa no se carga
- Verifica tu conexión a internet
- Comprueba la consola del navegador (F12)
- Asegúrate de que las CDN de Leaflet estén accesibles

### El formulario no valida correctamente
- Revisa que todos los campos estén completos
- Verifica el formato del RUT (XX.XXX.XXX-X)
- Usa un teléfono móvil chileno válido (+56 9 XXXX XXXX)

### Los datos no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Revisa la consola del navegador para ver los logs
- Comprueba el Application/Storage tab en DevTools

## Seguridad

- Validación client-side (frontend)
- Sanitización de inputs
- No se almacenan datos sensibles sin encriptación
- **Nota:** Este es un proyecto frontend. Para producción, implementa validación server-side y encriptación.

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Contacto

Para consultas o soporte:
- Email: contacto@cxtrauma.cl
- Teléfono: +56 9 1234 5678
- Ubicación: Quinta Región, Chile

## Créditos

- **Mapas:** OpenStreetMap Contributors
- **Biblioteca de Mapas:** Leaflet.js
- **Diseño:** Sistema de diseño médico profesional
- **Desarrollo:** CxTrauma Team

---


-

Desarrollado con dedicación para facilitar el acceso a servicios médicos en la Quinta Región de Chile.
