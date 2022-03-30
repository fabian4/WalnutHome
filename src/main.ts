import {Contact, log, WechatyBuilder} from "wechaty";
import Config from "./config";
import onMessage from "./message";
import PuppetWalnut from "wechaty-puppet-walnut";

const puppet = new PuppetWalnut()

const bot = WechatyBuilder.build({
    name: Config.BotName,
    puppet
})

// bot.on("scan", async (qrcode: string, status: ScanStatus) => {
//         if (status === ScanStatus.Waiting && qrcode) {
//             const qrcodeImageUrl = ["https://api.qrserver.com/v1/create-qr-code/?data=", encodeURIComponent(qrcode)].join("");
//             console.log(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
//         } else {
//             console.log(`onScan: ${ScanStatus[status]}(${status})`);
//         }
//     })

bot.on("login", (user: Contact) => {
        console.log(`${user} login`);
    })

bot.on("logout", (user: Contact) => {
        console.log(`${user} logout`);
    })

bot.on("message", onMessage)

bot.start()
    .then(() => log.info('StarterBot', 'Starter Bot Started.'))
    .catch((e: any) => log.error('StarterBot', e))


console.log(Config.BotName, "started");
