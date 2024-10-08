// import http from 'http'; //Вместо http теперь используем express
import fs from 'fs';
import express from 'express';

const app = express()
const port = 3003



app.get('/', (req, res) => {
    const a = 4
    if (a > 5) res.send("ok")
    else res.send('Hello ooooowlrd')
})
app.get('/home', async (req, res) => {
    try {
        const data = await readFile('pages/home.html')
        res.send(data) // тут предложит скачать файл, а не отобразит html как в методе http
    } catch (error) { //обработка reject
        res.send('error code 500')
    }
})
app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})


// const delay = (ms) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve()
//         }, ms)
//     })
// } //Пример промисификации таймаута
const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => {
            if (error) reject(error)
            else resolve(data)
        })
    })
}


// const server = http.createServer( async (request, response) => {
//     switch (request.url) {
//         case '/about': {
//             await delay(3000)
//             response.write('about; delay 3000')
//             response.end()
//             break;
//         }
//         case '/':
//         case '/home':
//             try {
//                 const data = await readFile('pages/about.html')
//                 response.write(data)
//                 response.end()
//             }catch(error) { //обработка reject
//                 response.write('error code 500')
//                 response.end()
//             }
//             break;
//         default:
//             response.write('error code 404')
//             response.end()
//     }
// })
// server.listen(3003)
// console.log('the server is running on port 3003')