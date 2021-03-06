export interface LoginResponse {
    localId: string,
    email: string,
    displayName: string,
    idToken: string,
    registered: true,
    refreshToken: string,
    expiresIn: string
}
