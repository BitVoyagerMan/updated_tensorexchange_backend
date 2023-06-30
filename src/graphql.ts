
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

export interface LoginReturn {
    token: string;
    user: User;
}

export interface Candle {
    id: string;
    timeframe: string;
    time: DateTime;
    open: string;
    high: string;
    low: string;
    close: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    securedResource(): string | Promise<string>;
    securedResourceForAdmin(): string | Promise<string>;
    login(email: string, password: string): string | Promise<string>;
    verifyToken(): boolean | Promise<boolean>;
    allCandles(): Candle[] | Promise<Candle[]>;
}

export interface IMutation {
    signup(data: UserInput): User | Promise<User>;
    login(data: LoginInput): LoginReturn | Promise<LoginReturn>;
}

export type DateTime = any;
type Nullable<T> = T | null;
