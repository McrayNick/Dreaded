const { 
 default: logger,
 makeWASocket,
        } = require("@whiskeysockets/baileys"); 
const { useMultiFileAuthState, jidDecode, makeInMemoryStore, DisconnectReason, fetchLatestBaileysVersion, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys"); 

 const util = require("util");  
 const pino = require("pino"); 
 const gp = ["254114660061"];  
 const fs = require("fs"); 
 const figlet = require("figlet"); 
 const chalk = require("chalk"); 
 const os = require("os");
 let lastTextTime = 0;
 const messageDelay = 5000;
 const currentTime = Date.now();
 const speed = require("performance-now"); 
 const timestampe = speed(); 
 const Rspeed = speed() - timestampe 
 const spinnies = new(require('spinnies'))(); 
 const { Boom } = require("@hapi/boom"); 
 const color = (text, color) => { 
   return !color ? chalk.green(text) : chalk.keyword(color)(text); 
 }; 



 // const { Socket } = Extra; 
 const store = makeInMemoryStore({ 
  logger: pino().child({ 
     level: 'silent', 
     stream: 'store'  
   }) 
 }); 

store.bind(sock.ev);

  sock.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;

     
 function smsg(m, conn) { 
   if (!m) return; 
   let M = proto.WebMessageInfo; 
   if (m.key) { 
     m.id = m.key.id; 
     m.isBaileys = m.id.startsWith("BAE5") && m.id.length === 16; 
     m.chat = m.key.remoteJid; 
     m.fromMe = m.key.fromMe; 
     m.isGroup = m.chat.endsWith("@g.us"); 
     m.sender = conn.decodeJid((m.fromMe && conn.user.id) || m.participant || m.key.participant || m.chat || ""); 
     if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ""; 
   } 
   return m; 
 } 

                 
if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;
      let m = smsg(sock, mek, store);
      const waah = require("./waah");
      waah(sock, m, chatUpdate, store);
    } catch (err) {
      console.log(err);
    }
  });

 async function main () { 
 const { state, saveCreds } = await useMultiFileAuthState('session'); 
 console.log( 
     color( 
       figlet.textSync("RAVEN-AI", { 
         font: "Standard", 
         horizontalLayout: "default", 
         vertivalLayout: "default", 
         whitespaceBreak: false, 
       }), 
       "red" 
     ) 
   ); 

   const sock = makeWASocket({  
           logger: pino({ 
          level: 'silent' 
       }), 
     printQRInTerminal: true, 
     browser: ['Raven', 'safari', '1.0.0'], 
     auth: state, 
qrTimeout: 20000000,

   }); 


 sock.ev.on('messages.upsert', async chatUpdate => { 

  m = chatUpdate.messages[0] 
  m.chat = m.key.remoteJid; 
  m.fromMe = m.key.fromMe; 
  m.sender = sock.decodeJid((m.fromMe && sock.user.id) || m.participant || m.key.participant || m.chat); 

  const groupMetadata = m.isGroup ? await sock.groupMetadata(m.chat).catch((e) => {}) : ""; 
  const groupName = m.isGroup ? groupMetadata.subject : ""; 

  if (!m.message) return 
  if (m.chat.endsWith('broadcast')) { 
          sock.readMessages([m.key]); 

          } else if (m.chat.endsWith('@s.whatsapp.net')) { 

                 await sock.sendPresenceUpdate('available', m.chat);

    }     
   }); 

  sock.ev.on('call', async (callData) => {
      const callId = callData[0].id;
      const callerId = callData[0].from;

      await sock.rejectCall(callId, callerId);
      if (currentTime - lastTextTime >= messageDelay) {
        await sock.sendMessage(callerId, {
          text: "Only texts are allowed!"
        });
        lastTextTime = currentTime;
      } else {
        console.log('Message skipped to prevent overflow');
      }
    });
  
  sock.decodeJid = (jid) => { 
     if (!jid) return jid; 
     if (/:\d+@/gi.test(jid)) { 
       let decode = jidDecode(jid) || {}; 
       return (decode.user && decode.server && decode.user + "@" + decode.server) || jid; 
     } else return jid; 
   }; 


   sock.ev.on('connection.update', async (update) => { 
       const { 
          connection, 
          lastDisconnect, 
          qr 
       } = update 
       if (lastDisconnect == 'undefined' && qr != 'undefined') { 
          qrcode.generate(qr, { 
             small: true 
          }) 
       } 
       if (connection === 'connecting') { 
        spinnies.add('start', { 
          text: 'Connecting Now. . .' 
       }) 
      } else if (connection === 'open') { 
          spinnies.succeed('start', { 
             text: `Successfully Connected. You have logged in as ${sock.user.name}` 
          })
        await sock.sendMessage(sock.user.id, { tesxt: `hurrrah`});
       } else if (connection === 'close') { 
          if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) { 
             spinnies.fail('start', { 
                text: `connection Lost...Can't connect!` 
             }) 

             process.exit(0) 
          } else { 
             main().catch(() => main()) 
          } 
       } 
    })

   sock.ev.on('creds.update', saveCreds); 

  sock.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  sock.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || '';
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename;
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  }
  
 }; 

 main();
