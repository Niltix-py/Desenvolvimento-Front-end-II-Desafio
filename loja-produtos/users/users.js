let users = [];
let nextId = 1;

async function loadUsersFromAPI() {
  try {
    const loading = document.getElementById('loading');
    if (loading) loading.style.display = 'flex';

    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();

    // Mapear campos da API para o formato esperado
    users = data.users.map(user => ({
      id: user.id,
      nome: user.firstName,
      sobrenome: user.lastName,
      email: user.email,
      idade: user.age,
      foto: user.image
    }));

    nextId = Math.max(...users.map(u => u.id), 0) + 1;

    if (loading) loading.style.display = 'none';
    renderUsers();
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
    if (loading) loading.style.display = 'none';
  }
}


function renderUsers() {
  const container = document.getElementById('usersList');
  if (!container) return;

  const countElement = document.querySelector('.page-header .count strong');
  if (countElement) {
    countElement.textContent = users.length;
  }

  if (users.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Nenhum usuário encontrado</p>
      </div>
    `;
    return;
  }

  container.innerHTML = users.map(user => `
    <div class="item-card">
      <div class="item-image">
        <img 
          src="${user.foto}" 
          alt="${user.nome} ${user.sobrenome}"
          onerror="this.src='https://via.placeholder.com/300?text=Sem+Foto'"
        />
      </div>
      <div class="item-content">
        <h3 class="item-title">${user.nome} ${user.sobrenome}</h3>
        <div class="item-info">
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Idade:</strong> ${user.idade} anos</p>
        </div>
        <div class="item-actions">
          <button class="btn btn-danger" onclick="removeUser(${user.id})">
            🗑️ Remover
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleAddUser(event) {
  event.preventDefault();

  const formData = {
    nome: document.getElementById('nome').value,
    sobrenome: document.getElementById('sobrenome').value,
    email: document.getElementById('email').value,
    idade: document.getElementById('idade').value,
    foto: document.getElementById('foto').value
  };

  const validation = validateUser(formData);
  if (!validation.isValid) {
    displayFormErrors(validation.errors, {
      nome: 'nome',
      sobrenome: 'sobrenome',
      email: 'email',
      idade: 'idade',
      foto: 'foto'
    });
    return;
  }

  const newUser = {
    id: nextId++,
    nome: formData.nome,
    sobrenome: formData.sobrenome,
    email: formData.email,
    idade: parseInt(formData.idade),
    foto: formData.foto || 'https://via.placeholder.com/300?text=Sem+Foto'
  };

  users.push(newUser);
  clearForm('addUserForm');
  toggleForm();
  renderUsers();
  showSuccessMessage('Usuário adicionado com sucesso!');
}


function removeUser(id) {
  if (confirm('Tem certeza que deseja remover este usuário?')) {
    users = users.filter(u => u.id !== id);
    renderUsers();
    showSuccessMessage('Usuário removido com sucesso!');
  }
}


function toggleForm() {
  const formContainer = document.getElementById('addUserFormContainer');
  if (formContainer) {
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  loadUsersFromAPI();

  const form = document.getElementById('addUserForm');
  if (form) {
    form.addEventListener('submit', handleAddUser);
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