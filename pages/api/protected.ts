import { NextApiHandler } from "next";
import { getSession } from "next-auth/react";

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({req});

    if(!session){
        res.status(403).json({message:'Acesso Negado.'});
        return;
    }

    return res.json({message: 'Acesso permitido', session});
}

export default handler;