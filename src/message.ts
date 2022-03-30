import {Contact, log, Message} from "wechaty";
import Config from "./config";

export default async function onMessage(msg: Message) {
    if (msg.room()) {
        return
    }
    const id = msg.talker().id
    if (Config.GROUP.indexOf(id) === -1) {
        return
    }
    log.info(Config.BotName, msg.text())
    // for (let i = 0; i < Config.GROUP.length; i++) {
    //     if (Config.GROUP[i] === id) {
    //         continue;
    //     }
    //     const contact: Contact = await Contact.find(Config.GROUP[i])
    //     await contact.say(msg.id + ': ' + msg.text())
    // }
}
