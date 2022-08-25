import { NextApiHandler } from "next";
import prisma from "../../../libs/prisma";

const handlerGet: NextApiHandler = async (req, res) => {
    const { search, age, page, quantity } = req.query;

    let registryByPage = quantity ? parseInt(quantity as string) : 10;
    let limitRegByPage = 100;

    let take = (registryByPage > limitRegByPage) ? limitRegByPage : registryByPage;

    let skip = 0;
    if(page)
        skip = (parseInt(page as string) -1 ) * take;

    const totalRecord = await prisma.user.count({
        where: {

        }
    })

    const users = await prisma.user.findMany({
        skip,
        take,
        where: {
           
        },
        select: {
            id: true,
            name: true,
            age:true,
            email: true,
            active: false
        },
        orderBy: {
            id: 'asc'
        }
    });

    res.json({status: true, totalPages: totalRecord/take, currentPage: skip+1, users});
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