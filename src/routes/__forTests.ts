import express from 'express';
import { DBType } from '../db/db.js';
//обнуляем "базу данных" для тестов. В прод такое нельзя
export const getTestsRouter = (db: DBType) => {
    const router = express.Router()

    router.delete('/data', (req, res) => {
        db.courses = []
        res.sendStatus(204)
    })

    return router
}