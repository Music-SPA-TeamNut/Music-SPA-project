import { loadTemplate } from 'templates';
import { addTrack, removeTrack, loadPlaylist } from 'userController';

const $container = $('#container');

export function loadTrack(params) {
    return Promise.resolve(loadTemplate('track'))
        .then(template => 
        $container.html(template(params))
)};

export function addToPlaylist(params) {
    // if(){}
    const id = params.id;
    const $element = $('[href="#/search/'+ id + '"]');
    const title = $element[0].children[0].innerText;
    const description = $element[0].children[1].innerText;
    const img = $element[0].children[2].currentSrc;

    Promise.resolve(addTrack(id, title, description, img))
        .then(result => {
            console.log(result);
            alert(`Track added to your playlist`)
        })
}

export function removeFromPlaylist(params) {
    const id = params.id;
    Promise.resolve(removeTrack(id))
        .then(result =>
            alert(result))
}

export function showPlaylist() {
    return Promise.all([
        loadPlaylist(),
        loadTemplate('playlist'),
    ])
    .then(([tracks, template]) => {
        $('#container').html(template(tracks))
    })
}