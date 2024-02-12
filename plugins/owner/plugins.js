let handler = async(m, {conn, args, usedPrefix, command}) => {
    let pluginError = global.db.data.settings[conn.user.jid].error
    let pluginsData = Object.keys(global.plugins)
    
    if (!args[0]) return m.reply(`Contoh: ${usedPrefix + command} sticker`)
    if (!pluginsData.includes(args[0])) return m.reply(`Plugins ${args[0]}.js tidak ada\n\n${pluginsData.map(v => ' ' + v).join`\n`}`)
    if (command == 'plugdis') {
        if (pluginError.includes(args[0])) return m.reply(`fitur ${args[0]} sudah dimatikan untuk public`)
        pluginError.push(args[0])
        m.reply(`berhasil mematikan fitur ${args[0]} untuk public..`)
    } else if (command == 'plugen') {
        if (!pluginError.includes(args[0])) return m.reply(`fitur ${args[0]} tidak ditemukan dalam database`)
        pluginError.forEach((data, index) => {
            if (data === args[0]) pluginError.splice(index, 1)
        })
        m.reply(`berhasil menyalakan fitur ${args[0]} untuk public..`)
    }
}
handler.help = ['plugdis', 'plugen']
handler.tags = ['owner']
handler.command = /^(plugdis|plugen)$/i;
handler.rowner = true
module.exports = handler;
