/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

// TODO: define the actual type
export type OpenApiSpec = Record<string, any>;

export interface ApiEndpoint {
  path: string;
  verb: string;
}

export interface ApiSpec {
  id: number;
  name: string;
  url?: string;
  content?: string;
}

export interface Tutorial {
  id: number;
  name: string;
  input?: string;
  content?: string;
}

export function extractApiEndpoints(spec: OpenApiSpec): ApiEndpoint[] {
  const endpoints: ApiEndpoint[] = [];
  for (const path of Object.keys(spec.paths)) {
    const item = spec.paths[path];
    for (const method of Object.keys(item)) {
      const obj = item[method];
      const endpoint: ApiEndpoint = {
        path: path,
        verb: method,
      };
      endpoints.push(endpoint);
    }
  }
  return endpoints;
}