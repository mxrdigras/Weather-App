const http = require('http') // need to http
const url = require('url') // to parse url strings
const express = require('express') 

const PORT = process.env.PORT || 3000;             // PORT number
const apiKey = "b40747a75b11afa12da37fa6709a8f80";  // API Key
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial";
const ROOT_DIR = "html";

const app = express();

//Middleware
app.use(express.static(__dirname + '/public')); //static server

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
})

app.get(['/index.html', '/weatherapp'] , (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
})

app.get('/weather', (request, response) => {
    console.log(request.path);
    let city = request.query.title;

    console.log('query: ' + JSON.stringify(request.query));
    if (!city) {
        //send json response to client using response.json() feature
        //of express
        response.json({ message: 'Please enter a City' });
        return;
    }

    let stuff = apiUrl + `&q=${city}` + `&appid=${apiKey}`;
    console.log(stuff);

    //create the actual http request and set up
    //its handlers
    http.request(stuff, function (apiResponse) {
        let cityData = '';
        apiResponse.on('data', function (chunk) {
            cityData += chunk;
        })
        apiResponse.on('end', function () {
            response.contentType('application/json').json(JSON.parse(cityData));
        })
    }).end() //important to end the request
    //to actually send the message
})

//start server
app.listen(PORT, err => {
    if (err) console.log(err);
    else {
        console.log(`Server listening on port: ${PORT}`);
        console.log(`To Test:`);
        console.log(`http://localhost:3000/index.html`);
        console.log(`http://localhost:3000/weatherapp`);
        console.log(`http://localhost:3000/`);
        console.log(`http://localhost:3000`);
    }
})