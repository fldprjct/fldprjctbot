let ytdl = require('ytdl-core')
let yts = require('yt-search')
let fs = require('fs')
let { pipeline } = require('stream')
let { promisify } = require('util')
let os = require('os')
const streamPipeline = promisify(pipeline);

var handler = async (m, { conn, command, text, usedPrefix }) => {
let input = `*PERINTAH GAGAL*

Gunakan dengan cara dibawah ini
${usedPrefix+command} LDR`

  if (!text) return m.reply(input);
  
  conn.data = conn.data ? conn.data : {}
  let id = m.sender
  let search = await yts(text);
  let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
  if (!search) throw 'Tidak ditemukan';
  let { title, thumbnail, timestamp, views, ago, url } = vid;
 
  conn.data[id] = {
  user: id,
  title: title,
  times: timestamp,
  views: views,
  ago: ago,
  url: url,
  thumbnail: thumbnail
  };

  let captvid = `*${title}*
  
─── 〔 Y O U T U B E 〕 ────
  ⎎ Duration: ${timestamp}
  ⎎ Views: ${views}
  ⎎ Upload: ${ago}
  ⎎ Link: ${url}
─────//────
*PETUNJUK ❗*
pilih salah satu di bawah ini:

Mp3 » untuk 🎵 (Audio)
Mp4 » untuk 🎥 (Video)
Cancel » untuk ❎ (membatalkan)`;

  conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captvid}, { quoted: m });
 
 setTimeout(() => {
 conn.sendMessage(m.chat, { react: { text: '⚙️', key: m.key }})
 delete conn.data[id]
 }, 30000)

};

handler.help = ['play']
handler.tags = ['downloader'];
handler.command = /^(play)$/i;

handler.exp = 0;
handler.limit = true 
handler.register = true

module.exports = handler