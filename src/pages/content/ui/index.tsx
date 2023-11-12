import { createRoot } from 'react-dom/client';
import App from '@root/src/pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content');

let createdRoot;
const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-react-vite-content-view-root';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

// open_modal message listener -> open modal
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'open_modal') {
    if (!createdRoot) {
      createdRoot = createRoot(rootIntoShadow);
    }
    // const root = createRoot(rootIntoShadow);
    createdRoot.render(<App isOpen={true} />);
  }
  return true;
});
// const createdRoot = createRoot(shadowRoot);
// createdRoot.render(<App />);
