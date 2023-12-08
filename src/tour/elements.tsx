import React, { type FC } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const VOCODE_OPENAPI_URL = "https://raw.githubusercontent.com/vocodedev/vocode-python/main/docs/openapi.json";

export const GOALS_TEXT = `We are going to create a tutorial that sets up an automated agent that talks like Yoda and makes references from the Star Wars movies.
Use the $VOCODE_API_KEY for the API calls that require authentication.
Generate CURL commands for each step.

Here is what we need to cover:
1. Create a prompt with instructions to act and speak like Yoda from Star Wars.
2. Create an Azure voice to use for our agent. Use the "en-US-JasonNeural" voice.
3. Create an agent using the previously created Prompt and Voice.
4. List all the numbers available and choose the first one.
5. Update the above phone number above to use the agent we created.`;


const TourStepIntro: FC = () => (
  <div>
    <div>
      Copy and Paste the Vocode OpenAPI Spec URL
    </div>
    <div style={{
        backgroundColor: "#f5f5f5",
        padding: 8,
        marginTop: 8,
        whiteSpace: "nowrap",
        overflow: "scroll",
        border: "1px solid gray",
        borderRadius: 4,
      }}>
        {VOCODE_OPENAPI_URL}
    </div>
  </div>
);

const TourStepGoals: FC = () => (
  <div>
    <div>
      Copy and Paste the following goals for the tutorial:
    </div>
    <div style={{
        backgroundColor: "#f5f5f5",
        padding: 8,
        marginTop: 8,
        whiteSpace: "nowrap",
        overflow: "scroll",
        border: "1px solid gray",
        borderRadius: 4,
      }}>
      <pre>
        {GOALS_TEXT}
      </pre>
    </div>
  </div>
);

export const TourStepIntroHTML = renderToStaticMarkup(<TourStepIntro />);
export const TourStepGoalsHTML = renderToStaticMarkup(<TourStepGoals />);
