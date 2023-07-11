import { Request, Response } from "express"
import { client } from "./database"
import { QueryConfig, QueryResult } from "pg"
import { TChocolate, TChocolateRequest } from "./interfaces"
import format from "pg-format"
const createChocolates = async (request: Request, response: Response): Promise<Response> =>{

    const chocolatesData: TChocolateRequest = request.body

    const queryString = format(`
        INSERT INTO 
            chocolates
            (%I) 
        VALUES 
            (%L) 
        RETURNING *;
    `,
    Object.keys(chocolatesData),
    Object.values(chocolatesData)
    )


    const queryResult: QueryResult<TChocolate> = await client.query(queryString)

    return response.status(201).json(queryResult.rows[0])
}


const listChocolates = async(request: Request, response: Response): Promise<Response>=>{
    const queryString: string = `
        SELECT
            *
        FROM
            chocolates;
    `

    const queryResult: QueryResult<TChocolate> = await client.query(queryString)

    return response.json(queryResult.rows)
}

const retrieveChocolate =async (request: Request, response: Response): Promise<Response> => {

    const chocolate: TChocolate = response.locals.chocolate

    return response.json(chocolate)
}

export { createChocolates, listChocolates, retrieveChocolate}