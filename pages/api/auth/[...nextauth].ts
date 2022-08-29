import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "../../../libs/api";
import { UserAuth } from "../../../types/UserAuth";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { label: 'E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password'}
            },
            authorize: async (credentials, req)=>{
                if(credentials && credentials.email && credentials.password){
                    const user = await api.getUserByEmail(credentials.email);
                    if(user){
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                }
                                
                return null;
            },
        })
    ],
    callbacks: {
        jwt: async ({token, user}) => {
            if(user){
                token.user = user;
            }
            return token;
        },
        session: async ({session, token}) => {
            if(token){
                session.user = token.user as UserAuth;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login'
    }
}

export default NextAuth(authOptions);