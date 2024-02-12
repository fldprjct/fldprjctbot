let fetch = require("node-fetch")
const uploader = require("../../lib/uploader")

let handler = async(m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw m.reply('mana gambarnya?')
    if (!/image\/(jpe?g|png)/.test(mime)) throw m.reply(`khusus gambar`)
    
    let media = await q.download()
    let tele = await uploader(media)
    
    let data = await (await fetch(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(tele)}`)).json()
    const { anilist, similarity, filename, from, to, episode, video } = data.result[0]
    if ((similarity * 100).toFixed(1) < 89) throw m.reply(`oops! ada gambar yang lebih jelas?\nAtau mungkin gambar yang kamu kirim bukan dari anime`)
    
    let a = anilist.title
    let textnya = "";
        textnya += `${a.native}\n↳ Romaji: ${a.romaji}\n↳ English: ${a.english}\n`
        textnya += `↳ Episode: ${episode}\n`
        textnya += `↳ Time: ${formatTime(from)} / ${formatTime(to)}\n`
        textnya += `↳ Similarity: ${(similarity * 100).toFixed(1)}%\n\n`
        
    //conn.sendFile(m.chat, data.result[0].image, "", textnya, m)
    conn.sendMessage(m.chat, {
        text: textnya, contextInfo: { mentionedJid: [m.sender],
            externalAdReply: {
                title: set.name,
                body: '',
                mediaType: 1,
                thumbnail: await (await fetch(data.result[0].image)).buffer(),
                thumbnailUrl: data.result[0].image,
                renderLargerThumbnail: true, 
                sourceUrl: set.linkGc,
                mediaUrl: ``
            }
        }
    }, {quoted: m})
}
handler.help = ['animesrc']
handler.tags = ['internet']
handler.command = /^src|animesrc$/i

module.exports = handler

function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

function formatTime(timeInSeconds) {
  let sec_num = Number(timeInSeconds);
  let hours = Math.floor(sec_num / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((sec_num - hours * 3600) / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (sec_num - hours * 3600 - minutes * 60).toFixed(0).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};