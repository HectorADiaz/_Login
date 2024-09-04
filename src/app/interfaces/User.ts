export interface User {
    username: string,
    email: string,
    password: string,
    confirmPassword? : string| null;
    roleId: number,
    createBy: string | null;
}

// {
//     "username": "Alejandro_dia",
//     "email": "alejandro.admin",
//     "password": "12345678aA",
//     "roleId": 1,
//     "createdBy": 1    queda pendiente de implementacion, ahora esta como null, pero se debe enviar a futuro 
// }

// TODO Falta crear el ER para la bbdd para la presentación