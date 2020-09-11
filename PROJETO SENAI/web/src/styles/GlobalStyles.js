import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root {
    --primary: #111;
    --secondary: rgb(25,25,25);
    --white: #D9D9D9;
    --gray: #7A7A7A;
    --red: #AA0000;
    --alertErro: #AA0000DD;
    --alertSucesso: #00AA00DD;
}

* {
    margin: 0;
    padding: 0;
    outline: 0;
}

body {
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    background-color: var(--primary);
    overflow-x: hidden;
}

input {
    color: var(--white);
    background-color: var(--secundary);
    font-size: 16px;
    border: 1px solid var(--white);
    padding: 10px;
    font-weight: bold;
    height: 30px;
    transition: 200ms;
}

input:hover,
button:hover,
textarea {
    background-color: var(--red);
    transition: 200ms;
}

label {
    color: var(--white);
    letter-spacing: 2px;
    font-size: 20px;
}

button {
    padding: 10px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--white);
    background-color: var(--primary);
    border: 1px solid var(--white);
    transition: 200ms;
    cursor: pointer;

    :active {
        color: var(--gray);
        border: 1px solid var(--gray);
        
    }
}

textarea {
    color: var(--white);
    background-color: var(--secundary);
    font-size: 16px;
    border: 1px solid var(--white);
    padding: 10px;
    font-weight: bold;
    height: 30px;
    transition: 200ms;
    resize: none;
}
`;
