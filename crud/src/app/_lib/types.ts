export interface IUser{
    id:number
    name:string
    surname:string;
    login:string
    password:string
}
export type InputUser = Omit<IUser, 'id'>