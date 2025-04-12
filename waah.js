const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require('util');
module.exports = waah = async (sock, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
       ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
	  var msgR = m.message.extendedTextMessage?.contextInfo?.quotedMessage;  

      const prefix = process.env.PREFIX || '';
      const cmd = body.startsWith(prefix);
      const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
      const args = body.trim().split(/ +/).slice(1);
     m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16;
    m.reply = (text, chatId = m.chat, options = {}) => (Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, "file", "", m, { ...options }) : conn.sendText(chatId, text, m, { ...options }));
    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];


const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };


 let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

	  
if (cmd) {
      switch (command) {

  case "waah": case "mmmh":{
if (!m.quoted) return m.reply("quote a viewonce message eh")
  const msgR = m.msg?.contextInfo?.quotedMessage;
    if (msgR.imageMessage) {
      let imageCaption = msgR.imageMessage.caption;
      let imageUrl = await sock.downloadAndSaveMediaMessage(msgR.imageMessage);
      client.sendMessage(sock.user.id, { image: { url: imageUrl }, caption: `Retrieved by Raven!\n${imageCaption}`}, { quoted: m });
    }
    if (msgR.videoMessage) {
      let videoCaption = msgR.videoMessage.caption;
      let videoUrl = await sock.downloadAndSaveMediaMessage(msgR.videoMessage);
      client.sendMessage(sock.user.id, { video: { url: videoUrl }, caption: `Retrieved by Raven!\n${videoCaption}`}, { quoted: m });
    }
      }
	    break;
          
default: {
          if (cmd && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (cmd && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("Dreaded", "turquoise"));
            } else if (argsLog || (cmd && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("Dreaded", "turquoise"));
            }
          }
        }
      }
    }
  } catch (err) {
    reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});


 
  
