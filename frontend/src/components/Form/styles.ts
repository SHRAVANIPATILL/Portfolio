import styled from "styled-components";


export const Container = styled.div`
  margin-top: 3rem;
  display: grid;
  place-items: center;
  background-color: #21212150;
  backdrop-filter: blur(6px);
  border: 1px solid #FFF;
  padding:50px;
  border-radius:10px;

  
  h2{
    text-align: center;
    margin-bottom: 2rem;
  }
  form{
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    input, textarea{
      width: 60rem;
      padding: 1rem 2rem;
      outline: none;
      border: none;
      background:none;
      border-radius:10px;
      border: 1px solid #FFF;
      color: white;
      font-weight: 600;
      &::placeholder{
        color: #FFF;
      }
    }

    textarea{
      height: 15rem;
      overflow-y: auto;
      resize: none;
    }

    button{
      padding: 1rem 6rem;
      text-transform: uppercase;
    }
  
  }

  @media (max-width: 740px){
    form{
      width: 100%;
      
      input,textarea{
        width: 100%;
      }
    }
  }
`


export const ContainerSucces = styled.div`
  margin-top: 10rem;
  text-align: center;

  button{
    border-radius: 0.6rem;
    padding: 1rem;
    margin-top: 0.8rem;
    text-transform: uppercase;
    text-align: center;
    color: #fbfbfb;
  }
`