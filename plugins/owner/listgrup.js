let moment = require('moment-timezone')

let handler = async (m, { conn }) => {
    let grup = Object.keys(await conn.groupFetchAllParticipating())
    let txt = `*Daftar Grup Chat*\n\nTotal Grup: *${grup.length}*\n\n`
    for (let i of grup) {
        const data = await conn.groupMetadata(i)
        if (data && data.hasOwnProperty('participants')) {
            const botParticipant = data.participants.find(v => v.id == conn.user.jid)
            const botAdmin = botParticipant ? botParticipant.admin : false
            txt += `*${data.subject}*\n*Owner:* ${data.owner !== undefined ? '@' + data.owner.split('@')[0] : 'Anonymous'}\n${data.id}\n*Created:* ${moment(data.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Total Member:* ${data.participants.length}\n*Bot Admin:* ${botAdmin ? 'Admin' : botAdmin === 'superadmin' ? 'Pembuat Grup!' : 'Bukan Admin'}\n\n   –——————————————————\n\n`
        } else {
            txt += `*${data.subject}*\n*Owner:* ${data.owner !== undefined ? '@' + data.owner.split('@')[0] : 'Anonymous'}\n${data.id}\n*Created:* ${moment(data.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n*Total Member:* Tidak diketahui\n*Bot Admin:* Tidak\n\n   –——————————————————\n\n`
        }
    }
    conn.reply(m.chat, txt, m, { mentions: await conn.parseMention(txt) });
}
handler.help = ['listgc']
handler.tags = ['owner']
handler.command = /^listgc$/i

handler.rowner = true
module.exports = handler

//ryhardev