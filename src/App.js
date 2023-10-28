import { useState, useEffect } from 'react';
import './css/App.css';


function App() {

  const [conteudo, setConteudo] = useState(<h2>Carregando...</h2>)

async function carregarTodosPersonagens(){
  const requestOptions = {
    method: 'Get',
    redirect: 'follow'
  }

  const result = await fetch(
    'https://rickandmortyapi.com/api/character',
   requestOptions 

  )
    .then(response => response.text())
    .then(result => { return result })
    .catch(error => console.log('erro aqui', error))

    const personagens = JSON.parse(result)

  return personagens.results
}

async function montarListaPersonagens(){
  const personagens = await carregarTodosPersonagens()
  
  return personagens.map(personagem =>
    <div className='card char' key={personagem.id}>
      <img src={personagem.image} alt={personagem.name} />

      <div className='char-info'>
        <span><b>Espécie:</b> {personagem.species}</span>
        <span><b>Gênero:</b> {personagem.gender}</span>
      </div>

      <h2>{personagem.name}</h2>
      <div className='listaSecundaria'>
        <b>Participações: </b>
      </div>

      <h5><b>Status:</b> {personagem.status}</h5>
    </div>
  )
}

  useEffect(() => {
    async function pegarConteudo (){
      setConteudo(await montarListaPersonagens())
    }

    pegarConteudo()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty</h1>
        <h2><a href='/'>Personagens</a></h2>
      </header>

      <div className='lista-principal'>
        { conteudo }
      </div>
    </div>
  );
}

export default App;
