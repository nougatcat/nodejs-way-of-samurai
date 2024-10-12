import request from 'supertest'
import { app } from '../../src/index'

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })
    test('should return 200 and an empty array', async () => {
        await request(app)
            .get('/courses')
                .expect(200, [])
    })
    test('should return 404 for non-existen course', async () => {
        await request(app)
            .get('/courses/1')
                .expect(404)
    })
    test('should not create a course with incorrect input data', async () => {
        await request(app)
            .post('/courses')
            .send({title: ''})
                .expect(400)
        await request(app)
            .get('/courses')
                .expect(200, [])
    })
    let createdCourse1:any = null //создаем эту переменную глобально, чтобы из следующего теста можно было прочитать значение, полученное в предыдущем
    test('should create a course with correct input data', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'sampletext'})
                .expect(201)
        createdCourse1 = createResponse.body
        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: 'sampletext'
        })
        await request(app)
            .get('/courses')
                .expect(200, [createdCourse1])
    })
    let createdCourse2:any = null
    test('create one more course', async () => {
        const createResponse = await request(app)
            .post('/courses')
            .send({title: 'sampletext'})
                .expect(201)
        createdCourse2 = createResponse.body
        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: 'sampletext'
            })
        await request(app)
            .get('/courses')
                .expect(200, [createdCourse1, createdCourse2])
    })

    test('should not update a course with incorrect input data', async () => {
        await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send({title: ''})
                .expect(400)
        await request(app)
            .get('/courses')
                .expect(200, [createdCourse1, createdCourse2])
    })
    test('should not update a course that not exist', async () => {
        await request(app)
            .put(`/courses/`+ -100) //-100 т.к. нет такого id точно
            .send({title: 'good new title'})
                .expect(404)
    })
    test('should update a course with correct input data', async () => {
        await request(app)
            .put(`/courses/${createdCourse1.id}`)
            .send({ title: 'good new title' })
                .expect(204)
        const createResponse = await request(app)
            .get(`/courses/${createdCourse1.id}`)
                .expect(200, {
                    ...createdCourse1,
                    title: 'good new title'
                })
        createdCourse1 = createResponse.body
        await request(app)
            .get(`/courses/${createdCourse2.id}`)
                .expect(200, createdCourse2)
    })
    test('should delete both courses', async() => {
        // console.log(createdCourse1.id, createdCourse2.id)
        // await request(app)
        // .get('/courses')
        //     .expect(200, [createdCourse1, createdCourse2])
        await request(app)
            .delete(`/courses/${createdCourse1.id}`)
                .expect(204)
        await request(app)
            .get(`/courses/${createdCourse1}`)
                .expect(404)
        await request(app)
            .delete(`/courses/${createdCourse2.id}`)
                .expect(204)
        await request(app)
            .get(`/courses/`)
                .expect(200,[])
    })

})