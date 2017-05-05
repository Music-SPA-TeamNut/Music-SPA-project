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