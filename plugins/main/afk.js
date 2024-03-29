let handler = async (m, { text }) => {
    let user = global.db.data.users[m.sender]
    user.afk = +new Date
    user.afkReason = text
    let name = getName(m.sender)
    m.reply(`*${name}* sekarang AFK ${text ? '\nDengan Alasan : ' + text : 'Tanpa Alasan'}`)
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

module.exports = handler