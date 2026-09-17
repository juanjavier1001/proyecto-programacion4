// ============================================================
// NAVBAR — marcar enlace activo según la sección visible
// ============================================================

var navLinks = document.querySelectorAll('.navbar-tn .nav-link[href^="#"]');
var secciones = document.querySelectorAll('main section[id]');

function marcarSeccionActiva() {
    var seccionActual = '';

    // Recorre las secciones y detecta cuál está en el viewport
    secciones.forEach(function(seccion) {
        // 90px de offset para compensar el navbar fijo
        if (window.scrollY >= seccion.offsetTop - 90) {
            seccionActual = seccion.id;
        }
    });

    // Actualiza la clase active en los enlaces del navbar
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + seccionActual) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', marcarSeccionActiva);
marcarSeccionActiva(); // ejecutar al cargar la página


// ============================================================
// NAVBAR — cerrar menú hamburguesa en mobile al tocar un enlace
// ============================================================

var navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        // Solo actúa si el menú está abierto (modo mobile)
        if (navbarCollapse.classList.contains('show')) {
            var colapso = bootstrap.Collapse.getInstance(navbarCollapse);
            if (colapso) {
                colapso.hide();
            }
        }
    });
});


// ============================================================
// CARDS — modal reutilizable con contenido dinámico
// ============================================================

// Descripción extendida de cada funcionalidad
var detallesFuncionalidades = {
    '01': {
        titulo: 'Inventario por sucursal',
        descripcion: 'Cada sucursal tiene su propio panel de stock. Los operarios registran entradas y salidas de repuestos, y el sistema actualiza la cantidad disponible en tiempo real. Soporta múltiples categorías y permite configurar niveles de stock mínimo por ítem para detectar faltantes antes de que impacten en la operación.'
    },
    '02': {
        titulo: 'Visibilidad entre sucursales',
        descripcion: 'Desde cualquier sucursal podés consultar el inventario completo de toda la red sin llamadas ni planillas compartidas. Si un mecánico necesita un repuesto que no tiene en su depósito, puede verificar al instante en qué sucursal está disponible y coordinar una transferencia.'
    },
    '03': {
        titulo: 'Transferencias de repuestos',
        descripcion: 'Cuando una sucursal necesita un repuesto disponible en otra, genera una solicitud de transferencia. La sucursal de origen la confirma y el movimiento queda registrado automáticamente en el inventario de ambas partes, con fecha, usuario y trazabilidad completa.'
    },
    '04': {
        titulo: 'Historial de movimientos',
        descripcion: 'Accedé al registro completo de todas las entradas, salidas y transferencias de la red. Filtrá por sucursal, repuesto o período para auditar operaciones, detectar inconsistencias y tomar decisiones basadas en datos reales de consumo.'
    },
    '05': {
        titulo: 'Gestión de repuestos',
        descripcion: 'Administrá el catálogo completo de repuestos con nombre, código de referencia, categoría y proveedor asociado. Los cambios en el catálogo se aplican en todas las sucursales al instante, manteniendo la coherencia del sistema en toda la red.'
    },
    '06': {
        titulo: 'Acceso por sucursal y roles',
        descripcion: 'Cada usuario tiene acceso únicamente al módulo de su sucursal con permisos definidos según su rol. Los administradores centrales tienen vista consolidada de toda la red y pueden gestionar usuarios, roles y permisos desde un panel unificado.'
    }
};

// Elementos del modal
var modalEl      = document.getElementById('featureModal');
var modalTitulo  = document.getElementById('featureModalLabel');
var modalCuerpo  = document.getElementById('featureModalBody');
var featureModal = new bootstrap.Modal(modalEl);

// Asignar evento click a cada card
var cards = document.querySelectorAll('.feature-card[data-feature]');

cards.forEach(function(card) {
    card.addEventListener('click', function() {
        var num = card.getAttribute('data-feature');
        var detalle = detallesFuncionalidades[num];

        if (!detalle) return;

        // Modificar el contenido del modal según la card seleccionada
        modalTitulo.textContent = detalle.titulo;
        modalCuerpo.textContent = detalle.descripcion;

        featureModal.show();
    });
});