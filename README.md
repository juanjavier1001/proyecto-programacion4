# TallerNet

Sistema de gestión de inventario para redes de talleres mecánicos, desarrollado como proyecto de la materia Programación 4.

TallerNet centraliza el stock de repuestos por sucursal, permite consultar disponibilidad en toda la red y registra transferencias entre sucursales.

---

## Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5.3.3

---

## Estructura del proyecto

```
proyecto-programacion4/
├── index.html       # Página principal
├── style.css        # Estilos globales con variables CSS
├── script.js        # JavaScript: interactividad y DOM
└── README.md
```

---

## Secciones

- **Inicio** — Hero con dashboard interactivo de demo. Permite cambiar de sucursal y navegar entre vistas (Inventario, Sucursales, Transferencias, Reportes, Usuarios).
- **Plataforma** — Diagrama comparativo "Sin TallerNet / Con TallerNet" y descripción del problema que resuelve.
- **Funcionalidades** — 6 cards interactivas. Al hacer click se abre un modal con información ampliada de cada módulo.
- **Contacto** — Formulario de contacto para solicitar demo.

---

## Funcionalidades JavaScript

- Navbar activo según sección visible al hacer scroll
- Cierre automático del menú hamburguesa en mobile al tocar un enlace
- Dashboard interactivo: selector de sucursal actualiza KPIs y tabla de repuestos en tiempo real
- Navegación entre vistas del sidebar del dashboard con datos simulados por vista
- Modal dinámico reutilizable en las cards de funcionalidades: título y contenido cambian según la card seleccionada

---

## Equipo

- Juan Javier Cordero
- Lucas Cordero
- Leandro Valdez

---

## Cómo visualizar el proyecto

Abrí `index.html` directamente en el navegador o usá la extensión **Live Server** en VS Code.
