import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    max-width: 1220px;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ImageCropped = styled.div`
    width: 100%;
    max-width: 580px;
    min-width: 100px;
    height: 80%;
    max-height: 700px;
    overflow: hidden;
    border: 1px solid var(--white);
    border-right: 0px;
    border-radius: 10px 0px 0px 10px;


    > img {
        height: 100%;
        width: 800px;
        margin-left: -110px;
    }

    @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;

        > input {
            width: 100%;
            
        }
    }
`

export const Form = styled.form`
    width: 100%;
    max-width: 400px;
    height: 80%;    
    max-height: 700px;

    border: 1px solid var(--white);
    border-radius: 0px 10px 10px 0px;
    border-left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Titulo = styled.h1`
    color: var(--red);
    font-size: 40px;
    letter-spacing: 5px;
    text-shadow: 0px 0px 3px var(--white), 0px 0px 5px var(--white);
    cursor: default;

    :hover {
        color: var(--primary);
        transition: 800ms;
    }
`

export const SubTitulo = styled(Titulo)`
    font-size: 20px;
    margin-bottom: 20px;
    color: var(--white);
    text-shadow: none;

    :hover {
        color: var(--red);
    }
`;

export const InputGroup = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    > label {
        margin: 0px 10px;
        min-width: 65px;
    }

    >input {
        flex: 1;
        margin-right: 10px;
    }
`;

export const Button = styled.button`
    min-width: 200px;
    margin: 10px 10px 0px 0px;
    align-self: flex-end;
`;

