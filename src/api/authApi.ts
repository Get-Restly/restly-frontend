import { API_URL } from "../constants";

interface createUserRequest {
  email: string | null;
}

interface createUserResponse {
  token: string;
}

export default class AuthApi {
  static async createUser(): Promise<string> {
    const req: createUserRequest = {
      email: null,
    };
    const resp = await fetch(`${API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });
    const data = (await resp.json()) as createUserResponse;
    return data.token;
  }
}
