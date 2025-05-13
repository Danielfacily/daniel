const produtos = {
  Carnes: [
    { nome: "Frango Assado", preco: 50 },
    { nome: "Costela Bovina Assada (por kg)", preco: 70, peso: true },
    { nome: "Costela Suína Assada (por kg)", preco: 60, peso: true },
    { nome: "Linguiça Assada (por kg)", preco: 50, peso: true }
  ],
  Acompanhamentos: [
    { nome: "Pote de Batatas em Conserva", preco: 10 },
    { nome: "Pote de Farofa Feijão Tropeiro", preco: 10 },
    { nome: "Pote de Maionese", preco: 10 }
  ],
  Sobremesas: [
    { nome: "Mousse de Maracujá", preco: 15 },
    { nome: "Pudim de Coco", preco: 15 },
    { nome: "Manjar de Coco", preco: 15 }
  ],
  Bebidas: [
    { nome: "Coca-Cola 2L", preco: 13 },
    { nome: "Guaraná 2L", preco: 10 },
    { nome: "Sukita 2L", preco: 10 },
    { nome: "Coca-Cola Lata 350ml", preco: 5 },
    { nome: "Guaraná Lata 350ml", preco: 5 },
    { nome: "Sukita Lata 350ml", preco: 5 },
    { nome: "Heineken 269ml", preco: 5 },
    { nome: "Original 269ml", preco: 5 }
  ]
};

// Exibir os itens no menu por aba
const menuContainer = document.querySelectorAll(".tab-panel");
menuContainer.forEach(container => {
  const categoria = container.dataset.content;
  produtos[categoria].forEach(produto => {
    const inputType = produto.peso ? "number" : "checkbox";
    const label = document.createElement("label");
    label.className = "menu-item";
    label.innerHTML = `
      <input type="${inputType}" 
             name="${produto.nome}" 
             data-preco="${produto.preco}" 
             ${produto.peso ? 'min="0.1" step="0.1" placeholder="kg"' : ""}/>
      ${produto.nome} - R$${produto.preco}${produto.peso ? " /kg" : ""}
    `;
    container.appendChild(label);
  });
});

// Controle de abas
document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".tab-panel").forEach(panel => {
      panel.classList.remove("active");
      if (panel.dataset.content === button.dataset.tab) {
        panel.classList.add("active");
      }
    });
  });
});
document.querySelector(".tab-panel[data-content='Carnes']").classList.add("active");

// Formulário
document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("name").value.trim();
  const telefone = document.getElementById("phone").value.trim();
  const entrega = document.getElementById("deliveryType").value;
  const codigo = document.getElementById("pickupCode").value.trim();

  let mensagem = `*Pedido Frango na Brasa*%0A`;
  mensagem += `*Nome:* ${nome}%0A`;
  mensagem += `*Telefone:* ${telefone}%0A`;
  mensagem += `*Itens:*%0A`;

  let total = 0;

  document.querySelectorAll(".menu-item input").forEach(input => {
    const nomeItem = input.name;
    const preco = parseFloat(input.dataset.preco);
    if ((input.type === "checkbox" && input.checked) || 
        (input.type === "number" && parseFloat(input.value) > 0)) {
      const qtd = input.type === "number" ? parseFloat(input.value) : 1;
      const precoItem = qtd * preco;
      mensagem += `- ${nomeItem} ${input.type === "number" ? `(${qtd.toFixed(2)}kg)` : ""} - R$${precoItem.toFixed(2)}%0A`;
      total += precoItem;
    }
  });

  mensagem += `*Entrega:* ${entrega}%0A`;
  if (codigo) mensagem += `*Código de Coleta:* ${codigo}%0A`;
  mensagem += `*Valor Estimado:* R$${total.toFixed(2)}%0A`;

  const url = `https://wa.me/55${telefone}?text=${mensagem}`;
  window.open(url, "_blank");
});
