(function(){

    var app = {
        initialize: function(){
            var _this = this;

            _this.setUpListeners();

            _this.sliderBorderRadius();
            _this.sliderBorderSize();

            _this.cssResult();
            _this.htmlResult();

        },

        /* Переменные, заданные как свойства app */
        btnResult : $('.result__button_prop'),
        htmlCodeResultArea : $('#html-code__text'),
        cssCodeResultArea : $('#css-code__text'),
        /* ------------------------------------- */

        setUpListeners: function(){
            var _this = this;


            /* Слайдеры для изменения бордер радиуса и границы кнопки */
            $( '#slider__br-radius').on('slide change stop', $.proxy(_this.borderRadChange, _this));
            $( '#slider__br-size' ).on('slide change stop', $.proxy(_this.borderSizeChange, _this));

            /* Инпут для изменения текста кнопки  */
            $(document).ready($.proxy(_this.btnTextChange, _this));
            $('#btn-text_value').on('keyup', $.proxy(_this.btnTextChange, _this));

            /* Валидация введенного email и отправка почты */
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.removeError);

            /* Костыль! Для того чтоб при загрузке страницы в FireFox
             в textarea встали значения по умолчанию */
            $(document).ready($.proxy(_this.loadPageInFirefox, _this));
        },

        /* Костыль! Загрузка страницы в FireFox
           и передача в textarea значений по умолчанию */
        loadPageInFirefox: function () {
            var ff_i1 = 4,
                ff_i2 = 1,
                _this = this;
            app.ff_i1 = ff_i1;
            app.ff_i2 = ff_i2;
            _this.cssResult();
        },
        /* ------------------------------------- */

        /* Ползунок изменения border-radius'а */
        sliderBorderRadius: function() {
            $( '#slider__br-radius' ).slider(
                {
                    min: 4,
                    max: 22,
                    range: 'min'
                }
            );
        },

        borderRadChange: function(event, ui) {
            var _this = this;

            _this.btnResult.css({
                'border-radius' : ui.value
            });
            /* Костыль! Для того чтоб работало в FireFox */
            var ff_i1 = ui.value;
            app.ff_i1 = ff_i1;
            /* -------------------------------- */
            _this.cssResult();
        },
        /* ------------------------------------- */

        /* Ползунок изменения border-size'а */
        sliderBorderSize: function() {
            $( '#slider__br-size' ).slider(
                {
                    min: 1,
                    max: 6,
                    range: 'min'
                }
            );
        },

        borderSizeChange: function(event, ui) {
            var _this = this;

            _this.btnResult.css({
               'border-width' : ui.value
            });
            /* Костыль! Для того чтоб работало в FireFox */
            var ff_i2 = ui.value;
            app.ff_i2 = ff_i2;
            /* -------------------------------- */
            _this.cssResult();
        },
        /* ------------------------------------- *

        /* Замена текста на кнопке */
        btnTextChange: function() {
            var _this = this;
            var text = $('#btn-text_value').val();
            $('#result__button_value').text($('#btn-text_value').val());
            if (text === '') {
                $('#result__button_value').text('Button text');
            }
        _this.htmlResult();
        },
        /* ------------------------------------- */

        /* html и css код кнопки */
        cssResult: function( ){
            var _this = this;

            var btnBorderRadius = _this.btnResult.css('border-radius'),
                btnBorder = _this.btnResult.css('border-width');

            /* Костыль! Для того чтоб работало в FireFox и в IE8+
            *  У меня стойкое ощущение, что я где-то наговнокодил
            * */
                ua = navigator.userAgent;
            if ( (ua.search(/Firefox/) > -1) || (ua.search(/explorer/)) ) {
                var btnBorderRadius, btnBorder;
                btnBorderRadius = app.ff_i1;
                btnBorder = app.ff_i2;
            }
            /* -------------------------------- */

            _this.cssCodeResultArea.text(
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
                'border: '                + btnBorder + ' solid rgb(49, 129, 180);\n' +
                '/* ------------------------------------- */\n' +
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

        },

        htmlResult: function(){
            var _this = this;

            var inputText = $('#btn-text_value').val();
            if (inputText === '') {
                inputText = 'Button text'
            }
            _this.htmlCodeResultArea.text(
                '<!-- HTML -->\n' +
                '<!-- Button. Код сгенерирован автоматически -->\n' +
                '<button class="super-button" id=""> ' + inputText + ' </button>\n' +
                '<!-- Button end -->'
            );
        },
        /* ------------------------------------- */

        /* Валидация введенного email и отправка почты */
        submitForm: function (email_my) {
            var _this = this;

            email_my.preventDefault();

            var form = $(_this);
                submitBtn = form.find('button[type="submit"]');

            if( app.validateForm(form) === false ) return false;

            submitBtn.attr('disabled', 'disabled');

            var str = form.serialize();

            $.ajax({
                url: 'email_form/send.php',
                type: 'POST',
                data: str
            })
            .done(function(msg) {
                if(msg === "OK"){
                    var result = "<div class='bg-success'>Код кнопки отправлен на ваш адрес электронной почты.</div>"
                    $('#valid').html(result);
                    //form.html();
                }else{
                    //form.html(msg);
                    $('#valid').html(msg);
                }
            })
            .always(function() {
                submitBtn.removeAttr('disabled');
            });

        },

        validateForm: function (form) {
            var inputs = form.find('input'),
                valid = true;

            inputs.tooltip('destroy');

            $.each(inputs, function(index, val) {
                var input = $(val),
                    val = input.val(),
                    textError = 'Введите адрес электронной почты' ;

                if(val.length === 0){
                    input.tooltip({
                        trigger: 'manual',
                        placement: 'right',
                        title: textError
                    }).tooltip('show');
                    valid = false;
                }else{
                }
            });

            return valid;
        },

        removeError: function () {
        }
        /* ------------------------------------- */
    }

    app.initialize();

})();




