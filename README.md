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
- `js/customizer.js`: selección de prenda, colores, vista previa y cotización
- `assets/`: imágenes de secciones, icono y QR de WhatsApp

Las fotografías adjuntas ya están organizadas en `assets/` y enlazadas desde las páginas. Si mueves una imagen, conserva la ruta relativa usada en su etiqueta `<img>` o actualiza esa ruta en el HTML.

## Funciones de contacto y venta

- La portada dirige a diseño personalizado, colecciones y cotización.
- Las tarjetas y diseños envían a WhatsApp un mensaje contextual.
- La página `cotizacion.html` incluye un cotizador que prepara el mensaje con producto, técnica, cantidad y ciudad.
- La galería de `colecciones.html` se filtra por tipo de producto.
- El acceso flotante a WhatsApp acompaña la navegación; el personalizador conserva su propio botón de cotización.
- `personalizaciones.html` muestra prendas planas de referencia para camiseta, hoodie, gorra y tote bag, además de permitir elegir color, talla, cantidad, cargar una imagen y ajustar el estampado hasta 110%.

Las cinco variantes de camiseta (`assets/camiseta-*.png`) y las cinco de hoodie (`assets/hoodie-*.png`) se guardan localmente y se muestran según el color seleccionado. El personalizador permite alternar entre las vistas frontal y trasera de camisetas y hoodies; estas imágenes están en `assets/*-espalda.png`. La gorra y la tote bag usan fotos de referencia externas: [gorra](https://unsplash.com/photos/a-yellow-baseball-cap-on-a-white-background-8XZBP38QJFM) y [tote bag](https://www.pexels.com/photo/plain-tote-bag-9869067/). Al cambiar de producto, el selector elige el color de muestra correspondiente.

El sitio no procesa pagos ni guarda pedidos: la cotización y confirmación se realizan directamente por WhatsApp. La foto del producto es de referencia y el color final se confirma al cotizar. El mockup orientativo se genera en el navegador. El botón de cotización envía por WhatsApp únicamente los datos del pedido; si el cliente seleccionó una imagen, puede enviarla después en el mismo chat.
