import axios from "axios";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";

const Login = () => {
    const [errorText, setErrorText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const login = async (email: string, password: string ) => {

        //pegar crsf
        const csrfReq = await axios.get('/api/auth/csrf');
        if(csrfReq.data.csrfToken){
            const authReq = await axios.post('/api/auth/callback/credentials', {
                json: true,
                csrfToken: csrfReq.data.csrfToken,
                email,
                password
            });
            
            //validar credentials
            if(authReq.status === 200){
                const userData = await axios.get('/api/auth/session');                
                return userData.data.user?.name.length > 0;
            } 
        }
        
        return false
    }

    const handlerSubmit = async () => {

        if(!email || !password){
            setErrorText('Informe email e senha para prosseguir!');
            return;
        }

        setErrorText('');
        setLoading(true);
        const logged = await login(email, password);
        setLoading(false);

        if(logged){
            window.location.href = '/';
            return;
        }

    }

    return (
        <div>
            <Head>
                <title>Login API</title>
            </Head>

            <h1>Login API</h1>

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

            {errorText}
            {loading && <div>Carregando...</div> }

        </div>
    );
}

export default Login;