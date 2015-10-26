(function ($) {
    "use strict";

    $(document).ready(function () {
        'use strict';

        // E-mail validation via regular expression
        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        // Subscription form notifications and AJAX function
        $(function () {
            $("#subscribe").on('submit', function (event) {
                var input = $('.lj-subscribe-message');
                if (!input.is(':empty')) {
                    $('.lj-subscribe-message').stop(true);
                }
                event.preventDefault();
                event.stopImmediatePropagation();

                var email = $("input#subscribe-email").val();

                if (email == "") {

                    $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> You must enter a valid e-mail address.');
                    $("input#subscribe-email").focus();
                }
                else if (!isValidEmailAddress(email)) {
                    $(".lj-subscribe-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
                    $("input#subscribe-email").focus();
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "./php/send-subscription.php",
                        data: {subscription: email},
                        success: function () {
                            $(".lj-subscribe-message").html('<i class="fa fa-check"></i> We will be in touch soon!');
                            $('input#subscribe-email').val('');
                        }
                    });
                }
            });
        });

        // Join now form functions
        $(function () {
            $("#join-now").on('submit', function (event) {
                var input = $('.lj-join-now-message');
                if (!input.is(':empty')) {
                    $('.lj-join-now-message').stop(true);
                }
                event.preventDefault();
                event.stopImmediatePropagation();

                var name = $("input#join-now-name").val();
                var email = $("input#join-now-email").val();

                if (name == "" || email == "") {

                    $(".lj-join-now-message").stop(true).html('<i class="fa fa-warning"></i> All fields are required.');
                    $('#join-now input[type=text]').each(function () {
                        if (this.value === '') {
                            this.focus();
                            return false;
                        }
                    });
                }
                else if (!isValidEmailAddress(email)) {
                    $(".lj-join-now-message").stop(true).html('<i class="fa fa-warning"></i> E-mail address is not valid.');
                    $("input#join-now-email").focus();
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: "./php/send-join-now.php",
                        data: {
                            join_now_email: email,
                            join_now_name: name
                        },
                        success: function () {
                            $(".lj-join-now-message").html('<i class="fa fa-check"></i> Thank you for joining in!');
                            $('input#join-now-name').val('');
                            $('input#join-now-email').val('');
                        }
                    });
                }
            });
        });

        // Slick initializer function
        $(".lj-carousel").slick({
            autoplay: true,
            autoplaySpeed: 5000,
            dots: true,
            arrows: false
        });

        // Scroll to next module after Header section
        $(".lj-scroll-down a").on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                    scrollTop: $("header").nextAll('.module').offset().top
                },
                1250);
        });

        // Scroll to subscribe module
        $(".lj-text-button a").on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                    scrollTop: $(".subscribe").offset().top
                },
                1250);
            setTimeout(function () {
                $('input#subscribe-email').focus();
            }, 1250);
        });

        // Featherlight
        $('.lj-product-image a').featherlight({
            targetAttr: 'href',
            closeOnClick: 'anywhere'
        });

        // Countdown
        // To change date, simply edit: var endDate = "January 1, 2016 00:00:00";
        $(function () {

            var $el = $('.lj-countdown .row');

            var a = {
                render: function () {
                    var date = this.getTimeFragments();
                    $el.html(
                        '<div>' +
                            '<div>' +
                                '<span>' + date.hours + '</span>' +
                                '<span>hours</span>' +
                            '</div>' +
                        '</div>' +
                        '<div class="lj-countdown-ms">' +
                            '<div>' +
                                '<span>' + date.minutes + '</span>' +
                                '<span>minutes</span>' +
                            '</div>' +
                            '<div>' +
                                '<span>' + date.seconds + '</span>' +
                                '<span>seconds</span>' +
                            '</div>' +
                        '</div>');
                },
                getTimeFragments: function () {
                    var date = new Date();

                    return {
                        hours: this.leadingZeros(date.getHours()),
                        minutes: this.leadingZeros(date.getMinutes()),
                        seconds: this.leadingZeros(date.getSeconds())
                    }
                },
                leadingZeros: function (num, length) {
                    length = length || 2;
                    num = String(num);
                    if (num.length > length) {
                        return num;
                    }
                    return (Array(length + 1).join('0') + num).substr(-length);
                }
            };

            a.render();
            setInterval(a.render.bind(a), 1000);

            //var endDate = "November 1, 2015 00:00:00";
            //$('.lj-countdown .row').countdown({
            //  date: endDate,
            //  render: function(data) {
            //    $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2)*365) + parseInt(this.leadingZeros(data.days, 2))) + '</span><span>days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>seconds</span></div></div>');
            //  }
            //});
        });

        // backstretch
        $("header").backstretch("img/mainview.jpg");

        // Simple Text Rotator
        $("#words").wordsrotator({
            autoLoop: true,             //auto rotate words
            randomize: false,               //show random entries from the words array
            stopOnHover: false,             //stop animation on hover
            changeOnClick: false,           //force animation run on click
            animationIn: "fadeInDown",         //css class for entrace animation
            animationOut: "fadeOutUp",           //css class for exit animation
            speed: 4000,                //delay in milliseconds between two words
            words: ['<strong>Everything you need</strong> to setup a website.', '<strong>Quick and easy</strong> code customization.', '<strong>More than</strong> just a coming soon template.']  //Array of words, it may contain HTML values
        });

        //*/

        // JQUERY.MB.YTPLAYER
        /*
         $(function(){
         $(".yt-player").mb_YTPlayer();
         });

         // yt controls
         $('#yt-play').on('click',function(event){
         event.preventDefault();
         if ($(this).hasClass("fa-play") ) {
         $('.yt-player').playYTP();
         } else {
         $('.yt-player').pauseYTP();
         }
         $(this).toggleClass("fa-play fa-pause");
         return false;
         });
         $('#yt-volume').on('click',function(event){
         event.preventDefault();
         $('.yt-player').toggleVolume();
         $(this).toggleClass("fa-volume-off fa-volume-up");
         return false;
         });
         */

        // WOW initalization
        new WOW().init();

        // block scroll mouse button
        $(function () {
            $('body').mousedown(function (e) {
                if (e.button == 1)return false
            });
        });

    });

    // Preloader
    // Change delay and fadeOut speed (in miliseconds)
    $(window).load(function () {
        $(".lj-preloader").delay(100).fadeOut(500);
    });

})(jQuery);
