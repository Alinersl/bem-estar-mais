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