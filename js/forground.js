if (typeof headings === 'undefined') {
    headings = {
        h1: Array.from(document.getElementsByTagName('h1')),
        h2: Array.from(document.getElementsByTagName('h2')),
        h3: Array.from(document.getElementsByTagName('h3')),
        h4: Array.from(document.getElementsByTagName('h4')),
        h5: Array.from(document.getElementsByTagName('h5')),
        h6: Array.from(document.getElementsByTagName('h6'))
    }
    flag = 0;
    headings_array = Object.values(headings);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'clickit') {
        let headings_array = Object.values(headings);

        if (flag === 0) {
            headings_array.forEach(heading => {
                heading.forEach(el => {

                    el.insertAdjacentHTML('afterbegin', `<span class="heading-hilighter">${el.nodeName}</span>`);
                    el.classList.add(`highlight-${el.nodeName}`);
                    el.classList.add(`highlight-common`);

                });
            });
            flag = 1;
        }
        else {

            let elements = document.querySelectorAll('.heading-hilighter');

            Array.from(elements).forEach(element => {
                element.parentElement.removeChild(element);
            });            
            headings_array.forEach(heading => {
                heading.forEach(el => {
                    el.classList.remove(`highlight-${el.nodeName}`);
                    el.classList.remove(`highlight-common`);
                });
            });
            flag = 0;
        }

    }
});
