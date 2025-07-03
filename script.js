const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalProductName');
const webhookUrl = 'https://discord.com/api/webhooks/1390445729084080259/DVktZrXOoSWhxsKfzYlcCJUxAWnPIN18lB7W0wM7mLUneVEVDNuwsOER2-x_cdg5dbtC'; // <== Cole aqui seu webhook

// Abrir modal e colocar nome do produto
document.querySelectorAll('.product').forEach(product => {
  const productName = product.querySelector('h3').textContent;
  const buyButton = product.querySelector('button');

  buyButton.addEventListener('click', () => {
    modal.classList.add('active');
    modalTitle.textContent = productName;
  });
});

function closeModal() {
  modal.classList.remove('active');
}

// Enviar dados para Discord via webhook
function sendDiscordWebhook(product, cityId, phone) {
  const content = `🛒 **Nova compra:**\n**Produto:** ${product}\n**ID Cidade:** ${cityId}\n**Telefone:** ${phone}`;

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  .then(response => {
    if (response.ok) {
      alert('Compra enviada com sucesso!');
      closeModal();
      // Limpar campos depois de enviar
      document.getElementById('cityId').value = '';
      document.getElementById('cityPhone').value = '';
    } else {
      alert('Erro ao enviar compra.');
    }
  })
  .catch(() => alert('Erro ao enviar compra.'));
}

// Evento do botão "Enviar" no modal
document.querySelector('#productModal button:last-child').addEventListener('click', () => {
  const product = modalTitle.textContent;
  const cityId = document.getElementById('cityId').value.trim();
  const phone = document.getElementById('cityPhone').value.trim();

  if (!cityId || !phone) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  sendDiscordWebhook(product, cityId, phone);
});
