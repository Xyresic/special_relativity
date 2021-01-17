let speed_slider = $('#speed')[0];
let angle_slider = $('#theta')[0];
let color_slider = $('#hex')[0];

let logistic_scale = (num) => {
    return 2 / (1 + Math.exp(-num)) - 1;
}
let mult = logistic_scale(speed_slider.value / 10);
let gamma = 1 / Math.sqrt(1 - mult);
let theta = parseInt(angle_slider.value);

let start;
$(document).ready(() => {
    start = Date.now();
});

let update_gamma = function(event) {
    mult = logistic_scale(this.value / 10);
    gamma = 1 / Math.sqrt(1 - mult);
    $('#speed-val').text(mult.toFixed(5) + 'c');
    $('.ruler:odd').width(`${40 / gamma}vw`);
    let hands = $('.hand');
    hands.css('animation', 'none');
    hands[0].offsetHeight;
    hands.css('animation', '');
    $('.hand:odd').css('animation-duration', `${3 * gamma}s`);

}

let update_theta = function() {
    theta = parseInt(this.value)
    $('#theta-val').text(theta + '°');
}

let update_color = function() {

}

speed_slider.addEventListener('input', update_gamma);
angle_slider.addEventListener('input', update_theta);
color_slider.addEventListener('input', update_color);