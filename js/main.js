document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ RESPONSIVO ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    // Solo ejecutamos si los elementos existen en el HTML
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Opcional: Animar el ícono de hamburguesa
            mobileMenu.classList.toggle('open'); 
        });
    }

    // --- 2. SISTEMA DE COMENTARIOS (Simulación) ---
    // Hacemos la función global (window) para que el HTML la encuentre
    window.addComment = function() {
        const input = document.getElementById('comment-input');
        const list = document.getElementById('comments-list');
        
        if (input && list) { // Verificamos que existan
            if(input.value.trim() !== "") {
                const newComment = document.createElement('div');
                // Estilos directos para mantenerlo simple
                newComment.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
                newComment.style.padding = "1rem 0";
                newComment.style.animation = "fadeIn 0.5s ease"; // Un toque extra
                
                const date = new Date().toLocaleDateString();
                
                newComment.innerHTML = `
                    <div style="font-size: 0.9rem; color: #0EA5E9; margin-bottom: 0.2rem;">
                        <strong>Visitante</strong> <span style="font-size:0.8rem; color:#666;">(${date})</span>
                    </div>
                    <div style="color: #cbd5e1;">${input.value}</div>
                `;
                
                list.appendChild(newComment);
                input.value = ""; 
                // No usamos alert() porque es muy intrusivo, mejor log o nada
                console.log("Comentario agregado"); 
            } else {
                alert("Por favor escribe algo interesante.");
            }
        }
    };

    // --- 3. SISTEMA DE ACORDEÓN (EQUIPO) ---
    const toggleButtons = document.querySelectorAll('.cv-toggle');

    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Prevenir comportamientos extraños
                e.preventDefault();

                const card = button.closest('.member-card');
                const spanText = button.firstChild; // El texto dentro del botón
                
                // Toggle de la clase
                card.classList.toggle('active');

                // Lógica del texto
                if (card.classList.contains('active')) {
                    // Actualizamos solo el texto, manteniendo el span de la flecha si existe
                    // Nota: textContent reemplaza todo, así que usamos un truco seguro:
                    button.innerHTML = `Cerrar Hoja de Vida <span class="arrow-icon">▼</span>`;
                } else {
                    button.innerHTML = `Ver Hoja de Vida <span class="arrow-icon">▼</span>`;
                }
            });
        });
    }

});