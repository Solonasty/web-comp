'use strict'

// Function for tabs

const ELEMENTS_SELECTOR = {
    tabs: '[data-tabs]',
    tab: '[data-tab]',
    section: 'data-tab-section',
};

function tabs() {
    $(document).on('click', ELEMENTS_SELECTOR.tab, function () {
        console.log('click')
        let id = $(this).data('tab');
        let container = $(this).closest(ELEMENTS_SELECTOR.tabs);

        container.find(ELEMENTS_SELECTOR.tab).removeClass('tabs__item--active');
        container.find(`[${ELEMENTS_SELECTOR.section}]`).removeClass('content--active');

        $(this).addClass('tabs__item--active');
        container.find(`[${ELEMENTS_SELECTOR.section}="${id}"]`).addClass('content--active');
    });
}

tabs();

// Function that loads data from json file

let btn = document.querySelector(".button");
let navHeader = document.querySelector('.header__col--nav');
let navFooter = document.querySelector('.footer__col--nav');

btn.addEventListener("click", (event) => {
    event.preventDefault();

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json');

    xhr.responseType = 'json';
    xhr.send();

    xhr.onload = function() {

        if (xhr.status == 200) {
            console.log('Готово, получили: ' + xhr.response);
            let fileJS = xhr.response;

            function nav() {
                navFooter.innerHTML = navHeader.innerHTML;
                let navFooterItem = navFooter.querySelectorAll('.nav__item--link');
                let i = 0
                for (let j of navFooterItem) {
                    for (;;) {
                        j.textContent = fileJS[i].title;
                        j.setAttribute("href", fileJS[i].link);
                        i++;
                        break;
                    }
                }
            }
            nav();

        }

        else {
            alert('Произошла ошибка. Код ошибки: ' + xhr.status);
        }
    }
})