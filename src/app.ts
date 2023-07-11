import express, { Application, json, Request, Response  } from "express";
import { startDatabase } from "./database";
import { createChocolates, listChocolates, retrieveChocolate } from "./logics";
import { ensureChocolateExistsMiddleware } from "./middleware";

const app: Application = express();
app.use(json());

app.get('/chocolates', listChocolates)
app.get('/chocolates/:id', ensureChocolateExistsMiddleware, retrieveChocolate)
app.post('/chocolates', createChocolates)

app.listen(3000, async ()=>{
    await startDatabase()
    console.log('Started in http://localhost:3000')
})