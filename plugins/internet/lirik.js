let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : ''
    if (!teks) return m.reply(`Use example ${usedPrefix}${command} pelanggaran`)
    const url = await (await fetch(`https://aemt.me/lirik?text=${text}`)).json()
    m.reply(`
*${url.result[0].judul}*


${url.result[0].lirik}
◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦

${set.name}
`.trim())
}

handler.help = ['lirik'].map(v => v + ' <Apa>')
handler.tags = ['internet']
handler.command = /^(lirik|lyrics|lyric)$/i

module.exports = handler
