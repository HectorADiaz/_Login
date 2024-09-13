export interface LoginResponseBody {
    username: string;
    roleId: number;
}

export interface ResponseAcceso {
    body: LoginResponseBody;
    token: string;
}

export interface RegisterResponse {
    ok: boolean;
    status: number;
    mensaje: string;
  }