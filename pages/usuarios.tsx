import style from "../styles/Usuarios.module.css";
import Head from "next/head";
import Layout from "../component/Layout";


const Usuarios = () => {
    
    return (
        
        <div>
            <Head>
                <title>Usuários</title>
            </Head>

            <h1>Usuários</h1>

        </div>
        
    );

}

export const getServerSideProps = async () => {
    return {
        props: {

        }
    }
}

export default Usuarios;