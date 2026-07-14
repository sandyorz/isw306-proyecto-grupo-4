# 💻 Sistema de Gestión - Desarrollo de Aplicaciones WEB

> **Proyecto Materia** > Este repositorio contiene el código fuente de nuestra aplicación web funcional, desarrollada de manera incremental cumpliendo con los estándares de diseño UI/UX, arquitectura cliente-servidor y control de versiones.

## 👥 Equipo de Desarrollo: Grupo 4

A continuación, los ingenieros e integrantes del equipo responsables de la construcción de este proyecto:

| Rol | Integrante | Matrícula |
| :---: | :--- | :--- |
| 👑 **Líder** | Camille Páez | `100074544` |
| 👨‍💻 Miembro | Albert Peña | `100037998` |
| 👨‍💻 Miembro | Sandy Ortíz | `100049907` |
| 👨‍💻 Miembro | Alexander Tejeda | `100074246` |
| 👨‍💻 Miembro | Alex Santana | `100074369` |
| 👩‍💻 Miembro | Yocairis Pérez | `100054667` |

---

## 🚀 Sobre el Proyecto (Etapa 1: Maquetación)

En esta primera fase, hemos desarrollado la base visual del **Dashboard de DevOps & QA**, implementando:

* **HTML5 Semántico:** Estructuración robusta utilizando etiquetas modernas (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`).
* **CSS3 & Diseño Responsive:** Adaptabilidad a dispositivos móviles mediante el uso de *Flexbox* y *Media Queries*, respetando los colores institucionales.
* **Control de Versiones:** Gestión colaborativa estricta mediante Git, utilizando la rama `etapa-1/maquetacion` para nuestra primera entrega.

---

## ⚡ Sobre el Proyecto (Etapa 2: Interactividad y DOM)

En esta segunda fase, dotamos a la aplicación de lógica y dinamismo, implementando las siguientes características mediante JavaScript:

* **Manipulación del DOM:** Conexión modular mediante un archivo `app.js` externo para actualizar la interfaz, mostrar alertas y gestionar clases CSS dinámicamente sin recargar la página.
* **Validaciones en Tiempo Real:** Implementación de reglas estrictas (incluyendo Expresiones Regulares para el correo) para evaluar los datos ingresados en el formulario mientras el usuario teclea (eventos `input` y `change`).
* **Persistencia de Datos:** Uso de arreglos de objetos y `LocalStorage` para guardar, recuperar y almacenar el historial de incidencias en el navegador del usuario en formato JSON.
* **Flujo de Git Avanzado:** Integración de los aportes de todos los miembros del equipo utilizando la rama `etapa-2/interactividad`, resolviendo conflictos y documentando cada paso en el historial de commits.

---

## ⚙️ Sobre el Proyecto (Etapa 3: Backend y Persistencia Relacional)

En esta tercera fase, escalamos la aplicación hacia una arquitectura **Full-Stack (Cliente-Servidor)**, eliminando la dependencia del almacenamiento local del navegador y migrando el sistema a un entorno controlado:

* **Entorno de Servidor (Backend):** Construcción de una API REST utilizando **Node.js** y el framework **Express**, encargada de procesar las peticiones HTTP seguras y deserializar payloads JSON.
* **Persistencia de Datos Real (SQL):** Integración de un motor de bases de datos relacionales embebido mediante **SQLite**, automatizando el esquema estructural a través de scripts de inicialización de datos.
* **Consumo Asíncrono de API (Fetch Model):** Refactorización del flujo del Frontend utilizando la API nativa de JavaScript (`async/await`), logrando el desacoplamiento total del almacenamiento mediante llamadas transaccionales `GET` y `POST`.
* **Optimización Basada en Feedback:** Implementación de expresiones regulares de validación más robustas para dominios internacionales de nivel superior (TLD) y renderizado reactivo dinámico del historial de logs en el DOM lateral.

---

## 🔐 Sobre el Proyecto (Etapa 4: Autenticacion, CRUD, KPIs y UX Profesional)

En esta cuarta fase evolucionamos la aplicacion hacia un sistema completo con autenticacion, operaciones CRUD, metricas en tiempo real y una experiencia de usuario tipo dashboard profesional.

**Seguridad (Alternativa B):** Sistema completamente oculto hasta iniciar sesion. Solo la pantalla de login es visible sin autenticacion.

**UX Profesional (mejora evolutiva sobre Etapa 3):** La interfaz fue redisenada para comportarse como un dashboard moderno:
- Header fijo siempre visible durante la navegacion.
- Sidebar izquierdo sticky con scroll interno oculto (solo cuando excede altura).
- Panel derecho (Log del Sistema) sticky con scroll interno oculto.
- Scroll natural solo en el contenido central (KPIs + formulario + tabla).
- Sin scrollbars visibles en los paneles laterales.
- El footer permanece al final real del contenido.
- Comportamiento responsive: en pantallas pequenas se desactiva el layout fijo.

**Identidad visual del usuario autenticado:** Badge compacto en el header con icono de perfil, nombre de usuario y rol ("Administrador"). El estado "Invitado / Sin sesion" se muestra cuando no hay autenticacion. El boton "Cerrar Sesion" aparece integrado en el badge.

### Funcionalidades implementadas

* **Autenticacion por Sesiones:** `express-session` para control de acceso. Pantalla de login fullscreen con fondo institucional. Dashboard solo accesible tras autenticacion exitosa.
* **CRUD Completo:** GET con filtros (`?severity=`, `?module=`, `?limit=`), POST, PUT y DELETE. Endpoints de escritura protegidos por middleware `requireAuth`.
* **KPIs Dinamicos:** Endpoint `GET /api/kpis` con total, bugs criticos, incidencias del dia y modulos afectados. Tarjetas se actualizan en tiempo real.
* **Gestion desde el Frontend:** Tabla completa con edicion (carga datos en formulario) y eliminacion con confirmacion. Barra de filtros. Todo detras de autenticacion.

### Flujo de navegacion

```
Sin sesion:  [ Pantalla de Login ] → Sin acceso al sistema
Login:       Login exitoso → Sesion creada → Dashboard completo visible
             • Header fijo con badge de usuario (icono + admin + Administrador)
             • Sidebar sticky, panel derecho sticky
             • Solo contenido central scrollea
             • KPIs, formulario, filtros, tabla visibles
Logout:      Sesion destruida → Dashboard se oculta → Solo login visible
```

### Distribucion del Trabajo - Etapa 4

| Integrante | Matricula | Aporte |
| :--- | :--- | :--- |
| Camille Paez | 100074544 | README, ETAPA4_NOTAS_EQUIPO.txt, .gitignore, coordinacion |
| Albert Pena | 100037998 | Autenticacion (express-session, login/logout, middleware) |
| **Sandy Ortiz** | **100049907** | **Infraestructura (Express static), VPN, Responsive Core, Integracion Final, CRUD Backend** |
| Alexander Tejeda | 100074246 | Endpoint y frontend de KPIs dinamicos |
| Alex Santana | 100074369 | Frontend login/logout, filtros, modo edicion formulario, badge de usuario, responsive UX |
| Yocairis Perez | 100054667 | Tabla de gestion, editar/eliminar, layout profesional, estilos CSS, responsive dashboard/tabla |

---

## 🛠️ Instrucciones de Instalacion y Ejecucion

Para clonar, configurar y ejecutar la aplicacion completa en tu entorno local, ejecuta la siguiente secuencia de comandos:

1. **Instalación de paquetes de Node:**
   ```bash
   npm install
   ```
2. **Inicialización del Servidor (Express sirve frontend + backend):**
    ```bash
    npm start
    ```
    O manualmente:
    ```bash
    node server.js
    ```

3. **Abrir en el navegador:**
    ```
    http://localhost:3000
    ```

    Para acceso desde otros dispositivos en la misma red o mediante Tailscale:
    ```
    http://IP_DEL_SERVIDOR:3000
    ```

**Nota:** Ya no es necesario usar Live Server. Express sirve tanto la API como los archivos estaticos del frontend (index.html, app.js, style.css).

---

## 🏗️ Evolucion de la Arquitectura

### Etapa Inicial (Etapa 3)

- **Frontend:** Servido mediante Live Server (puerto 5500) desde VS Code.
- **Backend:** Servido mediante Express (puerto 3000).
- **CORS:** Necesario por ser origenes cruzados (Live Server → Express).
- **Conexion Frontend-Backend:** URL hardcodeada a `http://localhost:3000`.

### Etapa 4 (Arquitectura Unificada)

- **Frontend:** Servido directamente por Express como archivos estaticos.
- **Backend:** Servido por Express en el mismo puerto.
- **Live Server:** Eliminado. Ya no es dependencia.
- **CORS:** Simplificado. Mismo origen.
- **Conexion Frontend-Backend:** Dinamica mediante `window.location.origin`.

### Beneficios

| Aspecto | Antes (Live Server) | Despues (Express unificado) |
| :--- | :--- | :--- |
| **Complejidad** | Dos servidores, CORS | Un solo servidor |
| **Dependencias** | Requiere Live Server VS Code | Solo Node.js |
| **Configuracion** | URL hardcodeada `localhost:3000` | Dinamica (local, red, VPN) |
| **Acceso remoto** | No compatible sin reconfigurar | Funciona con IP local o Tailscale |
| **Despliegue** | Manual (Live Server + node) | Un solo comando: `npm start` |

### Compatibilidad VPN / Tailscale

La aplicacion puede ejecutarse en un equipo y ser accedida desde:

- **localhost:** `http://localhost:3000`
- **Red local:** `http://192.168.x.x:3000`
- **Tailscale:** `http://100.x.x.x:3000`

No se requiere configuracion adicional. La API_BASE se resuelve automaticamente.

---

## 🔐 Credenciales de Acceso

| Usuario | Contrasena | Rol |
| :--- | :--- | :--- |
| `admin` | `grupo4` | Administrador |

---

## 🅱️ Framework CSS Utilizado

Durante la Etapa 4 se realizó una evaluacion tecnica de Bootstrap como framework CSS para la interfaz.

Debido a que durante la propia Etapa 4 se construyo:
- Un sistema de layout profesional completo (header fijo, sidebar sticky, panel sticky)
- Un sistema responsive con 3 breakpoints y menu hamburguesa con animacion
- Una tabla adaptable a formato tarjetas en moviles
- Animaciones, tooltips y microinteracciones

todo ello mediante CSS custom (~900 lineas nuevas en Etapa 4), se descarto una migracion completa a Bootstrap por su alto riesgo de regresion sobre funcionalidad existente y probada.

Se opto por una **integracion parcial** que permite cumplir el requisito academico sin comprometer la estabilidad del sistema:

| Componente Bootstrap | Uso en el proyecto |
| :--- | :--- |
| **Bootstrap Icons** | Reemplazo de emoji de usuario por icono vectorial profesional (`bi-person-circle`) |
| **Bootstrap Modal** | Confirmacion de eliminacion de incidencias, reemplazando el `confirm()` nativo de JavaScript |

### CDN incorporados

```html
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
<!-- Bootstrap JS (Modal) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

---

## 📱 Compatibilidad Responsive

La interfaz se adapta a tres rangos de pantalla:

| Rango | Dispositivo | Comportamiento |
| :--- | :--- | :--- |
| > 900px | Desktop | Layout completo de 3 columnas |
| 481px - 900px | Tablet | Layout de una columna, sidebar horizontal, KPIs en grid |
| ≤ 480px | Telefono | Menu hamburguesa, tabla en formato tarjetas, controles touch-friendly |

© 2026 - Desarrollo de Aplicaciones WEB | Proyecto Materia