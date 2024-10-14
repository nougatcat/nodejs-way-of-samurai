import express from 'express';
import { getCoursesRouter } from './routes/courses.js';
import { db } from './db/db.js';
import { getTestsRouter } from './routes/__forTests.js';
export const app = express();
//для парсинга body из post запросов
export const jsonBodyMiddleWare = express.json(); //не тот же метод джсон, что у респонсов
app.use(jsonBodyMiddleWare);
const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
export const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title
    };
};
app.use("/courses", getCoursesRouter(db));
app.use('/__test__', getTestsRouter(db));
