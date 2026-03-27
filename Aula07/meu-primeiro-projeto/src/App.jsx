import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <div>
      <h1>Olá, React!</h1>
      <p>Estou alterando meu primeiro componente.</p>
      <Saudacao/>
      <Painel/>
      <Perfil/>
      <Usuario nome="Filippo" idade={18} sexo="masculino" />
      <Painel2/>
      <PlacarFutebol/>
    </div>
  )
}
export default App

function Saudacao() {
  return (
    <div style={{backgroundColor: '#f0f0f0',padding: '20px', borderRadius: '10px',marginBottom: '10px'}}>
      <h2 style={{color: '#007bff'}}>Olá, Saudação!</h2>
      <p>Este componete foi criado separadamente.</p>
    </div>
  )
}

function Perfil() {
  return (
    <div style={{backgroundColor: '#e0e0e0',padding: '20px', borderRadius: '10px',marginBottom: '10px'}}>
      <h2 style={{color: '#28a745'}}>Perfil do Usuário</h2>
      <p>Este componente exibe informações do usuário.</p>
    </div>
  )
}

function Painel() {
  return (
    <div style={{backgroundColor: '#d0d0d0',padding: '20px', borderRadius: '10px',marginBottom: '10px'}}>
      <h2 style={{color: '#dc3545'}}>Painel de Controle</h2>
      <p>Este componente é o painel de controle do sistema.</p>
    </div>
  )
}

function Usuario({ nome, idade, sexo }) {
  return (
    <div style={{backgroundColor: '#c0c0c0',padding: '20px', borderRadius: '10px',marginBottom: '10px'}}>
      <h2 style={{color: '#17a2b8'}}>Dados do Usuário</h2>
      <p>Nome: {nome}</p>
      <p>Idade: {idade} anos</p>
      <p>Sexo: {sexo}</p>
    </div>
  )
}

function Painel2() {
  const [texto,setTexto] = useState('');

  return (
    <div style={{background:'#f9f9f9', padding: '15px', borfer: '1px dashed #666', marginTop: '20px'}}>
      <h4>Escreva uma mensagem</h4>
      <input 
      type="text"
      placeholder='Digite algo'
      onChange={(e) => setTexto(e.target.value)}
      style={{padding: '8px', width: '80%'}}
      />
      <p>O que você digitou: <span style={{color: 'red'}}>{texto}</span></p>
    </div>
  )
}

function PlacarFutebol({ nomeTimeA, nomeTimeB }) {
  // Criamos duas "caixinhas de memória" (States)
  const [golsA, setGolsA] = useState(0);
  const [golsB, setGolsB] = useState(0);

  return (
    <div style={{
      border: '3px solid #2e7d32',
      borderRadius: '15px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f1f8e9',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h2 style={{ color: '#1b5e20' }}>⚽ Placar do Jogo</h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>

        {/* Lado do Time A */}
        <div>
          <h3>{nomeTimeA}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsA}</h1>
          <button onClick={() => setGolsA(golsA + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>

        <h1 style={{ margin: '0 20px' }}>X</h1>

        {/* Lado do Time B */}
        <div>
          <h3>{nomeTimeB}</h3>
          <h1 style={{ fontSize: '48px', margin: '10px 0' }}>{golsB}</h1>
          <button onClick={() => setGolsB(golsB + 1)} style={botaoEstilo}>
            GOL!
          </button>
        </div>

      </div>

      <hr style={{ margin: '20px 0' }} />

      <button
        onClick={() => { setGolsA(0); setGolsB(0); }}
        style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
      >
        Reiniciar Partida 🔄
      </button>
    </div>
  );
}

// Estilo simples para os botões de GOL
const botaoEstilo = {
  backgroundColor: '#2e7d32',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold'
};