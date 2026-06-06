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


    
});