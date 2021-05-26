// export class SignupRequest {
//     constructor(public email: string,
//         public password: string,
//         public returnSecureToken: boolean) { }
// };

export interface SignupRequest {
    'email': string,
    'password': string,
    'returnSecureToken': boolean,
}