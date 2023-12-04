import {
  type ApiSpecResponse,
  type ApiEndpoint,
  type Tutorial,
  type ApiSpec,
} from "~/types";
import type ApiInterface from "./apiInterface";
import { type createSpecResponse } from "./types";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class MockApi implements ApiInterface {
  createSpec(url: string): Promise<createSpecResponse> {
    throw new Error("Method not implemented.");
  }
  loadSpecs(): Promise<ApiSpec[]> {
    throw new Error("Method not implemented.");
  }
  loadSpec(id: number): Promise<ApiSpecResponse> {
    throw new Error("Method not implemented.");
  }
  loadRelevantApis(specId: number, query: string): Promise<ApiEndpoint[]> {
    throw new Error("Method not implemented.");
  }
  createTutorial(name: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  loadTutorials(): Promise<Tutorial[]> {
    throw new Error("Method not implemented.");
  }
  streamTutorialContent(
    tutorialId: number,
    query: string,
    specId: number,
    apis: ApiEndpoint[],
    serverValue: string,
    update: (value: string) => void,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
