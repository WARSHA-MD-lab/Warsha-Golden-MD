const { getAntideleteStatus } = require('../data/Antidelete');

const handleAntidelete = async (conn, updates, store) => {
    try {
        for (const update of updates) {

            const chatId = update.key?.remoteJid;
            if (!chatId) continue;

            const isEnabled = await getAntideleteStatus(chatId);
            if (!isEnabled) continue;

            const msg = await store.loadMessage(chatId, update.key.id);
            if (!msg) continue;

            const protocol = update.update?.message?.protocolMessage;

            if (protocol && protocol.type === 0) {

                const participant =
                    update.key.participant ||
                    msg.key.participant ||
                    chatId;

                await conn.sendMessage(chatId, {
                    text:
`🚫 *ANTI DELETE DETECTED*

👤 User: @${participant.split('@')[0]}
🗑️ Deleted Message Recovered`,
                    mentions: [participant]
                });

                await conn.copyNForward(chatId, msg, true);
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { handleAntidelete };
