var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://node-storage-api.herokuapp.com/leaderboard', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach((entry) => {
      console.log(entry.name, entry.score)
    })
  } else {
    console.log('error')
  }
}
var data = {"name": "Mat", "score": 10}
var body = JSON.stringify(data)
// Send request
request.send()

request.open('POST', 'https://node-storage-api.herokuapp.com/addscore', true);
request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
request.onload = function () {
    // do something to response
    console.log(this.responseText);
};
request.send(body);
