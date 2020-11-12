// Code written by Rijk van Zanten
const fetch = require('node-fetch');
const fs = require('fs');

async function parseData() {
    const timeframesResponse = await fetch('https://opendata.rdw.nl/resource/ixf8-gtwq.json');
    const areamanagersResponse = await fetch('https://opendata.rdw.nl/resource/2uc2-nnv3.json');

    const timeFrames = await timeframesResponse.json();
    const areaManagers = await areamanagersResponse.json();

    const result = timeFrames.map((timeframe) => {
        const areamanager = areamanager.find((areamanager) => 
            timeFrame.areamanagerid === areamanager.areamanagerid);

        timeframe.areamanager = areamanager;
        
        return timeframe;
    });

    fs.writeFileSync('./result.json', JSON.stringify(result, null, 4))
}

parseData();