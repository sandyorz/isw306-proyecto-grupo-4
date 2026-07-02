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

## 🛠️ Instrucciones de Instalación y Despliegue Local

Para clonar, configurar y ejecutar el ecosistema completo en tu entorno local, ejecuta la siguiente secuencia de comandos en tu consola de comandos:

1. **Instalación de paquetes de Node de la aplicación:**
   ```bash
   npm install
   ```
2. **Inicialización del Servidor Backend (Puerto 3000):**
    ```Bash
    node server.js
    ```

Despliegue del Servidor Web Frontend:

    Abre el archivo index.html utilizando la extensión Live Server desde Visual Studio Code para simular el origen cruzado y prevenir restricciones de seguridad (CORS).

© 2026 - Desarrollo de Aplicaciones WEB | Proyecto Materia
