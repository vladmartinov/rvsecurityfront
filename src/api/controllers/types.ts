import type { LoginRequest } from "../models/auth.models";

export interface IAuthController {
    login(credentials: LoginRequest): Promise<void>;
    logout(): Promise<void>;
}

export interface IApiControllers {
    auth?: IAuthController;
    // Добавьте другие контроллеры здесь по мере необходимости
}
