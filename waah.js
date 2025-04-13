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
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

	  
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
      } 
  
    }
  } catch (err) {
    console.log(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});


 
  
