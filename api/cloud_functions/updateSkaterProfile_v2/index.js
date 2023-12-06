const WebSocket = require('ws');
const Firestore = require('@google-cloud/firestore');


exports.function = async (req, res) => {
    const season = req.body.season;
    const stage = req.body.stage;
    const id = req.body.id;

    const request = {
        type: 'action',
        event: {
            domain: 'edge.nhl.com',
            uri: `/en/skater/${season}-${stage}-${id}`,
            action: 'getLabel',
            data: {
                params: {
                    season: season,
                    stage: stage,
                    type: 'skaters',
                    player: id,
                    rootName: 'skatersProfiles',
                    source: 'players'
                }
            }
        }
    };

    const ws = new WebSocket('wss://edge.nhl.com');

    ws.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);
        ws.close();

        if (data.player) {
            data.player.season = season;
            data.player.stage = stage;
            data.player.playerId = id;
            data.player.dateUpdated = new Date;

            const db = new Firestore({
                projectId: process.env.HOST_PROJECT
            });

            await db.collection('skater-profiles')
                    .doc(`${season}-${stage}-${id}`)
                    .set(data.player, { merge: true});

            res.status(200).send(data.player);
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
