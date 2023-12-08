import { type ShepherdOptionsWithType } from 'react-shepherd';
import { TourStepIntroHTML, TourStepGoalsHTML, VOCODE_OPENAPI_URL, GOALS_TEXT } from './elements';

const steps: Array<ShepherdOptionsWithType> = [
    {
      id: 'intro',
      attachTo: { element: '.tour-first', on: 'bottom' },
      buttons: [
        {
          classes: 'shepherd-button-primary',
          text: 'Copy URL',
          action() {
            navigator.clipboard.writeText(VOCODE_OPENAPI_URL).catch((err) => console.error(err));
          },
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
      text: () => TourStepIntroHTML,
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
            text: 'Copy Text',
            action() {
              navigator.clipboard.writeText(GOALS_TEXT).catch((err) => console.error(err));
            },
          },
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
        title: 'Step 2: Write step-by-step goals',
        text: () => TourStepGoalsHTML,
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