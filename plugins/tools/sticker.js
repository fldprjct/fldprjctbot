let handler = async (m, { conn, usedPrefix, command, text, args }) => {
   let err = `*Example* : ${usedPrefix + command} media/url\n\n_Gesek pesan ini kekanan untuk membuat *sticker*_`              
   let q = m.quoted ? m.quoted : m
   let mime = (q.msg || q).mimetype || q.mediaType || ''
   let media 
   try {
     media = await q.download()
   } catch {
     if (isUrl(args[0] || '')) media = args[0] 
     else return m.reply(err)
   } 
   if (q.seconds && (q.seconds > 15)) throw `Video maksimal 10 detik!`
 
   conn.sendSticker(m.chat, media, m, { author: set.auth, asSticker: /webp/g.test(mime) })
}
handler.help = ['s', 'sticker'].map(v => v + ' <reply gambar>')
handler.tags = ['tools']
handler.command = /^(s(tic?k(er)?)?)$/i
module.exports = handler;

function isUrl(text) {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
