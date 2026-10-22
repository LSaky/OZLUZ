# Réplica editable de OSLUZ

Réplica estática, separada del sitio OHMLUZ original. Abre `index.html` para entrar a Inicio y usa el menú para recorrer las siete páginas.

## Páginas y código

- `index.html`: Inicio
- `personalizaciones.html`: Diseña tu prenda
- `colecciones.html`: Colecciones y galería
- `nosotros.html`: Nuestra esencia
- `cotizacion.html`: Guía y tarifas
- `contactanos.html`: Canales oficiales y atención
- `preguntas-frecuentes.html`: Acordeón interactivo
- `css/style.css`: estilos compartidos y diseño adaptable
- `js/shell.js`: navegación, búsqueda, QR/WhatsApp, encabezado e interacciones
- `assets/`: fotos de producto, imágenes de secciones, icono y QR de WhatsApp

Las fotografías adjuntas ya están organizadas en `assets/` y enlazadas desde las páginas. Si mueves una imagen, conserva la ruta relativa usada en su etiqueta `<img>` o actualiza esa ruta en el HTML.

## Funciones de contacto y venta

- La portada dirige a diseño personalizado, colecciones y cotización.
- Las tarjetas y diseños envían a WhatsApp un mensaje contextual.
- La página `cotizacion.html` incluye un cotizador que prepara el mensaje con producto, técnica, cantidad y ciudad.
- La galería de `colecciones.html` se filtra por tipo de producto.
- El acceso flotante a WhatsApp permanece disponible en todas las páginas.

El sitio no procesa pagos ni guarda pedidos: la cotización y confirmación se realizan directamente por WhatsApp.
