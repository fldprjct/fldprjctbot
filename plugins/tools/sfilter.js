const uploader = require("../../lib/uploader")
const effects = ['greyscale', 'pixelate', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'blur']

let handler = async (m, { conn, usedPrefix, text }) => {
    let effect = text.trim().toLowerCase()
    if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickfilter <effectname>
*Example:* ${usedPrefix}stickfilter invert

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
    `.trim()
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'mana gambarnya?'
    if (!/image\/(jpe?g|png)/.test(mime)) throw `khusus gambar`
    
    //loading
    m.reply(`wait...`)
    let img = await q.download(true)
    let url = await uploader(img)
    
    let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
        avatar: url
    })
    try {
        conn.sendSticker(m.chat, apiUrl, m, {author: set.auth, asSticker: /webp/g.test(mime) })
    } catch (e) {
        await conn.sendFile(m.chat, apiUrl, 'image.png', 'silahkan jadikan sticker', m)
    }
}

handler.help = ['sfilter (caption|reply media)']
handler.tags = ['tools']
handler.command = /^(sfilter)$/i

module.exports = handler