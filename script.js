const menuItems = [
  { name: "Costela Bovina Assada", type: "peso" },
  { name: "Costela Suína Assada", type: "peso" },
  { name: "Linguiça Assada", type: "unit", price: 12 },
  { name: "Frango Assado", type: "unit", price: 35 },
  { name: "Pote Batatas em Conservas", type: "unit", price: 8 },
  { name: "Pote Farofa Feijão Tropeiro", type: "unit", price: 10 },
  { name: "Pote Maionese", type: "unit", price: 8 },
  { name: "Mousse de Maracujá", type: "unit", price: 5 },
  { name: "Pudim de Coco", type: "unit", price: 6 },
  { name: "Manjar de Coco", type: "unit", price: 6 },
  { name: "Refrigerante (lata)", type: "unit", price: 4 },
  { name: "Cerveja (lata)", type: "unit", price: 5 },
];

const menuDiv = document.getElementById("menu");
menuItems.forEach((item, index) => {
  const inputField = item.type === "peso"
    ? `<input type="number" min="0.1" step="0.1" placeholder="Peso em kg" data-index="${index}" />`
    : `<input type="number" min="0" step="1" placeholder="Qtd." data-index="${index}" />`;

  const aviso = item.type === "peso" ? `<small>Valor final informado após pesagem</small>` : '';

  menuDiv.innerHTML += `
    <div>
      <label><strong>${item.name}</strong></label>
      ${inputField}
      ${aviso}
    </div>
  `;
});

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const delivery = document.getElementById("deliveryType").value;
  const code = document.getElementById("pickupCode").value;
  const inputs = menuDiv.querySelectorAll("input");

  const orderId = "PED" + Date.now().toString().slice(-5);
  let message = `🧾 *Pedido - Frango na Brasa*\n\n`;
  message += `*Cliente:* ${name}\n📞 *Telefone:* ${phone}\n📦 *Forma de retirada:* ${delivery}\n`;
  if (code) message += `🔐 *Código de coleta:* ${code}\n`;
  message += `🆔 *Código do pedido:* ${orderId}\n\n📋 *Itens do pedido:*\n`;

  let hasItem = false;

  inputs.forEach(input => {
    const value = input.value;
    const index = input.getAttribute("data-index");
    const item = menuItems[index];

    if (value && parseFloat(value) > 0) {
      hasItem = true;
      if (item.type === "peso") {
        message += `- ${item.name}: ${value} kg (valor final após pesagem)\n`;
      } else {
        message += `- ${item.name}: ${value} un - R$ ${(item.price * value).toFixed(2)}\n`;
      }
    }
  });

  if (!hasItem) {
    alert("Adicione ao menos um item ao pedido.");
    return;
  }

  const encodedMessage = encodeURIComponent(message);
  const whatsappNumber = "5511970565356"; // Substitua pelo número da empresa com DDI, ex: 5598999999999
  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  window.open(url, "_blank");
});
