// import { signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "flowbite-react";
import ApiPicker from "~/components/ApiPicker";
import GoalsForm from "~/components/GoalsForm";
import MarkdownEditor from "~/components/MarkdownEditor";
import SelectApiSpec from "~/components/SelectApiSpec";
import { ApiSpec, OpenApiSpec, ApiEndpoint } from "~/types";
import {
  createTutorial,
  loadTutorials,
  generateTutorialContent,
  loadSpec,
  loadRelevantApis,
} from "~/api";
import { SparklesIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "~/components/LoadingSpinner";

const DEFAULT_MARKDOWN = `# Hello Editor`;
const DEFAULT_TUTORIAL_NAME = "Draft Tutorial";

export default function Home() {
  const [apiSpecId, setApiSpecId] = useState<number | undefined>();
  const [goalsText, setGoalsText] = useState<string>("");
  const [apiSpec, setApiSpec] = useState<ApiSpec | undefined>();
  const [openApiSpec, setOpenApiSpec] = useState<OpenApiSpec | undefined>();
  const [selectedApiEndpoints, setSelectedApiEndpoints] = useState<
    ApiEndpoint[]
  >([]);
  const [tutorialId, setTutorialId] = useState<number | undefined>();
  const [tutorialContent, setTutorialContent] =
    useState<string>(DEFAULT_MARKDOWN);
  const [autoSelectApiLoading, setAutoSelectApiLoading] =
    useState<boolean>(false);
  const [generatingTutorial, setGeneratingTutorial] = useState<boolean>(false);

  useEffect(() => {
    const loadCurrentTutorial = async () => {
      const tutorials = await loadTutorials();
      if (tutorials.length > 0 && tutorials[0]) {
        setTutorialId(tutorials[0].id);
      } else {
        const tutorialId = await createTutorial(DEFAULT_TUTORIAL_NAME);
        setTutorialId(tutorialId);
      }
    };
    loadCurrentTutorial().catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const reloadSpec = async () => {
      if (!apiSpecId) {
        return;
      }
      const spec = await loadSpec(apiSpecId);
      setApiSpec(spec);
      if (spec.content) {
        const openApiSpec = JSON.parse(spec.content) as OpenApiSpec;
        setOpenApiSpec(openApiSpec);
      }
    };
    reloadSpec().catch((e) => console.error(e));
  }, [apiSpecId]);

  const autoSelectApis = async () => {
    if (!apiSpecId) {
      throw new Error("API Spec ID not set");
    }
    try {
      setAutoSelectApiLoading(true);
      const relevantApis = await loadRelevantApis(apiSpecId, goalsText);
      setSelectedApiEndpoints(relevantApis);
    } finally {
      setAutoSelectApiLoading(false);
    }
  };

  const generateTutorial = async () => {
    if (!tutorialId) {
      throw new Error("Tutorial ID not set");
    }
    if (!apiSpecId) {
      throw new Error("API Spec ID not set");
    }
    try {
      setGeneratingTutorial(true);
      const content = await generateTutorialContent(
        tutorialId,
        goalsText,
        apiSpecId,
        selectedApiEndpoints,
      );
      setTutorialContent(content);
    } finally {
      setGeneratingTutorial(false);
    }
  };

  return (
    <>
      <Head>
        <title>Restly</title>
        <meta name="description" content="Restly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Page container */}
      <div className="flex h-screen w-full flex-col">
        {/* Header */}
        <div className="flex h-16 w-full flex-col items-start justify-start border-b border-gray-200">
          <div className="flex items-center justify-start self-stretch px-8 py-4">
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
                Just input your OpenAPI spec and your goals for the tutorial,
                and we&apos;ll do the rest!
              </div>
              <h2 className="text-xl font-bold">Instructions</h2>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                <h3 className="text-md font-bold">
                  Step 1: Select your OpenAPI Spec
                </h3>
                <SelectApiSpec value={apiSpecId} onSelect={setApiSpecId} />
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
                <ApiPicker
                  spec={openApiSpec}
                  value={selectedApiEndpoints}
                  onChange={setSelectedApiEndpoints}
                  onAutoSelect={autoSelectApis}
                  autoSelectLoading={autoSelectApiLoading}
                />
              </div>
              <div className="flex flex-col items-center self-stretch">
                <Button
                  color="blue"
                  type="submit"
                  size="lg"
                  className="focus:ring-1 focus:ring-gray-200"
                  onClick={() => generateTutorial()}
                >
                  {generatingTutorial ? (
                    <LoadingSpinner />
                  ) : (
                    <SparklesIcon className="mr-1 h-5 w-5" />
                  )}
                  <span className="text-lg">
                    {generatingTutorial ? "Generating..." : "Generate tutorial"}
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
      </div>
    </>
  );
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.post.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
