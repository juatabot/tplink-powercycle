// Simple async sleep function
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

// Main function gets pre-parsed argvs
async function main() {
    const yargs = require('yargs');
    const argv = yargs
        .scriptName('tplink-powercycle')
        .option('username', {
            alias: 'l',
            describe: 'username for TP-Link Cloud',
        })
        .option('password', {
            alias: 'p',
            describe: 'password for TP-Link Cloud',
        })
        .option('device', {
            alias: 'd',
            describe: 'device name to powercycle',
        })
        .demandOption(['username', 'password', 'device'])
        .help()
        .argv

    console.log("Loading TPLink Cloud API...");
    const { login } = require('tplink-cloud-api');
    console.log("TPLink Cloud API successfully loaded");

    const tplink = await login(argv.username, argv.password, 'TermID');
    let deviceList = await tplink.getDeviceList();

    for(let i = 0; i < deviceList.length; i++) {
        let device = deviceList[i];
        if (device.alias == argv.device) {
            console.log('Found device=' + argv.device + ', device id=' +
                device.deviceId);

            let plug = tplink.getHS100(device.alias);
            console.log('Powercycling...');
            plug.powerOff();
            await sleep(5000);
            plug.powerOn();
            console.log('Done.')
            return;
        }
    }

    console.log('Error: could not find device=' + argv.device);
    console.log('Existing devices:');
    for(let i = 0; i < deviceList.length; i++) {
        console.log('\t' + deviceList[i].alias);
    }
}

// Call main
main();
