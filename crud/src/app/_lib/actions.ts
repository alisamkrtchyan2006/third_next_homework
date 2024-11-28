"use server"


import { redirect } from "next/navigation"
import { getUserByLogin, insertUser } from "./model"

interface IState {
    message:string
}

export const handleSignup = async (prevState:IState, form:FormData) => {
    const name = form.get("name") as string
    const surname = form.get("surname") as string
    const login = form.get("login") as string
    const password = form.get("password") as string

    if(!name.trim() || !surname.trim() || !login.trim() || !password.trim()) {
        return{message:"Please fill all fields"}
    }

    if(password.length < 6) {
        return {message:"Password is not short"}
    }

    const found = getUserByLogin(login)
    if(found) {
        return {message:"Login is busy"}
    }

    const result = insertUser({login, password, name, surname})
    if(result.changes == 1) {
        return redirect("/")
    }else {
        return {message:"Internal server error"}
    }
}