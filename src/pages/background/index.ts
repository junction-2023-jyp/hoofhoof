import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === 'open_modal') {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//       const currentTab = tabs[0];
//       if (currentTab && currentTab.id) {
//         console.log('send message');
//         chrome.tabs.sendMessage(tabs[0].id, { action: 'open_modal' });
//       }
//     });
//   }
// });
// 현재 활성 탭을 조회합니다.
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  // 첫 번째 활성 탭의 ID를 가져옵니다.
  const activeTab = tabs[0].id;

  // 현재 활성 탭에 콘텐츠 스크립트를 주입합니다.
  chrome.scripting.executeScript(
    {
      target: { tabId: activeTab },
      files: ['/dist/src/pages/content/index.js'], // contentScript.js는 주입하려는 파일의 이름입니다.
    },
    injectionResults => {
      console.log('injectionResults', injectionResults);
      // 주입된 후에 실행되는 콜백 함수입니다. 필요한 경우 여기에서 후속 조치를 취할 수 있습니다.
    },
  );
});

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
