(function(){

    /* Переменные */
    var
        btnResult = $('.result__button_prop'),
        htmlCodeResultArea = $('#html-code__text'),
        cssCodeResultArea = $('#css-code__text');
    /* ------------------------------------- */

    /* Ползунок изменения border-radius'а */
    $(function() {
        $( '#slider__br-radius' ).slider(
            {
                min: 4,
                max: 22,
                range: 'min',
                change: setInputsFromSlider,
                slide: setInputsFromSlider,
                stop: setInputsFromSlider
            },
            'value'
        );

        var btnBorderRadius = document.getElementsByClassName('result__button_prop');
            style = btnBorderRadius[0].style;

        function setInputsFromSlider (event, ui) {
            var val = $('#slider__br-radius').slider('value');
                style.borderRadius = val + 'px';
                style.webkitBorderRadius = val + 'px';
                style.mozBorderRadius = val + 'px';

            cssResult();
        }
    });
    /* ------------------------------------- */

    /* Ползунок изменения border-size'а */
    $(function() {
        $( '#slider__br-size' ).slider(
            {
                min: 1,
                max: 6,
                range: 'min',
                change: setInputsFromSlider,
                slide: setInputsFromSlider,
                stop: setInputsFromSlider
            },
            'value'
        );

        var btnBorderWidth = document.getElementsByClassName('result__button_prop');
            style = btnBorderWidth[0].style;

        function setInputsFromSlider (event, ui) {
            var val = $('#slider__br-size').slider('value');
                style.borderWidth = val + 'px';

            cssResult();
        }
    });
    /* ------------------------------------- */

    /* Замена текста на кнопке */
    $(document).ready ( function(){
        $('#btn-text_value').keyup(function() {
            $('#result__button_value').text($(this).val());
            htmlCodeResultArea.text(
                '<!-- HTML -->\n' +
                '<!-- Button. Код сгенерирован автоматически -->\n' +
                '<button class="super-button" id="">' + $(this).val() + '</button>\n' +
                '<!-- Button end -->'
            );
        });
    });
    /* ------------------------------------- */

    /* html и css код кнопки */
    var cssResult = function (){

        var btnBorderRadius = btnResult.css('border-radius'),
            btnBorder = btnResult.css('border');

        cssCodeResultArea.text(
            /* Статический код CSS */
            '/* CSS */\n' +
            '/* Button. Код сгенерирован автоматически */\n' +
            '.super-button {\n' +
            '/* эти свойства меняются в генераторе */\n' +
            /* ------------------------------------- */

            /* динамический код CSS */
            '-webkit-border-radius: ' + btnBorderRadius + ';\n' +
            '-moz-border-radius: '    + btnBorderRadius + ';\n' +
            'border-radius: '         + btnBorderRadius + ';\n' +
            'border: '                + btnBorder + ';\n' +
            /* ------------------------------------- */

            /* Статический код CSS */
            'height: 45px;\n' +
            'width: 140px;\n' +
            'background-color: #37a1e4;\n' +
            '-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.19), inset 0 2px rgba(255,255,255,.58), inset 0 0 5px rgba(255,255,255,.38);\n' +
            '-moz-box-shadow: 0 1px 1px rgba(0,0,0,.19), inset 0 2px rgba(255,255,255,.58), inset 0 0 5px rgba(255,255,255,.38);\n' +
            'box-shadow: 0 1px 1px rgba(0,0,0,.19), inset 0 2px rgba(255,255,255,.58), inset 0 0 5px rgba(255,255,255,.38);\n' +
            'background-image: -webkit-linear-gradient(top, rgba(255,255,255,.26), rgba(255,255,255,0));\n' +
            'background-image: -moz-linear-gradient(top, rgba(255,255,255,.26), rgba(255,255,255,0));\n' +
            'background-image: -o-linear-gradient(top, rgba(255,255,255,.26), rgba(255,255,255,0));\n' +
            'background-image: linear-gradient(to bottom, rgba(255,255,255,.26), rgba(255,255,255,0));\n' +
            'font-size: 16px;\n' +
            'font-weight: bold;\n' +
            'color: #fff;\n' +
            'text-shadow: 0 1px rgba(0,0,0,.32);\n' +
            '}\n' +
            '/* Button end */'
            /* ------------------------------------- */
        );

    };
    cssResult();

    var htmlResult = function () {
        htmlCodeResultArea.text(
            '<!-- HTML -->\n' +
            '<!-- Button. Код сгенерирован автоматически -->\n' +
            '<button class="super-button" id="">Button text</button>\n' +
            '<!-- Button end -->'
        );
    };
    htmlResult();
    /* ------------------------------------- */

})();
