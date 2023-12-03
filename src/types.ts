/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */

// TODO: define the actual type
export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    termsOfService?: string;
    contact?: {
      name?: string;
      url?: string;
      email?: string;
    };
    license?: {
      name: string;
      url?: string;
    };
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths: Record<
    string,
    Record<
      string,
      {
        summary?: string;
        description?: string;
        operationId?: string;
        parameters?: Array<{
          name: string;
          in: string;
          description?: string;
          required?: boolean;
          schema: {
            type: string;
            format?: string;
          };
        }>;
        requestBody?: {
          description?: string;
          required?: boolean;
          content: Record<
            string,
            {
              schema: {
                type: string;
                items?: {
                  type: string;
                  format?: string;
                };
              };
            }
          >;
        };
        responses: Record<
          string,
          {
            description: string;
            content?: Record<
              string,
              {
                schema: {
                  type: string;
                  items?: {
                    type: string;
                    format?: string;
                  };
                };
              }
            >;
          }
        >;
      }
    >
  >;
  components?: {
    schemas?: Record<string, any>;
    responses?: Record<string, any>;
    parameters?: Record<string, any>;
    examples?: Record<string, any>;
    requestBodies?: Record<string, any>;
    headers?: Record<string, any>;
    securitySchemes?: Record<string, any>;
    links?: Record<string, any>;
    callbacks?: Record<string, any>;
  };
  security?: Array<Record<string, Array<string>>>;
  tags?: Array<{
    name: string;
    description?: string;
    externalDocs?: {
      description?: string;
      url: string;
    };
  }>;
  externalDocs?: {
    description?: string;
    url: string;
  };
}

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
  for (const path in spec.paths) {
    const item = spec.paths[path];
    for (const method in item) {
      const endpoint: ApiEndpoint = {
        path: path,
        verb: method,
      };
      endpoints.push(endpoint);
    }
  }
  return endpoints;
}
