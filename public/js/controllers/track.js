import { loadTemplate } from 'templates';

const $container = $('#container');

export function loadTrack(params) {
    return Promise.resolve(loadTemplate('track'))
        .then(template => 
        $container.html(template(params))
)};