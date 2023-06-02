import { conectaApi } from './conectaApi.js';
import constroiCard from './mostrarVideos.js';

async function buscarVideo(evento) {
  evento.preventDefault();
  const dadosDePesquisa = document.querySelector('[data-pesquisa]').value;

  const videos = await conectaApi.buscaVideos(dadosDePesquisa);

  const lista = document.querySelector('[data-lista]');

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  if (videos.length == 0) {
    lista.innerHTML = `
      <h3 class = 'mensagem__error'>Nenhum video encontrado</h3>
    `;
  }
  videos.forEach(element => {
    lista.appendChild(
      constroiCard(
        element.titulo,
        element.descricao,
        element.url,
        element.image
      )
    );
  });
}

const botaoDePesquisa = document.querySelector('[data-botao-pesquisa]');
botaoDePesquisa.addEventListener('click', e => buscarVideo(e));
