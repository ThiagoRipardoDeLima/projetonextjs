import { NextApiHandler } from "next";
import { Users } from "../../../util/users";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
    const { search, age } = req.query;

    const users = await prisma.user.findMany();

    res.json({status: true, users});
}

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
        data: {name, email}
    })

    res.status(201).json({statu: true, user: newUser});
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