//?расширение .d.ts чтобы компилятор не морочил мне голову компиляцией этого файла, потому что из него идут импорты в index.ts

import { Request } from "express";

//у Express несколько параметров, чтобы не путаться, где какой по порядку, можно написать это
export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{},T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsAndBody<T,B> = Request<T,{},B>


