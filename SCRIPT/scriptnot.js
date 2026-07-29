// MODO CLARO E ESCURO
const botaoDark = document.getElementById('mudar-dark');

if (localStorage.getItem('modo') === 'dark') {
  document.body.classList.add('dark');
  botaoDark.textContent = '☀️ Modo Claro';
} else {
  botaoDark.textContent = '🌙 Modo Escuro';
}

botaoDark.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('modo', 'dark');
    botaoDark.textContent = '☀️ Modo Claro';
  } else {
    localStorage.setItem('modo', 'light');
    botaoDark.textContent = '🌙 Modo Escuro';
  }
});

// BANNERS
const logoLink = document.getElementById("logoLink");
const paginaAtual = window.location.pathname.split("/").pop();

logoLink.href = paginaAtual;


// BOTAO FAVORITO
const toast = document.getElementById("toast");

const btnFinal = document.querySelector(".favorito2");

function mostrarMensagem(texto) {
    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

btnFinal.addEventListener("click", () => {

    btnFinal.classList.toggle("ativo");

    const icone = btnFinal.querySelector("i");

    if(btnFinal.classList.contains("ativo")){
        icone.classList.remove("fa-regular");
        icone.classList.add("fa-solid");

        mostrarMensagem("❤️ Adicionado com sucesso!");
    }else{
        icone.classList.remove("fa-solid");
        icone.classList.add("fa-regular");

        mostrarMensagem("🤍 Removido dos favoritos!");
    }
});