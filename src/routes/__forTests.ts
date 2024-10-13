import { Express } from 'express';
import { DBType } from '../db/db.js';
//обнуляем "базу данных" для тестов. В прод такое нельзя
export const addTestsRoutes = (app: Express, db: DBType) =>app.delete('/__test__/data', (req, res) => {
    db.courses = []
    res.sendStatus(204)
})