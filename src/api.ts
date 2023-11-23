import { ApiEndpoint, ApiSpec, Tutorial } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export async function loadSpecs(): Promise<ApiSpec[]> {
    const resp = await fetch(`${API_URL}/api/v1/specs`);
    const data = await resp.json();
    const specs = data.specs as ApiSpec[];
    return specs;
}

export async function loadSpec(id: number): Promise<ApiSpec> {
    const resp = await fetch(`${API_URL}/api/v1/specs/${id}`);
    const data = await resp.json();
    const spec = data.spec as ApiSpec;
    return spec;
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
    const data = await resp.json();
    const relevantApis = data.apis as ApiEndpoint[];
    return relevantApis;
}

export async function createTutorial(name: string): Promise<number> {
    const resp = await fetch(`${API_URL}/api/v1/tutorials`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name }),
    });
    const data = await resp.json();
    return data.id;
}

export async function loadTutorials(): Promise<Tutorial[]> {
    const resp = await fetch(`${API_URL}/api/v1/tutorials`);
    const data = await resp.json();
    return data.tutorials as Tutorial[];
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
    const data = await resp.json();
    return data.content as string;
}
