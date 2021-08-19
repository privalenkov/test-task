(() => {
    const $btn = document.querySelector('#btn');
    const $logger = document.querySelector('#logger');
    const $cardList = document.querySelector('#card-list')
    const $elemntsArr = [];

    function clickHandler (e) {
        $elemntsArr.forEach((e) => {
            e.style.setProperty('animation', 'initial')
        })
        $btn.textContent = 'in progress';
        $btn.disabled = true;
        $elemntsArr[0].style.setProperty('animation', null)
        $elemntsArr[0].style.setProperty('animation', 'cardRotate 1s forwards')
        log ('START')
    }

    function animStartHandler (e) {
        log (`Cell ${e.target.textContent} Animation START`)
        if ($elemntsArr.length !== +e.target.textContent) {
            $elemntsArr[+e.target.textContent].style.setProperty('animation', 'cardRotate 1s forwards .2s')
        }
    }

    function animEndHandler (e) {
        log (`Cell ${e.target.textContent} Animation END`)
        if ($elemntsArr.length === +e.target.textContent) {
            $btn.disabled = false;
            $btn.textContent = 'START';
            log ('PROGRESS END')
            alert('success')
        }
    }

    function createElements (container, count) {
        for (let i = 1; i <= count; i++) {
            const $child = document.createElement('li')
            $child.innerHTML = `${i}`
            $child.classList.add('c-card__item')
            $child.addEventListener("animationstart", animStartHandler);
            $child.addEventListener("animationend", animEndHandler);
            $elemntsArr.push($child)
            container.appendChild($child)
        }
    }
    
    function log (text) {
        $logger.value += `${text}\r\n`;
        $logger.scrollTop = $logger.scrollHeight 
    }


    function init () {
        createElements($cardList, 23)
        $btn.addEventListener('click', clickHandler);
    }
    init()

})()
