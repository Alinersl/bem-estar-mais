document.addEventListener("DOMContentLoaded", () => {
    const lista = document.getElementById("listaFavoritos");
    const semFavoritos = document.getElementById("semFavoritos");

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {
        semFavoritos.style.display = "block";
        return;
    }
    
    favoritos.forEach((noticia, index) => {
        const card = document.createElement("div");
        card.classList.add("noticia");
        
        card.innerHTML = `<button class= "favorito ativo" data-index="${index} "title="Remover dos favoritos"> <i class="fa-solid fa-heart"></i></button>

        <img src="${noticia.imagem}" alt="${noticia.titulo}">

        <div class="conteudo">
        <h2>${noticia.titulo}</h2>
        ${noticia.data ? `<p class="data">${noticia.data}</p>`:""}
        <a href="${noticia.link}"><button>Saiba Mais</button></a>
        </div>`;
        
        lista.appendChild(card);
    });
    
    document.querySelectorAll("#listaFavoritos .favorito").forEach(botao => {
        botao.addEventListener("click", () => {
            const index =Number(botao.dataset.index);
            favoritos.splice(index, 1);
            localStorage.setItem("favoritos",JSON.stringify(favoritos)
        );
        
        location.reload();
    });
});
});

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