import styles from "../styles/Usuarios.module.css";
import Head from "next/head";
import api from "../../libs/api";
import { User } from "../../types/User";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";

type Props = {
    users: User[]
}

const Usuarios = ({ users }: Props ) => {
    const [showMore, setShowMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [usersList, setUserList] = useState<User[]>(users);

    const handlerLoadMore = async () => {
        if(!loading){
            setLoading(true);
            const json = await axios.get(`/api/users?page=${pageCount + 1}`);

            (json.data.status) 
                ? setUserList([...usersList, ...json.data.users])
                : setShowMore(false);
            
            setLoading(false);
            setPageCount(pageCount + 1);
            
        }
       
    }

    const handlerAddMore = async () => {
        const json = await axios.post(`/api/users/populate`);
        if(json.data.status)
            setUserList([...usersList, ...json.data.user]);

    }

    return (
        
        <div>
            <Head>
                <title>Lista de usuários</title>
            </Head>

            <h1>Usuários</h1>

            <button><Link href={`/usuarios/novo`}>Novo Usuário</Link></button>
            

            <br />

            <ul>
                {usersList.map((user, index)=>(
                    <li key={index}> {user?.name} </li>
                ))}
            </ul>

            {showMore &&
                <button onClick={handlerLoadMore} >{ !loading ? "Carregar mais" : "Aguarde, carregando..."}</button>
            }
            
            <button onClick={handlerAddMore}>Adicionar mais usuarios</button>
            
        </div>
        
    );

}

export const getServerSideProps = async () => {
    const res = await api.getAllUsers();

    const users = res;
    
    return {
        props: {
            users
        }
    }
}

export default Usuarios;