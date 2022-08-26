import NextAuth from 'next-auth';
import { UserAuth } from './UserAuth';

declare module "next-auth" {
    interface Session {
        user: UserAuth
    }
}