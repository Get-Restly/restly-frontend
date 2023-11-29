import { type ApiEndpoint, type ApiSpec, type Tutorial } from "../types";

type streamTutorialCb = (value: string) => void;

export default interface ApiInterface {
  createSpec(url: string): Promise<number>;
  loadSpecs(): Promise<ApiSpec[]>;
  loadSpec(id: number): Promise<ApiSpec>;
  loadRelevantApis(specId: number, query: string): Promise<ApiEndpoint[]>;
  createTutorial(name: string): Promise<number>;
  loadTutorials(): Promise<Tutorial[]>;
  streamTutorialContent(tutorialId: number, query: string, specId: number, apis: ApiEndpoint[], update: streamTutorialCb): void;
}
