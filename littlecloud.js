var request = require('request');

// request variables _________________________________________________________
var protocol = 'https';
var host = 'api-http.littlebitscloud.cc';

// handle the response from a request ________________________________________
var handleResponse = function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body);
    } else {
        console.log(error);
    }
};

// DEVICE ____________________________________________________________________
var Device = function (id, client) {
    this.client = function () {
        return client;
    };

    this.id = function () {
        return id;
    };
};

// retrieve the ID of the device _____________________________________________
Device.prototype.id = null;

// retrieve the client of the device _________________________________________
Device.prototype.client = null;

// output some voltage on the given device ___________________________________
Device.prototype.output = function (percent, duration_ms) {
    var options = {
        url: protocol + '://' + host + '/devices/' + this.id() + '/output',
        method: 'POST',
        json: true,
        body: {
            percent: percent,
            duration_ms: duration_ms
        },
        headers: {
            'Authorization': 'Bearer ' + this.client().accessToken(),
            'Accept': 'application/vnd.littlebits.v2+json'  
        }
    };

    request(options, handleResponse);
};


// CLIENT ____________________________________________________________________
var Client = function (accessToken) {
    this.accessToken = function () {
        return accessToken;
    };
};

// retrieve the access token _________________________________________________
Client.prototype.accessToken = null;

// return a list of the user’s devices _______________________________________
Client.prototype.devices = function () {
    var options = {
        url: protocol + '://' + host + '/devices',
        headers: {
            'Authorization': 'Bearer ' + this.accessToken(),
            'Accept': 'application/vnd.littlebits.v2+json'  
        }
    };

    request(options, handleResponse);
};

// make a Device object with given ID ________________________________________
Client.prototype.makeDevice = function (id) {
    return new Device(id, this);
};

// export a new Client _______________________________________________________
module.exports = function (accessToken) {
    return new Client(accessToken);
};