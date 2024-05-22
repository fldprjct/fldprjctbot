const Captcha = require("@haileybot/captcha-generator");
let Reg = /\|?(.*)([^\w\s])([0-9]*)$/i;

let handler = async(m, {conn, text}) => {
    conn.regist = conn.regist ? conn.regist : {}
    // daftar
    let user = global.db.data.users[m.sender]
    if (conn.regist[m.sender]) return m.reply('kamu sudah mengajukan pendaftaran, silahkan verifikasi captcha...');
    if(user.registered === true) m.reply("kamu sudah terdaftar di database bot")
    let [name, age] = text.match(Reg);
    if (!name) m.reply("Nama tidak boleh kosong (Alphanumeric)")
    if (!age) m.reply("Umur tidak boleh kosong (Angka)")
    age = parseInt(age);
    if (age > 25) m.reply("*Gak boleh!*,\nTua Amat Dah 🗿")
    if (age < 5) m.reply("*Gak boleh!*,\nBanyak Pedo 🗿")
    if (user.name && user.name.trim() === name.trim()) m.reply("Nama sudah dipakai...")
    
    // Captcha
    let captcha = new Captcha();
    let confirm = "☘️ ʀᴇᴘʟʏ ᴘᴇsᴀɴ ɪɴɪ ᴅᴇɴɢᴀɴ ᴍᴇɴɢᴇᴛɪᴋ ᴋᴏᴅᴇ ᴏᴛᴘ ʏᴀɴɢ ᴀᴅᴀ ᴘᴀᴅᴀ ɢᴀᴍʙᴀʀ!";
    let { key } = await conn.sendFile(m.chat, captcha.dataURL, '', confirm, fakeMen);
    
    // db
    const id = m.sender
    conn.sendMail[id] = {
        message: m,
        id: m.sender,
        names: name,
        age: age,
        user,
        key,
        captcha: captcha.value,
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key });
            delete conn.registrasi[m.sender];
        }, 60 * 1000)
    }
}

handler.before = async (m, { conn }) => {
    conn.regist = conn.regist ? conn.regist : {}
    if (m.isBaileys) return;
    if (!conn.registrasi[m.sender]) return;
    if (!m.text) return;
    let { id, names, age, message, key, user, captcha, timeout} = conn.registrasi[m.sender]
    if (m.id === message.id) return;
    if (m.id === key.id) return;
    if (m.text == captcha) {
        user.name = name.trim();
        user.age = age;
        user.regTime = +new Date;
        user.registered = true;
        let benar = `🐾 ᴏᴛᴘ ʙᴇɴᴀʀ!\n${m.sender.split('@')[0]} ᴛᴇʟᴀʜ ᴅɪ ᴠᴇʀɪғɪᴋᴀsɪ!\n\n`;
        conn.reply(m.chat, benar + set.name, fakeMen);
        clearTimeout(timeout);
        conn.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.sender];
    } else {
        m.reply(`✖️ ᴏᴛᴘ sᴀʟᴀʜ!`);
    }
}

handler.help = ["daftar", "register"].map(v => v + " <nama>.<umur>");
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;
module.exports = handler
