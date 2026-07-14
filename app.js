// ==========================================================================
// PARTICIPACION ETAPA 2 (Base Frontend)
// Sandy Ortiz, Albert Pena, Alexander Tejeda - DOM, validaciones, UI.
// ==========================================================================
// PARTICIPACION ETAPA 3
// Alex Santana (100074369) - Regex robusto, API_URL, envio POST.
// Yocairis Perez (100054667) - GET historial, renderizado en panel lateral.
// ==========================================================================
// PARTICIPACION ETAPA 4
// Alex Santana (100074369) - Login/logout, filtros, modo edicion formulario,
//   indicador de sesion (user-badge con nombre, rol y avatar).
// Yocairis Perez (100054667) - Tabla de gestion, editar/eliminar bugs,
//   layout profesional: header fijo, sidebar/aside sticky, scroll optimizado.
// Alexander Tejeda (100074246) - KPIs dinamicos fetch y render.
// ==========================================================================
// ===== ETAPA 4 | Sandy Ortiz | Infraestructura =====
// API_BASE dinámica para compatibilidad con VPN / Tailscale.
// ===== FIN ETAPA 4 | Sandy Ortiz =====

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('bug-tracker-form');
    const emailInput = document.getElementById('reporter-email');
    const severityInput = document.getElementById('severity');
    const moduleInput = document.getElementById('module');
    const descInput = document.getElementById('description');
    const formAlert = document.getElementById('form-alert');
    const submitBtn = document.getElementById('submit-btn');

    // ===== ETAPA 4 | Sandy Ortiz | VPN =====
    const API_BASE = window.location.origin;
    // ===== FIN ETAPA 4 | Sandy Ortiz =====
    const API_URL = API_BASE + '/api/bugs';

    let currentUser = null;
    let editingBugId = null;
    let isDeleting = false;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const showError = (input, span, message) => {
        input.classList.add('input-error');
        span.innerHTML = message;
    };

    const clearError = (input, span) => {
        input.classList.remove('input-error');
        span.innerHTML = '';
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
            showError(moduleInput, errorSpan, 'Escribe el nombre del modulo (min. 3 letras).');
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

    emailInput.addEventListener('input', validateEmail);
    severityInput.addEventListener('change', validateSeverity);
    moduleInput.addEventListener('input', validateModule);
    descInput.addEventListener('input', validateDescription);

    // ===== ETAPA 4 | Alex Santana | Login/Logout =====
    // Alternativa B: sistema completamente oculto hasta autenticarse.
    // Mejora evolutiva Etapa 4: header fijo, sidebar/aside sticky,
    // scroll solo en contenido central, badge de usuario autenticado.

 async function checkSession() {
        try {
            const res = await fetch(API_BASE + '/api/session', { credentials: 'include' });
            const data = await res.json();
            if (data.authenticated) {
                currentUser = data.user;
                showManagementUI();
                requestAnimationFrame(() => {
                    document.getElementById('app-container').classList.add('dashboard-entered');
                });
            }
        } catch (e) { /* servidor no disponible */ }
    }

    async function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        const errorEl = document.getElementById('login-error');
        const loginBtn = document.querySelector('#login-form .btn-primary');
        try {
            loginBtn.disabled = true;
            loginBtn.textContent = 'Ingresando...';
            const res = await fetch(API_BASE + '/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                currentUser = data.user;
                errorEl.innerHTML = '';
                const loginSection = document.getElementById('login-section');
                const container = document.getElementById('app-container');
                container.classList.remove('hidden');
                document.getElementById('user-display').textContent = currentUser.username;
                document.getElementById('user-role').textContent = 'Administrador';
                document.getElementById('logout-btn').classList.remove('hidden');
                document.getElementById('filter-section').classList.remove('hidden');
                document.getElementById('bugs-section').classList.remove('hidden');
                fetchAndRenderAllBugs();
                fetchAndRenderRecentBugs();
                fetchAndRenderKPIs();
                loginSection.classList.add('login-fade-out');
                await sleep(350);
                loginSection.classList.add('hidden');
                loginSection.classList.remove('login-fade-out');
                requestAnimationFrame(() => {
                    container.classList.add('dashboard-entered');
                });
            } else {
                errorEl.innerHTML = data.error || 'Credenciales invalidas';
            }
        } catch (e) {
            errorEl.innerHTML = 'Error de conexion con el servidor';
        }
        loginBtn.disabled = false;
        loginBtn.textContent = 'Ingresar';
    }

    async function handleLogout() {
        const container = document.getElementById('app-container');
        const loginSection = document.getElementById('login-section');
        container.classList.add('dashboard-fade-out');
        await sleep(300);
        try {
            await fetch(API_BASE + '/api/logout', {
                method: 'POST', credentials: 'include'
            });
        } catch (e) { /* ignorar */ }
        currentUser = null;
        hideManagementUI();
        loginSection.classList.add('login-fade-in');
        await sleep(350);
        container.classList.remove('dashboard-fade-out', 'dashboard-entered');
        loginSection.classList.remove('login-fade-in');
    }

    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    // ===== ETAPA 4 | Alex Santana | User Badge y Management UI =====
    // Mejora visual: muestra icono, nombre de usuario y rol "Administrador"
    // cuando hay sesion activa; "Invitado / Sin sesion" cuando no.


    // ===== FIN ETAPA 4 | Alex Santana =====

    // --- Yocairis Perez (ETAPA 3) - Aside panel (recent 5) ---

    async function fetchAndRenderRecentBugs() {
        try {
            const response = await fetch(API_URL + '?limit=5');
            const bugs = await response.json();
            const container = document.getElementById('aside-log-container');
            const loading = document.getElementById('aside-loading');
            loading.classList.add('hidden');
            container.innerHTML = '';
            if (bugs.length === 0) {
                container.innerHTML = '<div class="status-alert success">Sin incidencias registradas.</div>';
                return;
            }
            bugs.forEach(bug => {
                const cls = bug.severity === 'high' ? 'status-alert' : 'status-alert success';
                const utcDateStr = bug.created_at.replace(' ', 'T') + 'Z';
                const time = new Date(utcDateStr).toLocaleTimeString('es-DO', {
                    hour: '2-digit', minute: '2-digit',
                    timeZone: 'America/Santo_Domingo'
                });
                container.innerHTML += `
                    <div class="${cls}">
                        <strong>[${time}] Modulo ${bug.module}:</strong> ${bug.description}
                    </div>`;
            });
        } catch (error) {
            console.error('Error al cargar historial:', error);
        }
    }

    // --- Yocairis Perez (ETAPA 4) - Tabla de gestion de bugs ---

    async function fetchAndRenderAllBugs() {
        try {
            const severity = document.getElementById('filter-severity').value;
            const module = document.getElementById('filter-module').value.trim();
            let url = API_URL;
            const params = [];
            if (severity) params.push('severity=' + encodeURIComponent(severity));
            if (module) params.push('module=' + encodeURIComponent(module));
            if (params.length) url += '?' + params.join('&');

            const response = await fetch(url);
            const bugs = await response.json();
            const tbody = document.getElementById('bugs-tbody');
            const empty = document.getElementById('bugs-empty');
            tbody.innerHTML = '';
            if (bugs.length === 0) {
                empty.classList.remove('hidden');
                return;
            }
            empty.classList.add('hidden');
            bugs.forEach(bug => {
                const tr = document.createElement('tr');
                const severityLabel = { low: 'Baja', medium: 'Media', high: 'Alta' };
                const severityBadge = bug.severity === 'high' ? 'badge-red' :
                    bug.severity === 'medium' ? 'badge-yellow' : 'badge-green';
                const fecha = bug.created_at ? bug.created_at.replace('T', ' ').slice(0, 16) : '-';
                // ===== ETAPA 4 | Yocairis Perez | Tabla Responsive =====
                tr.innerHTML = `
                    <td data-label="ID">${bug.id}</td>
                    <td data-label="Severidad"><span class="badge ${severityBadge}">${severityLabel[bug.severity] || bug.severity}</span></td>
                    <td data-label="Modulo">${bug.module}</td>
                    <td data-label="Descripcion" class="td-desc">${bug.description}</td>
                    <td data-label="Email">${bug.email}</td>
                    <td data-label="Fecha">${fecha}</td>
                    <td data-label="Acciones" class="td-actions">
                        <button class="btn-edit" data-id="${bug.id}">Editar</button>
                        <button class="btn-delete" data-id="${bug.id}">Eliminar</button>
                    </td>`;
                // ===== FIN ETAPA 4 | Yocairis Perez =====
                tbody.appendChild(tr);
            });
            document.querySelectorAll('.btn-edit').forEach(btn => {
                btn.addEventListener('click', () => editBug(parseInt(btn.dataset.id)));
            });
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', () => deleteBug(parseInt(btn.dataset.id)));
            });
        } catch (error) {
            console.error('Error al cargar incidencias:', error);
        }
    }

    // --- Yocairis Perez (ETAPA 4) - Editar y eliminar bugs ---

    function editBug(id) {
        fetch(API_URL + '/' + id)
            .then(r => r.json())
            .then(bug => {
                emailInput.value = bug.email;
                severityInput.value = bug.severity;
                moduleInput.value = bug.module;
                descInput.value = bug.description;
                editingBugId = bug.id;
                submitBtn.textContent = 'Actualizar Incidencia #' + bug.id;
                formAlert.innerHTML = '';
                formAlert.className = 'hidden';
                form.scrollIntoView({ behavior: 'smooth', block: 'center' });
                form.classList.add('editing-mode');
                setTimeout(() => form.classList.remove('editing-mode'), 3000);
            })
            .catch(err => console.error('Error al obtener bug:', err));
    }

    // ===== ETAPA 4 | Sandy Ortiz | Bootstrap Modal =====
    let pendingDeleteId = null;
    const deleteModalEl = document.getElementById('delete-confirm-modal');
    const deleteConfirmBtn = document.getElementById('delete-confirm-btn');

    if (deleteConfirmBtn && deleteModalEl) {
        deleteConfirmBtn.addEventListener('click', () => {
            if (pendingDeleteId !== null) {
                const id = pendingDeleteId;
                pendingDeleteId = null;
                const modal = bootstrap.Modal.getInstance(deleteModalEl);
                if (modal) modal.hide();
                executeDelete(id);
            }
        });

        deleteModalEl.addEventListener('hidden.bs.modal', () => {
            pendingDeleteId = null;
        });
    }

    function showDeleteModal(id) {
        if (isDeleting) return;
        pendingDeleteId = id;
        document.getElementById('delete-confirm-id').textContent = '#' + id;
        const modal = new bootstrap.Modal(deleteModalEl);
        modal.show();
    }

    async function executeDelete(id) {
        isDeleting = true;
        const btn = document.querySelector(`.btn-delete[data-id="${id}"]`);
        const row = btn?.closest('tr');
        if (row) {
            row.classList.add('deleting-row');
            await new Promise(r => {
                row.addEventListener('animationend', r, { once: true });
                setTimeout(r, 500);
            });
        }
        try {
            const res = await fetch(API_URL + '/' + id, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                fetchAndRenderAllBugs();
                fetchAndRenderRecentBugs();
                fetchAndRenderKPIs();
            } else {
                const data = await res.json();
                alert('Error: ' + (data.error || 'No autorizado'));
                fetchAndRenderAllBugs();
            }
        } catch (err) {
            console.error('Error al eliminar:', err);
            fetchAndRenderAllBugs();
        }
        isDeleting = false;
    }

    function deleteBug(id) {
        showDeleteModal(id);
    }
    // ===== FIN ETAPA 4 | Sandy Ortiz =====

    // ===== ETAPA 4 | Alex Santana | Filtros =====
 document.getElementById('filter-btn').addEventListener('click', fetchAndRenderAllBugs);
    document.getElementById('filter-reset-btn').addEventListener('click', () => {
        document.getElementById('filter-severity').value = '';
        document.getElementById('filter-module').value = '';
        fetchAndRenderAllBugs();
    });
    // ===== FIN ETAPA 4 | Alex Santana =====

    // ===== ETAPA 4 | Alexander Tejeda | KPIs dinamicos =====


    // ===== FIN ETAPA 4 | Alexander Tejeda =====

    // ===== ETAPA 4 | Alex Santana | Formulario POST/PUT =====
form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateEmail() && validateSeverity() && validateModule() && validateDescription()) {

            const bugData = {
                email: emailInput.value.trim(),
                severity: severityInput.value,
                module: moduleInput.value.trim(),
                description: descInput.value.trim()
            };

            try {
                let response;
                if (editingBugId) {
                    response = await fetch(API_URL + '/' + editingBugId, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(bugData)
                    });
                } else {
                    response = await fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bugData)
                    });
                }

                if (response.ok) {
                    const msg = editingBugId ? 'Bug actualizado en BD.' : 'Bug registrado en BD.';
                    formAlert.innerHTML = '<strong>✔ Exito!</strong> ' + msg;
                    formAlert.className = 'status-alert success';
                    formAlert.classList.remove('hidden', 'alert-hiding');

                    form.reset();
                    editingBugId = null;
                    submitBtn.textContent = 'Registrar Incidencia';

                    fetchAndRenderRecentBugs();
                    fetchAndRenderKPIs();
                    if (currentUser) fetchAndRenderAllBugs();

                    setTimeout(() => {
                        formAlert.classList.add('alert-hiding');
                        setTimeout(() => {
                            formAlert.classList.add('hidden');
                            formAlert.classList.remove('alert-hiding');
                        }, 250);
                    }, 3000);
                } else {
                    const errData = await response.json();
                    formAlert.innerHTML = '<strong>Error:</strong> ' + (errData.error || 'Error del servidor');
                    formAlert.className = 'status-alert';
                    formAlert.classList.remove('hidden');
                }
            } catch (error) {
                formAlert.innerHTML = '<strong>Error:</strong> Sin conexion al Backend.';
                formAlert.className = 'status-alert';
                formAlert.classList.remove('hidden');
            }
        } else {
            formAlert.innerHTML = '<strong>Atencion:</strong> Tienes errores en el formulario, revisa los campos en rojo.';
            formAlert.className = 'status-alert';
            formAlert.classList.remove('hidden');
        }
    });

    // ===== FIN ETAPA 4 | Alex Santana =====

    // ===== ETAPA 4 | Alexander Tejeda | Inicializacion =====


    // ===== FIN ETAPA 4 | Alexander Tejeda =====

    // ===== ETAPA 4 | Sandy Ortiz | Responsive Core =====
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function closeSidebar() {
        if (sidebarNav) sidebarNav.classList.remove('sidebar-open');
        if (hamburgerBtn) hamburgerBtn.classList.remove('is-active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    function openSidebar() {
        if (sidebarNav) sidebarNav.classList.add('sidebar-open');
        if (hamburgerBtn) hamburgerBtn.classList.add('is-active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
    }

    function toggleSidebar() {
        if (sidebarNav && sidebarNav.classList.contains('sidebar-open')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    if (hamburgerBtn && sidebarNav) {
        hamburgerBtn.addEventListener('click', toggleSidebar);
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', closeSidebar);
        }
        // Cerrar al hacer scroll
        window.addEventListener('scroll', closeSidebar, { passive: true });
        // Cerrar con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSidebar();
        });
    }
    // ===== FIN ETAPA 4 | Sandy Ortiz =====
});
