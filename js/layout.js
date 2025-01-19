"use strict";

let preloader;

let Layout = function () {

    let self = this;

    this.init = function() {
        window.onload = function() {
            self.bodyLoaded();
        };
        self.ieStubFunc();
        self.lazyFunc();
        document.querySelector("body").classList.add("ready");
        self.exists();
        // self.mobileDetect();
        self.safariClass();
        self.sideMenu();
        self.animHeader();
        self.popups();
        self.auth();
        self.cookiePopup();

        preloader = new self.Preloader(); // preloader.start(selector) || preloader.stop(selector) to start or stop preloader;

    };

    this.lazyMethod  = function(){
        self.lazyFunc();
    };

    this.cookiePopup = function () {
       let closePopupBtns = document.querySelectorAll(".cookie-popup__close img, .cookie-popup .block .btns a.agree");
       for(let i = 0; i < closePopupBtns.length; i++) {
           closePopupBtns[i].addEventListener("click", function(e){
               e.preventDefault();
               document.querySelector(".cookie-popup").classList.remove("open");
           })
       }
    }

    this.bodyLoaded = function() {
        document.querySelector("body").classList.add("loaded-page");
    };

    this.ieStubFunc = function(){
        let isIE = /*@cc_on!@*/false || !!document.documentMode;
        let isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
        if (isIE11 || isIE)
        {
            document.body.classList.add("ie");
            let ieStub = "<div class=\"ie-detect\" style=\"display\: none;\"><b>Ð’Ð°Ñˆ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€ ÑƒÑÑ‚Ð°Ñ€ÐµÐ»</b><p>Ð’Ñ‹ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚Ðµ ÑƒÑÑ‚Ð°Ñ€ÐµÐ²ÑˆÐ¸Ð¹ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€, ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹ Ð½Ðµ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÐµÑ‚ ÑÐ¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ðµ Ð²ÐµÐ±-ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ñ‹ Ð¸ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð»ÑÐµÑ‚ ÑƒÐ³Ñ€Ð¾Ð·Ñƒ Ð²Ð°ÑˆÐµÐ¹ Ð±ÐµÐ·Ð¾Ð¿Ð°ÑÐ½Ð¾ÑÑ‚Ð¸.</p><p>ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚Ðµ Ð¸Ð»Ð¸ ÑÐºÐ°Ñ‡Ð°Ð¹Ñ‚Ðµ ÑÐ¾Ð²Ñ€ÐµÐ¼ÐµÐ½Ð½ÑƒÑŽ Ð²ÐµÑ€ÑÐ¸ÑŽ Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð°.</p><p>Internet Explorer Ð½Ðµ Ð¿Ð¾Ð´Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°ÐµÑ‚ÑÑ.</p></div>";
            document.querySelector("body").classList.add("ie");
            document.querySelector(".main-grid-wrapper").innerHTML = ieStub;
        };
    };

    this.safariClass = function() {
        let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (is_safari) {
            document.querySelector("body").classList.add("safari");
        }
    };

    this.mobileDetect = function(){
        var useragent = navigator.userAgent.toLowerCase();
        console.log(useragent)
        if( useragent.search("iphone") ) console.log("iphone") ; // iphone
        else if( useragent.search("ipod") ) console.log("ipod"); // ipod
        else if( useragent.search("android") ) console.log("android"); // android

    };

    this.Preloader = function () {

        let selff = this;

        selff.start = function(selector){
            let prel = document.createElement("div");
            prel.classList.add("preloader-overlay");
            let prelHml = "<svg class='spinner' width='174px' height='174px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg'><circle class='path' fill='transparent' stroke-width='2' cx='33' cy='33' r='30' stroke='url(#gradient)'/><linearGradient id='gradient'><stop offset='50%' stop-color='#CD0000' stop-opacity='1'/><stop offset='65%' stop-color='#CD0000' stop-opacity='.5'/><stop offset='100%' stop-color='#CD0000' stop-opacity='0'/></linearGradient></circle><svg class='spinner-dot dot' width='5px' height='5px' viewBox='0 0 66 66' xmlns='http://www.w3.org/2000/svg' x='37' y='1.5'><circle class='path' fill='#E42313' cx='33' cy='33' r='30'/></circle></svg></svg>";
            prel.innerHTML = prelHml;
            document.querySelector(selector).appendChild(prel);
            prel.parentNode.style.opacity = "0.8";
        },

            selff.stop = function(selector){
                if(document.querySelector(".preloader-overlay")) {
                    document.querySelector(".preloader-overlay").parentNode.style.opacity = "";
                    document.querySelector(selector).querySelector(".preloader-overlay").remove();
                }
            };
    };

    this.exists = function (selector) {
        return (document.querySelectorAll(selector).length > 0);
    };

    this.lazyFunc = function(){
        var lazyloadImages;

        if ("IntersectionObserver" in window) {
            lazyloadImages = document.querySelectorAll(".lazyClass");
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove("lazyClass");
                        image.classList.add("visible");
                        imageObserver.unobserve(image);
                        if(entry.target.classList.contains("countStart")){
                            let str = $(".ilo").text();
                            str = str.replace(/[\s.,%]/g, '');
                            str = parseInt(str);
                            $('.count').each(function () {
                                $(this).prop('Counter',0).animate({
                                    // Counter: parseInt($(".ilo").text().replace(/\s+/g, ''))
                                    Counter: str
                                }, {
                                    duration: 4000,
                                    easing: 'swing',
                                    step: function (now) {
                                        $(this).text(Math.ceil(now).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
                                    }
                                });
                            });
                        }
                    }
                });
            });

            lazyloadImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            var lazyloadThrottleTimeout;
            lazyloadImages = document.querySelectorAll(".lazyClass");

            function lazyload () {
                if(lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }

                lazyloadThrottleTimeout = setTimeout(function() {
                    var scrollTop = window.pageYOffset;
                    lazyloadImages.forEach(function(img) {
                        if(img.offsetTop < (window.innerHeight + scrollTop)) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazyClass');
                            img.classList.add("visible");
                        }
                    });
                    if(lazyloadImages.length == 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        }
    };

    this.sideMenu = function(){
        let linkMenu = document.querySelectorAll(".main-menu > ul li");
        let linkMenuParent = document.querySelectorAll(".main-menu > ul li");
        let linkMenuParentLink = document.querySelectorAll(".main-menu > ul > li > a");
        let headerWg = document.querySelector(".header-wg");
        let searchPopup = document.querySelector(".search-popup");
        let authPopup = document.querySelector(".auth-popup");
        let searchPopupClose = document.querySelector(".search-popup__close");
        let authPopupClose = document.querySelector(".auth-popup__close");
        let headerPopup = document.querySelector(".header-popup");
        let headerPopupClose = document.querySelector(".header-popup__close");
        let gamburgerBtn = document.querySelector(".hamburger");
        let searchMobBtn = document.querySelector(".to-search-mob");
        let authMobBtn = document.querySelector(".auth-mob");
        let bodyEl = document.querySelector("body");
        let menuLink = headerWg.querySelectorAll("nav a");

        let searchInput = document.querySelectorAll(".header-wg .header-top .search-panel__form input")[0];
        let searchPanel = document.querySelectorAll(".header-wg .search-panel")[0];
        let searchPanelMob = document.querySelectorAll(".search-popup .search-panel")[0];
        let searchPanelClose = document.querySelectorAll(".header-wg .search-panel__close")[0];
        let searchPanelCloseMob = document.querySelectorAll(".search-popup .search-panel__close")[0];

        let searchInputMob = document.querySelectorAll(".search-popup .search-panel__form input")[0];

        let langFooter = document.querySelectorAll(".footer-top .language-panel .language-current")[0];
        let langHeader = document.querySelectorAll(".auth-popup .language-panel .language-current")[0];
        let infoFooter = document.querySelectorAll(".info-for-mob")[0];


        if(searchInput) {
            searchInput.onfocus = function() {
                searchPanel.classList.add("active");
            };
            searchInput.onblur = function() {
                setTimeout(function () {
                    searchPanel.classList.remove("active");
                },250);
            };
        }
        if(searchInputMob) {
            searchInputMob.onfocus = function() {
                searchPanelMob.classList.add("active");
            };
            searchInputMob.onblur = function() {
                setTimeout(function () {
                    searchPanelMob.classList.remove("active");
                },250);
            };
        }

        function menuActItems() {
            for (let i = 0; i < linkMenu.length; i++) {


                if(linkMenu[i].classList.contains("active")) {
                    linkMenu[i].parentNode.classList.add("act") || linkMenu[i].parentNode.parentNode.parentNode.classList.add("act");
                } else {
                    linkMenu[i].parentNode.classList.remove("act");
                }
            }
        }
        menuActItems();
        window.addEventListener("resize", menuActItems, false);


        for(let i = 0; i < linkMenuParent.length; i++) {
            if (linkMenuParent[i].querySelectorAll('ul').length > 0) {
                linkMenuParent[i].classList.add("parentLi");
            }
        }

        for (let i = 0; i < linkMenuParent.length; i++) {
            linkMenuParent[i].addEventListener("click", function (e) {
                let children = this.children;
                let ctx = this;
                for(var i = 0; i < children.length; i++){
                    if (children[i].tagName === "UL") {
                        ctx.classList.toggle("hover");
                    }
                };
            });
        }



        function hideSideMenu() {
            headerWg.classList.remove("open");
            bodyEl.removeAttribute('data-hidden');
        };

        function showSideMenu() {
            headerWg.classList.add("open");
            bodyEl.setAttribute('data-hidden', 'hidden');
        };

        if(gamburgerBtn) {
            gamburgerBtn.addEventListener("click", function(e){
                e.preventDefault();
                headerWg.classList.toggle("open");
                headerWg.classList.contains("open") ? bodyEl.setAttribute('data-hidden', 'hidden') : bodyEl.removeAttribute('data-hidden');

                headerPopup.removeAttribute('data-hidden');
                headerPopup.scrollTop = 0;
            });
        }

        if(authMobBtn) {
            authMobBtn.addEventListener("click", function(e){
                e.preventDefault();
                authPopup.classList.add("open");
                authPopup.classList.contains("open") ? bodyEl.setAttribute('data-hidden', 'hidden') : bodyEl.removeAttribute('data-hidden');
                headerPopup.scrollTop = 0;
            });
        }

        if(headerPopupClose) {
            headerPopupClose.addEventListener("click", function(e){
                e.preventDefault();
                headerWg.classList.remove("open");
                bodyEl.removeAttribute('data-hidden');
                headerPopup.removeAttribute('data-hidden');
                headerPopup.scrollTop = 0;
            });
        }
        if(searchPopupClose) {
            searchPopupClose.addEventListener("click", function(e){
                e.preventDefault();
                searchPopup.classList.remove("open");
                bodyEl.removeAttribute('data-hidden');
                headerPopup.scrollTop = 0;
            });
        }
        if(authPopupClose) {
            authPopupClose.addEventListener("click", function(e){
                e.preventDefault();
                authPopup.classList.remove("open");
                bodyEl.removeAttribute('data-hidden');
                headerPopup.scrollTop = 0;
            });
        }

        if(langFooter) {
            langFooter.addEventListener("click", function (e) {
                e.preventDefault();
                this.classList.toggle("active");
            });
        }
        if(langHeader) {
            langHeader.addEventListener("click", function (e) {
                e.preventDefault();
                this.classList.toggle("active");
            });
        }
        if(infoFooter) {
            infoFooter.addEventListener("click", function (e) {
                e.preventDefault();
                this.classList.toggle("active");
                document.querySelector(".footer-wg .footer-top nav").classList.toggle("active");
            });
        }

        var flag = false;
        function headerPopups() {

            if(window.innerWidth > 1280) {
                flag = false;
                bodyEl.removeAttribute('data-hidden');
                headerWg.classList.remove("open");
                headerWg.classList.remove("search-open");
            }

        };
        headerPopups();
        window.addEventListener("resize", headerPopups, false);

    };

    this.auth = function () {
        if(document.querySelector(".header-wg .auth-panel")){
            let authLink = document.querySelector(".header-wg .auth-panel svg");
            let authPanel = document.querySelector(".header-wg .auth-panel");
            authLink.addEventListener("click", function(e){
                e.preventDefault();
                authPanel.classList.toggle("hover");
            });

            document.querySelector('.header-wg').addEventListener("click", function(event){
                var e = document.querySelector('.auth-panel');
                if (!e.contains(event.target)) {
                    authPanel.classList.remove("hover");
                }
            });
        }
    }

    this.popups = function(selector, links) {
        var self = this;
        var popup = document.querySelectorAll(selector)[0];
        var currentPopup = null;
        let bodyEl = document.querySelector("body");

        this.init = function () {
            self.openPopup();
            self.closePopup(selector);
        };

        this.openPopup = function () {
            var toPopupLinks = document.querySelectorAll(links);

            for (var i = 0; i < toPopupLinks.length; i++) {
                toPopupLinks[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    var popupClass = this.getAttribute('data-popup');

                    if (popupClass) {
                        currentPopup = document.querySelector('.' + popupClass);
                        currentPopup.classList.add("active");
                        bodyEl.setAttribute('data-hidden','hidden');
                    }
                });
            }
        };

        this.showPopup = function (selector) {
            if(!selector){
                return
            }
            document.querySelector(selector).classList.add("active");
            bodyEl.setAttribute('data-hidden','hidden');
        };

        this.closePopup = function (selector) {
            var closeSpansBtns = document.querySelectorAll(`${selector} .popup__close`);

            for (var i = 0; i < closeSpansBtns.length; i++) {
                closeSpansBtns[i].addEventListener("click", function (e) {
                    e.preventDefault();
                    document.querySelector(selector).classList.remove("active");
                    bodyEl.removeAttribute('data-hidden');
                });
            }

            document.querySelector(selector).addEventListener('click', function (event) {
                var e = document.querySelector(selector + ' .popup__block');
                // console.log(e);
                if (!e.contains(event.target)) {
                    document.querySelector(selector).classList.remove("active");
                    document.querySelector(".content-wg").classList.remove("overlay");
                    bodyEl.removeAttribute('data-hidden');
                }
            });
        };
    }

    this.animHeader = function () {
        let scrollpos = window.scrollY;
        let header = document.querySelector(".header-wg");
        let contentWg = document.querySelector(".content-wg");
        let flagHeader = "anim";

        function add_class_on_scroll() {
            header.classList.add("anima");
            contentWg.classList.add("anima");
        }

        function remove_class_on_scroll() {
            header.classList.remove("anima");
            contentWg.classList.remove("anima");
        }

        function calc_on_scroll() {
            scrollpos = window.scrollY;

            if ((scrollpos > 75) && (flagHeader === "anim")) {
                add_class_on_scroll();
                flagHeader = "end";

            }
            if ((scrollpos <= 75) && (flagHeader === "end")) {
                remove_class_on_scroll();
                flagHeader = "anim";
            }
        }

        calc_on_scroll();

        // window.addEventListener('scroll', function () {
        //     calc_on_scroll();
        // });


    };

};

let layout = new Layout();

document.addEventListener("DOMContentLoaded", function(){

    layout.init();

});

$(function () {

    const cursorSmall = document.querySelector('.circle');
    let scaleQ = 1;

    $(document).on({
        mouseover: function () {
            $(".circle").addClass("active");
        },
        mouseleave: function () {
            $(".circle").removeClass("active");
            scaleQ = 1;
        }
    }, '.slide2 .block .item, .arr-next, .txt img, .slide3 .slider .item, .nav-slides span, .arr, a, .step-nav > div, .apply, .payment-item > label, .submit-form_btn, .step--rates .rate > label, .algo-password-page form .eye, .submit-formAx_btn, .algo-dashboard__bots .view-type div, [data-th = "sort"]');

    const positionElement = (e)=> {
        const mouseY = e.clientY;
        const mouseX = e.clientX;


        window.requestAnimationFrame(() => {
            cursorSmall.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0) scale(${scaleQ})`;
        });

    }
    window.addEventListener('mousemove', positionElement);



    var $preloader = $('.loader-area');
    setTimeout(function(){
        $preloader.fadeOut('slow');
    }, 7000);
    if ($(document).width() <= '1180') {
        setTimeout(function(){
            $preloader.fadeOut('slow');
        }, 3500);
    }
    $(window).on('load', function () {
        $preloader.delay(550).fadeOut('slow');
    });
});