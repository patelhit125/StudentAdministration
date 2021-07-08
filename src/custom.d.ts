interface Student{
    id: number,
    email: string, 
    mobileNo: string
}

declare namespace Express{
    export interface Request {
        me: Student
        dto?: any,
        pager: {
            page: number,
            limit: number
        }
    }
}