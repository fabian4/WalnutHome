import {PuppetPadlocal} from "wechaty-puppet-padlocal";
import {Contact, Message, ScanStatus, WechatyBuilder} from "wechaty";
import Config from "./config.js";

const token: string = Config.WECHATY_PUPPET_SERVICE_TOKEN            // padlocal token
const puppet = new PuppetPadlocal({ token })

const bot = WechatyBuilder.build({
    name: Config.BotName,
    puppet: puppet,
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

bot.on("message", async (message: Message) => {
        console.log(`on message: ${message.toString()}`);
    })

bot.start()

console.log(Config.BotName, "started");
