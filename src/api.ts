import { type ApiEndpoint, type ApiSpec, type Tutorial } from "./types";
import { env } from "./env.mjs";
import axios from "axios";

const API_URL = env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:5000";


interface createUserResponse {
  token: string;
}

export async function createUser(): Promise<string> {
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

interface createSpecResponse {
  id: number;
  name: string;
}

export async function createSpec(url: string): Promise<number> {
  const resp = await axios.post(`${API_URL}/api/v1/specs`, {
    url: url,
  });
  const data = resp.data as createSpecResponse;
  return data.id;
}

interface loadSpecsResponse {
  specs: ApiSpec[];
}

export async function loadSpecs(): Promise<ApiSpec[]> {
  const resp = await axios.get(`${API_URL}/api/v1/specs`);
  const data = resp.data as loadSpecsResponse;
  return data.specs;
}

interface loadSpecResponse {
  spec: ApiSpec;
}

export async function loadSpec(id: number): Promise<ApiSpec> {
  const resp = await axios.get(`${API_URL}/api/v1/specs/${id}`);
  const data = resp.data as loadSpecResponse;
  return data.spec;
}

interface loadRelevantApisResponse {
  apis: ApiEndpoint[];
}

export async function loadRelevantApis(
  specId: number,
  query: string,
): Promise<ApiEndpoint[]> {
  const resp = await axios.post(
    `${API_URL}/api/v1/specs/${specId}/relevant-apis`,
    {
      query: query,
    },
  );
  const data = resp.data as loadRelevantApisResponse;
  return data.apis;
}

interface createTutorialResponse {
  id: number;
}

export async function createTutorial(name: string): Promise<number> {
  const resp = await axios.post(`${API_URL}/api/v1/tutorials`, {
    name: name,
  });
  const data = resp.data as createTutorialResponse;
  return data.id;
}

interface loadTutorialsResponse {
  tutorials: Tutorial[];
}

export async function loadTutorials(): Promise<Tutorial[]> {
  const resp = await axios.get(`${API_URL}/api/v1/tutorials`);
  const data = resp.data as loadTutorialsResponse;
  return data.tutorials;
}

interface generateTutorialContentResponse {
  content: string;
}

export async function generateTutorialContent(
  tutorialId: number,
  query: string,
  specId: number,
  apis: ApiEndpoint[],
): Promise<string> {
  const resp = await axios.post(
    `${API_URL}/api/v1/tutorials/${tutorialId}/generate-content`,
    {
      query: query,
      specId: specId,
      apis: apis,
    },
  );
  const data = resp.data as generateTutorialContentResponse;
  return data.content;
}
