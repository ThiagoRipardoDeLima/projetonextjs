import { User } from "./User";

export type UserAuth = User & {
    role: string;
}