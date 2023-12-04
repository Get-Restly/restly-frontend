import {
  type ApiSpec,
  type ApiEndpoint,
  type ApiSpecResponse,
  type Tutorial,
} from "../types";
import { type createSpecResponse } from "./types";

type streamTutorialCb = (value: string) => void;

export default interface ApiInterface {
  createSpec(url: string): Promise<createSpecResponse>;
  loadSpecs(): Promise<ApiSpec[]>;
  loadSpec(id: number): Promise<ApiSpecResponse>;
  loadRelevantApis(specId: number, query: string): Promise<ApiEndpoint[]>;
  createTutorial(name: string): Promise<number>;
  loadTutorials(): Promise<Tutorial[]>;
  streamTutorialContent(
    tutorialId: number,
    query: string,
    specId: number,
    apis: ApiEndpoint[],
    serverValue: string,
    update: streamTutorialCb,
  ): Promise<void>;
}
