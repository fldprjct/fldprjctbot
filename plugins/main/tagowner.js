let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    conn.reply(global.set.owner[0][0] + `@s.whatsapp.net`, ` *owner ada yang cariin tuh :v*`, m)
}
handler.customPrefix = /@62895323071410/i
handler.command = new RegExp

module.exports = handler
