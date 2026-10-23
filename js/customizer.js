const customizer = document.querySelector('#customizer-form');

if (customizer) {
  const preview = document.querySelector('#product-preview');
  const designPreview = document.querySelector('#design-preview');
  const shirtPhoto = preview.querySelector('[data-product-image="Camiseta"]');
  const hoodiePhoto = preview.querySelector('[data-product-image="Hoodie"]');
  const fileInput = document.querySelector('#design-file');
  const fileName = document.querySelector('#upload-filename');
  const sizeInput = document.querySelector('#design-size');
  const centerDesignButton = document.querySelector('#center-design');
  const colorInput = customizer.elements.color;
  const sizeSelect = customizer.elements.talla;
  const uniqueSizeOption = sizeSelect.querySelector('option[value="Talla única"]');
  const productName = document.querySelector('#preview-product-name');
  const sideSwitch = document.querySelector('[data-preview-side-switch]');
  const previewColorDot = document.querySelector('#preview-color-dot');
  const previewColorName = document.querySelector('#preview-color-name');
  const sizeValue = document.querySelector('#design-size-value');
  const productBaseColors = { Camiseta: 'Marfil', Hoodie: 'Negro', Gorra: 'Amarillo', 'Tote bag': 'Marfil' };
  let currentObjectUrl = null;
  let previewSide = 'front';
  let designPosition = { x: 50, y: 54 };
  let dragOffset = null;
  const designWidths = { Camiseta: 58, Hoodie: 55, Gorra: 38, 'Tote bag': 48 };
  const designDefaults = { Camiseta: { x: 50, y: 54 }, Hoodie: { x: 50, y: 54 }, Gorra: { x: 50, y: 48 }, 'Tote bag': { x: 50, y: 56 } };
  const garmentBounds = {
    Camiseta: { left: 8, right: 92, top: 8, bottom: 92 },
    Hoodie: { left: 7, right: 93, top: 7, bottom: 93 },
    Gorra: { left: 27, right: 73, top: 25, bottom: 74 },
    'Tote bag': { left: 18, right: 82, top: 10, bottom: 91 }
  };
  uniqueSizeOption.hidden = true;
  const clearDesignPreview = () => {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
    designPreview.removeAttribute('src');
    designPreview.hidden = true;
  };
  const positionDesign = (x, y) => {
    const bounds = garmentBounds[preview.dataset.product] || garmentBounds.Camiseta;
    const previewRect = preview.getBoundingClientRect();
    const width = designWidths[preview.dataset.product] || designWidths.Camiseta;
    const widthPercent = width * Number(sizeInput.value) / 100;
    const halfWidth = widthPercent / 2;
    const imageRatio = designPreview.naturalWidth ? designPreview.naturalHeight / designPreview.naturalWidth : 1;
    const halfHeight = (widthPercent * imageRatio / (previewRect.width / previewRect.height)) / 2;
    const minX = Math.min(bounds.left + halfWidth, 49);
    const maxX = Math.max(bounds.right - halfWidth, 51);
    const minY = Math.min(bounds.top + halfHeight, 49);
    const maxY = Math.max(bounds.bottom - halfHeight, 51);
    designPosition = {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y))
    };
    designPreview.style.left = `${designPosition.x}%`;
    designPreview.style.top = `${designPosition.y}%`;
  };
  const updateDesignSize = () => {
    const baseWidth = designWidths[preview.dataset.product] || designWidths.Camiseta;
    designPreview.style.width = `${baseWidth * Number(sizeInput.value) / 100}%`;
    sizeValue.textContent = `${sizeInput.value}%`;
    positionDesign(designPosition.x, designPosition.y);
  };
  const centerDesign = () => {
    const position = designDefaults[preview.dataset.product] || designDefaults.Camiseta;
    positionDesign(position.x, position.y);
  };
  const updateGarmentPhoto = () => {
    const product = preview.dataset.product;
    const garment = product === 'Camiseta' ? 'shirt' : product === 'Hoodie' ? 'hoodie' : null;
    const photo = garment === 'shirt' ? shirtPhoto : garment === 'hoodie' ? hoodiePhoto : null;
    const swatch = document.querySelector('.color-swatch.is-selected');
    if (!photo || !swatch) return;

    const imageKey = `${garment}${previewSide === 'back' ? 'BackImage' : 'Image'}`;
    if (swatch.dataset[imageKey]) photo.src = swatch.dataset[imageKey];
    photo.alt = `${product} ${swatch.dataset.colorName.toLowerCase()} lisa, vista ${previewSide === 'back' ? 'trasera' : 'frontal'}`;
  };

  sideSwitch.querySelectorAll('[data-preview-side]').forEach((button) => {
    button.addEventListener('click', () => {
      previewSide = button.dataset.previewSide;
      sideSwitch.querySelectorAll('[data-preview-side]').forEach((sideButton) => {
        sideButton.setAttribute('aria-pressed', String(sideButton === button));
      });
      updateGarmentPhoto();
    });
  });

  customizer.querySelectorAll('input[name="producto"]').forEach((input) => {
    input.addEventListener('change', () => {
      const product = input.value;
      preview.dataset.product = product;
      productName.textContent = product.toLocaleUpperCase('es');
      designPosition = { ...designDefaults[product] || designDefaults.Camiseta };
      updateDesignSize();
      preview.querySelectorAll('[data-product-image]').forEach((photo) => {
        photo.hidden = photo.dataset.productImage !== product;
      });
      document.querySelectorAll('.color-swatch[data-product-only]').forEach((swatch) => {
        swatch.hidden = swatch.dataset.productOnly !== product;
      });
      sideSwitch.hidden = product !== 'Camiseta' && product !== 'Hoodie';
      previewSide = 'front';
      sideSwitch.querySelectorAll('[data-preview-side]').forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.previewSide === previewSide));
      });
      document.querySelector(`.color-swatch[data-color-name="${productBaseColors[product]}"]`)?.click();
      if (product === 'Tote bag' || product === 'Gorra') sizeSelect.value = 'Talla única';
      else if (sizeSelect.value === 'Talla única') sizeSelect.value = 'M';
      uniqueSizeOption.hidden = product !== 'Tote bag' && product !== 'Gorra';
    });
  });

  document.querySelectorAll('.color-swatch').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach((item) => {
        const selected = item === swatch;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      previewColorDot.style.backgroundColor = swatch.dataset.color;
      colorInput.value = swatch.dataset.colorName;
      document.querySelector('#selected-color').textContent = swatch.dataset.colorName;
      previewColorName.textContent = `Color elegido: ${swatch.dataset.colorName}`;
      updateGarmentPhoto();
    });
  });

  sizeInput.addEventListener('input', updateDesignSize);
  centerDesignButton.addEventListener('click', centerDesign);

  designPreview.addEventListener('pointerdown', (event) => {
    if (designPreview.hidden) return;
    event.preventDefault();
    const rect = preview.getBoundingClientRect();
    dragOffset = {
      pointerId: event.pointerId,
      x: event.clientX - rect.left - (designPosition.x / 100) * rect.width,
      y: event.clientY - rect.top - (designPosition.y / 100) * rect.height
    };
    designPreview.setPointerCapture(event.pointerId);
    designPreview.classList.add('is-dragging');
  });
  designPreview.addEventListener('pointermove', (event) => {
    if (!dragOffset || dragOffset.pointerId !== event.pointerId) return;
    const rect = preview.getBoundingClientRect();
    positionDesign(
      ((event.clientX - rect.left - dragOffset.x) / rect.width) * 100,
      ((event.clientY - rect.top - dragOffset.y) / rect.height) * 100
    );
  });
  const endDesignDrag = (event) => {
    if (!dragOffset || dragOffset.pointerId !== event.pointerId) return;
    dragOffset = null;
    designPreview.classList.remove('is-dragging');
  };
  designPreview.addEventListener('pointerup', endDesignDrag);
  designPreview.addEventListener('pointercancel', endDesignDrag);
  designPreview.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 5 : 1;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[event.key]) {
      event.preventDefault();
      positionDesign(designPosition.x + moves[event.key][0], designPosition.y + moves[event.key][1]);
    } else if (event.key === 'Home') {
      event.preventDefault();
      centerDesign();
    }
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) {
      clearDesignPreview();
      fileName.textContent = 'No has elegido una imagen';
      return;
    }

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      clearDesignPreview();
      fileInput.value = '';
      fileName.textContent = 'Selecciona un archivo de imagen';
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      clearDesignPreview();
      fileInput.value = '';
      fileName.textContent = 'La imagen supera el máximo de 10 MB';
      return;
    }

    clearDesignPreview();
    currentObjectUrl = URL.createObjectURL(file);
    designPreview.src = currentObjectUrl;
    designPreview.hidden = false;
    updateDesignSize();
    designPreview.onload = () => positionDesign(designPosition.x, designPosition.y);
    fileName.textContent = file.name;
  });

  customizer.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(customizer);
    const image = fileInput.files?.[0];
    const message = [
      'Hola OSLUZ, diseñé una idea y quiero cotizarla.',
      `Producto: ${formData.get('producto')}`,
      `Color: ${formData.get('color')}`,
      `Talla: ${sizeSelect.value}`,
      `Cantidad: ${formData.get('cantidad')}`,
      image ? 'Tengo una imagen de referencia y la enviaré después por este chat.' : 'Quiero recibir asesoría para definir el diseño.',
      '¿Me ayudan con el precio y el tiempo de entrega?'
    ].join('\n');
    const whatsappLink = `https://wa.me/573138070645?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  });
}
