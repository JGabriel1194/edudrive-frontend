import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    id: number;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

const decodeToken = (token: string): DecodedToken => {
    return jwtDecode<DecodedToken>(token);
}

export default decodeToken