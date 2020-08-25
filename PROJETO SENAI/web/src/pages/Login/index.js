import React, { useState } from "react";

import { Container, ImageCropped, Form, Titulo, SubTitulo, InputGroup, Button } from "./styles";

import Foto from "./../../assets/foto.jpg";
import {api} from "./../../services/api";

import Alerts from "../../components/Alerts";

import { useHistory } from "react-router-dom";
import { signIn } from "../../services/security";

const FormLogin = (props) => {

    const history = useHistory();

    const [alunoLogin, setAlunoLogin] = useState({
        email: "",
        senha: ""
    });

    const entrar = async (event) => {
        event.preventDefault();

        try {
            const retorno = await api.post("/sessao", alunoLogin);

            if (retorno.status == 201) {

                signIn(retorno.data);

                return history.push("/home");
            }
            
        } catch (erro) {
            if (erro.response) {
                return alert(erro.response.data.error)

            }

            alert("Ops, falha ao falar com o servidor");
        }
    }

    const handlerInput = (event) => setAlunoLogin({...alunoLogin, [event.target.id]: event.target.value});
    
    return (
        <Form onSubmit={entrar}>
            <Titulo>Senai Overflow</Titulo>
            <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
            <InputGroup>
                <label>Email</label>
                <input type="email" id="email" value={alunoLogin.email} onChange={handlerInput} placeholder="Insira seu email" required/>
            </InputGroup>
            <InputGroup>
                <label>Senha</label>
                <input type="password" id="senha" value={alunoLogin.senha} onChange={handlerInput} placeholder="Insira sua senha" required/>
            </InputGroup>
            <Button type="submit">Entrar</Button>
            <Button type="button" onClick={() => props.mostrarForm("registrar")}>Registrar-se</Button>
        </Form>
       
    )
}

const Registrar = (props) => {

    const [alunoRegistrar, setAlunoRegistrar] = useState({
        ra: "",
        nome: "",
        email: "",
        senha: ""
    });

    const entrar = async (event) => {
        event.preventDefault();

        try {
            const retorno = await api.post("/alunos/cadastrar", alunoRegistrar);

            if (retorno.status == 201) {
                alert("Registrado com sucesso");
            }
            
        } catch (erro) {
            if (erro.response) {
                return alert(erro.response.data.erro)

            }

            alert("Ops, falha ao falar com o servidor");
        }
    }

    const handlerInput = (event) => setAlunoRegistrar({...alunoRegistrar, [event.target.id]: event.target.value});
    
    return (
        <Form onSubmit={entrar}>
            <Titulo>Senai Overflow</Titulo>
            <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
            <InputGroup>
                <label>RA</label>
                <input type="number" id="ra" value={alunoRegistrar.ra} onChange={handlerInput} placeholder="Insira seu RA" required/>
            </InputGroup>
            <InputGroup>
                <label>Nome</label>
                <input type="text" id="nome" value={alunoRegistrar.nome} onChange={handlerInput} placeholder="Insira seu nome" required/>
            </InputGroup>
            <InputGroup>
                <label>Email</label>
                <input type="email" id="email" value={alunoRegistrar.email} onChange={handlerInput} placeholder="Insira seu email" required/>
            </InputGroup>
            <InputGroup>
                <label>Senha</label>
                <input type="password" id="senha" value={alunoRegistrar.senha} onChange={handlerInput} placeholder="Insira sua senha" required/>
            </InputGroup>
            <Button type="submit">Enviar</Button>
            <Button type="button" onClick={() => props.mostrarForm("login")}>Já tenho cadastro</Button>
        </Form>
       
    )
}

const Login = () => {

    const [mostrarForm, setMostrarForm] = useState("login");

    return (
        <Container>
            <ImageCropped>
                <img src={Foto} alt="Imagem de capa"/>
            </ImageCropped>

            {mostrarForm == "login"? (<FormLogin mostrarForm={setMostrarForm}/>) : (<Registrar mostrarForm={setMostrarForm}/>)}
            
            
        </Container>
    )
}

export default Login