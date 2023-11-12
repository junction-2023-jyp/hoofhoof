type Action = 'open_modal';
export interface Message {
  action: Action;
}

export const sendMessageToContentScript = (tabId: number, message: Message) => {
  chrome.tabs.get(tabId, tab => {
    console.log('tab', tab.status);
    if (tab.status === 'complete') {
      chrome.tabs.sendMessage(tabId, message, response => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log(response);
        }
      });
    } else {
      setTimeout(() => sendMessageToContentScript(tabId, message), 100);
    }
  });
};
