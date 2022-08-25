import { NextApiHandler, NextApiRequest } from "next";
import api from "../../../libs/api";

const handleUserNotFound = (user: Object | null) => {
    return {status: user !== null, user: user ?? {error: 'Usuário não encontrado'}};
}

const handlerGet: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const user = await api.getUser(parseInt(id as string))
    res.json(handleUserNotFound(user));
}

const handlerPut: NextApiHandler = async (req, res) => {
    const { name, active, email } =  req.body;
    const { id } = req.query;

    const updateUser = await api.updateUser(parseInt(id as string), name, active, email)
            .catch(()=>{
                res.json(handleUserNotFound(null));
            });

    if(updateUser)
        res.json(handleUserNotFound(updateUser));
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;

    const deleteUser = await api.deleteUser(parseInt(id as string))
    .catch(()=>{
        res.json(handleUserNotFound(null));
    });

    if( deleteUser )
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