const Captcha = require("@haileybot/captcha-generator"); // v1
const { CaptchaGenerator } = require('captcha-canvas'); // v2

let handler = async(m, {conn, text}) => {
    conn.regist = conn.regist ? conn.regist : {}
    // daftar
    if (!text) return m.reply("masukkan nama dan umur\nContoh: .reg fldrj03.18")
    let user = global.db.data.users[m.sender]
    if (conn.regist[m.sender]) return m.reply('kamu sudah mengajukan pendaftaran, silahkan verifikasi captcha...');
    if(user.registered === true) return m.reply("kamu sudah terdaftar di database bot")
    let [name, age] = text.split `.`
    if (!name) return m.reply("Nama tidak boleh kosong (Alphanumeric)")
    if (!age) return m.reply("Umur tidak boleh kosong (Angka)")
    if (isNaN(age)) return m.reply("umur harus angka!!")
    age = parseInt(age);
    if (age > 25) return m.reply("*Gak boleh!*,\nTua Amat Dah 🗿")
    if (age < 5) return m.reply("*Gak boleh!*,\nBanyak Pedo 🗿")
    if (user.name && user.name.trim() === name.trim()) return m.reply("Nama sudah dipakai...")
    let confirm = "☘️ ᴋᴇᴛɪᴋ ᴋᴏᴅᴇ ᴏᴛᴘ ʏᴀɴɢ ᴀᴅᴀ ᴘᴀᴅᴀ ɢᴀᴍʙᴀʀ!";
    
    /*
    // Captcha v1
    let captcha = new Captcha();
    let captcha2 = captcha.value.toLowerCase()
    let { key } = await conn.sendFile(m.chat, captcha.dataURL, '', confirm, fakeMen);
    */
    
    // Captcha v2
    const options = {height: 200, width: 600};
    const captchav2 = new CaptchaGenerator(options);
    const buffer = await captchav2.generate();
    let { key } = await conn.sendFile(m.chat, buffer, '', confirm, fakeMen);
    
    
    // db
    const id = m.sender
    conn.regist[id] = {
        message: m,
        id: m.sender,
        names: name,
        age: age,
        user,
        key,
        //captcha1: captcha.value, // v1
        //captcha2: captcha2, // v1
        captcha1: captchav2.text, // v2
        captcha2: captchav2.text.toLowerCase(), // v2
        timeout: setTimeout(() => {
            conn.sendMessage(m.chat, { delete: key });
            delete conn.regist[id];
        }, 60 * 1000)
    }
}

handler.help = ["daftar", "register"].map(v => v + " <nama>.<umur>");
handler.tags = ["xp"];
handler.command = /^(register|verify|daftar|reg(is)?|verif)$/i;
module.exports = handler
