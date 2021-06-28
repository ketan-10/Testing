https://github.com/typescript-exercises/typescript-exercises/issues/67#issue-912588320


`T` here is not the whole object, 
Typescript tries to find best possible value of `T` which fit the input object,
For Example:
```
type ApiResponse<T> = ({
    status: 'success';
    data: T;    
});

function promisifyAll<T>(obj: {[K in keyof T]: (callback: (response: ApiResponse<T[K]>) => void) => void}) {
    // Empty
}
const oldApi = {
    requestAdmins(callback: (response: ApiResponse<number[]>) => void) {
        callback({
            status: 'success',
            data: [1,2]
        });
    },
};
const api = promisifyAll(oldApi);
```
[TypeScript playground link](https://www.typescriptlang.org/play?#code/FAFwngDgpgBAghAlgJSgZwgewHZqgHgBUA+GAXhgAoBvYGemNEAQxAFc0AuGAcjTYDGA9Gh4BuOgwAmrZt0JiGMYAF8AlBOAAzNtgEhEOGBABOmALaI0iLWDgAbe0WKVMAIwBW3agG0A0jCI2DAA1lBgmFowhAC63JQCzI5uzAIh8SboWLhQ3AgoWTh4RP4xxGrkpABumIhSFWTVtVLqMLRKAPQdMACi5hDgqsACRSAwmPZS+eRtkvSZAI5s6CBwUpa4CUn2KWkZhTl5SKgYRQTYbOZuUCY+ZQ1NdRXtSgyJyakhNHOvSkysHG4fEEwjQogAND9fvQZCxuD4AIzggBMMShDHUEiUKkhKgkI1wY2YSBmpgsVhsdkcrkm+Q0wGAQA)

`promisifyAll` function will Compare Give Input Object : `oldApi` Type : 
` { requestAdmins(callback: (response: ApiResponse<number[]>) => void): void } `
With Input Signature Type :
` { [K in keyof T]: (callback: (response: ApiResponse<T[K]>) => void) => void } `

Here TypeScript can find that `T` will have key of `K` `requestAdmins` and `T[K]` will be `number[]`
Hence `<T>` is evaluated to be 
`
<{
    requestAdmins: number[];
}>
`
### Example 1
```

type ApiResponse<T> = ({
    status: 'success';
    data: T;    
});

function promisifyAll<T>(obj: {[K in keyof T]: (callback: (response: ApiResponse<T[K]>) => void) => void}) {
    // Empty
}
const oldApi = {
    requestAdmins(callback: (response: ApiResponse<number[]>) => void) {
        callback({
            status: 'success',
            data: [1,2]
        });
    },
    requestUsers(callback: (response: ApiResponse<string>) => void) {
        callback({
            status: 'success',
            data: 'hello'
        });
    },
};
const api = promisifyAll(oldApi);
```
[TypeScript playground link](https://www.typescriptlang.org/play?#code/FAFwngDgpgBAghAlgJSgZwgewHZqgHgBUA+GAXhgAoBvYGemNEAQxAFc0AuGAcjTYDGA9Gh4BuOgwAmrZt0JiGMYAF8AlBOAAzNtgEhEOGBABOmALaI0iLWDgAbe0WKVMAIwBW3agG0A0jCI2DAA1lBgmFowhAC63JQCzI5uzAIh8SboWLhQ3AgoWTh4RP4xxGrkpABumIhSFWTVtVLqMLRKAPQdMACi5hDgqsACRSAwmPZS+eRtkvSZAI5s6CBwUpa4CUn2KWkZhTl5SKgYRQTYbOZuUCY+ZQ1NdRXtSgyJyakhNHOvSkysHG4fEEwjQogAND9fvQZCxuD4AIzggBMMShDHUEiUKkhSkWyyYAFU8CY0FsPnsqJlTod4McDsUmCYggBzcqVGA1J6zaEwd47T7fXl-FjsLi8fhCEQ8XHCmGyIEACygjkwPHR9ExPxxqgkI1wY2YSBmpgsVhsdkcrkm+Q0wGAQA)

`oldApi` type 
```
{
    requestAdmins(callback: (response: ApiResponse<number[]>) => void): void;
    requestUsers(callback: (response: ApiResponse<string>) => void): void;
}
```
compared with `promisifyAll` signature
```
{ [K in keyof T]: (callback: (response: ApiResponse<T[K]>) => void) => void }
```
Inferred Value of `T`
```
<{
    requestAdmins: number[];
    requestUsers: string;
}>
``` 
### Example 2
```

type ApiResponse<T> = ({
    status: 'success';
    data: T;    
});

function promisifyAll<T>(obj: {[K in keyof T]: (callback: (response: T[K]) => void) => void}) {
    // Empty
}
const oldApi = {
    requestAdmins(callback: (response: ApiResponse<number[]>) => void) {
        callback({
            status: 'success',
            data: [1,2]
        });
    },
    requestUsers(callback: (response: ApiResponse<string>) => void) {
        callback({
            status: 'success',
            data: 'hello'
        });
    },
};
const api = promisifyAll(oldApi);
```
[TypeScript playground link](https://www.typescriptlang.org/play?#code/FAFwngDgpgBAghAlgJSgZwgewHZqgHgBUA+GAXhgAoBvYGemNEAQxAFc0AuGAcjTYDGA9Gh4BuOgwAmrZt0JiGMYAF8AlBOAAzNtgEhEOGBABOmALaI0iLWDgAbe0WKVMAIwBW3agG0A0jCI2DAA1lBgmFowhAC63JQCzI5uzAIh8SboWLhQ8v4xauSkAG6YiFKFZCVlUuowtEoA9I0wAKLmEOCqwAI4TDCY9lIIiOT1kvSZAI5s6CBwUpa4CUn2KWkZWX258EioGNv42GzmblAmPjHEldXlhQ1KDInJqSE0E49KTKwc3HyCwjQogANB9PvQZCxuD4AIzAgBMMTBDHUEiUKlBSmmsyYAFU8CY0CsXhsqJkDjluCN9tk8PgmCYggBza5FGClO7jcEwZ5rV7vblfFjsLi8fhCEQ8TGCiGyP4ACygjkwPGR9FRHwxqgkvVwIBgzCQY1MFisNjsjlcQxGGmAwCAA)

`oldApi` type 
```
{
    requestAdmins(callback: (response: ApiResponse<number[]>) => void): void;
    requestUsers(callback: (response: ApiResponse<string>) => void): void;
}
```
compared with `promisifyAll` signature
```
{ [K in keyof T]: (callback: (response: T[K]) => void) => void }
```
Inferred Value of `T`
```
<{
    requestAdmins: ApiResponse<number[]>;
    requestUsers: ApiResponse<string>;
}>
``` 

