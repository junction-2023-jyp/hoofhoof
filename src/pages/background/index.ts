import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

// let isModalOpen = false;

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log('request.type ', request.type);
//   if (request.type === 'TOGGLE_MODAL') {
//     isModalOpen = !isModalOpen;
//     // 현재 active tab에 메시지를 보냅니다.
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//       console.log('tabs bg', tabs);
//       chrome.tabs.sendMessage(tabs[0].id, { type: 'TOGGLE_MODAL', isOpen: isModalOpen });
//     });
//   }
// });

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
