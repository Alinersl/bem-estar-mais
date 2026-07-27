// MODO CLARO E ESCURO
const body = document.body;

const sol = document.getElementById("sol");
const lua = document.getElementById("lua");

sol.addEventListener("click", () => {

    body.classList.add("dark");

    sol.style.display = "none";
    lua.style.display = "block";

});

lua.addEventListener("click", () => {

    body.classList.remove("dark");

    lua.style.display = "none";
    sol.style.display = "block";

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

// Fechar ao clicar em Entrar
btnEntrar.addEventListener("click", () => {
    overlay.style.display = "none";
});