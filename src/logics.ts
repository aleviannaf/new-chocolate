import { Request, Response } from "express"
import { client } from "./database"
import { QueryConfig, QueryResult } from "pg"
import { TChocolate, TChocolateRequest } from "./interfaces"
const createChocolates = async (request: Request, response: Response): Promise<Response> =>{

    const chocolatesData: TChocolateRequest = request.body

    const queryString = `
        INSERT INTO 
            chocolates
            (type, weight, price, cocoa_percentage, in_stock, more_ingredients) 
        VALUES 
            ($1, $2, $3, $4, $5, $6) 
        RETURNING *;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: Object.values(chocolatesData)
    }

    const queryResult: QueryResult<TChocolate> = await client.query(queryConfig)

    console.log(queryConfig)

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