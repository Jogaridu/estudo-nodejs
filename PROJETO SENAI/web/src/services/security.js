import { api } from "./api";

const KEY_ALUNO = "@aluno"

export const signIn = (aluno) => {
    localStorage.setItem(KEY_ALUNO, JSON.stringify(aluno));

    api.defaults.headers.common["Authorization"] = `Bearer ${aluno.token}`;
}

export const signOut = () => {
    localStorage.clear();

    api.defaults.headers.common["Authorization"] = undefined;
}

export const isSignedIn = () => {
    const aluno = JSON.parse(localStorage.getItem(KEY_ALUNO));

    if (aluno) {
        api.defaults.headers.common["Authorization"] = `Bearer ${aluno.token}`;

    }

    return aluno? true : false;
}

export const getAluno = () => {
    const { aluno } = JSON.parse(localStorage.getItem(KEY_ALUNO));

    return aluno;
}