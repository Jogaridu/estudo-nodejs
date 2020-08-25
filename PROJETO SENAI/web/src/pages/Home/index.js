import React from 'react';

import './styles.css';
import fotoPerfil from "./../../assets/foto_perfil.png";
import imgPost from "./../../assets/post-exemplo.jpg";
import {FiGithub, FiLogOut} from "react-icons/fi";
import { signOut } from '../../services/security';
import { useHistory } from 'react-router-dom';

function Home() {

    const history = useHistory();

    return (
        <div className="container">

            <header className="header">
                <div>
                    <p>Senai Overflow</p>
                </div>
                <div>
                    <input type="search" placeholder="Pesquisar uma Dúvida"/>
                </div>
                <div>
                    <button className="btnSair" onClick= {() => {

                        signOut();

                        history.replace("/");

                    }}>Sair <FiLogOut /></button>
                </div>
            </header>

            <div className="content">
                <div className="profile">
                    <img src={fotoPerfil} alt="Foto de perfil"/>

                    <a href="#">Editar foto</a>

                    <strong>Nome</strong>
                    <p>Jorge Gabriel Ricci Dutra</p>

                    <strong>Email</strong>
                    <p>e-jorge2010@hotmail.com</p>

                    <strong>RA</strong>
                    <p>19266852</p>

                </div>

                <div className="feed">
                    <div className="card-post">
                        <header>

                            <img src={fotoPerfil} alt="Foto de perfil"/>
                            <strong>Jorge Gabriel</strong>
                            <p>21/12/2012 às 12:12</p>
                            <FiGithub className="icon" size="25"/>

                        </header>

                        <div className="body">

                            <title>Aqui é minha pergunta</title>
                            
                            <p>Aqui é a descrição da minha pergunta</p>

                            <img src={imgPost} alt="Imagem da postagem"/>

                        </div>

                        
                        <div className="footer">

                            <h1>Comentários</h1>

                            <div className="containerComentarios">
                                <div>
                                    <img src={fotoPerfil} alt="Foto de perfil"/>
                                    <strong>Fulano</strong>
                                    <p>21/12/2012 às 12:12</p>
                                </div>

                                <p>Aqui é um comentário</p>

                            </div>

                            <div className="containerComentarios">
                                <div>
                                    <img src={fotoPerfil} alt="Foto de perfil"/>
                                    <strong>Fulano</strong>
                                    <p>21/12/2012 às 12:12</p>
                                </div>

                                <p>Aqui é um comentário</p>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Home;