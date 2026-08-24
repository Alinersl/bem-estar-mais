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


// CADASTRO E LOGIN


const btnLogin = document.getElementById("btnLogin");

const btnFechar = document.getElementById("btnFechar");

const btnFecharBranco = document.getElementById("btnFecharBranco");

const overlay = document.getElementById("overlay");

const cadastro = document.getElementById("cadastro");

const login = document.getElementById("login");

const irParaLogin = document.getElementById("irParaLogin");

const irParaCadastro = document.getElementById("irParaCadastro");


// ABRIR POPUP PELO BONEQUINHO

btnLogin.addEventListener("click", () => {

    overlay.style.display = "flex";

    cadastro.style.display = "block";

    login.style.display = "none";

});




// IR PARA LOGIN

irParaLogin.addEventListener("click", () => {

    cadastro.style.display = "none";

    login.style.display = "block";

});


// IR PARA CADASTRO

irParaCadastro.addEventListener("click", () => {

    login.style.display = "none";

    cadastro.style.display = "block";

});


// FECHAR NO X PRETO

btnFechar.addEventListener("click", () => {

    overlay.style.display = "none";

});


// FECHAR NO X BRANCO

btnFecharBranco.addEventListener("click", () => {

    overlay.style.display = "none";

});
// ==============================
// ERRO DE LOGIN
// ==============================

const parametros = new URLSearchParams(window.location.search);

if (parametros.get("erro") === "login") {

    overlay.style.display = "flex";

    cadastro.style.display = "none";

    login.style.display = "block";

    const mensagemErro = document.getElementById("mensagemErro");

    if (mensagemErro) {

        mensagemErro.textContent = "Email ou senha inválidos.";

        mensagemErro.style.display = "block";

    }

}
// ==============================
// ABRIR CADASTRO AUTOMATICAMENTE
// ==============================

if (parametros.get("abrir") === "cadastro") {

    overlay.style.display = "flex";

    cadastro.style.display = "block";

    login.style.display = "none";

}

// ==============================
// MOSTRAR / ESCONDER SENHA
// ==============================

function mostrarSenha(idCampo, botao) {

    const campo = document.getElementById(idCampo);

    const icone = botao.querySelector("i");

    if (campo.type === "password") {

        campo.type = "text";

        icone.classList.remove("fa-eye");
        icone.classList.add("fa-eye-slash");

    } else {

        campo.type = "password";

        icone.classList.remove("fa-eye-slash");
        icone.classList.add("fa-eye");

    }

}