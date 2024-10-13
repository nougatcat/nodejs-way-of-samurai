import { app } from './app.js'; //прочитает app.ts, нужно писать .js, чтобы после компиляции был корректный импорт

const port = 3003
app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})

//index.ts запускает сервер, вся реализация лежит в app.ts. Это нужно, чтобы в тестах не запускался сервер