import { type ShepherdOptionsWithType } from 'react-shepherd';

const goalsText = `We are going to create a tutorial that sets up an automated agent that talks like Yoda and makes references from the Star Wars movies.
Use the $VOCODE_API_KEY for the API calls which require authentication.

Here is what we need to cover:
1. Create a prompt which gives the instructions to act and speak like Yoda from Star Wars.
2. Create an Azure voice to use for our agent. Use the "en-US-JasonNeural" voice.
3. Create an agent using the previously created Prompt and Voice.
4. List all the numbers available and choose the first one.
5. Update the phone number above to use the agent we just created.`

const steps: Array<ShepherdOptionsWithType> = [
    {
      id: 'intro',
      attachTo: { element: '.tour-first', on: 'bottom' },
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Next',
          type: 'next'
        }
      ],
      classes: '',
      highlightClass: 'highlight',
      scrollTo: false,
      cancelIcon: {
        enabled: true,
      },
      title: 'Step 1: Load an API spec',
      text: () => '<div><div>Copy and Paste in the Vocode OpenAPI Spec URL:<div><div style="background-color: #f5f5f5; padding: 8px; margin-top: 8px; white-space: nowrap; overflow: scroll; border: 1px solid gray; border-radius: 4px; ">https://raw.githubusercontent.com/vocodedev/vocode-python/main/docs/openapi.json</div><div>',
      when: {
        show: () => {
          console.log('show step');
        },
        hide: () => {
          console.log('hide step');
        }
      }
    },
    {
        id: 'click-load-spec',
        attachTo: { element: '.tour-second', on: 'bottom' },
        buttons: [
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        classes: '',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
          enabled: true,
        },
        title: 'Step 1: Load an API spec',
        text: () => 'Click "Load OpenAPI Spec" to import the API spec',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
    },
    {
        id: 'write-goals',
        attachTo: { element: '.tour-thrid', on: 'bottom' },
        buttons: [
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        classes: 'w-96',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
          enabled: true,
        },
        title: 'Step 2: Write step-by-step goals',
        text: () => 'Enter the following text: <div style="background-color: #f5f5f5; padding: 8px; margin-top: 8px; border: 1px solid gray; border-radius: 4px; overflow: scroll;"><pre>' + goalsText + '</pre></div>',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
    },
    {
        id: 'click-auto-select',
        attachTo: { element: '.tour-fourth', on: 'top' },
        buttons: [
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Next',
            type: 'next'
          }
        ],
        classes: '',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
          enabled: true,
        },
        title: 'Step 3: Select APIs',
        text: () => 'Click "Auto Select" to let the AI choose the relevant APIs for you. You can also manually select the APIs from the list below.',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
    },
    {
        id: 'click-generate',
        attachTo: { element: '.tour-fifth', on: 'top' },
        buttons: [
          {
            classes: 'shepherd-button-primary',
            text: 'Back',
            type: 'back'
          },
          {
            classes: 'shepherd-button-primary',
            text: 'Done',
            type: 'next'
          }
        ],
        classes: '',
        highlightClass: 'highlight',
        scrollTo: false,
        cancelIcon: {
          enabled: true,
        },
        title: 'Step 4: Generate Tutorial',
        text: () => 'Click "Generate Tutorial" to start generating the tutorial. This may take a minutes. Watch the editor window for progress.',
        when: {
          show: () => {
            console.log('show step');
          },
          hide: () => {
            console.log('hide step');
          }
        }
    },
  ];

  export default steps;