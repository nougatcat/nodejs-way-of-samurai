import { getCourseViewModel } from '../app.js';
export const addCoursesRoutes = (app, db) => {
    app.get('/', (req, res) => {
        res.send('<h1>Hello ooooowlrd</h1>'); //метод send автоматически понимает что там теги, если они есть 
    });
    // для запросов типа /courses?title=end (query param) или /courses
    app.get('/courses', (req, res) => {
        let foundCourses = db.courses;
        if (req.query.title) {
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1);
        }
        res.json(foundCourses.map(getCourseViewModel));
    });
    // для запросов типа /courses/1 (uri param)
    app.get('/courses/:id', (req, res) => {
        const foundCourse = (db.courses.find(c => c.id === +req.params.id));
        if (!foundCourse) {
            res.sendStatus(404);
            return;
        }
        res.json(getCourseViewModel(foundCourse));
    });
    app.post('/courses', (req, res) => {
        if (!req.body.title || !req.body.title.trim()) { //req.body.title.trim() нужен для проверки, не прислали ли строку только с пробелами
            res.sendStatus(400); //validation error
            return;
        }
        const createdCourse = {
            id: +(new Date()), //дата переведенная в number, дата - это рандомное число для примера вместо нормальной генерации id
            title: req.body.title,
            studentsCount: 100
        };
        db.courses.push(createdCourse);
        res.status(201).json(getCourseViewModel(createdCourse));
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
        res.sendStatus(204); //?не типизируем рес, если не возвращаем ничего кроме кода
    });
};
