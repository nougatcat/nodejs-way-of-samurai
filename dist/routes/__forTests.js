import express from 'express';
//обнуляем "базу данных" для тестов. В прод такое нельзя
export const getTestsRouter = (db) => {
    const router = express.Router();
    router.delete('/data', (req, res) => {
        db.courses = [];
        res.sendStatus(204);
    });
    return router;
};
