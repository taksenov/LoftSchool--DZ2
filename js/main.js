/* Jquery UI slider */
/* Ползунок изменения border-radius'а */
$(function() {
    $( "#slider__br-radius" ).slider(
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
    }
});
/* ------------------------------------- */

$(function() {
    $( "#slider__br-size" ).slider(
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
    }
});