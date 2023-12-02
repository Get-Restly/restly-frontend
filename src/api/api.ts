import { type ApiEndpoint, type ApiSpec, type Tutorial } from "../types";
import {
  type createSpecResponse,
  type loadSpecsResponse,
  type loadSpecResponse,
  type loadRelevantApisResponse,
  type createTutorialResponse,
  type loadTutorialsResponse,
} from "./types";
import { API_URL } from "../constants";
import type ApiInterface from "./apiInterface";
import { createChunkDecoder } from "./utils";


export default class API implements ApiInterface {
  userToken: string;

  constructor(userToken: string) {
    this.userToken = userToken;
  }

  async createSpec(url: string): Promise<number> {
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
    const resp = await fetch(`${API_URL}/api/v1/specs`, {
      headers: {
        Authorization: `Bearer ${this.userToken}`,
      },
    });
    const data = (await resp.json()) as loadSpecsResponse;
    return data.specs;
  }

  async loadSpec(id: number): Promise<ApiSpec> {
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
