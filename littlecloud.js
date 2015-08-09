var request = require('request');

var Device = function (id, client) {
    this.client = function () {
        return client;
    };

    this.id = function () {
        return id;
    };
};

Device.prototype.id = null
Device.prototype.client = null;
Device.prototype.output = function (percent, duration_ms) {
    var options = {
        url: 'https://api-http.littlebitscloud.cc/devices/' + this.id() + '/output',
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

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
};

var Client = function (accessToken) {
    this.accessToken = function () {
        return accessToken;
    };
};

Client.prototype.accessToken = null;

Client.prototype.makeDevice = function (id) {
    return new Device(id, this);
};

module.exports = function (accessToken) {
    return new Client(accessToken);
};