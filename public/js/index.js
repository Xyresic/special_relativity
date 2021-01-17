let speed_slider = $('#speed')[0];

let logistic_scale = (num) => {
    return 2 / (1 + Math.exp(-num)) - 1;
}
let mult = logistic_scale(parseInt(speed_slider.value) / 10);
let gamma = 1 / Math.sqrt(1 - mult);

let update = function () {
    mult = logistic_scale(this.value / 10);
    gamma = 1 / Math.sqrt(1 - mult);
    $('#speed-val').text(mult.toFixed(5) + 'c')
}

speed_slider.addEventListener('input', update);

