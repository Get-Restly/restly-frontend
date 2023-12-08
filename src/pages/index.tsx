// import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState, useContext } from "react";
import Head from "next/head";
import { Button } from "flowbite-react";
import GoalsForm from "~/components/GoalsForm";
import MarkdownEditor from "~/components/MarkdownEditor";
import SelectApiSpec from "~/components/SelectApiSpec";
import { type ApiEndpoint, type ApiSpec } from "~/types";
import { SparklesIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useApi } from "~/hooks/useAPI";
import ServerSelector from "~/components/ServerSelector";
import ApiPicker from "~/components/ApiPicker";
import { useMutation } from "@tanstack/react-query";
import useCopyToClipboard from "~/hooks/copyToClipboard";
import { ShepherdTour, ShepherdTourContext } from "react-shepherd";
import steps from "~/tour/steps";

import "shepherd.js/dist/css/shepherd.css";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

const DEFAULT_MARKDOWN = `# Hello Editor`;
const DEFAULT_TUTORIAL_NAME = "Draft Tutorial";
const DEFAULT_SERVER_VALUE = "<Infer from OpenAPI spec>";

const StartTourButton = () => {
  const tour = useContext(ShepherdTourContext);
  return (
    <button
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => tour?.start()}
    >
      Start Guided Tour
    </button>
  );
};

export default function Home() {
  const { api, authenticated } = useApi();

  //Hold the ID of the selected API spec
  const [goalsText, setGoalsText] = useState<string>("");
  const [apiSpec, setApiSpec] = useState<ApiSpec | undefined>();

  //List of servers
  const servers: string[] = useMemo(() => {
    if (!apiSpec?.spec?.servers) {
      return [];
    }
    return apiSpec.spec.servers.map((server) => server.url);
  }, [apiSpec]);

  const [serverValue, setServerValue] = useState<string>(DEFAULT_SERVER_VALUE);

  useEffect(() => {
    setServerValue(servers[0] ?? DEFAULT_SERVER_VALUE);
  }, [servers]);

  const [selectedApiEndpoints, setSelectedApiEndpoints] = useState<
    ApiEndpoint[]
  >([]);

  const [tutorialId, setTutorialId] = useState<number | undefined>();
  const [tutorialContent, setTutorialContent] =
    useState<string>(DEFAULT_MARKDOWN);

  const generateTutorialMutation = useMutation({
    mutationFn: async () => {
      if (!tutorialId) {
        throw new Error("Tutorial ID not set");
      }
      if (!apiSpec) {
        throw new Error("API Spec not set");
      }
      await api.streamTutorialContent(
        tutorialId,
        goalsText,
        apiSpec.id,
        selectedApiEndpoints,
        serverValue,
        (content: string) => setTutorialContent(content),
      );

      //Note: We return an empty string because without it isLoading stays true
      return "";
    },
  });

  const autoSelectApisMutation = useMutation({
    mutationFn: async (apiSpecId: number) => {
      if (!apiSpecId) {
        throw new Error("API Spec ID not set");
      }
      return await api.loadRelevantApis(apiSpecId, goalsText);
    },
    onSuccess: (relevantApis) => {
      setSelectedApiEndpoints(relevantApis);
    },
  });

  useEffect(() => {
    const loadCurrentTutorial = async () => {
      const tutorials = await api.loadTutorials();
      if (tutorials.length > 0 && tutorials[0]) {
        setTutorialId(tutorials[0].id);
      } else {
        const tutorialId = await api.createTutorial(DEFAULT_TUTORIAL_NAME);
        setTutorialId(tutorialId);
      }
    };
    loadCurrentTutorial().catch((e) => console.error(e));
  }, [api]);

  const autoSelectApis = () => {
    if (apiSpec) {
      autoSelectApisMutation.mutate(apiSpec.id);
    }
  };

  const generateTutorial = async () => {
    await generateTutorialMutation.mutateAsync();
  };

  const cannotGenerateTutorial =
    tutorialId === undefined ||
    goalsText === "" ||
    apiSpec === undefined ||
    selectedApiEndpoints.length === 0 ||
    generateTutorialMutation.isLoading;

  useCopyToClipboard(tutorialContent);

  return (
    <>
      <Head>
        <title>Restly</title>
        <meta name="description" content="Restly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Page container */}
      <div className="flex h-screen w-full flex-col">
        {!authenticated ? (
          <LoadingSpinner />
        ) : (
          // {/* Header */}
          <ShepherdTour tourOptions={tourOptions} steps={steps}>
            <div className="flex h-16 w-full flex-col items-start justify-start border-b border-gray-200">
              <div className="flex items-center justify-between self-stretch px-8 py-4">
                <div className="flex items-center justify-start gap-2">
                  <svg
                    className="relative h-6 w-6 text-gray-800 opacity-30 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    {" "}
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                    />{" "}
                  </svg>
                  <div className="px-2 text-xl font-bold">Restly</div>
                </div>
                <StartTourButton />
              </div>
            </div>
            {/* Body container */}
            <div className="flex w-full flex-1 flex-col justify-start gap-8 px-8 py-4">
              {/* Two column layout */}
              <div className="flex h-full flex-col justify-start gap-16 md:flex-row">
                {/* Column 1 */}
                <div className="flex w-full flex-col items-start justify-start gap-4 md:w-1/3">
                  <h1 className="text-xl font-bold">Magic Tutorial Creator</h1>
                  <div className="text-md">
                    We use AI to generate a user-friendly tutorial for your API.
                    Just input your OpenAPI spec and your goals for the
                    tutorial, and we&apos;ll do the rest!
                  </div>
                  <h2 className="text-xl font-bold">Instructions</h2>
                  <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                    <h3 className="text-md font-bold">
                      Step 1: Select your OpenAPI Spec
                    </h3>
                    <SelectApiSpec onSelect={setApiSpec} />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                    <h3 className="text-md font-bold">
                      Step 2: Write your goals for the tutorial
                    </h3>
                    <GoalsForm value={goalsText} onChange={setGoalsText} />
                  </div>
                  <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                    <h3 className="text-md font-bold">
                      Step 3: Pick relevant APIs
                    </h3>
                    <div className="flex w-full flex-col gap-4 px-2">
                      <ApiPicker
                        spec={apiSpec?.spec}
                        value={selectedApiEndpoints}
                        onChange={setSelectedApiEndpoints}
                        onAutoSelect={autoSelectApis}
                        autoSelectLoading={autoSelectApisMutation.isLoading}
                        goalsText={goalsText}
                      />
                      <ServerSelector
                        serverValue={serverValue}
                        setServerValue={setServerValue}
                        servers={servers}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center self-stretch">
                    <Button
                      color="blue"
                      type="submit"
                      size="lg"
                      className="tour-fifth focus:ring-1 focus:ring-gray-200"
                      onClick={() => generateTutorial()}
                      disabled={cannotGenerateTutorial}
                    >
                      {generateTutorialMutation.isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <SparklesIcon className="mr-1 h-5 w-5" />
                      )}
                      <span className="text-lg">
                        {generateTutorialMutation.isLoading
                          ? "Generating..."
                          : "Generate tutorial"}
                      </span>
                    </Button>
                  </div>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col items-start justify-start gap-4 md:flex-1">
                  <div className="h-96 w-full md:flex-1">
                    <MarkdownEditor
                      text={tutorialContent}
                      setText={setTutorialContent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ShepherdTour>
        )}
      </div>
    </>
  );
}
