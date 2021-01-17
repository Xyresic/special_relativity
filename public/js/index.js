let speed_slider = $('#speed')[0];
let angle_slider = $('#theta')[0];
let color_slider = $('#hex')[0];

let logistic_scale = (num) => {
    return 2 / (1 + Math.exp(-num)) - 1;
}
let beta = logistic_scale(speed_slider.value / 10);
let gamma = 1 / Math.sqrt(1 - beta ** 2);
let theta = parseInt(angle_slider.value);

let start;
$(document).ready(() => {
    start = Date.now();
});

let update_gamma = function(event) {
    beta = logistic_scale(this.value / 10);
    gamma = 1 / Math.sqrt(1 - beta);
    $('#speed-val').text(beta.toFixed(5) + 'c');
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
    $('svg:odd').css('transform', `translate(-50%, 0) rotate(${-theta}deg)`);
    let theta_prime = Math.atan2(Math.sin(theta * Math.PI / 180), gamma * (Math.cos(theta * Math.PI / 180) + beta)) * 180 / Math.PI;
    $('svg:even').css('transform', `translate(-50%, 0) rotate(${-theta_prime}deg)`);
}

let update_color = function() {

}

speed_slider.addEventListener('input', update_gamma);
angle_slider.addEventListener('input', update_theta);
color_slider.addEventListener('input', update_color);