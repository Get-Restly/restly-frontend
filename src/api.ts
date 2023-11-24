import { ApiEndpoint, ApiSpec, Tutorial } from "./types";
import { env } from "./env.mjs";

const API_URL = env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5000";
console.log("🚀 ~ file: api.ts:5 ~ API_URL:", API_URL);

interface createSpecResponse {
  id: number;
  name: string;
}

export async function createSpec(url: string): Promise<number> {
  const resp = await fetch(`${API_URL}/api/v1/specs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  const data = (await resp.json()) as createSpecResponse;
  return data.id;
}

interface loadSpecsResponse {
  specs: ApiSpec[];
}

export async function loadSpecs(): Promise<ApiSpec[]> {
  const resp = await fetch(`${API_URL}/api/v1/specs`);
  const data = (await resp.json()) as loadSpecsResponse;
  return data.specs;
}

interface loadSpecResponse {
  spec: ApiSpec;
}

export async function loadSpec(id: number): Promise<ApiSpec> {
  const resp = await fetch(`${API_URL}/api/v1/specs/${id}`);
  const data = (await resp.json()) as loadSpecResponse;
  return data.spec;
}

interface loadRelevantApisResponse {
  apis: ApiEndpoint[];
}

export async function loadRelevantApis(
  specId: number,
  query: string,
): Promise<ApiEndpoint[]> {
  const resp = await fetch(`${API_URL}/api/v1/specs/${specId}/relevant-apis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });
  const data = (await resp.json()) as loadRelevantApisResponse;
  return data.apis;
}

interface createTutorialResponse {
  id: number;
}

export async function createTutorial(name: string): Promise<number> {
  const resp = await fetch(`${API_URL}/api/v1/tutorials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const data = (await resp.json()) as createTutorialResponse;
  return data.id;
}

interface loadTutorialsResponse {
  tutorials: Tutorial[];
}

export async function loadTutorials(): Promise<Tutorial[]> {
  const resp = await fetch(`${API_URL}/api/v1/tutorials`);
  const data = (await resp.json()) as loadTutorialsResponse;
  return data.tutorials;
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

export async function streamTutorialContent(
  tutorialId: number,
  query: string,
  specId: number,
  apis: ApiEndpoint[],
  update: (value: string) => void,
) {
  const resp = await fetch(
    `${API_URL}/api/v1/tutorials/${tutorialId}/generate-content`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        specId,
        apis,
      }),
    },
  );
  if (!resp.ok) {
    throw new Error(`Server responded with status: ${resp.status}`);
  }

  if (!resp.body) {
    throw new Error("The response body is empty.");
  }

  //Stream in the response and update the chat state with the new message tokens as they come
  const reader = resp.body.getReader();
  const decode = createChunkDecoder();
  let streamedResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    // Update the chat state with the new message tokens.
    streamedResponse += decode(value);
    update(streamedResponse);
  }
}
