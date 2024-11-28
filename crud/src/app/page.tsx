 "use client"

import { useActionState } from "react"
import { handleSignup } from "./_lib/actions"
import { useForm } from "react-hook-form"
import axios from "axios"

// import axios from "axios"


// export default function Home(){



//   const handleGetAll = () => {
//     axios.get("http://localhost:3000/api/users")
//     .then(res => console.log(res.data))
//   }


//   const handleGetOne = () => {
//     axios.get("http://localhost:3000/api/users/1")
//     .then(res => console.log(res.data))
//   }

//   const handlePost = () => {
//     axios.post("http://localhost:3000/api/users", {
//       name:"Tiko", surname:"Sahakyan", login:"Tiko123", password:"123*456"
//     })
//     .then(res => console.log(res.data))
//   }

//   return <div>
//     <h1>HELLO!</h1>

//     <button onClick={handleGetAll} className="bg-indigo-400 p-2 m-2">GET /api/users</button>
//     <button onClick={handleGetOne} className="bg-indigo-500 p-2 m-2">GET /api/users/1</button>
//     <button onClick={handlePost} className="bg-indigo-600 p-2 m-2">POST /api/users</button>
//   </div>
// }





interface FormData {
  name: string
  surname: string
  login: string
  password: string
}

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/users", data)
      console.log(response.data.message)
      reset()
       
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;

      if (serverMessage === "Login is already taken") {
        setError("login", { message: serverMessage })
      } else {
        setError("root", { message: serverMessage || "An unknown error occurred" })
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>


          <div>
            <label htmlFor="surname" className="block text-sm font-medium mb-1">Surname</label>
            <input
              {...register("surname", { required: "Surname is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your surname"
            />
            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
          </div>


          <div>
            <label htmlFor="login" className="block text-sm font-medium mb-1">Login</label>
            <input
              {...register("login", { required: "Login is required" })}
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your login"
            />
            {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>}
          </div>


          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>


          {errors.root && <p className="text-red-500 text-sm text-center mt-2">{errors.root.message}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home;