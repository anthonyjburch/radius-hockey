const WebSocket = require('ws');
const Firestore = require('@google-cloud/firestore');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const responseObject = {
    'topSpeed': 0,
    'twentyTwoPlus': 0,
    'twentyToTwentyTwo': 0,
    'eighteenToTwenty': 0,
    'dateUpdated': null
};


exports.function = async (req, res) => {
    const season = req.body.season;
    const stage = req.body.stage;
    const id = req.body.id;

    const request = {
        type: 'action',
        event: {
            domain: 'edge.nhl.com',
            uri: `/en/skater/${season}-${stage}-${id}`,
            action: 'load',
            data: {
                renderFunction: 'renderProfileContent',
                target: '#skatingspeed-section-content',
                params: {
                    sectionName: 'skatingspeed',
                    units: 'imperial',
                    season: season,
                    stage: stage,
                    feed: 'skatersProfiles',
                    id: id
                }
            },
            callbackFunction: 'runClientFns'
        }
    };

    const ws = new WebSocket('wss://edge.nhl.com');

    ws.onmessage = async (msg) => {
        if (msg && msg.data) {
            const data = JSON.parse(msg.data);
            ws.close();

            if (data && data.html) {
                let tableHtml = '<table class="table table-hover">' + data.html.split('<table class="table table-hover">')[1];
                tableHtml = tableHtml.split('</table>')[0] + '</table>';

                const tableData = fromTable(tableHtml, ['label', 'skater', 'avg', 'percentile']);

                responseObject.topSpeed = Number(tableData.find(d => d.label === 'Top Speed (mph)')?.skater);
                responseObject.twentyTwoPlus = Number(tableData.find(d => d.label === '22+ mph bursts')?.skater);
                responseObject.twentyToTwentyTwo = Number(tableData.find(d => d.label === '20-22 mph bursts')?.skater);
                responseObject.eighteenToTwenty = Number(tableData.find(d => d.label === '18-20 mph bursts')?.skater);

                responseObject.dateUpdated = new Date;
                const db = new Firestore({
                    projectId: process.env.HOST_PROJECT
                });

                await db.collection('skaters')
                    .doc(`${season}-${stage}-${id}`)
                    .set({ skatingSpeed: responseObject }, { merge: true });

                responseObject.playerId = id;
                responseObject.season = season;
                responseObject.stage = stage;

                res.status(200).send(responseObject);
                return;
            }
        }

        res.status(500).send({
            season: season,
            stage: stage,
            id: id,
            data: msg.data
        });
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

class DOMParser {
    parseFromString(s, contentType = 'text/html') {
        return new JSDOM(s, { contentType }).window.document
    }
}

function fromTable(html, props) {
    return Array.from(
        new DOMParser().parseFromString(html, "text/html").querySelectorAll('tr'),
        row => [...row.cells].reduce(
            (o, cell, i) => (o[props[i]] = cell.textContent, o), {}));
}
