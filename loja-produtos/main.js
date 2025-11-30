function validateText(value, fieldName) {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: `${fieldName} é obrigatório`
    };
  }

  const trimmed = value.trim();
  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: `${fieldName} deve ter no mínimo 3 caracteres`
    };
  }

  if (trimmed.length > 50) {
    return {
      isValid: false,
      error: `${fieldName} deve ter no máximo 50 caracteres`
    };
  }

  return { isValid: true };
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/;

  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      error: 'Email é obrigatório'
    };
  }

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Email inválido'
    };
  }

  return { isValid: true };
}

function validateAge(age) {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;

  if (isNaN(ageNum)) {
    return {
      isValid: false,
      error: 'Idade deve ser um número válido'
    };
  }

  if (ageNum <= 0) {
    return {
      isValid: false,
      error: 'Idade deve ser um número positivo'
    };
  }

  if (ageNum >= 120) {
    return {
      isValid: false,
      error: 'Idade deve ser menor que 120'
    };
  }

  return { isValid: true };
}

function validatePrice(price) {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(priceNum)) {
    return {
      isValid: false,
      error: 'Preço deve ser um número válido'
    };
  }

  if (priceNum <= 0) {
    return {
      isValid: false,
      error: 'Preço deve ser um número positivo'
    };
  }

  if (priceNum >= 120) {
    return {
      isValid: false,
      error: 'Preço deve ser menor que 120'
    };
  }

  return { isValid: true };
}

function validatePhotoUrl(url) {
  if (!url || url.trim().length === 0) {
    return { isValid: true };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: 'URL de foto inválida'
    };
  }
}

function validateUser(user) {
  const errors = {};

  const nomeValidation = validateText(user.nome, 'Nome');
  if (!nomeValidation.isValid) errors.nome = nomeValidation.error;

  const sobrenomeValidation = validateText(user.sobrenome, 'Sobrenome');
  if (!sobrenomeValidation.isValid) errors.sobrenome = sobrenomeValidation.error;

  const emailValidation = validateEmail(user.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error;

  const idadeValidation = validateAge(user.idade);
  if (!idadeValidation.isValid) errors.idade = idadeValidation.error;

  if (user.foto) {
    const fotoValidation = validatePhotoUrl(user.foto);
    if (!fotoValidation.isValid) errors.foto = fotoValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateProduct(product) {
  const errors = {};

  const tituloValidation = validateText(product.titulo, 'Título');
  if (!tituloValidation.isValid) errors.titulo = tituloValidation.error;

  const descricaoValidation = validateText(product.descricao, 'Descrição');
  if (!descricaoValidation.isValid) errors.descricao = descricaoValidation.error;

  const precoValidation = validatePrice(product.preco);
  if (!precoValidation.isValid) errors.preco = precoValidation.error;

  const marcaValidation = validateText(product.marca, 'Marca');
  if (!marcaValidation.isValid) errors.marca = marcaValidation.error;

  const categoriaValidation = validateText(product.categoria, 'Categoria');
  if (!categoriaValidation.isValid) errors.categoria = categoriaValidation.error;

  if (product.foto) {
    const fotoValidation = validatePhotoUrl(product.foto);
    if (!fotoValidation.isValid) errors.foto = fotoValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function showSuccessMessage(message, duration = 3000) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'success-message';
  messageDiv.textContent = message;

  const container = document.querySelector('main') || document.body;
  container.insertBefore(messageDiv, container.firstChild);

  setTimeout(() => {
    messageDiv.remove();
  }, duration);
}

function displayFormErrors(errors, fieldIds) {
  // Limpar erros anteriores
  document.querySelectorAll('.form-error').forEach(el => el.remove());

  // Exibir novos erros
  Object.entries(errors).forEach(([field, error]) => {
    const fieldElement = document.getElementById(fieldIds[field] || field);
    if (fieldElement) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      errorDiv.innerHTML = `⚠️ ${error}`;
      fieldElement.parentElement.appendChild(errorDiv);
    }
  });
}

function clearForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    document.querySelectorAll('.form-error').forEach(el => el.remove());
  }
}

function formatPrice(price) {
  return `R$ ${parseFloat(price).toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Ativar link de navegação atual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
