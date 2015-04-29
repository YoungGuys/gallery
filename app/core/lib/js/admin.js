$(document).ready(function () {
    positionControlElem();

    //трішки приховуємо неактивні блоки
    $('.icon-eye-close').each(function () {
        $(this).parent().parent().addClass('is-no_active');
    });


});


function positionControlElem() {
    $('.control_block').each(function (i, elem) {
        var bl = $(this).parent();
        var pos = bl.css('position');

        if (pos == 'absolute') {
            bl.addClass('p-abs');
        }
        else if (pos == 'fixed') {
            bl.addClass('p-fix');
        }
        else {
            bl.addClass('p-rel');
        }
    });
}
