import { loadTemplate } from 'templates';
import * as data from 'data';

const $container = $('#container');

export function searchTracks() {
        const searchTerm = $('#search-field').val();
        Promise.all([
            data.search(searchTerm),
            loadTemplate('search')
        ])
        .then(([items, template]) => {
        $container.html(template(items));
    })    
};
