var ws = null;

function setConnected(connected) {
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('reverse').disabled = !connected;
}

function connect() {
    var target = document.getElementById('target').value;
    ws = new WebSocket(target);
    ws.onopen = function () {
        setConnected(true);
        log('Info: WebSocket connection opened.');
    };
    ws.onmessage = function (event) {
        log('Received: ' + event.data);
    };
    ws.onclose = function () {
        setConnected(false);
        log('Info: WebSocket connection closed.');
    };
}

function updateTarget() {
    if (window.location.protocol == 'http:') {
        document.getElementById('target').value = 'ws://' + window.location.host + document.getElementById('target').value;
    } else {
        document.getElementById('target').value = 'wss://' + window.location.host + document.getElementById('target').value;
    }
}

function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
    setConnected(false);
}

function reverse() {
    if (ws != null) {
        var message = document.getElementById('message').value;
        log('Sent: ' + message);
        ws.send(message);
    } else {
        alert('WebSocket connection not established, please connect.');
    }
}

function log(message) {
    var console = document.getElementById('console');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(message));
    console.appendChild(p);
    while (console.childNodes.length > 25) {
        console.removeChild(console.firstChild);
    }
    console.scrollTop = console.scrollHeight;
}