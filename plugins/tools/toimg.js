let fs = require ('fs')
let { webp2png } = require('../../lib/webp')

let handler = async (m, { conn, usedPrefix, command }) => {
    m.reply('*「 WAIT 」 SEDANG PROSES...*')
    let mime = m.quoted.mimetype || ''
    
    if (!m.quoted) throw `balas stiker dengan caption *${usedPrefix + command}*`
    if (!/webp/.test(mime)) throw `balas stiker dengan caption *${usedPrefix + command}*`
    let media = await m.quoted.download()
    let out = Buffer.alloc(0)
    if (/webp/.test(mime)) {
        out = await webp2png(media)
    }
    await conn.sendFile(m.chat, out, 'out.png', set.name, m)
}
handler.help = ['toimg <reply>']
handler.tags = ['tools']
handler.command = /^toimg$/i

module.exports = handler