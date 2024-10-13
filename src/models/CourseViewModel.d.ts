export type CourseViewModel = {
    id: number,
    title: string
} //используем вместо CourseType, т.к. в CourseType (в базе данных) могут быть какие-то скрытые типы, которые не должны быть доступны из api