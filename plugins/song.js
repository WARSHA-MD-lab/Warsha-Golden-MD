const axios = require('axios')
const yts = require('yt-search')
const { cmd } = require('../arslan')
const { fakevCard } = require('../lib/fakevCard')

cmd({
pattern: "song",
alias: ["music", "mp3", "audio"],
desc: "Download YouTube Audio (High Quality)",
category: "download",
react: "🎵",
filename: __filename
},
async (conn, mek, m, { from, reply, text }) => {

try {

if (!text) {
return reply("❌ Example:\n.song pasoori")
}

/* 🔍 Search YouTube */
const search = await yts(text)

if (!search.videos.length) {
return reply("❌ No song found")
}

const vid = search.videos[0]

/* 🎨 Preview Card */
const caption = `
╔ஜ۩▒█ ᴀʀꜱʟᴀɴ X ᴍᴅ █▒۩ஜ╗
┃🎵 SONG FOUND
┃📌 Title: ${vid.title}
┃⏱️ Duration: ${vid.timestamp}
┃👤 Channel: ${vid.author.name}
┃⚡ Sending audio...
╰━━━━━━━━━━━━━━⊷
`

await conn.sendMessage(from,{
image: { url: vid.thumbnail },
caption: caption
},{ quoted: fakevCard })

/* 🎵 Download Audio */
const api = `https://arslan-apis-v2.vercel.app/download/ytmp3?url=${encodeURIComponent(vid.url)}`

const res = await axios.get(api, { timeout: 60000 })

if (
!res.data ||
!res.data.status ||
!res.data.result ||
!res.data.result.download ||
!res.data.result.download.url
) {
return reply("❌ Audio download failed")
}

const audioUrl = res.data.result.download.url
const title = res.data.result.metadata.title || vid.title
const duration = res.data.result.metadata.duration || vid.duration

/* 🚀 Send Audio Direct */
await conn.sendMessage(from, {
audio: { url: audioUrl },
mimetype: "audio/mpeg",
caption: `🎵 *${title}*\n⏱️ ${Math.floor(duration)} seconds\n\n> © ᴀʀꜱʟᴀɴ-ᴍᴅ`,
ptt: false // Set true for voice note
}, { quoted: fakevCard })

} catch (err) {
console.log(err)
reply("❌ Error downloading song. Try again!")
}

})
