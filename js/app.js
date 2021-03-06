WebFontConfig = {
    google: { families: ['Inter:400,600,700', 'Oswald:400&display=swap'] }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


//loader function
var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}


var p = new Loader();
p.require([
        "./js/scroll.js"
    ],
    function() {});

var l = new Loader();
l.require([
        "./js/lazy-load.js"
    ],
    function() {});





let mMenu = document.querySelector('.mobile-icon')
let menu = document.querySelector('.header-info')
let overlay = document.querySelector('.header-overley')

// if (mMenu) {


//     mMenu.addEventListener('click', function(e) {

//         this.querySelector('.ham').classList.toggle('active')
//         menu.classList.toggle('visible')
//         overlay.classList.toggle('overley-active')


//     })
//     overlay.addEventListener('click', function(e) {
//         if (this.classList.contains('overley-active') && (mMenu.querySelector('.ham').classList.contains('active'))) {
//             menu.classList.toggle('visible')
//             this.classList.toggle('overley-active')
//             mMenu.querySelector('.ham').classList.toggle('active')
//         }
//     })
// }

document.addEventListener("DOMContentLoaded", function(event) {

    // for form
    // errors show
    let inputs = document.querySelectorAll('.large-input input')
    inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                if (input.value == "123") {
                    input.closest('.large-input').classList.add('error')
                    slideDown(input.closest('.large-input').querySelector('.error-text'), 150)
                }
            })

            input.addEventListener('focus', function() {
                if (input.closest('.large-input').classList.contains('error')) {
                    input.closest('.large-input').classList.remove('error')
                    slideUp(input.closest('.large-input').querySelector('.error-text'), 150)
                }
            })
        })
        // claer value
    let clearValues = document.querySelectorAll('.remove-value')
    clearValues.forEach(function(clearValue) {
        clearValue.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let formEl = clearValue.closest('.large-input').querySelector('input')
            if (formEl.value != '') {
                formEl.value = ''
            }
        })
    })


    // for-docs
    let docLists = document.querySelectorAll('.dl-group .btn')
    if (docLists) {
        docLists.forEach(function(docList) {
            docList.addEventListener('click', function(e) {
                let curentPanel = docList.closest('.dl-group')
                slideToggle(curentPanel.querySelector('ul'), 150)
                if (curentPanel.classList.contains('active-list')) {
                    setTimeout(function() {
                        curentPanel.classList.toggle('active-list')
                    }, 100)
                } else {
                    curentPanel.classList.toggle('active-list')
                }


            })
        })
    }

    if (document.querySelector('.hero-slides') || document.querySelector('.s-slides') || document.querySelector('.solution-slider')) {
        var s = new Loader();
        s.require([
                "./js/slider.js"
            ],
            function() {

                if (document.querySelector('.hero-slides')) {
                    let heroSlider = new Siema({
                        selector: '.hero-slides',
                        duration: 350,
                        easing: 'ease',
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: true,
                        threshold: 90,
                        loop: false,
                        rtl: false,
                        perPage: 1,
                        onInit: currentSlide,
                        onChange: currentText,
                    });

                    function currentSlide() {
                        document.querySelector('.slide-descr').textContent = document.querySelectorAll('.slide')[this.currentSlide].getAttribute('data-text');
                        let hideSlides = document.querySelectorAll('.hide-on-load');
                        hideSlides.forEach(function(hideSlide) {
                            hideSlide.classList.remove('hide-on-load');
                        });
                    }

                    function currentText() {
                        document.querySelector('.slide-descr').textContent = document.querySelectorAll('.slide')[this.currentSlide].getAttribute('data-text');
                    }
                    let prev = document.querySelector('.hero .prev');
                    let next = document.querySelector('.hero .next');
                    prev.addEventListener('click', () => heroSlider.prev());
                    next.addEventListener('click', () => heroSlider.next());
                }
                if (document.querySelector('.s-slides')) {
                    let storySlider = new Siema({
                        selector: '.s-slides',
                        duration: 350,
                        easing: 'ease',
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: true,
                        threshold: 90,
                        loop: false,
                        rtl: false,
                        perPage: 1,
                        onInit: storyInit
                    });

                    function storyInit() {
                        let hideSlides = document.querySelectorAll('.hide-on-load')
                        hideSlides.forEach(function(hideSlide) {
                            hideSlide.classList.remove('hide-on-load');
                        });
                    }
                    let prev = document.querySelector('.stories-slider .prev');
                    let next = document.querySelector('.stories-slider .next');
                    prev.addEventListener('click', () => storySlider.prev());
                    next.addEventListener('click', () => storySlider.next());
                }

                if (document.querySelector('.solution-slider')) {
                    let storySlider = new Siema({
                        selector: '.solution-slider',
                        duration: 350,
                        easing: 'ease',
                        startIndex: 0,
                        draggable: true,
                        multipleDrag: true,
                        threshold: 90,
                        loop: false,
                        rtl: false,
                        perPage: 3,
                        onInit: storyInit
                    });

                    function storyInit() {
                        let hideSlides = document.querySelectorAll('.hide-on-load')
                        hideSlides.forEach(function(hideSlide) {
                            hideSlide.classList.remove('hide-on-load');
                        });
                        document.querySelector('.multiple-loading').classList.remove('multiple-loading')
                    }
                    let prev = document.querySelector('.has-slider .prev');
                    let next = document.querySelector('.has-slider .next');
                    prev.addEventListener('click', () => storySlider.prev());
                    next.addEventListener('click', () => storySlider.next());
                }

            });
    }



    document.body.addEventListener("mousedown", function(event) {

        var target = event.target;

        while (target) {

            if (!target.classList || !target.classList.contains("ripple")) {

                target = target.parentNode;
            } else {

                break;
            }
        }

        if (target && target.classList.contains("ripple")) {

            // Get necessary variables
            var rect = target.getBoundingClientRect(),
                left = rect.left,
                top = rect.top,
                width = target.offsetWidth,
                height = target.offsetHeight,
                offsetTop = target.offsetTop,
                offsetLeft = target.offsetLeft,
                dx = event.clientX - left,
                dy = event.clientY - top,
                maxX = Math.max(dx, width - dx),
                maxY = Math.max(dy, height - dy),
                style = window.getComputedStyle(target),
                radius = Math.sqrt((maxX * maxX) + (maxY * maxY));

            var ripple = document.createElement("div"),
                rippleContainer = document.createElement("div");

            if (target.classList.contains("light")) {
                ripple.classList.add("light");
            } else if (target.classList.contains("dark")) {
                ripple.classList.add("dark");
            }
            ripple.classList.add("ripple-effect");
            rippleContainer.classList.add("ripple-container");
            rippleContainer.appendChild(ripple);
            document.body.appendChild(rippleContainer);

            ripple.style.marginLeft = dx + "px";
            ripple.style.marginTop = dy + "px";

            rippleContainer.style.left = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
            rippleContainer.style.top = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
            rippleContainer.style.width = width + "px";
            rippleContainer.style.height = height + "px";
            rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius;

            setTimeout(function() {

                ripple.style.width = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft = dx - radius + "px";
                ripple.style.marginTop = dy - radius + "px";
            }, 0);

            setTimeout(function() {

                ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
            }, 250);

            setTimeout(function() {

                ripple.remove();
                rippleContainer.remove();
            }, 650);
        }
    });



    let slideUp = (target, duration = 500) => {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.boxSizing = 'border-box';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            //alert("!");
        }, duration);
    }

    let slideDown = (target, duration = 500) => {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.boxSizing = 'border-box';
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
        }, duration);
    }
    var slideToggle = (target, duration = 500) => {
        if (window.getComputedStyle(target).display === 'none') {
            return slideDown(target, duration);
        } else {
            return slideUp(target, duration);
        }
    }

    var wpcf7Elm = document.querySelector('.wpcf7');
    if (wpcf7Elm) {
        wpcf7Elm.addEventListener('wpcf7mailsent', function(event) {
            console.log(event.detail.contactFormId)
            slideUp(document.querySelector('.page-form-inner'), 300)
            slideToggle(document.querySelector('.form-submit'), 300)
            document.querySelector('.form-submit-inner').classList.add('form-submited')
            const el = document.querySelector('.register');
            el.scrollIntoView();
        }, false);
    }


    function cleanForm(form) {
        document.querySelector('.form-submit h4').textContent = "30 ?????????? ??????????????, ???????? ???????????? ????????????????????"
        var wpcf7Elm = document.querySelector(".wpcf7-submit")
        wpcf7Elm.click();
        console.log('submit')
    }

    function startTimer(elem) {
        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                total: t,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
        }
        var timer = elem.closest('.form-timer').getAttribute('timer-counter')
        var minutes = elem.querySelector(".mins");
        var seconds = elem.querySelector(".seconds");

        function initializeClock(id, endtime) {


            function updateClock() {
                var t = getTimeRemaining(endtime);

                if (t.total <= 0) {
                    //                     slideToggle(elem.querySelector('.page-form-inner'), 200)
                    //                     slideToggle(formTimer.querySelector('.test-start').closest('.timer-inner'), 200)
                    elem.classList.remove('timer-started')
                    cleanForm()
                    clearInterval(timeinterval);
                    return true;
                }

                minutes.innerHTML = ("0" + t.minutes).slice(-2);
                seconds.innerHTML = ("0" + t.seconds).slice(-2);
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        var deadline = new Date(Date.parse(new Date()) + timer * 60 * 1000);
        initializeClock("countdown", deadline);
    }

    let formTimer = document.querySelector('.form-timer')
    if (formTimer) {
        formTimer.querySelector('.test-start').addEventListener('click', function(e) {
            slideToggle(formTimer.querySelector('.page-form-inner'), 200)
            slideToggle(this.closest('.timer-inner'), 200)
            formTimer.classList.add('timer-started')
            startTimer(formTimer)
        })
    }




    let books = document.querySelectorAll('.leaning-button')
    books.forEach(function(book) {
        book.addEventListener('click', function(event) {
            if (event.target.closest('.leaning-el').classList.contains('active-el')) {
                slideUp(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
                event.target.closest('.leaning-el').classList.remove('active-el');
            } else {
                if (document.querySelector('.active-el')) {
                    slideToggle(document.querySelector('.active-el .hidden-list'), 300);
                    document.querySelector('.active-el').classList.toggle('active-el');
                }
                slideDown(event.target.closest('.leaning-el').querySelector('.hidden-list'), 300);
                event.target.closest('.leaning-el').classList.add('active-el');

            }

        })
    })


    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }


    var modals = document.querySelectorAll('[data-modal-open]');
    var modalOverlay = document.querySelector('.modal-overley');

    function openModal(modal) {
        modalOverlay.classList.add('overley-active')
        let modalWindow = document.querySelector('[data-modal=' + modal.getAttribute('data-modal-open') + ']')
        modalWindow.classList.add('modal-open');
        if (document.body.offsetHeight > window.innerHeight) {
            document.body.classList.add('bodylock');
            document.body.style.paddingRight = getScrollbarWidth() + 'px';
            document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';
        }
        if (modal.getAttribute('data-modal-open') == 'testimonial') {
            let text = modal.getAttribute('data-descr')
            let photo = modal.closest('.slider-slide').querySelector('.persone-photo img')
            let name = modal.closest('.slider-slide').querySelector('.persone-name')
            let role = modal.closest('.slider-slide').querySelector('.persone-role')
            document.querySelector('.full-testimonial').innerHTML = text;
            modalWindow.querySelector('.persone-photo img').setAttribute('src', photo.getAttribute('src'));
            modalWindow.querySelector('.persone-name').textContent = name.textContent;
            modalWindow.querySelector('.persone-role').textContent = role.textContent;

        }
        if (modal.getAttribute('data-modal-open') == 'video') {
            let videoSrc = modalWindow.querySelector('.m-video').getAttribute('data-video');
            modalWindow.querySelector('.m-video').innerHTML = '<iframe src="' + videoSrc + '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

        }

    }



    function closeModal(modal) {
        modal.classList.add('modal-will-close');
        if (modal.getAttribute('data-modal') == 'video') {
            stopVideo(document.querySelector('.m-video'))
        }

        modal.addEventListener("animationend", function() {
            if (modal.classList.contains('modal-will-close')) {
                modalOverlay.classList.remove('overley-active')
                this.classList.remove('modal-open');
                this.classList.remove('modal-will-close');
                if (document.body.offsetHeight > window.innerHeight) {
                    document.body.classList.remove('bodylock');
                    document.body.style.paddingRight = '0px';
                    document.querySelector('.header').style.paddingRight = '0px'
                }
            }
        });


    }


    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            event.preventDefault();

            openModal(modal);


        });
    });





    var modalCloseButtons = document.querySelectorAll('.close-modal')
    if (modalCloseButtons) {
        modalCloseButtons.forEach(function(modalCloseButton) {
            modalCloseButton.addEventListener('click', function(event) {
                event.preventDefault();
                closeModal(modalCloseButton.closest('.modal'))
            });
        });
    }

    if (document.querySelector('.modal')) {
        document.querySelector('.modal').addEventListener('click', function(event) {
            if (!event.target.matches('.modal-open')) return
            closeModal(this);
        });
    }


});