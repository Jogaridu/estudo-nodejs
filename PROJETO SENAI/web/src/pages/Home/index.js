import React, { useState, useEffect } from 'react';

import './styles.css';
import fotoPerfil from "./../../assets/foto_perfil.png";
import imgPost from "./../../assets/post-exemplo.jpg";
import { FiGithub, FiLogOut } from "react-icons/fi";
import { signOut, getAluno } from '../../services/security';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';
import PopUp from '../../components/PopUp';

const CardPost = ({ post }) => {

    const [mostrarComentarios, setMostrarComentarios] = useState(false);

    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");

    const carregarComentarios = async () => {

        try {

            if (!mostrarComentarios) {
                const retorno = await api.get(`postagens/${post.id}/comentarios`);

                setComentarios(retorno.data.Comentarios);
            }


            setMostrarComentarios(!mostrarComentarios);

        } catch (error) {
            console.log(error);

        }


    }

    const criarComentario = async (evento) => {
        evento.preventDefault();

        try {
            // Chamada para a API, criando um novo comentário
            const retorno = await api.post(`/postagens/${post.id}/comentarios`, {
                descricao: novoComentario
            });

            // Recebe o retorno da api com o comentário criado
            let comentario = retorno.data;

            // Coloca os dados do aluno logado no comentário criado
            comentario.Aluno = getAluno();

            // Atualiza a lista inserindo o novo comentário
            // Seta a lista com o que ela já tinha, e com o novo comentário
            setComentarios([...comentario], comentario);

            // Limpa o campo novo comentário
            setNovoComentario("");

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="card-post">
            <header>

                <img src={fotoPerfil} alt="Foto de perfil" />
                <strong>{post.Aluno.nome}</strong>
                <p>{post.createdAt}</p>
                {post.gists && (<FiGithub className="icon" size="25" />)}

            </header>

            <div className="body">

                <h3>{post.titulo}</h3>

                <p>{post.descricao}</p>

                <img src={imgPost} alt="Imagem da postagem" />

            </div>


            <div className="footer">

                <h1 onClick={carregarComentarios}>Comentários</h1>

                {comentarios.length === 0 && (<p>Seja o primerio a comentar</p>)}

                {mostrarComentarios && (
                    <>
                        {comentarios.map(comentario => (

                            <div className="containerComentarios" key={comentario.id}>
                                <div>
                                    <img src={fotoPerfil} alt="Foto de perfil" />
                                    <strong>{comentario.Aluno.nome}</strong>
                                    <p>{comentario.createdAt}</p>
                                </div>

                                <p>{comentario.descricao}</p>
                            </div>

                        ))}

                    </>
                )}

                <form className="novoComentario" onSubmit={criarComentario}>
                    <textarea placeholder="Responder a dúvida"
                        value={novoComentario}
                        onChange={(e) => setComentarios(e.target.value)}></textarea>
                    <button>Enviar</button>
                </form>
            </div>
        </div>

    );
}

function Home() {

    const history = useHistory();

    const [mensagem, setMensagem] = useState("");

    const [postagens, setPostagens] = useState([]);

    const [mostrarNovaPostagem, setMostrarNovaPostagem] = useState(false);

    useEffect(() => {

        const carregarPostagens = async () => {
            try {

                const retorno = await api.get("/postagens");

                setPostagens(retorno.data);



            } catch (error) {
                if (error) {
                    setMensagem(error.response.data.error)

                } else {
                    setMensagem("Algo deu errado da API");

                }
            }

        }

        carregarPostagens();

    }, []);

    const NovaPostagem = () => {

        const [novaPostagem, setNovaPostagem] = useState({
            titulo: "",
            descricao: "",
            gists: ""
        });

        const { titulo, descricao, gists } = novaPostagem;


        const fechar = () => {

            if ((titulo || descricao || gists) && !window.confirm("Tem certeza que quer abandonar a dúvida")) {
                return;
            }

            setMostrarNovaPostagem(false);

        }

        const handlerInput = (e) => {
            setNovaPostagem({ ...novaPostagem, [e.target.id]: e.target.value })
        }

        return (<PopUp>
            <form className="novaPostagem">
                <span onClick={fechar}>&times;</span>

                <h1>Comente sua dúvida</h1>

                <label>Titulo</label>
                <input type="text" id="titulo" placeholder="Sua dúvida..." onChange={handlerInput} />

                <label>Descrição</label>
                <textarea placeholder="Descreva em detalhes, o que te aflige?" id="descricao" onChange={handlerInput}></textarea>

                <label>Gists <em>[Opcional]</em></label>
                <input type="text" placeholder="Seu gists" id="gists" onChange={handlerInput} />

                <label>Imagem <em>[Opcional]</em></label>
                <input type="file" />
                <img alt="Preview" />

                <button>Enviar</button>
            </form>
        </PopUp>)
    }

    const alunoSessao = getAluno();

    return (
        <div className="container">

            {mostrarNovaPostagem && <NovaPostagem setMostrarNovaPostagem={setMostrarNovaPostagem} />}

            <header className="header">
                <div>
                    <p>Senai Overflow</p>
                </div>
                <div>
                    <input type="search" placeholder="Pesquisar uma Dúvida" />
                </div>
                <div>
                    <button className="btnSair" onClick={() => {

                        signOut();

                        history.replace("/");

                    }}>Sair <FiLogOut /></button>
                </div>
            </header>

            <div className="content">
                <div className="profile">
                    <img src={fotoPerfil} alt="Foto de perfil" />

                    <label href="#">Editar foto</label>

                    <strong>Nome</strong>
                    <p>{alunoSessao.nome}</p>

                    <strong>RA</strong>
                    <p>{alunoSessao.ra}</p>

                </div>

                <div className="feed">
                    {postagens.map((post) => (<CardPost key={post.id} post={post} />))}
                </div>

                <div className="actions">
                    <button onClick={() => setMostrarNovaPostagem(true)}>Nova Postagem</button>
                </div>
            </div>
        </div>
    );
}

export default Home;