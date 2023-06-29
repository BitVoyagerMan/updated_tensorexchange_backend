
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UserInput {
    username: string;
    password: string;
    email: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    is_verified: boolean;
}

export interface IQuery {
    index(): string | Promise<string>;
    securedResource(): string | Promise<string>;
    securedResourceForAdmin(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
    verifyToken(): boolean | Promise<boolean>;
}

export interface IMutation {
    signup(data: UserInput): User | Promise<User>;
    login(data: LoginInput): string | Promise<string>;
}

type Nullable<T> = T | null;
