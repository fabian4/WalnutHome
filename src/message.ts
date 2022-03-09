import {log, Message} from "wechaty";
import Config from "./config";

export default async function onMessage(msg: Message) {
    if (msg.room()) {
        return
    }
    if (Config.GROUP.indexOf(msg.talker().id) === -1) {
        return
    }
    log.info(Config.BotName, msg.text())

    if (msg.text() === 'ding') {
        await msg.say('dong')
    }
}
