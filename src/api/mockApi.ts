import { ApiSpec, ApiEndpoint, Tutorial } from "~/types";
import ApiInterface from "./apiInterface";


export default class MockApi implements ApiInterface {
  createSpec(url: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
  loadSpecs(): Promise<ApiSpec[]> {
    throw new Error("Method not implemented.");
  }
  loadSpec(id: number): Promise<ApiSpec> {
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
  streamTutorialContent(tutorialId: number, query: string, specId: number, apis: ApiEndpoint[], update: (value: string) => void): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
