let fs = require('fs')
let chalk = require('chalk')

let options = { weekday: 'long', timeZone: 'Asia/Makassar' };
let dayss = new Date().toLocaleDateString('id-ID', options);

let d = new Date(new Date + 3600000)
let locale = 'id-ID'
let date = d.toLocaleDateString(locale, {
   day: 'numeric',
   month: 'long',
   year: 'numeric',
   timeZone: 'Asia/Makassar'
})
let time = d.toLocaleTimeString(locale, {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Asia/Makassar'
})

const sticker_name = ""
const sticker_author = `sticker = {
    hari: "${dayss}",
    pukul: "${time} WITA",
    tanggal: "${date}",
    botName: "ktdprjct'bot",
}`

global.set = {
    name: "ktdprjct'bot",
    version: "3.0.0",
    limit: "10",
    linkIg: "https://www.instagram.com/fldrj03",
    linkGh: "https://github.com",
    linkGc: "https://chat.whatsapp.com/KZwneZawhyx5udc2XzUe7W",
    thumbnail: "https://telegra.ph/file/46d32e6436cafe9bd06bf.jpg",
    pack: sticker_name,
    auth: sticker_author,
    owner: [
        ['62895323071410', 'fld', true], // ['number', 'name', dev?]
    ],
    api: {
        name: { 
            s: {// API Prefix
                //neoxr: 'https://api.neoxr.my.id',
            }
        },
        key: {
            s: {// APIKey Here
               //'https://api.neoxr.my.id': '5VC9rvNx',
            }
        }
    },
}

global.fakeMen = {
    "key": {
        "participants":"62895323071410@s.whatsapp.net",
        "remoteJid": "status@broadcast", // "0@s.whatsapp.net",
        "fromMe": false,
        "id": "Halo"
    },
    "message": {
        "conversation": "tes"
    },
    "participant": "0@s.whatsapp.net"
}

//yts
global.ytSearch = `
*_%title_*

↳ 👀 *_Views :_* %view
↳ 👤 *_Author :_* %author
↳ 🕒 *_Duration :_* %durasi
↳ 📆 *_Upload :_* %upload
↳ 🫐 *_Link :_* %link

━━━━━━━━━━━━━━━━
`
//game
global.gameWin = `*[ b e n a r ]*\n\n${set.name}`
global.gameOver = `
🚩 *[ t i m e o u t ]* 🚩

🎋 *kamu kalah*
Jawabannya Adalah:
*%res*

${set.name}
`
//
global.peringatan = `
⚠️ *WARNING* ⚠️

🚩 [ %angka / 3 ]
jika warningmu mencapai 3, kamu akan di banned oleh Bot.

Bot sedang dalam groupMode semua user dimohon untuk tidak mengirim pesan secara pribadi pada bot, jika user ingin menggunakan bot silahkan join ke grup official bot ini...

👥 *Developers:*
• WhatsApp: wa.me/${global.set.owner[0][0]}

📢 join ke official groups:
 ${global.set.linkGc}
 

${global.set.name}
`

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})