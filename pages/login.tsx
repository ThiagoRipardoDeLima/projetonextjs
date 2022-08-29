import { signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');

    const handlerSubmit = async () => {
        const request =  await signIn('credentials', {
            redirect: false,
            email, password
        })
    }

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>

            <h1>Login</h1>

            <input 
                type="email" 
                placeholder="Digite seu email"    
                value={email}
                onChange={ e => { setEmail(e.target.value) }}
            />

            <input 
                type="password" 
                placeholder="Digite sua senha"    
                value={password}
                onChange={ e => { setSenha(e.target.value) }}
            />
            
            <button onClick={handlerSubmit}>Login</button>

        </div>
    );
}

export default Login;