const customizer = document.querySelector('#customizer-form');

if (customizer) {
  const preview = document.querySelector('#product-preview');
  const designPreview = document.querySelector('#design-preview');
  const fileInput = document.querySelector('#design-file');
  const fileName = document.querySelector('#upload-filename');
  const sizeInput = document.querySelector('#design-size');
  const colorInput = customizer.elements.color;
  const sizeSelect = customizer.elements.talla;
  const uniqueSizeOption = sizeSelect.querySelector('option[value="Talla única"]');
  const productName = document.querySelector('#preview-product-name');
  const previewColorDot = document.querySelector('#preview-color-dot');
  const previewColorName = document.querySelector('#preview-color-name');
  const sizeValue = document.querySelector('#design-size-value');
  const productBaseColors = { Camiseta: 'Marfil', Hoodie: 'Negro', Gorra: 'Amarillo', 'Tote bag': 'Marfil' };
  let currentObjectUrl = null;
  uniqueSizeOption.hidden = true;
  const clearDesignPreview = () => {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
    designPreview.removeAttribute('src');
    designPreview.hidden = true;
  };

  customizer.querySelectorAll('input[name="producto"]').forEach((input) => {
    input.addEventListener('change', () => {
      const product = input.value;
      preview.dataset.product = product;
      productName.textContent = product.toLocaleUpperCase('es');
      preview.querySelectorAll('[data-product-image]').forEach((photo) => {
        photo.hidden = photo.dataset.productImage !== product;
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
    });
  });

  sizeInput.addEventListener('input', () => {
    designPreview.style.width = `${sizeInput.value}%`;
    sizeValue.textContent = `${sizeInput.value}%`;
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
    designPreview.style.width = `${sizeInput.value}%`;
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
      `Imagen: ${image ? image.name : 'Aún no he elegido una imagen'}`,
      image ? 'Adjunto el archivo de imagen en este chat.' : 'Quiero recibir asesoría para definir el diseño.',
      '¿Me ayudan con el precio y el tiempo de entrega?'
    ].join('\n');
    const whatsappLink = `https://wa.me/573138070645?text=${encodeURIComponent(message)}`;
    let shareFailed = false;
    if (image && navigator.share && navigator.canShare) {
      try {
        if (navigator.canShare({ files: [image] })) {
          await navigator.share({ title: 'Cotización OSLUZ', text: message, files: [image] });
          return;
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        shareFailed = true;
      }
    }
    if (shareFailed) window.location.assign(whatsappLink);
    else window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  });
}
