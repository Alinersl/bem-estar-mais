// MODO CLARO E ESCURO
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const sol = document.getElementById("sol");
    const lua = document.getElementById("lua");

    // Carrega o tema salvo
    if (localStorage.getItem("tema") === "escuro") {
        body.classList.add("dark");

        if (sol) sol.style.display = "none";
        if (lua) lua.style.display = "block";
    } else {
        body.classList.remove("dark");

        if (sol) sol.style.display = "block";
        if (lua) lua.style.display = "none";
    }

    // Ativar modo escuro
    if (sol) {
        sol.addEventListener("click", () => {
            body.classList.add("dark");
            localStorage.setItem("tema", "escuro");

            sol.style.display = "none";
            if (lua) lua.style.display = "block";
        });
    }

    // Voltar ao modo claro
    if (lua) {
        lua.addEventListener("click", () => {
            body.classList.remove("dark");
            localStorage.setItem("tema", "claro");

            lua.style.display = "none";
            if (sol) sol.style.display = "block";
        });
    }
});

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
