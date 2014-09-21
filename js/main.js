(function(){

    var app = {
        initialize: function(){
            this.setUpListeners();

            this.sliderBorderRadius();
            this.sliderBorderSize();

            this.cssResult();
            this.htmlResult();

        },

        /* Переменные, заданные как свойства app */
        btnResult : $('.result__button_prop'),
        temp111 : $('.result__button'),
        htmlCodeResultArea : $('#html-code__text'),
        cssCodeResultArea : $('#css-code__text'),
        /* ------------------------------------- */

        setUpListeners: function(){
            /* Слайдеры для изменения бордер радиуса и границы кнопки */
            $( '#slider__br-radius').on('slide change stop', $.proxy(this.borderRadChange, this));
            $( '#slider__br-size' ).on('slide change stop', $.proxy(this.borderSizeChange, this));

            /* Инпут для изменения текста кнопки  */
            $(document).ready($.proxy(this.btnTextChange, this));
            $('#btn-text_value').on('keyup', $.proxy(this.btnTextChange, this));

            /* Валидация введенного email и отправка почты */
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.removeError);
        },

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
            this.btnResult.css({
                'border-radius' : ui.value
            });
            this.cssResult();
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
            this.btnResult.css({
               'border-width' : ui.value
            });
            this.cssResult();
        },
        /* ------------------------------------- *

        /* Замена текста на кнопке */
        btnTextChange: function() {
            $('#result__button_value').text($('#btn-text_value').val());
        this.htmlResult();
        },
        /* ------------------------------------- */

        /* html и css код кнопки */
        cssResult: function(){

            var btnBorderRadius = this.btnResult.css('border-radius'),
                btnBorder = this.btnResult.css('border-width'),
                ua = navigator.userAgent;
/*            ua = navigator.userAgent;*/
            if (ua.search(/Firefox/) > -1) {


                btnBorderRadius = this.temp111.css('border-radius')
            }

            this.cssCodeResultArea.text(
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
            var inputText = $('#btn-text_value').val()
            this.htmlCodeResultArea.text(
                '<!-- HTML -->\n' +
                '<!-- Button. Код сгенерирован автоматически -->\n' +
                '<button class="super-button" id=""> ' + inputText + ' </button>\n' +
                '<!-- Button end -->'
            );
        },
        /* ------------------------------------- */

        /* Валидация введенного email и отправка почты */
        submitForm: function (e) {
            e.preventDefault();

            var form = $(this);
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
                    form.html(result);
                }else{
                    form.html(msg);
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




