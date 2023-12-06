const WebSocket = require('ws');

exports.function = async (req, res) => {
    const request = {
        type: 'action',
        event: {
            domain: 'edge.nhl.com',
            uri: 'en/home',
            action: 'filter',
            data: {
                source: 'players',
                filter: '',
                params: {
                    team: '',
                    player: '',
                    feed: 'skatersProfiles'
                }
            }
        }
    };

    
    const ws = new WebSocket('wss://edge.nhl.com');

    ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        ws.close();

        if (data.filterValues) {
            res.status(200).send(data.filterValues.map((el) => ({
                id: el[0],
                fullName: el[1],
                lastName: el[2]
            })));
        } else {
            res.status(500).send();
        }
    }

    waitForWssConnection(ws, request);
}

waitForWssConnection = (socket, request) => {
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                if (request != null) {
                    socket.send(JSON.stringify(request));
                }
            } else {
                waitForWssConnection(socket, request);
            }
        }, 100
    );
}
