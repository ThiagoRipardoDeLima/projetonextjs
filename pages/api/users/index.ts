import { NextApiHandler } from "next";
import api from "../../../libs/api";

const handlerGet: NextApiHandler = async (req, res) => {
    const { search, age, page, quantity } = req.query;
    const users = await api.getAllUsers(parseInt(page as string), parseInt(quantity as string));
    
    if(!users.length){
        res.json({status: false});
        return;
    }

    res.json({status: true, users});
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body;

    const newUser = await api.insertUser(name, email)
    .catch(()=>{
        res.json({ status: false, msg: 'Usuário já existe'});
        return;
    })

    if(newUser)
        res.status(201).json({status: true, user: newUser});
}

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;

        case 'POST':
            handlerPost(req, res);
            break;
    
        default:
            res.status(501);
            break;
    }
}

export default handler;