module.exports = {
	config: {
			name: "pain",
			version: "1.0",
			author: "Shibai Otsutsuki",
			countDown: 5,
			role: 0,
			shortDescription: "sarcasm",
			longDescription: "sarcasm",
			category: "reply",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "pain") return message.reply("Celui qui n'est connaîtra 🏵️pas la souffre 🥵 n'est connaîtra jamais la véritable Paix  ☝🌼😇");
}
};
