let handler = async(m, {command}) => {
    let setting = global.db.data.settings[conn.user.jid]
    if (command == 'self') {
        setting.self = true
        m.reply("bot dalam mode self...")
    } else if (command == 'groupmode') {
        setting.groupmode = true
        m.reply("bot dalam mode group...")
    } else if (command == 'public') {
        setting.self = false
        m.reply("bot dalam mode public...")
    } else if (command == 'groupmodeoff') {
        setting.groupmode = false
        m.reply("bot bisa di chat pribadi...")
    }
}
handler.help = ["self", "groupmode", "public", "groupmodeoff"]
handler.tags = ['owner']
handler.command = /^(self|groupmode|public|groupmodeoff)$/i;
handler.rowner = true
module.exports = handler;