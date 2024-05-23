let handler = m => m;
handler.before = async function(m, { conn, isOwner }) {
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys) return;
    let qq = m.quoted;
    let q = qq.hydratedFourRowTemplate ? qq.hydratedFourRowTemplate.hydratedContentText : qq.text;
    //
    if (q.endsWith('ᴀᴅᴀ ᴘᴀᴅᴀ ɢᴀᴍʙᴀʀ!')) {
        conn.regist = conn.regist ? conn.regist : {}
        let { message, id, names, age, user, key, captcha, timeout } = conn.regist[m.sender];
        if (!conn.regist[m.sender]) return;
        if (!m.text) return;
        if (m.id === message.id) return;
        if (m.id === key.id) return;
        if (m.text == captcha) {
            user.name = names.trim();
            user.age = age;
            user.regTime = +new Date;
            user.registered = true;
            let benar = `🐾 ᴏᴛᴘ ʙᴇɴᴀʀ!\n${m.sender.split('@')[0]} ᴛᴇʟᴀʜ ᴅɪ ᴠᴇʀɪғɪᴋᴀsɪ!`;
            conn.reply(m.chat, benar, fakeMen)
            clearTimeout(timeout);
            conn.sendMessage(m.chat, { delete: key });
            delete conn.regist[m.sender];
        } else {
            m.reply(`✖️ ᴏᴛᴘ sᴀʟᴀʜ!!!`);
        }
    }
};
module.exports = handler;