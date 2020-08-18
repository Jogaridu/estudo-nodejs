import React, { useState } from 'react';

const HelloWorld = () => {
  return (
      <div>
        Hello Word! ReactJs
      </div>
  )
}

const BemVindo = (props) => {
  return (
      <div>{props.texto}</div>
  )
}

const Login = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  const handlerEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlerSenha = (event) => {
    setSenha(event.target.value);
  }

  const entrar = async () => {
    const retorno = await fetch("https://localhost:3333/sessao", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        senha
      })
    });

    console.log(await retorno.json());
  }

  return (
    <>
    <input type="text" value={email} onChange={handlerEmail} placeholder="Insira seu email"/>
    <input type="password" value={senha} onChange={handlerSenha} placeholder="Insira sua senha"/>
    <button onClick={entrar}>Salvar</button>

    </>
  );
}



function App() {
  return (
    <>
      <HelloWorld/>
      <BemVindo texto="Bem-Vindo ao ReactJs"/>
      <Login/>
    </>
    
  );
}

export default App;
