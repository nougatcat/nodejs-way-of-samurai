import express, {Request, Response} from 'express';
import { CourseViewModel } from './models/CourseViewModel';
import { addCoursesRoutes } from './routes/courses.js';
import { db } from './db/db.js';
import { addTestsRoutes } from './routes/__forTests.js';

export const app = express()
//для парсинга body из post запросов
export const jsonBodyMiddleWare = express.json() //не тот же метод джсон, что у респонсов
app.use(jsonBodyMiddleWare)

const HTTP_STATUSES = { //можно использовать вместо кодов в sendStatus, но мне больше нравится писать числа
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
}


export const getCourseViewModel = (dbCourse: CourseType): CourseViewModel => {
    return { //?не возвращаем целую бд чтобы скрыть studentsCount из api
        id: dbCourse.id,
        title: dbCourse.title
    }
}

export type CourseType = {
    id: number,
    title: string,
    studentsCount: number //пример параметра, который не должен быть доступен из api
}

addCoursesRoutes(app, db)

addTestsRoutes(app, db)


// app.get('/home', async (req, res) => {
// try {
//     const data = await readFile('pages/home.html')
//     res.send(data) // тут предложит скачать файл, а не отобразит html как в методе http
// } catch (error) { //обработка reject
//     res.send('error code 500')
// })
