//executed as soon as the chrome extension installed or loaded
let active_tab_id = 0;

//checking tabs
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        active_tab_id = tab.tabId;
        if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(current_tab_info.url)) {
            //Injecting Forground script to the tab 
            /**
             * executeScript(tab id = null (default active tab), object for file, callback function)
             *
             */
            chrome.tabs.insertCSS(null, { file: './css/style.css' });
            chrome.tabs.executeScript(null, { file: './js/forground.js' }, () => console.log("i injected"));
        }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.message === '#heading') {
        chrome.tabs.sendMessage(active_tab_id, { message: 'clickit' })
    }
});