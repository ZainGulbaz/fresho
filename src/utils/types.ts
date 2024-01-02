export type UserData={
    name:string|null,
    email:string|null,
    id:string|null,
    image:string|null,
    role:Role,
}

export type Role="admin"|"customer"
