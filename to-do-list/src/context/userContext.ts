import React from "react";

export class User {
    firstName: string
    lastName: string

    constructor() {
        this.firstName = ''
        this.lastName = ''
    }
}

const UserContext = React.createContext<User>(new User());

export default UserContext;