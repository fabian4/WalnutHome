import {Contact, log, Message, WechatyBuilder} from "wechaty";
import Config from "./config.js";
import PuppetWalnut from "wechaty-puppet-walnut";

const puppet = new PuppetWalnut({
    port: 30001,
})

log.level('silly')

const bot = WechatyBuilder.build({
    name: Config.BotName,
    puppet
})

bot.on("login", (user: Contact) => {
        console.log(`${user} login`);
    })

bot.on("logout", (user: Contact) => {
        console.log(`${user} logout`);
    })

bot.on("message", async (msg: Message) => {
    if (msg.room()) {
        return
    }
    const id = msg.talker().id
    if (Config.GROUP.indexOf(id) === -1) {
        return
    }
    await msg.talker().say("Get it!")
    log.info(Config.BotName, msg.text())
    for (let i = 0; i < Config.GROUP.length; i++) {
        // if (Config.GROUP[i] === id) {
        //     continue;
        // }
        const contact = await bot.Contact.find({id: Config.GROUP[i]})
        await contact!.say(msg.talker().id + ': ' + msg.text())
    }
})

bot.start()
    .then(() => log.info('StarterBot', 'Starter Bot Started.'))
    .catch((e: any) => log.error('StarterBot', e))


console.log(Config.BotName, "started");
