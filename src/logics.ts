import { Request, Response } from "express"
import { client } from "./database"
import { QueryConfig, QueryResult } from "pg"
import { TChocolate, TChocolateRequest } from "./interfaces"
import format from "pg-format"
const createChocolates = async (request: Request, response: Response): Promise<Response> => {

    const chocolatesData: TChocolateRequest = request.body

    const queryString: string = format(`
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


const listChocolates = async (request: Request, response: Response): Promise<Response> => {
    const queryString: string = `
        SELECT
            *
        FROM
            chocolates;
    `

    const queryResult: QueryResult<TChocolate> = await client.query(queryString)

    return response.json(queryResult.rows)
}

const retrieveChocolate = async (request: Request, response: Response): Promise<Response> => {

    const chocolate: TChocolate = response.locals.chocolate

    return response.json(chocolate)
}

const updateChocolate = async (request: Request, response: Response): Promise<Response> => {
    const chocolatesData: Partial<TChocolateRequest> = request.body

    const id: number = parseInt(request.params.id)

    const queryString: string = format(`
        UPDATE 
            chocolates 
            SET(%I) = ROW(%L) 
        WHERE 
            id= $1 
        RETURNING *;
    `,
        Object.keys(chocolatesData),
        Object.values(chocolatesData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TChocolate> = await client.query(queryConfig)

    return response.json(queryResult.rows[0])
}


const deleteChocolate= async( request: Request, response: Response): Promise<Response> =>{
    const id: number = parseInt(request.params.id)

    const queryString: string = `
        DELETE FROM
            chocolates
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    await client.query(queryConfig)

    return response.status(204).send()
}

export { createChocolates, listChocolates, retrieveChocolate, updateChocolate, deleteChocolate}