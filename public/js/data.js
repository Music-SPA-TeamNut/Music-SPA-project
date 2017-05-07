import * as requester from 'requester';

export function login(username, passHash) {
    const body = {
        username,
        passHash
    };
    return requester.put('api/users/auth', body)
}

export function register(email, username, passHash) {
    const body = {
        email,
        username,
        passHash
    };
    return requester.post('api/users', body)
}

export function search(searchTerm) {
    const key = 'AIzaSyB7EMVgOaBihxou_GLXdcZcCWSWbVg8NJ0';
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + searchTerm + '&type=video&videoCategoryId=10&key=' + key;

    return requester.get(url) 
}

export function postTrack(headervalue, id, title, description, img) {
    const body = {
        id,
        title,
        description,
        img
    }
    const header = {
        'x-auth-key': headervalue
    }
    
    return requester.post('api/tracks', body, header)
}

export function deleteTrack(headervalue, id) {
    const body = {
        id
    }
    const header = {
        'x-auth-key': headervalue
    }
    return requester.delete('api/tracks', body, header)
}

export function getTracks(headervalue) {
    const header = {
        'x-auth-key': headervalue
    }

    return requester.get('api/tracks', header);
}