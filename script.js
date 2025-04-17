const clickDrop = document.querySelector('.click-drop');
const hoverDrop = document.querySelector('.hover-drop');
const carousel = document.querySelector('.img-carousel');

function makeDropDownClick(div) {
    const btn = div.querySelector('button');
    const dropContent = div.querySelector('.drop-content');
    const dropStyle = window.getComputedStyle(dropContent);
    btn.addEventListener('click', () => {
        if (dropStyle.display == 'none') {
            dropContent.style.display = 'flex';
        } else if (dropContent.style.display == 'flex') {
            dropContent.style.display = 'none';
        }
    });

}

function makeDropDownHover(div) {
    const btn = div.querySelector('button');
    const dropContent = div.querySelector('.drop-content');
    btn.addEventListener('mouseover', () => {
        dropContent.style.display = 'flex';
    });
    btn.addEventListener('mouseout', () => {
        dropContent.style.display = 'none';
    });
}

function makeImgCarousel(div) {
    const imgs = div.querySelector('.frame').children;
    const btns = document.createElement('div');
    btns.className = 'carousel-btns';
    const timeouts = [];

    for (let img of imgs) {
        const carouselBtn = document.createElement('input');
        carouselBtn.type = 'radio';
        carouselBtn.id = 'btn-' + img.id[(img.id.length) - 1];
        let nextBtnId;
        if (Number(carouselBtn.id[(carouselBtn.id.length) - 1]) != imgs.length) {
            nextBtnId = '#btn-' + (Number(carouselBtn.id[(carouselBtn.id.length) - 1]) + 1).toString();
        } else {
            nextBtnId = '#btn-1';
        }
        console.log(nextBtnId);
        const imgStyle = window.getComputedStyle(img);
        if (imgStyle.display == 'inline') {
            carouselBtn.checked = true;
            img.className = 'show';
            carouselBtn.className = 'show-btn';
            timeouts.push(setTimeout(() => { div.querySelector(nextBtnId).click() }, 5000));
        } else {
            carouselBtn.checked = false;
            img.className = 'hide';
            carouselBtn.className = 'hide-btn';
        }
        carouselBtn.addEventListener('click', () => {
            if (imgStyle.display == 'none') {
                const hide = div.querySelector('.show');
                const hideBtn = div.querySelector('.show-btn');
                hide.style.display = 'none';
                hide.className = 'hide';
                hideBtn.checked = false;
                hideBtn.className = 'hide-btn';
                for (let i = 0; i < timeouts.length; i++) {
                    clearTimeout(timeouts[i]);
                }

                img.className = 'show';
                img.style.display = 'inline';
                carouselBtn.checked = true;
                carouselBtn.className = 'show-btn';
                timeouts.push(setTimeout(() => { div.querySelector(nextBtnId).click() }, 5000));
            } else if (imgStyle.display == 'inline') {

            }
        });
        btns.appendChild(carouselBtn);
    }
    div.appendChild(btns);

}



makeDropDownClick(clickDrop);
makeDropDownHover(hoverDrop);
makeImgCarousel(carousel);
