// MODO CLARO E ESCURO
// const botaoDark = document.getElementById('mudar-dark');

// if (localStorage.getItem('modo') === 'dark') {
//   document.body.classList.add('dark');
//   botaoDark.textContent = '☀️ Modo Claro';
// } else {
//   botaoDark.textContent = '🌙 Modo Escuro';
// }

// botaoDark.addEventListener('click', function () {
//   document.body.classList.toggle('dark');

//   if (document.body.classList.contains('dark')) {
//     localStorage.setItem('modo', 'dark');
//     botaoDark.textContent = '☀️ Modo Claro';
//   } else {
//     localStorage.setItem('modo', 'light');
//     botaoDark.textContent = '🌙 Modo Escuro';
//   }
// });

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
// COMENTARIOS
const btnComentar = document.getElementById("btnComentar");

if(btnComentar){

    btnComentar.addEventListener("click", ()=>{

        const nome = document.getElementById("nome").value.trim();
        const texto = document.getElementById("comentario").value.trim();

        if(nome === "" || texto === ""){
            alert("Preencha nome e comentário.");
            return;
        }

        const lista = document.getElementById("listaComentarios");

        const comentario = document.createElement("div");
        comentario.className = "comentario";

        const data = new Date();

        comentario.innerHTML = `
            <h4>${nome}</h4>
            <small>${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR',{
                hour:'2-digit',
                minute:'2-digit'
            })}</small>
            <p>${texto}</p>
        `;

        lista.prepend(comentario);

        document.getElementById("nome").value = "";
        document.getElementById("comentario").value = "";
    });

}
