let sliderInit = function(){
    if(document.querySelector(".slider .item")) {
        let sliderBanner = $(".slider");
        var sliderFlag = "notExist";

        if(sliderBanner) {

            function sliderInit(){
                sliderFlag = "exist";
                let sliderItems = $(".slider .item").length;
                let loopV = (sliderItems > 1) ? true : false;
                sliderBanner.owlCarousel({
                    lazyLoad: true,
                    slideSpeed: 450,
                    navRewind: false,
                    autoplay:false,
                    autoplayTimeout:5000,
                    margin:0,
                    items:3,
                    smartSpeed:150,
                    // slideTransition:'ease',
                    // center: true,
                    loop:loopV, // loopV if loop must be true
                    nav: true,
                    dots:false,
                    mouseDrag: true,
                    navText: false,
                    // animateIn: 'fadeIn',
                    // animateOut: 'fadeOut',
                    responsive: {
                        0: {
                            items:1,
                            mouseDrag: false,
                            slideSpeed: 0,
                            touchDrag: true,
                        },
                        768: {
                            items:2,
                        },
                        1280: {
                            items:3,
                        }
                    }
                });
                sliderBanner.on('translated.owl.carousel', function(event) {
                    addBlur();
                });

            }
            sliderInit();

            function sliderNav(){
                $(".arr-next").click(function(e) {
                    e.preventDefault();
                    sliderBanner.trigger("next.owl.carousel");
                });
            }
            sliderNav();

            function addBlur() {
                let notBlurItem = $(".slider .owl-item.active").eq(0);
                let hiddenItem = notBlurItem.prev(".owl-item");
                $(".slider .owl-item").addClass("blur").removeClass("hidden");
                hiddenItem ? hiddenItem.addClass("hidden") : "";
                notBlurItem.removeClass("blur");
            }
            addBlur();

        };
    }

};



document.addEventListener("DOMContentLoaded", function(){

    $(function(){

        $('#fullpage').fullpage({
            sectionSelector: '.page',
            // scrollOverflow: document.documentElement.clientWidth >= 768,
            // autoScrolling:document.documentElement.clientWidth >= 768,
            // scrollOverflow: false,
            autoScrolling:false,
            fitToSection: false,
            afterRender: function() {
                sliderInit();
                setTimeout(function () {
                    $(".fluid").addClass("active");
                },1000);

            },
            afterLoad: function (anchorLink, index) {

            },
            onLeave: function (index, nextIndex, direction) {
                if (index === 1 && direction === "down") {

                }
            }
        });


        if(document.documentElement.clientWidth < 768) {
            // $.fn.fullpage.destroy('all');
        }
        $(document).on('click', '.arr', function(){
            $.fn.fullpage.moveSectionDown();
        });
        $(document).on('click', '.nav-slides span:nth-child(1), .slide1 .top .logo', function(e){
            e.preventDefault();
            $.fn.fullpage.moveTo(1);
        });
        $(document).on('click', '.nav-slides span:nth-child(2)', function(){
            $.fn.fullpage.moveTo(2);
        });
    });

});