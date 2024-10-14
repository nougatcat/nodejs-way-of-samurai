import { CourseType } from '../app';
export const db: DBType = {
    courses: [
        {id: 1, title: "front end 1", studentsCount: 100},
        {id: 2, title: "devops 2", studentsCount: 100},
        {id: 3, title: "backend", studentsCount: 100}
    ]
}
export type DBType = {courses: CourseType[]}