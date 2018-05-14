$(document).ready(function() {
  // Добавляем класс если в фокусе
  $(".form-control").focusout(function() {
    $(".form-group").removeClass("focused");
  });
  $(".form-control").focus(function() {
    $(this)
      .closest(".form-group")
      .addClass("focused");
  });

  // Добавляем класс если больше одного символа в поле
  $(".form-control").keyup(function() {
    if ($(this).val().length > 0) {
      $(this)
        .closest(".form-group")
        .addClass("filled");
    } else {
      $(this)
        .closest(".form-group")
        .removeClass("filled");
    }
  });

  $(".menu_toggler").click(function(e) {
    var $menu = $("#menu_mobile");
    var $body = $("body");

    if (!$menu.hasClass("open")) {
      $menu.addClass("open");
      $body.addClass("isOpen");
      $(".menu_toggler").addClass("open");
    } else {
      $menu.removeClass('open');
      $body.removeClass("isOpen");
      $(".menu_toggler").removeClass("open");
    }
  });

  $('.overlay').click(function(event) {
    event.stopPropagation();
    $("#menu_mobile").removeClass("open");
    $("body").removeClass("isOpen");
    $(".menu_toggler").removeClass("open");
  });

  $('.nav a[href*="#"]').on('click', function (e) {
    e.preventDefault();
  
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000, 'easeInOutCubic');

    if($("#menu_mobile").hasClass('open')){
      $("#menu_mobile").removeClass('open');
      $("body").removeClass("isOpen");
      $(".menu_toggler").removeClass("open");
    }
  });

  $(window).on('scroll', function(){
    if($(this).scrollTop() > 200) {
      $('.top_bar, .header_misc').addClass('fixed');
    } else {
      $('.top_bar, .header_misc').removeClass('fixed');
    }
  });
});
