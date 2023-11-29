import { type ApiEndpoint, type ApiSpec, type Tutorial } from "../types";


export interface createSpecResponse {
  id: number;
  name: string;
}

export interface loadSpecsResponse {
  specs: ApiSpec[];
}

export interface loadSpecResponse {
  spec: ApiSpec;
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
