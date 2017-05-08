function request(url, type, body, headers) {
  const promise = new Promise((resolve, reject) => $.ajax({
    url,
    type,
    contentType: 'application/json',
    headers,
    data: body,
    success: resolve,
    error: reject
  }));

  return promise;
}

export function get(url, headers) {
  return request(url, 'GET', '', headers);
}

export function post(url, body, headers) {
  return request(url, 'POST', JSON.stringify(body), headers);
}

export function put(url, body, headers) {
  return request(url, 'PUT', JSON.stringify(body), headers);
}

export function remove(url, headers) {
  return request(url, 'PUT', '', headers)
}

// class Requester {

// request(url, type, body, headers) {
//   const promise = new Promise((resolve, reject) => $.ajax({
//     url,
//     type,
//     contentType: 'application/json',
//     headers,
//     data: body,
//     success: resolve,
//     error: reject
//   }));

//   return promise;
// }

//   getRequest(url, headers) {
//     return Requester.request(url, 'GET', '', headers);
//   }

//   postRequest(url, body, headers) {
//     return Requester.request(url, 'POST', JSON.stringify(body), headers);
//   }

//   putRequest(url, body, headers) {
//     return Requester.request(url, 'PUT', JSON.stringify(body), headers);
//   }

//   removeRequest(url, headers) {
//     return Requester.request(url, 'PUT', '', headers)
//   }

// }

// const requester = new Request();
// export default requester;
