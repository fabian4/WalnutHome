// import {Contact, log, Message, WechatyBuilder} from "wechaty";
import Config from "./config.js";
import * as PUPPET from 'wechaty-puppet'
import {log, Contact, Message, Wechaty} from "wechaty";
// import PuppetWalnut from "wechaty-puppet-walnut";

// const puppet = new PuppetWalnut({
//     port: 30001,
// })

log.level('silly')
process.env['WECHATY_PUPPET_SERVICE_NO_TLS_INSECURE_CLIENT'] = 'true'

// const bot = WechatyBuilder.build({
//     name: Config.BotName,
//     puppet
// })

// const bot = WechatyBuilder.build({
//     puppet: 'wechaty-puppet-service',
//     puppetOptions: {
//         token: 'puppet_wxwork_b88f78f33d042661'
//     }
// })

const bot = new Wechaty({
    puppet: 'wechaty-puppet-service',
    puppetOptions: {
        token: 'puppet_wxwork_b88f78f33d042661'
    }
})

bot.on('login', async (user: Contact) => {
    console.log(`${user} login`)
    const contact = await bot.Contact.find({ id: Config.GROUP[0] })
    await contact!.say('I\'m on!')
})

bot.on('logout', (user: Contact) => {
    console.log(`${user} logout`)
})

bot.on('message', async (msg: Message) => {
    if (msg.room()) {
        return
    }
    const id = msg.talker().id
    if (Config.GROUP.indexOf(id) === -1) {
        if (msg.text() === '#0') {
            await msg.talker().say('You are not in the group yet!')
        }
        if (msg.text() === '#1') {
            await msg.talker().say("You have joined the group, let's chat")
            Config.GROUP.push(msg.talker().id)
            return
        }
        await msg.talker().say("Please send '#1' to join the group")
        return
    }
    if (msg.text().startsWith('#')) {
        await handleOrders(msg)
        return
    }

    await msg.talker().say('Got it!')
    if (msg.type() === PUPPET.types.Message.Text) {
        await handleTextMsg(msg)
    } else if (msg.type() === PUPPET.types.Message.Image) {
        await handleImgMsg(msg)
    }
})

async function handleOrders (msg: Message) {
    switch (msg.text()) {
        case '#0':
            await msg.talker().say("You are now in the group, let's chat")
            await msg.talker().say('Here is the list of all group member:\n' + Config.GROUP.toString().replaceAll(',', '\n'))
            if (Config.GROUP.indexOf(msg.talker().id) === 0) {
                await msg.talker().say('BTW, you are the admin!')
            }
            break
        case '#1':
            await msg.talker().say("You have already joined the group, let's chat")
            break
    }
}

async function handleTextMsg (msg: Message) {
    log.info(Config.BotName, msg.text())
    for (let i = 0; i < Config.GROUP.length; i++) {
        // if (Config.GROUP[i] === msg.talker().id) {
        //     continue;
        // }
        const contact = await bot.Contact.find({ id: Config.GROUP[i] })
        await contact!.say(msg.talker().id + ': ' + msg.text())
    }
}

async function handleImgMsg (msg: Message) {
    const img = await msg.toImage().thumbnail()
    for (let i = 0; i < Config.GROUP.length; i++) {
        // if (Config.GROUP[i] === msg.talker().id) {
        //     continue;
        // }
        const contact = await bot.Contact.find({ id: Config.GROUP[i] })
        await contact!.say(msg.talker().id)
        await contact!.say(img)
    }
}

bot.start()
    .then(() => log.info('StarterBot', 'Starter Bot Started.'))
    .catch((e: any) => log.error('StarterBot', e))

console.log(Config.BotName, 'started')
