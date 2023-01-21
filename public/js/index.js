let speed_slider = $('#speed')[0];
let angle_slider = $('#theta')[0];
let color_slider = $('#hex')[0];

let logistic_scale = (num) => {
    return 2 / (1 + Math.exp(-num)) - 1;
}
let beta = logistic_scale(speed_slider.value / 10);
let gamma = 1 / Math.sqrt(1 - beta ** 2);
let theta = parseInt(angle_slider.value);
let hex = HSVtoRGB(0, 1, 1);

let start;
$(document).ready(() => {
    start = Date.now();
});

//source: https://stackoverflow.com/a/32471000
function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

let update_background = () => {
    let offset = Math.atan(beta) * 180 / Math.PI;
    if (!$('.reverse')[0].checked) offset *= -1;
    $('#right-background').css('transform', `translate(-50vw, 0) skewX(${offset}deg) skewY(${offset}deg)`);
}

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
    update_theta();
    update_color();
    update_background();
}

let update_theta = () => {
    theta = parseInt(angle_slider.value)
    $('#theta-val').text(theta + '°');
    $('svg:odd').css('transform', `translate(-50%, 0) scale(0.9) rotate(${-theta}deg)`);
    let theta_prime;
    if ($('.reverse')[0].checked) {
        theta_prime = Math.atan2(Math.sin(theta * Math.PI / 180), gamma * (Math.cos(theta * Math.PI / 180) - beta)) * 180 / Math.PI;
    } else {
        theta_prime = Math.atan2(Math.sin(theta * Math.PI / 180), gamma * (Math.cos(theta * Math.PI / 180) + beta)) * 180 / Math.PI;
    }
    $('svg:even').css('transform', `translate(-50%, 0) scale(0.9) rotate(${-theta_prime}deg)`);
}

let update_color = () => {
    let freq = 400 + parseInt(color_slider.value);
    hex = HSVtoRGB((freq - 400) * 0.8 / 390, 1, 1);
    $('.wave:odd').attr('stroke', `rgba(${hex.r}, ${hex.g}, ${hex.b}, 1)`);
    let freq_prime;
    if ($('.reverse')[0].checked) {
        freq_prime = freq * Math.sqrt((1 + beta) / (1 - beta));
    } else {
        freq_prime = freq * Math.sqrt((1 - beta) / (1 + beta));
    }
    if (freq_prime < 400) {
        $('.wave:even').attr('stroke', 'transparent');
        $('.infra').show();
        $('.ultra').hide();
    } else if (freq_prime > 790) {
        $('.wave:even').attr('stroke', 'transparent');
        $('.infra').hide();
        $('.ultra').show();
    } else {
        $('.infra').hide();
        $('.ultra').hide();
        let hex_prime = HSVtoRGB((freq_prime - 400) * 0.8 / 390, 1, 1);
        $('.wave:even').attr('stroke', `rgba(${hex_prime.r}, ${hex_prime.g}, ${hex_prime.b}, 1)`);
    }
}

speed_slider.addEventListener('input', update_gamma);
angle_slider.addEventListener('input', update_theta);
color_slider.addEventListener('input', update_color);
$('.reverse').on('click', () => {
    update_theta();
    update_color();
    update_background();
});