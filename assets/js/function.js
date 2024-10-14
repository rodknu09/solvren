var App = {
    init: function () {
        this.scrollToSection();
        this.initAciveItemMenu();
        this.changeBgColor();
        this.initBtnEffect();
        this.initSlider();
        this.initSelect2();
        this.initFormValidate();
        this.initMobMenu();
        this.initCookiePopup();
        this.closeCookiePopup();
    },

    scrollToSection: function () {
        $('#nav li a, .scroll-to-contact').on('click', function () {
            var targetSection = $(this).data('id');

            if ($(window).width() < 1024) {
                $('html, body').animate({
                    scrollTop: $('#' + targetSection).offset().top - $('.header').outerHeight()
                }, 1000);
            } else {
                $('html, body').animate({
                    scrollTop: $('#' + targetSection).offset().top
                }, 1000);
            }
        });
    },

    initAciveItemMenu: function () {
        // var addClassOnScroll = function () {
        //     var windowTop = $(window).scrollTop();
        //     $('section[id]').each(function (index, elem) {
        //         var offsetTop = $(elem).offset().top,
        //             outerHeight = $(this).outerHeight(true);

        //         if (windowTop > (offsetTop - 50) && windowTop < (offsetTop + outerHeight)) {
        //             var elemId = $(elem).attr('id');
        //             $('.main-nav li.active').removeClass('active');
        //             $('.main-nav li a[data-id="' + elemId + '"]').parent().addClass('active');
        //         }
        //     });
        // };

        // $(function () {
        //     $(window).on('scroll', function () {
        //         addClassOnScroll();
        //     });
        // });
        $(window).on('scroll', function () {
            var currentTop = $(window).scrollTop();
            var elems = $('.section');
            var scrolledToBottomFlag;
        
            scrolledToBottomFlag = false;
        
            if (currentTop + $(window).height() >= $('.content').height()) {
                scrolledToBottomFlag = true;
            }
        
            elems.each(function (index) {
                var elemTop = $(this).offset().top - $('.header').outerHeight()
                var elemBottom = elemTop + $(this).height();
                if (currentTop >= elemTop && currentTop <= elemBottom) {
                    var id;
                    var $navElem;
        
                    id = $(this).attr('id');
                    $navElem = $('.main-nav li a[data-id$="' + id + '"]');
                    $('.main-nav li a').parent().removeClass('active');
                    $navElem.parent().addClass('active');
                    
                    $('.lines li[data-id$="' + id + '"');
                    $('.lines li').removeClass('active');
                    $('.lines li[data-id$="' + id + '"').addClass('active');
                    
                }
                if (scrolledToBottomFlag) {
                    $('.main-nav li a[data-id$="#contacts"]').parent().addClass('active');
                }
            });
        });
    },

    changeBgColor: function () {
        var sections = document.getElementsByTagName('section');

        $(window).on('scroll', function () {
            var scrollPosition = window.scrollY,
                activeSectionIndex = Math.round(scrollPosition / window.innerHeight),
                $body = $('body'),
                $contentBg = $('.content.content-bg');

            if ($contentBg.length) {
                $body.removeClass();
                $body.addClass($(sections[activeSectionIndex]).data('bg'));
            } else {
                $body.removeClass();
                $body.addClass($(sections[activeSectionIndex]).data('bg'));
            }
        });
    },

    initBtnEffect: function () {
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        var btn = document.querySelectorAll('.btn-effect');
        var btnBg = document.querySelectorAll('.btn-bg');
        var filter = document.querySelectorAll('#filter-goo-2 feGaussianBlur')[0];
        var particleCount = 12;
        var colors = ['#FFEFDA', '#FEC6D4', '#DCD8FD', '#EEEEEE']

        btn.forEach(function (elem) {
            elem.addEventListener('mouseenter', function () {
                var particles = [];
                var tl = new TimelineLite({
                    onUpdate: function () {
                        filter.setAttribute('x', 0);
                    }
                });

                tl.to(this.children, 0.6, { scaleX: 1.05 });
                tl.to(this.children, 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 0.6);

                for (var i = 0; i < particleCount; i++) {
                    particles.push(document.createElement('span'));
                    this.appendChild(particles[i]);
                    particles[i].classList.add(i % 2 ? 'left' : 'right');

                    var dir = i % 2 ? '-' : '+';
                    var r = i % 2 ? getRandom(-1, 1) * i / 2 : getRandom(-1, 1) * i;
                    var size = i < 2 ? 1 : getRandom(0.4, 0.8);
                    var tl = new TimelineLite({
                        onComplete: function (i) {
                            particles[i].parentNode.removeChild(particles[i]);
                            this.kill();
                        }, onCompleteParams: [i]
                    });

                    tl.set(particles[i], { scale: size });
                    tl.to(particles[i], 0.6, { x: dir + 20, scaleX: 3, ease: SlowMo.ease.config(0.1, 0.7, false) });
                    tl.to(particles[i], 0.1, { scale: size, x: dir + '=25' }, '-=0.1');
                    if (i >= 2) tl.set(particles[i], { backgroundColor: colors[Math.round(getRandom(0, 3))] });
                    tl.to(particles[i], 0.6, { x: dir + getRandom(60, 100), y: r * 10, scale: 0.1, ease: Power3.easeOut });
                    tl.to(particles[i], 0.2, { opacity: 0, ease: Power3.easeOut }, '-=0.2');
                }
            });
        });
    },

    initSlider: function () {
        $(".owl-carousel").owlCarousel({
            items: 1, // Show one image at a time
            loop: true, // Enable looping
            margin: 10, // Add space between items
            nav: true, // Enable navigation
            dots: true, // Enable dots for navigation
            autoplay: true, // Enable autoplay
            autoplayTimeout: 3000, // Set autoplay speed
            autoplayHoverPause: true, // Pause autoplay on hover
           responsive: {
                0: {
                    items: 2 // 1 item on small screens
                },
                600: {
                    items: 3 // 2 items on medium screens
                },
                1000: {
                    items: 4 // 3 items on large screens
                }
            }
        });
    
        // Custom previous and next button behavior
     

        if ($('.slider-offers').length) {
            var $slider = $('.slider-offers').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
                speed: 600,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        }
                    }
                ]
            });

            $slider.on('afterChange', function (currentSlide) {
                $('.item-slide').find('.text, .subtitle').removeClass('fade-in-left');
                $('.slick-active').find('.text, .subtitle').addClass('fade-in-left');
            });

            if ($(window).width() < 768) {
                $slider.slick('unslick');
                $('.item-slide').find('.text, .subtitle').addClass('fade-in-left');
            }
        }
    },

    initSelect2: function () {
        if ($.fn.select2) {
            $('select').select2({
                minimumResultsForSearch: -1,
            });
        }
    },

    initFormValidate: function () {
        if ($.fn.validate) {
            $('#formRequest').validate({
                rules: {
                    requestType: {
                        required: true,
                    },
                    name: {
                        required: true,
                    },
                    lastName: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    country: {
                        required: true,
                    },
                    state: {
                        required: true,
                    },
                    address: {
                        required: true,
                    },
                    platform: {
                        required: true,
                    },
                    device: {
                        required: true,
                    },
                    ip: {
                        required: true,
                        digits: true
                    },
                },
                errorPlacement: function(error, element) {
                    if(element.attr('name') == 'requestType' || element.attr('name') == 'country') {
                        error.insertAfter(element.closest('.form-field').find('.select2'));
                    } else {
                        error.insertAfter(element);
                    }
                },
                submitHandler: function (form) {
                    console.log('wrhwrhwrh');
                },
            });
        }
    },

    initMobMenu: function () {
        $('.btn-menu').on('click', function () {
            $(this).prev().toggleClass('active fade-in-top');
            $(this).toggleClass('active');
        });

        $(window).on('scroll', function () {
            $('.main-nav').removeClass('active fade-in-top');
            $('.btn-menu').removeClass('active');
        });
    },
    
    initCookiePopup: function() {
        setTimeout(function() {
            $('.popup-cookie').fadeIn(); 
        }, 3000);
    },
    
    closeCookiePopup: function() {
        $('.popup-close').on('click', function() {
            $(this).closest('.popup').fadeOut(); 
        });
    },
}

$(document).ready(function () {
    App.init();
}); 