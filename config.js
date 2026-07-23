const fs = require('fs');
const dotenv = require('dotenv');

// ENVIRONMENT LOADER
if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}

// CONFIGURATION EXPORT
module.exports = {

  // SESSION & DATABASE
  SESSION_ID: process.env.SESSION_ID || "",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://offarslan_db_user:arslanmdcluster0.mongodb.net",

  // BOT IDENTITY
  PREFIX: process.env.PREFIX || '.',
  OWNER_NUMBER: process.env.OWNER_NUMBER || '94703916353', // <-- ඔයාගේ number එක දාන්න 94 එක්ක
  BOT_NAME: "WARSHA-MD",
  BOT_FOOTER: "© POWERED BY WARSHA-MD",

  // CHANNEL & TELEGRAM
  CHANNEL_LINK: '',
  TELEGRAM_BOT_TOKEN: '',
  TELEGRAM_CHAT_ID: '',

  // OTHER SETTINGS
  AUTO_STATUS: false,
  AUTO_REPLY: false,
  AUTO_STICKER: false

}; // <-- මේ bracket එක වැදගත්
