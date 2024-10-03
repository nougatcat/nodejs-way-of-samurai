
import http from 'http'; //Вариант для расширения .mjs
// const http = require('http') //Вариант для расширения .js

let requestsCount = 0

const server = http.createServer((request, response) => {
    requestsCount++
    console.log(request.url)

    switch (request.url) {
        case '/':
        case '/home':
            response.write('home')
            break;
        case '/users':
            response.write('users')
            break;
        case '/favicon.ico':  //чтобы в счетчик не записывался запрос на фавикон, а считывались только реальные заходы на сайт
            requestsCount--
            break;
        default:
            response.write('404')
    }

    response.write('\nHow many requests been since start ' + requestsCount)
    response.end()
})
server.listen(3003)