let products = [];
let nextId = 1;


async function loadProductsFromAPI() {
  try {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';

    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    products = data.products.map(product => ({
      id: product.id,
      titulo: product.title,
      descricao: product.description,
      preco: product.price,
      marca: product.brand,
      categoria: product.category,
      foto: product.thumbnail
    }));

    nextId = Math.max(...products.map(p => p.id), 0) + 1;

    if (loading) loading.style.display = 'none';
    renderProducts();
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    if (loading) loading.style.display = 'none';
  }
}


function renderProducts() {
  const container = document.getElementById('productsList');
  if (!container) return;

  const countElement = document.querySelector('.page-header .count strong');
  if (countElement) {
    countElement.textContent = products.length;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhum produto encontrado</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => `
    <div class="item-card">
      <div class="item-image">
        <img 
          src="${product.foto}" 
          alt="${product.titulo}"
          onerror="this.src='https://via.placeholder.com/300?text=Sem+Foto'"
        />
      </div>
      <div class="item-content">
        <h3 class="item-title">${product.titulo}</h3>
        <div class="item-category">📦 ${product.categoria}</div>
        <p class="item-description">${product.descricao}</p>
        <div class="item-info">
          <p><strong>Marca:</strong> ${product.marca}</p>
        </div>
        <div class="item-price">${formatPrice(product.preco)}</div>
        <div class="item-actions">
          <button class="btn btn-danger" onclick="removeProduct(${product.id})">
            🗑️ Remover
          </button>
        </div>
      </div>
    </div>
  `).join('');
}


function handleAddProduct(event) {
  event.preventDefault();

  const formData = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    preco: document.getElementById('preco').value,
    marca: document.getElementById('marca').value,
    categoria: document.getElementById('categoria').value,
    foto: document.getElementById('foto').value
  };

  const validation = validateProduct(formData);
  if (!validation.isValid) {
    displayFormErrors(validation.errors, {
      titulo: 'titulo',
      descricao: 'descricao',
      preco: 'preco',
      marca: 'marca',
      categoria: 'categoria',
      foto: 'foto'
    });
    return;
  }

  const newProduct = {
    id: nextId++,
    titulo: formData.titulo,
    descricao: formData.descricao,
    preco: parseFloat(formData.preco),
    marca: formData.marca,
    categoria: formData.categoria,
    foto: formData.foto || 'https://via.placeholder.com/300?text=Sem+Foto'
  };

  products.push(newProduct);
  clearForm('addProductForm');
  toggleForm();
  renderProducts();
  showSuccessMessage('Produto adicionado com sucesso!');
}


function removeProduct(id) {
  if (confirm('Tem certeza que deseja remover este produto?')) {
    products = products.filter(p => p.id !== id);
    renderProducts();
    showSuccessMessage('Produto removido com sucesso!');
  }
}


function toggleForm() {
  const formContainer = document.getElementById('addProductFormContainer');
  if (formContainer) {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadProductsFromAPI();

  const form = document.getElementById('addProductForm');
  if (form) {
    form.addEventListener('submit', handleAddProduct);
  }

  const toggleBtn = document.getElementById('toggleFormBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleForm);
  }

  const cancelBtn = document.getElementById('cancelFormBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', toggleForm);
  }
});
