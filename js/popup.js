document.addEventListener('DOMContentLoaded', () => {
    let checkPageButton = document.querySelector('#heading_click');

    checkPageButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ message: '#heading' });
    }, false);

});

