// ==========================================================================
// RESUMEN ETAPA 2 (Base del Frontend)
// Autores originales: Sandy Ortíz, Albert Peña, y Alexander Tejeda.
// Descripción: En la etapa anterior se capturaron los elementos del DOM, 
// se crearon las validaciones de negocio (campos vacíos, longitud mínima) 
// y las funciones para mostrar/ocultar los errores visuales en tiempo real.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elementos del DOM (Base Etapa 2) ---
    const form = document.getElementById('bug-tracker-form');
    const emailInput = document.getElementById('reporter-email');
    const severityInput = document.getElementById('severity');
    const moduleInput = document.getElementById('module');
    const descInput = document.getElementById('description');
    const formAlert = document.getElementById('form-alert');

    // --- Funciones UI de Error (Base Etapa 2) ---
    const showError = (input, span, message) => {
        input.classList.add('input-error'); 
        span.innerHTML = message;          
    };

    const clearError = (input, span) => {
        input.classList.remove('input-error'); 
        span.innerHTML = '';                  
    };

    // ==========================================================================
    // INICIO APORTES ETAPA 3 (Integración Backend y BD)
    // ==========================================================================

    // --- Participación de Alex Santana (100074369) - ETAPA 3 ---
    // Resumen: Regex robusto actualizado según recomendación del profesor y 
    // declaración de la URL de la API Node.js para conectar con el backend.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const API_URL = 'http://localhost:3000/api/bugs';


    // --- Validaciones de Negocio (Base Etapa 2) ---
    const validateEmail = () => {
        const errorSpan = document.getElementById('email-error');
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorSpan, 'El correo es obligatorio.');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, errorSpan, 'Formato de correo incorrecto.');
            return false;
        }
        clearError(emailInput, errorSpan);
        return true;
    };

    const validateSeverity = () => {
        const errorSpan = document.getElementById('severity-error');
        if (severityInput.value === '') {
            showError(severityInput, errorSpan, 'Debes elegir la severidad del bug.');
            return false;
        }
        clearError(severityInput, errorSpan);
        return true;
    };

    const validateModule = () => {
        const errorSpan = document.getElementById('module-error');
        if (moduleInput.value.trim().length < 3) {
            showError(moduleInput, errorSpan, 'Escribe el nombre del módulo (min. 3 letras).');
            return false;
        }
        clearError(moduleInput, errorSpan);
        return true;
    };

    const validateDescription = () => {
        const errorSpan = document.getElementById('description-error');
        if (descInput.value.trim().length < 10) {
            showError(descInput, errorSpan, 'Detalla mejor el error (min. 10 caracteres).');
            return false;
        }
        clearError(descInput, errorSpan);
        return true;
    };

    // --- Eventos en tiempo real (Base Etapa 2) ---
    emailInput.addEventListener('input', validateEmail);
    severityInput.addEventListener('change', validateSeverity);
    moduleInput.addEventListener('input', validateModule);
    descInput.addEventListener('input', validateDescription);


    // --- Participación de Yocairis Pérez (100054667) - ETAPA 3 ---
    // Resumen: Función GET para consultar el historial de incidencias desde la 
    // base de datos y pintarlo dinámicamente en el panel lateral.
    const fetchAndRenderBugs = async () => {
        try {
            const response = await fetch(API_URL);
            const bugs = await response.json();
            const logContainer = document.querySelector('.system-status-panel');
            logContainer.innerHTML = '<h3>Log del Sistema (Historial BD)</h3>';
            
            if(bugs.length === 0) {
                logContainer.innerHTML += '<div class="status-alert success">Sin incidencias registradas.</div>';
                return;
            }

            bugs.forEach(bug => {
                const bugColorClass = bug.severity === 'high' ? 'status-alert' : 'status-alert success';
                const time = new Date(bug.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                logContainer.innerHTML += `
                    <div class="${bugColorClass}">
                        <strong>[${time}] Módulo ${bug.module}:</strong> ${bug.description}
                    </div>`;
            });
        } catch (error) { 
            console.error('Error al cargar historial:', error); 
        }
    };
    


    // --- Participación de Alex Santana (100074369) - ETAPA 3 ---
    // Resumen: Envío del formulario usando Fetch API (POST) para registrar
    // el nuevo bug en la base de datos de SQLite en lugar de LocalStorage.
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        if (validateEmail() && validateSeverity() && validateModule() && validateDescription()) {
            
            const newBugReport = {
                email: emailInput.value.trim(),
                severity: severityInput.value,
                module: moduleInput.value.trim(),
                description: descInput.value.trim()
            };
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newBugReport)
                });
                
                if (response.ok) {
                    formAlert.innerHTML = `<strong>¡API OK!</strong> Bug registrado en BD.`;
                    formAlert.className = 'status-alert success';
                    formAlert.classList.remove('hidden');
                    
                    form.reset(); 
                    
                    // Se ejecuta la función de Yocairis para refrescar la vista
                    if(typeof fetchAndRenderBugs === 'function') fetchAndRenderBugs(); 
                    
                    setTimeout(() => { formAlert.classList.add('hidden'); }, 4000);
                }
            } catch (error) {
                formAlert.innerHTML = `<strong>Error:</strong> Sin conexión al Backend.`;
                formAlert.className = 'status-alert';
                formAlert.classList.remove('hidden');
            }
        } else {
            formAlert.innerHTML = `<strong>Atención:</strong> Tienes errores en el formulario, revisa los campos en rojo.`;
            formAlert.className = 'status-alert';
            formAlert.classList.remove('hidden');
        }
    });

    // Carga inicial del historial al abrir la página (Aporte Yocairis)
    fetchAndRenderBugs();
});