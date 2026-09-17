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


// ============================================================
// DASHBOARD INTERACTIVO — datos simulados por sucursal
// ============================================================

var datosSucursales = {
    'centro': {
        totalRepuestos: 247,
        stockBajo: 12,
        transferencias: 4,
        repuestos: [
            { nombre: 'Filtro de aceite Bosch', cantidad: 42, estado: 'ok'        },
            { nombre: 'Pastilla de freno',       cantidad: 3,  estado: 'bajo'      },
            { nombre: 'Bujías NGK',              cantidad: 18, estado: 'ok'        },
            { nombre: 'Correa dentada',          cantidad: 0,  estado: 'sin-stock' }
        ]
    },
    'norte': {
        totalRepuestos: 183,
        stockBajo: 5,
        transferencias: 2,
        repuestos: [
            { nombre: 'Aceite motor 10W40',     cantidad: 24, estado: 'ok'        },
            { nombre: 'Filtro de aire',         cantidad: 2,  estado: 'bajo'      },
            { nombre: 'Amortiguador delantero', cantidad: 0,  estado: 'sin-stock' },
            { nombre: 'Disco de freno',         cantidad: 11, estado: 'ok'        }
        ]
    },
    'sur': {
        totalRepuestos: 319,
        stockBajo: 8,
        transferencias: 7,
        repuestos: [
            { nombre: 'Bujías NGK',             cantidad: 35, estado: 'ok'   },
            { nombre: 'Correa de distribución', cantidad: 4,  estado: 'bajo' },
            { nombre: 'Filtro de aceite Bosch', cantidad: 19, estado: 'ok'   },
            { nombre: 'Sensor de oxígeno',      cantidad: 1,  estado: 'bajo' }
        ]
    }
};

// Datos de ejemplo para las demás vistas del sidebar
var datosVistas = {
    'sucursales': {
        kpis: [
            { valor: '3',   clase: '',              etiqueta: 'Sucursales'  },
            { valor: '3',   clase: 'kpi-val--info', etiqueta: 'Conectadas'  },
            { valor: '749', clase: 'kpi-val--info', etiqueta: 'Red total'   }
        ],
        encabezados: ['Sucursal', 'Stock', 'Estado'],
        filas: [
            ['Suc. Centro', '247', { texto: 'Activa', clase: 'status-ok' }],
            ['Suc. Norte',  '183', { texto: 'Activa', clase: 'status-ok' }],
            ['Suc. Sur',    '319', { texto: 'Activa', clase: 'status-ok' }]
        ]
    },
    'transferencias': {
        kpis: [
            { valor: '2',  clase: 'kpi-val--warn', etiqueta: 'Pendientes'  },
            { valor: '11', clase: '',               etiqueta: 'Completadas' },
            { valor: '13', clase: 'kpi-val--info',  etiqueta: 'Este mes'   }
        ],
        encabezados: ['Repuesto', 'Cant.', 'Estado'],
        filas: [
            ['Filtro aceite Bosch', '5',  { texto: 'Completada', clase: 'status-ok'  }],
            ['Pastilla de freno',   '2',  { texto: 'Pendiente',  clase: 'status-low' }],
            ['Bujías NGK',          '10', { texto: 'Completada', clase: 'status-ok'  }],
            ['Correa dentada',      '3',  { texto: 'Pendiente',  clase: 'status-low' }]
        ]
    },
    'reportes': {
        kpis: [
            { valor: '749', clase: '',              etiqueta: 'Repuestos'   },
            { valor: '58',  clase: 'kpi-val--info', etiqueta: 'Movimientos' },
            { valor: '5',   clase: 'kpi-val--warn', etiqueta: 'Alertas'     }
        ],
        encabezados: ['Módulo', 'Este mes', 'Estado'],
        filas: [
            ['Inventario',     '34', { texto: 'Normal',  clase: 'status-ok'  }],
            ['Transferencias', '13', { texto: 'Normal',  clase: 'status-ok'  }],
            ['Stock bajo',     '5',  { texto: 'Alerta',  clase: 'status-low' }],
            ['Sin stock',      '2',  { texto: 'Crítico', clase: 'status-out' }]
        ]
    },
    'usuarios': {
        kpis: [
            { valor: '8', clase: '',              etiqueta: 'Usuarios' },
            { valor: '7', clase: 'kpi-val--info', etiqueta: 'Activos'  },
            { valor: '2', clase: '',              etiqueta: 'Admins'   }
        ],
        encabezados: ['Usuario', 'Sucursal', 'Rol'],
        filas: [
            ['admin@red.com',  'Todas',  { texto: 'Admin',    clase: 'status-ok' }],
            ['centro@red.com', 'Centro', { texto: 'Operario', clase: 'status-ok' }],
            ['norte@red.com',  'Norte',  { texto: 'Operario', clase: 'status-ok' }],
            ['sur@red.com',    'Sur',    { texto: 'Operario', clase: 'status-ok' }]
        ]
    }
};

var sucursalActual = 'centro';
var vistaActual    = 'inventario';

// Actualiza KPIs, encabezados y filas con cualquier conjunto de datos
function renderizarContenido(kpis, encabezados, filas) {
    var kpiIds    = ['kpi-total', 'kpi-bajo', 'kpi-transferencias'];
    var labelIds  = ['kpi-label-1', 'kpi-label-2', 'kpi-label-3'];

    kpis.forEach(function(kpi, i) {
        var valEl   = document.getElementById(kpiIds[i]);
        var labelEl = document.getElementById(labelIds[i]);
        valEl.className   = 'kpi-val ' + kpi.clase;
        valEl.textContent = kpi.valor;
        labelEl.textContent = kpi.etiqueta;
    });

    // Actualizar encabezados de la tabla
    var hd = document.getElementById('mockup-tabla-hd');
    hd.innerHTML = '';
    encabezados.forEach(function(texto) {
        var span = document.createElement('span');
        span.textContent = texto;
        hd.appendChild(span);
    });

    // Actualizar filas
    var tabla = document.getElementById('mockup-tabla');
    tabla.innerHTML = '';
    filas.forEach(function(fila) {
        var div = document.createElement('div');
        div.className = 'mockup-row';
        div.innerHTML =
            '<span class="row-name">' + fila[0] + '</span>' +
            '<span class="row-qty">'  + fila[1] + '</span>' +
            '<span class="row-status ' + fila[2].clase + '">' + fila[2].texto + '</span>';
        tabla.appendChild(div);
    });
}

// Muestra los datos de inventario de la sucursal seleccionada
function actualizarDashboard(clave) {
    var sucursal = datosSucursales[clave];
    if (!sucursal) return;

    sucursalActual = clave;

    var kpis = [
        { valor: sucursal.totalRepuestos, clase: '',              etiqueta: 'Repuestos'     },
        { valor: sucursal.stockBajo,      clase: 'kpi-val--warn', etiqueta: 'Stock bajo'    },
        { valor: sucursal.transferencias, clase: 'kpi-val--info', etiqueta: 'Transferencias'}
    ];

    var filas = sucursal.repuestos.map(function(item) {
        var estadoClase, estadoTexto;
        if (item.estado === 'ok') {
            estadoClase = 'status-ok';  estadoTexto = 'OK';
        } else if (item.estado === 'bajo') {
            estadoClase = 'status-low'; estadoTexto = 'Bajo';
        } else {
            estadoClase = 'status-out'; estadoTexto = 'Sin stock';
        }
        return [item.nombre, item.cantidad, { texto: estadoTexto, clase: estadoClase }];
    });

    renderizarContenido(kpis, ['Repuesto', 'Cant.', 'Estado'], filas);
}

// Inicializar con Inventario / Suc. Centro al cargar la página
actualizarDashboard('centro');

// Evento: cambio de sucursal (solo aplica en vista Inventario)
document.getElementById('selector-sucursal').addEventListener('change', function() {
    if (vistaActual === 'inventario') {
        actualizarDashboard(this.value);
    }
});


// ============================================================
// DASHBOARD — navegación entre vistas del sidebar
// ============================================================

var navItems = document.querySelectorAll('.mockup-nav[data-vista]');

navItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // Quitar active de todos los ítems del sidebar
        navItems.forEach(function(n) { n.classList.remove('active'); });
        item.classList.add('active');

        vistaActual = item.getAttribute('data-vista');

        if (vistaActual === 'inventario') {
            actualizarDashboard(sucursalActual);
        } else {
            var datos = datosVistas[vistaActual];
            renderizarContenido(datos.kpis, datos.encabezados, datos.filas);
        }
    });
});