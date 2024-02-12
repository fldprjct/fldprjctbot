let fetch = require("node-fetch")
let handler = async(m, { conn, text, usedPrefix }) => {
    if(!text) throw "mau tanya apa?"
    try {
        let hasil = await (await fetch(`https://tools.revesery.com/ai/ai.php?query=${text}`)).json()
        m.reply(hasil.result + `\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n${set.name}`)
    } catch (e) {
        m.reply(`fitur error, silahkan report ke owner dengan cara \n${usedPrefix}report <fiturnya>`)
    }
}

handler.help = ['ai']
handler.tags = ['internet']
handler.command = /^(ai)$/i

module.exports = handler