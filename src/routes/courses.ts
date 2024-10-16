import express, {Request, Response, Express} from 'express';
import { CourseViewModel } from '.././models/CourseViewModel';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '.././types';
import { QueryCoursesModel } from '.././models/QueryCoursesModel';
import { URIParamsCourseIdModel } from '.././models/URIParamsCourseIdModel';
import { UpdateCourseModel } from '.././models/UpdateCourseModel';
import { CreateCourseModel } from '.././models/CreateCourseModel';
import { CourseType, getCourseViewModel } from '../app.js';
import { DBType } from '../db/db.js';


export const getCoursesRouter = (db: DBType) => {
    const router = express.Router()

    // для запросов типа /courses?title=end (query param) или /courses
    router.get('/', (req: RequestWithQuery<QueryCoursesModel>, res: Response<CourseViewModel[]>) => {
        let foundCourses = db.courses
        if (req.query.title) {
            foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title) > -1 )
        }
        res.json(foundCourses.map(getCourseViewModel))
    }) 
    // для запросов типа /courses/1 (uri param)
    router.get('/:id', (req:RequestWithParams<URIParamsCourseIdModel>, res:Response<CourseViewModel>) => {
        const foundCourse = (db.courses.find(c => c.id === +req.params.id))
        if (!foundCourse) {
            res.sendStatus(404)
            return;
        }
        res.json(getCourseViewModel(foundCourse))
    })
    router.post('/', (req: RequestWithBody<CreateCourseModel>, res:Response<CourseViewModel>) => {
        if (!req.body.title || !req.body.title.trim()) { //req.body.title.trim() нужен для проверки, не прислали ли строку только с пробелами
            res.sendStatus(400) //validation error
            return;
        }
        const createdCourse: CourseType = {
            id: +(new Date()), //дата переведенная в number, дата - это рандомное число для примера вместо нормальной генерации id
            title: req.body.title,
            studentsCount: 100
        }
        db.courses.push(createdCourse)
        res.status(201).json(getCourseViewModel(createdCourse))
        
    }) //такой POST сохранится до перезагрузки сервера, потому что нет БД
    router.delete('/:id', (req:RequestWithParams<URIParamsCourseIdModel>, res) => {
        db.courses = db.courses.filter(c => c.id !== +req.params.id)
    
        res.sendStatus(204) //no content
    })
    
    router.put('/:id', (req:RequestWithParamsAndBody<URIParamsCourseIdModel,UpdateCourseModel>, res) => { //должны поменять title у определенного id
        if (!req.body.title || !req.body.title.trim()) { //req.body.title.trim() нужен для проверки, не прислали ли строку только с пробелами
            res.sendStatus(400) //validation error
            return;
        }
        const foundCourse = (db.courses.find(c => c.id === +req.params.id))
        if (!foundCourse) {
            res.sendStatus(404)
            return;
        }
        foundCourse.title = req.body.title
        res.sendStatus(204) //?не типизируем рес, если не возвращаем ничего кроме кода
    })

    return router
}