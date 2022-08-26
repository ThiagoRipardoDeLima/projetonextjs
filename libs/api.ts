import prisma from "./prisma";

export default {
    getAllUsers: async (page?: number, quantity?: number) => {
        let registryByPage = quantity ? quantity : 10;
        let limitRegByPage = 100;

        let take = (registryByPage > limitRegByPage) ? limitRegByPage : registryByPage;

        let skip = 0;
        if(page)
            skip = (page - 1 ) * take;

        const totalRecord = await prisma.user.count({
            where: {
                active: true
            }
        });

        let totalPages = (totalRecord/take) >= 1 ? totalRecord/take : 1;

        const users = await prisma.user.findMany({
            skip,
            take,
            where: {
                active: true
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

        return users; // {totalPages, currentPage: (page) ? page : 1, users};
    },
    insertUser: async (name: string, email: string) => {
        const newUser = await prisma.user.create({
            data: {name, email}
        });

        return newUser;
    },
    getUserByEmail: async (email: string) => {
        const user = await prisma.user.findFirst({
            where: { email, active: true }
        });

        return user;
    },
    getUser: async (id: number) => {
        const user = await prisma.user.findFirst({
            where: { id, active: true }
        });

        return user;
    },
    updateUser: async (id: number, name?: string, active?: boolean, email?: string) => {
        return await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                active,
                email
            }
        });
    },
    deleteUser: async (id: number) => {
        return await prisma.user.delete({
            where: {
                id
            }
        });
    }
}