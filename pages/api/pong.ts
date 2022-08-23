import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
    return res.json({pong: true});
}

export default handler;