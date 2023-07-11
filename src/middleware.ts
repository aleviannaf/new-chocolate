import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { TChocolate } from "./interfaces";

const ensureChocolateExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const id: number = parseInt(request.params.id);

    const queryString: string = `
        SELECT 
            * 
        FROM 
            chocolates 
        WHERE 
            id = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }

    const queryResult: QueryResult<TChocolate> = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        return response.status(404).json({message: "Chocolate not found"})
    } 

    response.locals.chocolate = queryResult.rows[0];

    return next()
}

export { ensureChocolateExistsMiddleware}