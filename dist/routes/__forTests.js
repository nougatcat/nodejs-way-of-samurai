//обнуляем "базу данных" для тестов. В прод такое нельзя
export const addTestsRoutes = (app, db) => app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(204);
});
