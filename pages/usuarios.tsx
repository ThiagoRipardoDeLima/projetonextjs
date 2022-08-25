import style from "../styles/Usuarios.module.css";
import Head from "next/head";
import Layout from "../component/Layout";
import api from "../libs/api";
import { User } from "../types/User";
import { useState } from "react";

type Props = {
    users: User[]
}

const Usuarios = ({ users }: Props ) => {
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [usersList, setUserList] = useState<User[]>(users)

    const handlerLoadMore = async () => {
        setLoading(true);
        
        const req = await fetch(`/api/users?page=${pageCount + 1}`);
        const json =  await req.json();

        if(json.status)
            setUserList([...usersList, json.users]);

        setLoading(false);
        setPageCount(1 + pageCount);
    }

    return (
        
        <div>
            <Head>
                <title>Lista de usuários</title>
            </Head>

            <h1>Usuários</h1>

            <br />

            <ul>
                {usersList.map((user, index)=>(
                    <li key={index}> {user?.name} </li>
                ))}
            </ul>

            <button onClick={handlerLoadMore}>Carregar mais (Click: {pageCount})</button>

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