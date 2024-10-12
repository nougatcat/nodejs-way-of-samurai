// import http from 'http'; //Вместо http теперь используем express
// import fs from 'fs';
import express from 'express';
export const app = express();
const port = 3003;
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
const db = {
    courses: [
        { id: 1, title: "front end 1" },
        { id: 2, title: "devops 2" },
        { id: 3, title: "backend" }
    ]
};
//для парсинга body из post запросов
const jsonBodyMiddleWare = express.json(); //не тот же метод джсон, что у респонсов
app.use(jsonBodyMiddleWare);
app.get('/', (req, res) => {
    res.send('<h1>Hello ooooowlrd</h1>'); //метод send автоматически понимает что там теги, если они есть 
});
// для запросов типа /courses?title=end (query param) или /courses
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
    }
    // if (!foundCourses) { //не нужно выдавать 404, достаточно, если вернется пустой массив
    //     res.sendStatus(404)
    //     return;
    // }
    res.json(foundCourses);
});
// для запросов типа /courses/1 (uri param)
app.get('/courses/:id', (req, res) => {
    const foundCourse = (db.courses.find(c => c.id === +req.params.id));
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse);
});
app.post('/courses', (req, res) => {
    if (!req.body.title || !req.body.title.trim()) { //req.body.title.trim() нужен для проверки, не прислали ли строку только с пробелами
        res.sendStatus(400); //validation error
        return;
    }
    const createdCourse = {
        id: +(new Date()), //дата переведенная в number, дата - это рандомное число для примера вместо нормальной генерации id
        title: req.body.title
    };
    db.courses.push(createdCourse);
    res.status(201).json(createdCourse);
}); //такой POST сохранится до перезагрузки сервера, потому что нет БД
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204); //no content
});
app.put('/courses/:id', (req, res) => {
    if (!req.body.title || !req.body.title.trim()) { //req.body.title.trim() нужен для проверки, не прислали ли строку только с пробелами
        res.sendStatus(400); //validation error
        return;
    }
    const foundCourse = (db.courses.find(c => c.id === +req.params.id));
    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    foundCourse.title = req.body.title;
    res.sendStatus(204);
});
//обнуляем "базу данных" для тестов. В прод такое нельзя
app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(204);
});
app.listen(port, () => {
    console.log(`the server is running on port ${port}`);
});
// app.get('/home', async (req, res) => {
// try {
//     const data = await readFile('pages/home.html')
//     res.send(data) // тут предложит скачать файл, а не отобразит html как в методе http
// } catch (error) { //обработка reject
//     res.send('error code 500')
// })
