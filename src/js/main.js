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
    e.preventDefault();    
    $([this, '.header_misc']).toggleClass("open");
  });
});
