import { Ytdl } from '../scrape/yt.js'

let handler = m => m
handler.before = async function (m, {conn}) {
  this.data = this.data ? this.data : {}
  let id = m.sender
  if (!m.text) return !0
  
  let mp_3 = Object.values(this.data).find(v => v.user === m.sender)
  if (!mp_3) return !0

  let yt = new Ytdl()
  let { audio, video } = await yt.play(mp_3.url)

  if (m.text.toLowerCase() == 'mp3') {
    m.reply(wait).then(_ => {
      m.react(set.wait)
    })
   
    let doc = {
      audio: {
        url: audio["128"].url
      },
      mimetype: 'audio/mp4',
      fileName: mp_3.title,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: mp_3.url,
          title: mp_3.title,
          body: wm,
          sourceUrl: mp_3.url,
          thumbnail: await (await this.getFile(mp_3.thumbnail)).data
        }
      }
    };

    await conn.sendMessage(m.chat, doc, { quoted: m }).then(_ => {
      m.react(set.sukses)
    })

    // Delete the audio file
    delete this.data[id]
  } else if (m.text.toLowerCase() == 'mp4') {
    m.reply(wait).then(_ => {
      conn.sendMessage(m.chat, {react: {text: 'ðŸš€', key: m.key}})
    })
      const videoUrl = video["480"].url || video["360"].url || video["144"].url
      const resolution = video["480"] ? '480p' : video["360"] ? '360p' : '144p'

      await conn.sendMessage(m.chat, {
        video: { url: videoUrl },
        caption: `ä¹‚ Y T  M P 4
        
âš˜ Title : ${mp_3.title}
âš˜ Publish : ${mp_3.ago}
âš˜ Views : ${mp_3.views}
âš˜ Duration : ${mp_3.times}
âš˜ Resolusi : ${resolution}
âš˜ URL : ${mp_3.url}`
      }, {quoted: m}).then(() => m.react(set.sukses))

    delete this.data[id]
  } else if (m.text.toLowerCase() == 'cancel') {
    let stel = await style('Lagu/Video yang kamu pilih akan di hapus..', 1)
    m.reply(stel).then(_ => {
      delete this.data[id]
    })
  }
  return !0
}

module.exports = handler