const WebSocket = require('ws');
const Firestore = require('@google-cloud/firestore');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const responseObject = {
    topSpeed: 0,
    avgSpeed: 0,
    oneHundredPlus: 0,
    ninetyToOneHundred: 0,
    eightyToNinety: 0,
    seventyToEighty: 0,
    dateUpdated: null
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
                target: '"#shotspeed-section-content"',
                params: {
                    sectionName: 'shotspeed',
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
                responseObject.avgSpeed = Number(tableData.find(d => d.label === 'Average Speed (mph)')?.skater);
                responseObject.oneHundredPlus = Number(tableData.find(d => d.label === '100+ mph shots')?.skater);
                responseObject.ninetyToOneHundred = Number(tableData.find(d => d.label === '90-100 mph shots')?.skater);
                responseObject.eightyToNinety = Number(tableData.find(d => d.label === '80-90 mph shots')?.skater);
                responseObject.seventyToEighty = Number(tableData.find(d => d.label === '70-80 mph shots')?.skater);

                responseObject.dateUpdated = new Date;

                const db = new Firestore({
                    projectId: process.env.HOST_PROJECT
                });

                const profileRef = db.collection('skater-profiles').doc(`${season}-${stage}-${id}`);
                const profileSnap = await profileRef.get();

                if (!profileSnap.exists) {
                    res.status(500).send(`Couldn't find profile: ${season}-${stage}-${id}`);
                    return;
                }

                const profile = profileSnap.data();

                responseObject.firstName = profile.firstName;
                responseObject.lastName = profile.lastName;
                responseObject.position = profile.position;
                responseObject.team = profile.team;
                responseObject.playerId = id;
                responseObject.season = season;
                responseObject.stage = stage;

                await db.collection('skater-shot-speeds')
                    .doc(`${season}-${stage}-${id}`)
                    .set(responseObject, { merge: true});

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