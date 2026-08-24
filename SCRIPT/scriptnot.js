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


// ==========================================
// FAVORITOS
// ==========================================

const toast = document.getElementById("toast");
const btnFinal = document.querySelector(".favorito2");

function mostrarMensagem(texto) {

    if (!toast) return;

    toast.textContent = texto;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);

}


// DESCOBRE QUAL NOTÍCIA ESTÁ ABERTA

const paginaAtual = window.location.pathname;

const resultadoFavorito = paginaAtual.match(/noticia(\d+)\.html/i);

const idFavorito = resultadoFavorito
    ? Number(resultadoFavorito[1])
    : null;


// PEGA FAVORITOS

function pegarFavoritos() {

    try {

        return JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];

    } catch {

        return [];

    }

}


// VERIFICA SE JÁ ESTÁ SALVA

function estaFavoritada() {

    const favoritos = pegarFavoritos();

    return favoritos.some(item =>
        Number(item.id) === idFavorito
    );

}


// MUDA O BOTÃO

function atualizarBotaoFavorito() {

    if (!btnFinal) return;

    const icone = btnFinal.querySelector("i");

    if (estaFavoritada()) {

        btnFinal.classList.add("ativo");

        if (icone) {
            icone.className = "fa-solid fa-heart";
        }

    } else {

        btnFinal.classList.remove("ativo");

        if (icone) {
            icone.className = "fa-regular fa-heart";
        }

    }

}


// CLIQUE

if (btnFinal && idFavorito) {

    atualizarBotaoFavorito();

    btnFinal.addEventListener("click", () => {

        let favoritos = pegarFavoritos();

        const existe = favoritos.findIndex(
            item => Number(item.id) === idFavorito
        );


        // REMOVE

        if (existe !== -1) {

            favoritos.splice(existe, 1);

            localStorage.setItem(
                "favoritos",
                JSON.stringify(favoritos)
            );

            atualizarBotaoFavorito();

            mostrarMensagem(
                "🤍 Removido dos favoritos!"
            );

            return;
        }


        // PEGA DADOS DA NOTÍCIA

        const titulo =
            document.querySelector(".tema h1");

        const data =
            document.querySelector(
                ".cabecalho span:last-child"
            );

        const numero =
            String(idFavorito).padStart(2, "0");


        const noticia = {

            id: idFavorito,

            titulo: titulo
                ? titulo.textContent.trim()
                : "Notícia",

            data: data
                ? data.textContent.trim()
                : "",

            imagem:
                "../IMAGENS/CAPA DAS NOTÍCIAS/capa.not." +
                numero +
                ".png",

            link:
                "../NOTÍCIAS/noticia" +
                idFavorito +
                ".html"

        };


        favoritos.push(noticia);


        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );


        atualizarBotaoFavorito();


        mostrarMensagem(
            "❤️ Adicionado aos favoritos!"
        );


        console.log(
            "Favoritos salvos:",
            favoritos
        );

    });

}
// COMENTARIOS

const btnComentar = document.getElementById("btnComentar");
const listaComentarios = document.getElementById("listaComentarios");

// DESCOBRE SOZINHO QUAL NOTÍCIA ESTÁ ABERTA
const caminhoPagina = window.location.pathname;

const resultadoNoticia = caminhoPagina.match(/noticia(\d+)\.html/i);

const noticiaId = resultadoNoticia ? resultadoNoticia[1] : null;


// PUBLICAR COMENTÁRIO

if (btnComentar && noticiaId) {

    btnComentar.addEventListener("click", async () => {

        const nomeInput = document.getElementById("nome");
        const comentarioInput = document.getElementById("comentario");

        const nome = nomeInput.value.trim();
        const texto = comentarioInput.value.trim();

        if (nome === "" || texto === "") {

            alert("Preencha nome e comentário.");

            return;
        }

        const dados = new FormData();

        dados.append("noticia_id", noticiaId);
        dados.append("nome", nome);
        dados.append("comentario", texto);

        try {

            const resposta = await fetch(
                "../PHP/comentar.php",
                {
                    method: "POST",
                    body: dados
                }
            );

            const retorno = await resposta.text();

            console.log(retorno);

            nomeInput.value = "";
            comentarioInput.value = "";

            carregarComentarios();

        } catch (erro) {

            console.log(
                "Erro ao publicar comentário:",
                erro
            );

        }

    });

}


// CARREGAR COMENTÁRIOS SALVOS

async function carregarComentarios() {

    if (!listaComentarios || !noticiaId) {
        return;
    }

    try {

        const resposta = await fetch(
            `../PHP/buscar-comentarios.php?noticia_id=${noticiaId}`
        );

        const comentarios = await resposta.json();

        listaComentarios.innerHTML = "";


        if (comentarios.length === 0) {

            const vazio = document.createElement("p");

            vazio.textContent =
                "Ainda não há comentários.";

            listaComentarios.appendChild(vazio);

            return;
        }


        comentarios.forEach(item => {

            const caixa = document.createElement("div");

            caixa.className = "comentario";


            const nomeUsuario =
                document.createElement("h4");

            nomeUsuario.textContent =
                item.nome;


            const data =
                document.createElement("small");

            data.textContent =
                formatarDataComentario(
                    item.data_comentario
                );


            const texto =
                document.createElement("p");

            texto.textContent =
                item.comentario;


            caixa.appendChild(nomeUsuario);

            caixa.appendChild(data);

            caixa.appendChild(texto);


            listaComentarios.appendChild(caixa);

        });


    } catch (erro) {

        console.log(
            "Erro ao carregar comentários:",
            erro
        );

    }

}


// FORMATA DATA DO MYSQL

function formatarDataComentario(dataMysql) {

    const data = new Date(dataMysql);

    return (
        data.toLocaleDateString("pt-BR") +
        " às " +
        data.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )
    );

}


// CARREGA AUTOMATICAMENTE AO ABRIR A NOTÍCIA

carregarComentarios();