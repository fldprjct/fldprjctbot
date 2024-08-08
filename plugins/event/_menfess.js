let handler = m => m
handler.before = async function(m, { conn, isOwner }) {
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys) return

    let qq = m.quoted
    let q = qq.hydratedFourRowTemplate ? qq.hydratedFourRowTemplate.hydratedContentText : qq.text      
   
    if (q.endsWith('menfess_')) {
        if (!m.text) return m.reply('Hanya text yang support untuk balasan menfess')
        m.react('💌')
        let med = ["https://telegra.ph/file/3eb3c21b4d19626332284.jpg"]
        let { data } = await conn.getFile(med)
        conn.reply(m.quoted.mentionedJid[0], `*MENFESSIN!*\n\nBALASAN PESAN MENFESS\nPesan : ${m.text}\n\n_Reply pesan ini untuk membalas menfess_`, 0, {
          ephemeralExpiration: 86400,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
               showAdAttribution: true,
               title: 'MENFESSIN',
               body: 'WhatsAap Group Official',
               thumbnail: data,
               sourceUrl: 'https://chat.whatsapp.com/KjK5s0JFhiJJetpYulliC5'
            }
          } 
       })
    }
    //=====================================================================================================================//
}
handler.exp = 0
module.exports = handler

function isUrl(text) {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}