import { type ApiEndpoint, type ApiSpec, type Tutorial } from "./types";
import { env } from "./env.mjs";

const API_URL = env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5000";

interface createUserResponse {
  token: string;
}
interface createSpecResponse {
  id: number;
  name: string;
}
interface loadSpecsResponse {
  specs: ApiSpec[];
}

interface loadSpecResponse {
  spec: ApiSpec;
}
interface createTutorialResponse {
  id: number;
}

interface loadRelevantApisResponse {
  apis: ApiEndpoint[];
}

interface loadTutorialsResponse {
  tutorials: Tutorial[];
}

interface generateTutorialContentResponse {
  content: string;
}

function createChunkDecoder() {
  const decoder = new TextDecoder();
  return function (chunk: Uint8Array | undefined): string {
    if (!chunk) return "";
    return decoder.decode(chunk, { stream: true });
  };
}

export class API {
  userToken: string | null;

  constructor(userToken: string | null = null) {
    this.userToken = userToken;
  }

  setUserToken(token: string | null): void {
    this.userToken = token;
  }

  static async createUser(): Promise<string> {
    const resp = await fetch(`${API_URL}/api/v1/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: null,
      }),
    });
    const data = (await resp.json()) as createUserResponse;
    return data.token;
  }

  private ensureUserToken(): void {
    if (this.userToken === null) {
      throw new Error("User token is null, cannot perform the operation.");
    }
  }

  async createSpec(url: string): Promise<number> {
    this.ensureUserToken();

    const resp = await fetch(`${API_URL}/api/v1/specs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userToken}`,
      },
      body: JSON.stringify({ url }),
    });
    const data = (await resp.json()) as createSpecResponse;
    return data.id;
  }

  async loadSpecs(): Promise<ApiSpec[]> {
    this.ensureUserToken();

    const resp = await fetch(`${API_URL}/api/v1/specs`, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
    const data = (await resp.json()) as loadSpecsResponse;
    return data.specs;
  }

  async loadSpec(id: number): Promise<ApiSpec> {
    this.ensureUserToken();

    const resp = await fetch(`${API_URL}/api/v1/specs/${id}`, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
    const data = (await resp.json()) as loadSpecResponse;
    return data.spec;
  }

  async loadRelevantApis(
    specId: number,
    query: string,
  ): Promise<ApiEndpoint[]> {
    this.ensureUserToken();

    const resp = await fetch(
      `${API_URL}/api/v1/specs/${specId}/relevant-apis`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({ query }),
      },
    );
    const data = (await resp.json()) as loadRelevantApisResponse;
    return data.apis;
  }

  async createTutorial(name: string): Promise<number> {
    this.ensureUserToken();

    const resp = await fetch(`${API_URL}/api/v1/tutorials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.userToken}`,
      },
      body: JSON.stringify({ name }),
    });
    const data = (await resp.json()) as createTutorialResponse;
    return data.id;
  }

  async loadTutorials(): Promise<Tutorial[]> {
    this.ensureUserToken();

    const resp = await fetch(`${API_URL}/api/v1/tutorials`, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
    const data = (await resp.json()) as loadTutorialsResponse;
    return data.tutorials;
  }

  async streamTutorialContent(
    tutorialId: number,
    query: string,
    specId: number,
    apis: ApiEndpoint[],
    update: (value: string) => void,
  ) {
    this.ensureUserToken();

    const resp = await fetch(
      `${API_URL}/api/v1/tutorials/${tutorialId}/generate-content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.userToken}`,
        },
        body: JSON.stringify({
          query: query,
          specId: specId,
          apis: apis,
        }),
      },
    );

    if (!resp.body) {
      throw new Error("Response body is null");
    }

    const reader = resp.body.getReader();
    const decode = createChunkDecoder();
    let streamedResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      streamedResponse += decode(value);
      update(streamedResponse);
    }
  }
}
