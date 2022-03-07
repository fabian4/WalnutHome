import {Contact, log, Message, ScanStatus, Wechaty} from "wechaty";
import Config from "./config";
import PuppetPadlocal from "wechaty-puppet-padlocal";
import onMessage from "./message";

const puppet = new PuppetPadlocal({
        token: Config.WECHATY_PUPPET_SERVICE_TOKEN
})

const bot = new Wechaty({
    name: Config.BotName,
    puppet
})

bot.on("scan", async (qrcode: string, status: ScanStatus) => {
        if (status === ScanStatus.Waiting && qrcode) {
            const qrcodeImageUrl = ["https://api.qrserver.com/v1/create-qr-code/?data=", encodeURIComponent(qrcode)].join("");
            console.log(`onScan: ${ScanStatus[status]}(${status}) - ${qrcodeImageUrl}`);
        } else {
            console.log(`onScan: ${ScanStatus[status]}(${status})`);
        }
    })

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
