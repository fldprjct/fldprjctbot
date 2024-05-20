let fs = require('fs')
let path = require('path')
let package = require('../../package.json')
let fetch = require('node-fetch')
let tags = {
  'main': 'M A I N && I N F O',
  'internet': 'I N T E R N E T',
  'tools': 'T O O L S',
  'downloader': 'D O W N L O A D E R',
  'group': 'G R O U P',
  'owner': 'O W N E R',
  'game': 'G A M E',
}

/*
[Info arti logo disamping fitur]
🅡 = user harus regist
🅛 = Fitur ini menggunakan limit
🅟 = Fitur ini khusus user premium
*/

const defaultMenu = {
  before: `
╭───✧ 𝖐𝖙𝖉𝖕𝖗𝖏𝖈𝖙 𝖇𝖔𝖙 ✧───◆
┃❃╭───────────
┃❃│ User : %name
┃❃│ Time : %time
┃❃│ Date : %date
┃❃│ Mode : public
┃❃│ Uptime : %uptime
┃❃│ version : ${package.version}
┃❃│ Library : baileys
┃❃│ Commands : %totalfitur
┃❃╰────────────
╰────✧ ©fldprj03 ✧───◆

%readmore`.trimStart(),
  header: '*╭────✧* *%category* *✧⊷*',
  body: '*┃✧* %cmd %isReg %islimit %isPremium',
  footer: '*╰═════════════⊷*\n',
  after: `
`,
}
let handler = async (m, { conn, usedPrefix: _p, expiration}) => {
  try {
    let { limit } = global.db.data.users[m.sender]
    let name = conn.getName(m.sender)
    let totalf = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      }
    }).length
  
    let d = new Date(new Date + 3600000)
    let locale = 'id-ID'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      timeZone: 'Asia/Makassar',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    /*let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)*/
    let time = d.toLocaleTimeString(locale, {
      timeZone: 'Asia/Makassar',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    //let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        register: plugin.register,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '🅛' : '')
                .replace(/%isPremium/g, menu.premium ? '🅟' : '')
                .replace(/%isReg/g, menu.register ? '🅡' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      version: package.version,
      totalfitur: totalf,
      limit,
      name,
      week, 
      date, 
      //dateIslamic, 
      time, 
      totalreg, 
      rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    //conn.reply(m.chat, text.trim(), m)
    m.react(set.wait)
    conn.sendMessage(m.chat, {
    text: text.trim(), contextInfo: { mentionedJid: [m.sender],
      externalAdReply: {
        title: set.name,
        body: '',
        mediaType: 1,
		showAdAttribution: true,
        thumbnail: await (await fetch(set.thumbnail)).buffer(),
        thumbnailUrl: set.thumbnail,
        renderLargerThumbnail: true, 
        sourceUrl: set.linkGc,
        mediaUrl: ``
      }
    }
  }, {quoted: fakeMen})
    //conn.send2ButtonImg(m.chat, `https://telegra.ph/file/9ad3a925d572438242a1e.jpg`, text.trim(), '🅛=limit 🅟=premium', 'donate', `${_p}donate`, `owner`,`${_p}owner`, m)
    //conn.send2ButtonImg(m.chat, `https://telegra.ph/file/9ad3a925d572438242a1e.jpg`, text.trim())
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help']
handler.tags = ['main']
handler.command = /^(menu|help)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / (24 * 60 * 60 * 1000));
    let ds = ms % (24 * 60 * 60 * 1000);
    let h = isNaN(ms) ? '--' : Math.floor((ds) / (60 * 60 * 1000));
    let hs = ms % (60 * 60 * 1000);
    let m = isNaN(ms) ? '--' : Math.floor((hs) / (60 * 1000));
    let mss = ms % (60 * 1000);
    let s = isNaN(ms) ? '--' : Math.floor((mss) / (1000));
    return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}