// --- Parte 1: Participación de Sandy Ortíz (100049907) ---
// Resumen: Aquí agarré los elementos principales del DOM usando sus IDs para manipularlos 
// y preparé la expresión regular para validar el correo del reportador.

document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('bug-tracker-form');
    const emailInput = document.getElementById('reporter-email');
    const severityInput = document.getElementById('severity');
    const moduleInput = document.getElementById('module');
    const descInput = document.getElementById('description');
    const formAlert = document.getElementById('form-alert');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


     // --- Parte 4: Participación de Alex Santana (100074369) ---
    // Resumen: Me encargué de detener el submit por defecto, guardar los datos en 
    // LocalStorage con arreglos y mostrar la alerta verde si todo sale bien.
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const isEmailValid = validateEmail();
        const isSeverityValid = validateSeverity();
        const isModuleValid = validateModule();
        const isDescValid = validateDescription();

        if (isEmailValid && isSeverityValid && isModuleValid && isDescValid) {
            
            const newBugReport = {
                id: Date.now(),
                email: emailInput.value.trim(),
                severity: severityInput.value,
                module: moduleInput.value.trim(),
                description: descInput.value.trim(),
                date: new Date().toLocaleDateString()
            };

            let ticketsArray = JSON.parse(localStorage.getItem('bugTickets')) || [];
            ticketsArray.push(newBugReport);
            localStorage.setItem('bugTickets', JSON.stringify(ticketsArray));
            
            formAlert.innerHTML = `<strong>¡Perfecto!</strong> El bug en ${newBugReport.module} fue registrado con éxito.`;
            formAlert.className = 'status-alert success';
            formAlert.classList.remove('hidden');
            
            form.reset(); 
            
            setTimeout(() => { formAlert.classList.add('hidden'); }, 4000);
            
        } else {
            formAlert.innerHTML = `<strong>Atención:</strong> Tienes errores en el formulario, revisa los campos en rojo.`;
            formAlert.className = 'status-alert';
            formAlert.classList.remove('hidden');
        }
    });
});