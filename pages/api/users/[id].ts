import { NextApiHandler, NextApiRequest } from "next";
import { isObject } from "util";
import prisma from "../../../libs/prisma";

const handleUserNotFound = (user: Object | null) => {
    return {status: user !== null, user: user ?? {error: 'Usuário não encontrado'}};
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id as string)
        }
    });

    res.json(handleUserNotFound(user));
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { name, active, email } =  req.body;
    const { id } = req.query;

    const updateUser = await prisma.user.update({
        where: {
            id: parseInt(id as string),
        },
        data: {
            name,
            active,
            email
        }
    });

    res.json(handleUserNotFound(updateUser));
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deleteUser = await prisma.user.delete({
        where: {
            id: parseInt(id as string)
        }
    });

    res.json(handleUserNotFound(deleteUser));
}

const handler: NextApiHandler = async (req, res) => {

    switch(req.method){
        case 'GET':
            handlerGet(req, res);
            break;
        
        case 'PUT':
            handlerPut(req, res);
            break;
        
        case 'DELETE':
            handlerDelete(req, res);
            break;
            
        default:
            res.json(501);
    }
}

export default handler;