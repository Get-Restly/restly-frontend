import {
  type OpenApiSpec,
  type ApiEndpoint,
  type ApiSpecResponse,
  type Tutorial,
} from "../types";

export interface createSpecResponse {
  id: number;
  name: string;
  spec: OpenApiSpec;
}

export interface loadSpecsResponse {
  specs: ApiSpecResponse[];
}

export interface loadSpecResponse {
  spec: ApiSpecResponse;
}

export interface createTutorialResponse {
  id: number;
}

export interface loadRelevantApisResponse {
  apis: ApiEndpoint[];
}

export interface loadTutorialsResponse {
  tutorials: Tutorial[];
}
