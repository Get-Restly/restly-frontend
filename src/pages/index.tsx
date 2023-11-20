// import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import APIPicker from "~/components/APIPicker";
import GoalsForm from "~/components/GoalsForm";
import MarkdownEditor from "~/components/MarkdownEditor";
import IngestOpenAISpec from "~/components/OpenAPISpecForm";

// import { api } from "~/utils/api";
// import { Navbar } from "flowbite-react";

export default function Home() {
  // const hello = api.post.hello.useQuery({ text: "from tRPC" });
  // const fakeMarkdown =

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
        <div className="inline-flex h-16 w-full flex-col items-start justify-start border-b border-gray-200">
          <div className="inline-flex items-center justify-start gap-8 self-stretch px-8 py-4">
            <div className="flex items-center justify-start gap-3">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                />{" "}
              </svg>
              <div className=" text-xl font-bold text-gray-900">Restly</div>
            </div>
          </div>
        </div>
        {/* Body container */}
        <div className="inline-flex w-full flex-1 flex-col justify-start gap-8 px-8 py-4">
          {/* Description */}
          <div className="inline-flex flex-col justify-start">
            <div className="inline-flex items-start justify-start self-stretch">
              <h1 className="text-2xl font-bold text-gray-900">
                Magic Tutorial Creator
              </h1>
            </div>
            <div className="inline-flex items-start justify-start self-stretch">
              <div className="text-lg font-normal text-gray-900">
                We use AI to generate a user-friendly tutorial for your API.
                Just input your OpenAPI spec and your goals for the tutorial,
                and we&apos;ll do the rest!
              </div>
            </div>
          </div>
          {/* Two column layout */}
          <div className="inline-flex h-full flex-col justify-start gap-16 md:flex-row">
            {/* Column 1 */}
            <div className="inline-flex w-full flex-col items-start justify-start gap-4 overflow-auto md:w-1/3">
              <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                <h3 className="text-lg font-bold text-gray-900">
                  Step 1: Input your OpenAPI Spec
                </h3>
                <IngestOpenAISpec />
              </div>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                <h3 className="text-lg font-bold text-gray-900">
                  Step 2: Write your goals for the tutorial
                </h3>
                <GoalsForm />
              </div>
              <div className="flex flex-col items-start justify-start gap-4 self-stretch">
                <h3 className="text-lg font-bold text-gray-900">
                  Step 3: Pick relevant APIs
                </h3>
                <APIPicker />
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex w-full flex-col items-start justify-start gap-4 self-stretch overflow-hidden md:flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                Generated Tutorial
              </h2>
              <div className="inline-flex items-start justify-start self-stretch">
                <div className="text-md text-gray-900">
                  Here&apos;s the tutorial we generated for you using magic!
                </div>
              </div>
              <div className="h-96 w-full overflow-auto md:flex-1">
                <MarkdownEditor text={"# Hello Editor"} />
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
