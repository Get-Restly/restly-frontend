import { ApiEndpoint, ApiSpec, Tutorial } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:5000';

interface loadSpecsResponse {
    specs: ApiSpec[];
}

export async function loadSpecs(): Promise<ApiSpec[]> {
    const resp = await fetch(`${API_URL}/api/v1/specs`);
    const data = await resp.json() as loadSpecsResponse;
    return data.specs;
}

interface loadSpecResponse {
    spec: ApiSpec;
}

export async function loadSpec(id: number): Promise<ApiSpec> {
    const resp = await fetch(`${API_URL}/api/v1/specs/${id}`);
    const data = await resp.json() as loadSpecResponse;
    return data.spec;
}

interface loadRelevantApisResponse {
    apis: ApiEndpoint[];
}

export async function loadRelevantApis(specId: number, query: string): Promise<ApiEndpoint[]> {
    const resp = await fetch(`${API_URL}/api/v1/specs/${specId}/relevant-apis`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
        })
    });
    const data = await resp.json() as loadRelevantApisResponse;
    return data.apis;
}

interface createTutorialResponse {
    id: number;
}

export async function createTutorial(name: string): Promise<number> {
    const resp = await fetch(`${API_URL}/api/v1/tutorials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
    });
    const data = await resp.json() as createTutorialResponse;
    return data.id;
}

interface loadTutorialsResponse {
    tutorials: Tutorial[];
}

export async function loadTutorials(): Promise<Tutorial[]> {
    const resp = await fetch(`${API_URL}/api/v1/tutorials`);
    const data = await resp.json() as loadTutorialsResponse;
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
    const resp = await fetch(`${API_URL}/api/v1/tutorials/${tutorialId}/generate-content`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            specId,
            apis,
        })
    });
    const data = await resp.json() as generateTutorialContentResponse;
    return data.content;
}
