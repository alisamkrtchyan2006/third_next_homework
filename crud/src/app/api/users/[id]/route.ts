import { NextRequest } from "next/server";

interface IProps {
    params: {id:number}
}

export const GET = (req:NextRequest, {params}:IProps) => {
    return Response.json({
        message:"hello from server",
        id:params.id
    })
}