const axios = require('axios');

async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userName, userId, messageID) {
 const services = [
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = ` Bonjour, t'as besoin d'aide..?`;
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'itachi',
 author: '𝘿𝘼𝙑𝙄𝘿 𝙈𝙋𝙊𝙉𝙂𝙊',
 role: 0,
 aliase: ["bot"],
 category: 'ai-chat',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, args }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage("𝚙𝚘𝚜𝚎 𝚝𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 ....🦅", event.threadID, event.messageID);
 return;
 }

 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
 api.sendMessage(`${response}`, event.threadID, messageID);
 });
 },
 onChat: async function ({ api, event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("itachi")) {
 const input = messageContent.replace(/^itachi\s*/, "").trim();
 api.getUserInfo(event.senderID, async (err, ret) => {
 if (err) {
 console.error(err);
 return;
 }
 const userName = ret[event.senderID].name;
 const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
 message.reply(`${response}🦅`, messageID);
api.setMessageReaction("🦅", event.messageID, () => {}, true);

 });
 }
 }
};
