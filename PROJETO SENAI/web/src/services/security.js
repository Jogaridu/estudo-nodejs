const KEY_ALUNO = "@aluno"

export const signIn = (aluno) => {
    localStorage.setItem(KEY_ALUNO, JSON.stringify(aluno));
}

export const signOut = () => {
    localStorage.clear()
}

export const isSignedIn = () => {
    const aluno = JSON.parse(localStorage.getItem(KEY_ALUNO));

    return aluno? true : false;
}