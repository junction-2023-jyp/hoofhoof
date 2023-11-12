import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'open_modal') {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const currentTab = tabs[0];
      if (currentTab && currentTab.id) {
        console.log('send message');
        chrome.tabs.sendMessage(tabs[0].id, { action: 'open_modal' });
      }
    });
  }
});

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
