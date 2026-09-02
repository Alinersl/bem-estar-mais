// MODO CLARO E ESCURO

const body = document.body;

const sol = document.getElementById("sol");

const lua = document.getElementById("lua");


function atualizarTema() {

    const temaSalvo = localStorage.getItem("tema");


    if (temaSalvo === "escuro") {

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


// APLICA O TEMA ASSIM QUE ENTRA NA PÁGINA

atualizarTema();


// ATIVAR MODO ESCURO

if (sol) {

    sol.addEventListener("click", () => {

        localStorage.setItem("tema", "escuro");

        atualizarTema();

    });

}


// ATIVAR MODO CLARO

if (lua) {

    lua.addEventListener("click", () => {

        localStorage.setItem("tema", "claro");

        atualizarTema();

    });

}


// ATUALIZA O TEMA QUANDO A PÁGINA VOLTA DO CACHE

window.addEventListener("pageshow", () => {

    atualizarTema();

});


// FAVORITOS

const lista = document.getElementById("listaFavoritos");

const semFavoritos = document.getElementById("semFavoritos");


let favoritos = [];


try {

    favoritos =
        JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];

} catch (erro) {

    favoritos = [];

}


if (favoritos.length === 0) {

    if (semFavoritos) {

        semFavoritos.style.display = "flex";

    }

} else {

    if (semFavoritos) {

        semFavoritos.style.display = "none";

    }


    favoritos.forEach((noticia, index) => {

        const card = document.createElement("div");


        card.classList.add("noticia");


        card.innerHTML = `

            <button
                class="favorito ativo"
                data-index="${index}"
                title="Remover dos favoritos"
            >

                <i class="fa-solid fa-heart"></i>

            </button>


            <img
                src="${noticia.imagem}"
                alt="${noticia.titulo}"
            >


            <div class="conteudo">

                <h2>
                    ${noticia.titulo}
                </h2>


                ${
                    noticia.data
                        ? `<p class="data">${noticia.data}</p>`
                        : ""
                }


                <a href="${noticia.link}">

                    <button>
                        Saiba Mais
                    </button>

                </a>

            </div>

        `;


        if (lista) {

            lista.appendChild(card);

        }

    });


    document
        .querySelectorAll("#listaFavoritos .favorito")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                const index =
                    Number(
                        botao.dataset.index
                    );


                favoritos.splice(index, 1);


                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );


                location.reload();

            });

        });

}


// CASO O TEMA MUDE EM OUTRA ABA

window.addEventListener("storage", (evento) => {

    if (evento.key === "tema") {

        atualizarTema();

    }

});