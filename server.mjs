
import http from 'http'; //Вариант для расширения .mjs
import fs from 'fs'
// const http = require('http') //Вариант для расширения .js
// const fs = require('fs')

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
} //Пример промисификации таймаута
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error) 
            else resolve(data)
        })
    })
}

const server = http.createServer( async (request, response) => {
    switch (request.url) {
        case '/about': {
            await delay(3000)
            response.write('about; delay 3000')
            response.end()
            break;
        }
        case '/':
        case '/home':
            // const start = new Date()
            // while(new Date() - start < 3000) { //? пример синхронной операции
            //     console.log(new Date() - start)
            // }
            // setTimeout(() => { //? пример асинхронной операции 
            //     const data = 'hello'
            //     response.write(data)
            //     response.end() 
            // }, 3000)
            try {
                const data = await readFile('pages/about.html')
                response.write(data)
                response.end() 
            }catch(error) { //обработка reject
                response.write('error code 500')
                response.end()
            }
            break;
        default:
            response.write('error code 404')
            response.end()
    }
})
server.listen(3003)