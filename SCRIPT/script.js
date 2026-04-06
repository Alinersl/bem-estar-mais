//carrosel//
let index = 0;
showSlide(index);

function showSlide(i) {
  let slides = document.getElementsByClassName("slide");
  
  if (i >= slides.length) index = 0;
  if (i < 0) index = slides.length - 1;
  
  for (let s of slides) {
    s.style.display = "none";
  }
  
  slides[index].style.display = "block";
}

function changeSlide(n) {
  index += n;
  showSlide(index);
}

const botaoDark = document.getElementById('mudar-dark');

if (localStorage.getItem('modo') === 'dark') {
  document.body.classList.add('dark');
  botaoDark.textContent = '☀️ Modo Claro';
} else {
  botaoDark.textContent = '🌙 Modo Escuro';
}

botaoDark.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('modo', 'dark');
    botaoDark.textContent = '☀️ Modo Claro';
  } else {
    localStorage.setItem('modo', 'light');
    botaoDark.textContent = '🌙 Modo Escuro';
  }
});
const comentarios = [];
const form = document.querySelector('#form');
const listaComentarios = document.querySelector('#listaComentarios');

// corrigir
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = form.querySelector('#nome').value;
    const email = form.querySelector('#email').value;
    const mensagem = form.querySelector('#mensagem').value;

    const comentario = { nome, email, mensagem }
    comentarios.push(comentario);

    adicionarComentario();
    form.reset();
});   

function adicionarComentario() {
    listaComentarios.innerHTML = '';
    for (let i = 0; i < comentarios.length; i++) {
        const comentario = comentarios[i];
        const card = document.createElement('div');
        card.classList.add('card');
        listaComentarios.innerHTML += `
            <div>
                <h3 style= color: #f0f0f0;> Nome: ${comentario.nome}</h3>
                <p style= color: #f0f0f0;> Email: ${comentario.email}</p>
            </div>
            <p style= color: #f0f0f0;> Comentou: <span> ${comentario.mensagem} </span></p><hr>`;
    }
}
