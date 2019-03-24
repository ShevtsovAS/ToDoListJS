$(function () {
    // Добавление элемента
    $('.btn').click(function () {
        var title = $('.input');
        var description = $('.textarea');

        if (!isInputsValid(title.val(), description.val())) {

            $('#popup-container').fadeIn(400, disableScroll());

            $('#popup').animate({
                width: '400px',
                height: '200px'
            }, 400);

            return false;
        }

        var item = createItem(title.val(), description.val());

        $('.column-left')
            .append(item)
            .show();

        $('.sps').hide();

        // Очищаем введёные поля
        title.val('');
        description.val('');
    });

    // Удаление элемента
    $('body').on('click', '.daggerDelete', function () {
        $(this).parent().remove();

        if ($('.list-item').length < 1) {
            $('.sps').show();
        }
    });

    // Сворачивание/Разворачивание описания дела
    $('body').on('click', '.arrowDelete', function () {
        var arrow = $(this).parent().find('.arrow');
        var description = $(this).parent().children('.item-description');
        if (arrow.attr('src') == 'img/arrow.png') {
            description.slideUp(400, function () {
                arrow.attr('src', 'img/arrow2.png');
            });
        } else {
            description.slideDown(400, function () {
                arrow.attr('src', 'img/arrow.png');
            });
        }
        return false;
    });

    // Закрытие окна с ошибкой
    $('#popup-container').click(function (e) {
        if (e.target == this) {
            $(this).fadeOut(400, enableScroll());
            $('#popup').animate({
                width: '0',
                height: '0'
            }, 400);
        }
    });
});

// Функция создания элемента
function createItem(title, description) {
    var deleteButton = $('<a href="#" class="daggerDelete"><img class="dagger" src="img/dagger.png" alt="удалить"></a>');
    var arrowButton = $('<a href="#" class="arrowDelete"><img class="arrow" src="img/arrow.png" alt="стрелка"></a>');
    var listTitle = $('<div class="item-title"></div>').text(title);
    var listDescription = $('<div class="item-description"></div>').text(description);

    return $('<div class="list-item"></div>')
        .append(deleteButton)
        .append(arrowButton)
        .append(listTitle)
        .append(listDescription);
}

function disableScroll() {
    $html = $('html');
    $body = $('body');
    var initWidth = $body.outerWidth();
    var initHeight = $body.outerHeight();

    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    $html.data('scroll-position', scrollPosition);
    $html.data('previous-overflow', $html.css('overflow'));
    $html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    var marginR = $body.outerWidth()-initWidth;
    var marginB = $body.outerHeight()-initHeight;
    $body.css({'margin-right': marginR,'margin-bottom': marginB});
}

function enableScroll() {
    $html = $('html');
    $body = $('body');
    $html.css('overflow', $html.data('previous-overflow'));
    var scrollPosition = $html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $body.css({'margin-right': 0, 'margin-bottom': 0});
}

function isInputsValid(titleText, descriptionText) {
    if (titleText.trim() == '' || descriptionText.trim() == '') {

        $('#error').text('Вы не вели ни каких данных');

        if (titleText.trim() != '') {
            $('#error').text('Вы не ввели описание');
        }

        if (descriptionText.trim() != '') {
            $('#error').text('Вы не ввели название');
        }

        return false;
    }

    return true;
}
