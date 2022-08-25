import style from "../styles/Usuarios.module.css";
import Head from "next/head";
import Layout from "../component/Layout";
import api from "../libs/api";
import { User } from "../types/User";

type Props = {
    users: User[]
}

const Usuarios = ({ users }: Props ) => {

    console.log(users);

    return (
        
        <div>
            <Head>
                <title>Lista de usuários</title>
            </Head>

            <h1>Usuários</h1>

            <br />

            <ul>
                {users.map((user, index)=>(
                    <li key={index}> {user.name} </li>
                ))}
            </ul>

        </div>
        
    );

}

export const getServerSideProps = async () => {
    const res = await api.getAllUsers();

    const users = res.users;
    
    return {
        props: {
            users
        }
    }
}

export default Usuarios;