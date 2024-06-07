let handler = m => m;
handler.before = async function(m, { conn, isOwner }) {
    conn.regist = conn.regist ? conn.regist : {};
    if (!(m.sender in conn.regist)) return
    if (m.isBaileys) return
    let { message, id, names, age, user, key, captcha1, captcha2, timeout } = conn.regist[m.sender];
    
    try {
        if (m.text == captcha1) {
            user.name = names.trim();
            user.age = age;
            user.regTime = +new Date;
            user.registered = true;
            let benar = `🐾 ᴏᴛᴘ ʙᴇɴᴀʀ!\n@${m.sender.split('@')[0]} ᴛᴇʟᴀʜ ᴅɪ ᴠᴇʀɪғɪᴋᴀsɪ!`
            conn.sendMessage(m.chat, {
                text: benar,
                mentions: [m.sender],
                quoted: {fakeMen}
            });
            //conn.reply(m.chat, benar, fakeMen)
            clearTimeout(timeout);
            conn.sendMessage(m.chat, { delete: key });
            delete conn.regist[m.sender];
        } 
        if (m.text == captcha2) {
            user.name = names.trim();
            user.age = age;
            user.regTime = +new Date;
            user.registered = true;
            let benar = `🐾 ᴏᴛᴘ ʙᴇɴᴀʀ!\n@${m.sender.split('@')[0]} ᴛᴇʟᴀʜ ᴅɪ ᴠᴇʀɪғɪᴋᴀsɪ!`;
            conn.sendMessage(m.chat, {
                text: benar,
                mentions: [m.sender],
                quoted: {fakeMen}
            });
            clearTimeout(timeout);
            conn.sendMessage(m.chat, { delete: key });
            delete conn.regist[m.sender];
        }
    } catch (e) {m.reply("✖️ ᴏᴛᴘ sᴀʟᴀʜ!!!")}
};
module.exports = handler;