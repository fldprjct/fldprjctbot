const uploader = require("../../lib/uploader")
const fetch = require("node-fetch")
const { Catbox } = require("node-catbox")

let handler = async(m, {conn}) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        
        if (/image/.test(mime)) {
            let media = await q.download();
            let file = await conn.getFile(media, true)
            let { res, data, filename, mime } = file;
            let catbox = new Catbox()
            const link = await catbox.uploadFile({
            	path: file.filename
            });
            let text = `*TO URL*\n\nUrl: ${link}\n${media.length} Byte(s)`
            conn.sendMessage(m.chat, {
                text: text, contextInfo: { mentionedJid: [m.sender],
                    externalAdReply: {
                        title: global.set.name,
                        body: 'test',
                        mediaType: 1,
                        //showAdAttribution: true,
                        renderLargerThumbnail: true, 
                        thumbnail: await (await fetch(link)).buffer(),
                        thumbnailUrl: link,
                        sourceUrl: global.set.linkGc,
                        mediaUrl: ``
                    }
                }
            }, {quoted: m})
        } else { m.reply('khusus gambar'); }
    } catch (e) {
        console.error(e);
        m.reply('Terjadi kesalahan saat memproses gambar.');
    }
}
handler.help = ['tourl'].map(v => v + ' <reply gambar>')
handler.tags = ['tools']
handler.command = /^tourl$/i;
module.exports = handler;
