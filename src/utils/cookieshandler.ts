import { UserData } from "./types";

interface ICookiesHandler {
    getToken(): string | undefined;
    getUser(): UserData | undefined;
}

export type TCookies = {
    token?: string;
    userData?: UserData
}


export default class CookiesHandler implements ICookiesHandler {

    constructor(public cookie: TCookies) {
    }

    getToken() {
        return this.cookie.token;

    }
    getUser() {

        return this.cookie.userData;

    }

}