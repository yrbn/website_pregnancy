$(function() {

  /* Проверка на расстояние от верха страницы и появление кнопки "Скролл вверх страницы" при прокрутке */

  backToTop();
  fixCloseTableButton();

  $(window).on('scroll', function (e) {
    fixCloseTableButton();
    backToTop();
  });


  /* Скролл вверх страницы при клике на кнопку */

  $('.js-scroll-up').on('click', function (e) {
      $('html,body').animate({
          scrollTop: 0
      }, 700);
  });


  /* Кнопка "скрыть подробности пакета" */

  $('.js-close-table').on('click', function() {
    var offset = $(this).offset();

    if(offset) {
      $(this).parent().slideUp()
      $('html,body').animate({
          scrollTop: $(this).parents('.content-pricing').offset().top
      }, 400); 
    }
  })


  /* Увеличение размера блока пакета при ховере и уменьшение размера центрального пакета */

  $('.content-pricing_package').on('mouseenter', function (e) {
    if(!$(this).hasClass('content-pricing_package--active')) {
      $('.content-pricing_package--active').css({'transform': 'scale(1)', 'box-shadow': 'none'});
    }
  }).on('mouseleave', function (e) {
    $('.content-pricing_package--active').css({'transform': 'scale(1.2)', 'box-shadow': '0 0 0 19px #b4cde0'});
  });


  /* Кнопка для открытия подробностей о пакете */

  $('.content-pricing_package').on('click', function(e) {
    var that = this;

    $.each($('.content-pricing_tables'), function(index, value) {
      if($(value).attr('data-id') === $(that).attr('data-id')) {
        if($(value).is(':visible')) {
          $(value).slideUp();
        } else {
          $(value).slideDown();
          if($(window).width() < 721) {
            if($(that)[0] === $('.content-pricing_package')[2]) {
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top + 450
              }, 100);
            } else if($(that)[0] === $('.content-pricing_package')[0]) {
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top - 250
              }, 100);
            } else if($(that)[0] === $('.content-pricing_package')[1]) {
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top + 250
              }, 100);
            }
          }
        }
      } else {
        if($(value).is(':visible')) {
          $(value).slideUp();
          if($(window).width() < 721) {
            if($(that)[0] === $('.content-pricing_package')[2]) {
              console.log('asd')
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top + 250
              }, 100);
            } else if($(that)[0] === $('.content-pricing_package')[0]) {
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top - 250
              }, 100);
            } else {
              $('html,body').animate({
                scrollTop: $(that).siblings(that).offset().top
              }, 100);
            }
          }
        } 
      }
    })
  })


  /* Кнопка для открытия подробностей о враче */

  $('.content-specialists_arrow').on('click', function(e) {
    var that = this;

    $.each($('.content-specialists_responsibilities'), function(index, value) {
      if($(value).attr('data-id') === $(that).attr('data-id')) {
        if($(value).is(':visible')) {
          $(value).slideUp();
          rotate($('.content-specialists_arrow'), 0)
        } else {
          rotate($('.content-specialists_arrow'), 0)
          rotate(that, 180)
          $(value).slideDown();
        }
      } else {
        if($(value).is(':visible')) {
          $(value).slideUp();
        } 
      }
    })
  });


  /* Появление кнопки для скролла вверх страницы */

  function backToTop() {
    var scrollTop = $(window).scrollTop(),
        scrollTrigger = 300; // px;

    if (scrollTop > scrollTrigger) {
        $('.js-scroll-up').fadeIn();
    } else {
        $('.js-scroll-up').fadeOut();
    }
  };


  /* Фиксирование кнопки сворачивания таблицы при скролле */

  function fixCloseTableButton() {
    var $mainBlock = $('.content-pricing_tables'),
        windowHeight = $(window).height(),
        windowWidth = $(window).width(),
        buttonBottomPos = 350,
        $button, buttonHeight, height;

    if(windowWidth < 720) {
      buttonBottomPos = 420;
    } else if(windowWidth < 1007) {
      buttonBottomPos = 450;
    } 

    $(window).scroll(function () {
      $.each($mainBlock, function(index, value) {
        if($(value).is(':visible')) {
          $mainBlock = $(value);
          $button    = $mainBlock.find('.js-close-table');
          buttonHeight = $button.outerHeight();
          height  = $mainBlock.outerHeight();
        }
      })

      var pos = $(window).scrollTop(),
          top = $mainBlock.offset().top;

      if (top + height - buttonBottomPos - buttonHeight < pos || top > pos + windowHeight) {
        return;
      }

      var offset = parseInt($(window).scrollTop() - top);

      if (offset > 0) {
        $button.css('transform', 'translateY('+ offset +'px)');
      }
    });
  }


  /* Поворот элемента на заданный градус */

  function rotate(element, deg) {
    $(element).css({ '-webkit-transform' : 'rotate(' + deg + 'deg)',
                      '-moz-transform'    : 'rotate(' + deg + 'deg)',
                      '-ms-transform'     : 'rotate(' + deg + 'deg)',
                      '-o-transform'      : 'rotate(' + deg + 'deg)',
                      'transform'         : 'rotate(' + deg + 'deg)'
                    })
  }
});

