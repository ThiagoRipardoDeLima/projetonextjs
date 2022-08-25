import { Prisma } from "@prisma/client";
import { randomInt } from "crypto";
import { NextApiHandler } from "next";
import prisma from "../../../../libs/prisma";
import { util } from "../../../../libs/util";

type User = {
    id: number,
    uuid: string,
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    ip: string,
    macAddress: string,
    website: string,
    image: string
} 

const handleUserNotFound = (user: Object | null, err: string | null) => {
    return {status: user !== null, user: user ?? {error: err}};
}

const handlerPopulateBd = async (users: any) => {
    const userCreate = await prisma.user.createMany({
        data: users
    }).catch(()=>{
        return false;
    });

    return true;
}

const handlerGetDataFakeApi = async () => {
    const res = await fetch("https://fakerapi.it/api/v1/users");
    const users = await res.json();
    return users.data;
}

const handlerPostUser: NextApiHandler = async (req, res) => {
    const users: User[] = await handlerGetDataFakeApi();

    if(users.length <= 0)
        handleUserNotFound(null, 'Usuários não encontrado');

    const usersSave: any = [];
    users.map((user, index)=>(
        usersSave.push(
            {
                name: user.username,
                age: util().getRandomInt(1,100),
                email: user.email
            }
        )
    ));

    if(!await handlerPopulateBd(usersSave))
        res.json(handleUserNotFound(null, 'Falha ao popular tabela'));


    res.json(handleUserNotFound(usersSave, 'tudo certo!'));
    
}

const handler: NextApiHandler = async (req, res) => {
    switch(req.method){
        case 'POST':
            handlerPostUser(req, res);
            break;

        default:
            res.status(501).json({erro: 'Requisição inválida'});

    }
}

export default handler;