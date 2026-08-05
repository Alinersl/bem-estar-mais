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

// CADASTRO
const btnLogin = document.getElementById("btnLogin");
const btnFechar = document.getElementById("btnFechar");
const overlay = document.getElementById("overlay");
const btnEntrar = document.querySelector(".btn-cad");

// Abrir formulário
btnLogin.addEventListener("click", () => {
    overlay.style.display = "flex";
});

// Fechar no X
btnFechar.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Fechar no X branco
btnFecharBranco.addEventListener("click", () => {
    overlay.style.display = "none";
});

// Fechar ao clicar em Entrar
btnEntrar.addEventListener("click", () => {
    overlay.style.display = "none";
});