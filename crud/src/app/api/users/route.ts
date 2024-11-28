import { getAllUsers, getUserByLogin, insertUser } from "@/app/_lib/model"
import { NextRequest, NextResponse } from "next/server"

export const GET = () => {
    const result = getAllUsers()
    return Response.json({result})
}


// export const POST = async (req:NextRequest) => {
//     const user = await req.json()
//     const result = insertUser(user)
//     return Response.json({
//         ...user,
//         id:result.lastInsertRowid
//     })
// }





export const POST = async (req: NextRequest) => {
    try {
      const { name, surname, login, password } = await req.json()
  

      if (!name.trim() || !surname.trim() || !login.trim() || !password.trim()) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 })
      }
  
      if (password.length < 6) {
        return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
      }
  
      const existingUser = getUserByLogin(login);
      if (existingUser) {
        return NextResponse.json({ message: "Login is already taken" }, { status: 400 })
      }
  
      const result = insertUser({ login, password, name, surname })
      if (result.changes === 1) {
        return NextResponse.json({ message: "User successfully registered" })
      } else {
        throw new Error("Failed to insert user")
      }
    } catch (error) {
        const err = error as Error
      return NextResponse.json({ message: err.message || "Server error" }, { status: 500 })
    }
  }