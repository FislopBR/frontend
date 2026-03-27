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