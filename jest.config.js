/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}]
  },
  resolver : "jest-ts-webcompat-resolver" //этот резолвер устанавливается как yarn add -D jest-ts-webcompat-resolver. Без него jest думает, что раз импорты .js значит там сидит .js, а не .ts. Я бы и рад убрать неверное уточнение, но тогда компилятор TS не будет ставить .js к файлам и тогда при запуске сервера все рухнет, т.к. ESNext почему-то не понимает импорты без расширения. ААААААААААААААА
};