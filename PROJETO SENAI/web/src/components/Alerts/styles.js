import styled from 'styled-components';

export const Alert = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 0px;
  height: 60px;
  margin: 10px;

  transition: width 200ms;

  background-color: ${(props) => props.tipo === "sucesso" ? "var(--alertSucesso)" : "var(--alertErro)"};

  z-index: 9;
  
  > h1 {
      font-size: 18px;
      font-weight: 500;
      margin: 10px;

      color: var(--primary);
  }

  > span {
    position: absolute;
    top: 0;
    right: 0;

    margin: 0 5px;

    cursor: pointer;

    font-size: 20;
  }
`;
