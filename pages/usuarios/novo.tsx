import styles from "../../styles/Usuarios.module.css";
import Head from "next/head";

import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

const NovoUsuario = () => {
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const handlerSaveForm = async () => {
        if(!(nameInput && emailInput)){
            alert('Atenção: informe nome e email para prosseguir');
            return;
        }        

        const json = await axios.post('/api/users',{
            name: nameInput,
            email: emailInput
        })

        if(json.data.status){
            alert('Usuário cadastrado!');
            Router.push('/usuarios');
            return;
        } 

        alert(json.data.msg);
        
    }

    return (
        
        <div>
            <Head>
                <title>Cadastro de Usuários</title>
            </Head>

            <h1>Cadastro de Usuários</h1>

            <Link href={`/usuarios`}><button>Voltar</button></Link>
            
            
            <br />
            <br />
            <input 
                className={styles.input}
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Digite o nome do usuário"
            />
            
            <br />
            <br />
            <br />

            <input 
                className={styles.input}
                type="email"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Digite o email do usuário"
            />

            <br />
            <br />

            <button onClick={handlerSaveForm}>Cadastrar</button>
        </div>
        
    );

}

/* export const getServerSideProps = async () => {
   
} */

export default NovoUsuario;