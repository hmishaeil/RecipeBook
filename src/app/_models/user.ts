export class User {

    constructor(public id, public email, private _token, private _tokenExpirationDate){}

    get token(): string {
        if(!this._tokenExpirationDate || this._tokenExpirationDate < new Date()){
            return null;
        } 

        return this._token;
    }

}