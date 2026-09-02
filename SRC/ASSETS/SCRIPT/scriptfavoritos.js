document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaFavoritos");
    const semFavoritos = document.getElementById("semFavoritos");

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.length === 0) {

        if (semFavoritos) {
            semFavoritos.style.display = "block";
        }

    } else {

        favoritos.forEach((noticia, index) => {

            const card = document.createElement("div");

            card.classList.add("noticia");

            card.innerHTML = `
                <button class="favorito ativo" data-index="${index}" title="Remover dos favoritos">
                    <i class="fa-solid fa-heart"></i>
                </button>

                <img src="${noticia.imagem}" alt="${noticia.titulo}">

                <div class="conteudo">

                    <h2>${noticia.titulo}</h2>

                    ${noticia.data ? `<p class="data">${noticia.data}</p>` : ""}

                    <a href="${noticia.link}">
                        <button>Saiba Mais</button>
                    </a>

                </div>
            `;

            lista.appendChild(card);
        });


        document.querySelectorAll("#listaFavoritos .favorito").forEach(botao => {

            botao.addEventListener("click", () => {

                const index = Number(botao.dataset.index);

                favoritos.splice(index, 1);

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

                location.reload();

            });

        });

    }


    // MODO CLARO E ESCURO

    const body = document.body;

    const sol = document.getElementById("sol");

    const lua = document.getElementById("lua");


    function atualizarTema(tema) {

        if (tema === "escuro") {

            body.classList.add("dark");


            if (sol) {

                sol.style.display = "none";

            }


            if (lua) {

                lua.style.display = "block";

            }


        } else {

            body.classList.remove("dark");


            if (sol) {

                sol.style.display = "block";

            }


            if (lua) {

                lua.style.display = "none";

            }

        }

    }


    const temaSalvo = localStorage.getItem("tema") || "claro";


    atualizarTema(temaSalvo);


    if (sol) {

        sol.addEventListener("click", () => {

            localStorage.setItem(
                "tema",
                "escuro"
            );

            atualizarTema("escuro");

        });

    }


    if (lua) {

        lua.addEventListener("click", () => {

            localStorage.setItem(
                "tema",
                "claro"
            );

            atualizarTema("claro");

        });

    }

});