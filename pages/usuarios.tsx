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
    const [showMore, setShowMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [usersList, setUserList] = useState<User[]>(users)

    const handlerLoadMore = async () => {
        if(!loading){
            setLoading(true);
            const req = await fetch(`/api/users?page=${pageCount + 1}`);
            const json = await req.json();
            console.log(json);
            setTimeout(() => {
                (json.status) 
                    ? setUserList([...usersList, ...json.data])
                    : setShowMore(false);
                
                setLoading(false);
                setPageCount(pageCount + 1);
            }, 2000);
        }
       
    }

    const handlerAddMore = async () => {
        const req = await fetch(`/api/users/populate`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        });
        const json = await req.json();

        if(json.status)
            setUserList([...usersList, ...json.user]);

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