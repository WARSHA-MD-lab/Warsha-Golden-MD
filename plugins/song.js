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
┃⚡ Downloading audio...
╰━━━━━━━━━━━━━━⊷
`

await conn.sendMessage(from,{
image: { url: vid.thumbnail },
caption: caption
},{ quoted: fakevCard })

/* 🎵 Download Audio - FIXED */
const api = `https://arslan-apis-v2.vercel.app/download/ytmp3?url=${encodeURIComponent(vid.url)}`

const res = await axios.get(api, { timeout: 60000 })

// Log the response to debug
console.log('API Response:', JSON.stringify(res.data, null, 2))

// Check response structure properly
if (!res.data || !res.data.status) {
return reply("❌ API returned error status")
}

const result = res.data.result

if (!result || !result.download || !result.download.url) {
return reply("❌ No download URL found in response")
}

const audioUrl = result.download.url
const title = result.metadata?.title || vid.title
const duration = result.metadata?.duration || vid.duration

/* 🚀 Send Audio Direct */
await conn.sendMessage(from, {
audio: { url: audioUrl },
mimetype: "audio/mpeg",
caption: `🎵 *${title}*\n⏱️ ${Math.floor(duration)} seconds\n\n> © ᴀʀꜱʟᴀɴ-ᴍᴅ`,
ptt: false
}, { quoted: fakevCard })

} catch (err) {
console.log('Error details:', err.message)
console.log('Full error:', err)
reply("❌ Error downloading song. Try again!")
}

})
