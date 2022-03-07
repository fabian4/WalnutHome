import {log, Message, Wechaty} from "wechaty";
import Config from "./config.js";

// const token: string = Config.WECHATY_PUPPET_SERVICE_TOKEN            // padlocal token
// const puppet = new PuppetPadlocal({ token })

const bot = new Wechaty({
    name: Config.BotName,
    puppet: "wechaty-puppet-padlocal",
    puppetOptions: {
        token: Config.WECHATY_PUPPET_SERVICE_TOKEN
    }
})

// bot.on("scan", async (qrcode: string, status: ScanStatus) => {
//         if (status === ScanStatus.Waiting && qrcode) {
//             const qrcodeImageUrl = ["https://api.qrserver.com/v1/create-qr-code/?data=", encodeURIComponent(qrcode)].join("");
//             console.log(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
//         } else {
//             console.log(`onScan: ${ScanStatus[status]}(${status})`);
//         }
//     })

// bot.on("login", (user: Contact) => {
//         console.log(`${user} login`);
//     })
//
// bot.on("logout", (user: Contact) => {
//         console.log(`${user} logout`);
//     })

async function onMessage (msg: Message) {
    log.info('StarterBot', msg.toString())

    if (msg.text() === 'ding') {
        await msg.say('dong')
    }
}

bot.on("message", onMessage)

bot.start()
    .then(() => log.info('StarterBot', 'Starter Bot Started.'))
    .catch((e: any) => log.error('StarterBot', e))


console.log(Config.BotName, "started");
