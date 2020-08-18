import React from "react";

import { Container, ImageCropped, Form, Titulo, SubTitulo, InputGroup, Button } from "./styles";

import Foto from "./../../assets/foto.jpg";

const Login = () => {

    return (
        <Container>
            <ImageCropped>
                <img src={Foto} alt="Imagem de capa"/>
            </ImageCropped>
            <Form>
                <Titulo>Senai Overflow</Titulo>
                <SubTitulo>Compartilhe suas dúvidas</SubTitulo>
                <InputGroup>
                    <label>Email</label>
                    <input type="email" placeholder="Insira seu email"/>
                </InputGroup>
                <InputGroup>
                    <label>Senha</label>
                    <input type="password" placeholder="Insira sua senha"/>
                </InputGroup>
                <Button>Entrar</Button>
                <Button>Registrar-se</Button>
            </Form>
        </Container>
    )
}

export default Login