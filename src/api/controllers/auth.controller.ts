import type { LoginRequest} from "@/api/models/auth.models";
import type { ApiService } from "..";
import type { IAuthController } from "./types";

export default function (api: ApiService) {
    const authController: IAuthController = {
      async login(credentials: LoginRequest): Promise<void> {
          const response = await api.instance.post("/authentication/login", credentials);
          return response.data;
      },

      async logout(): Promise<void> {
          await api.instance.post("/authentication/logout");
      },
    };

    api.auth = authController;
}
