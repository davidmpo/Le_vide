const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ ☆ | ♥ 🦅•𝗗𝗮𝘃𝗶𝗱•🦅 ♥ | ☆]"; // changing this wont change the goatbot V2 of list cmd it is just a decoyy
module.exports = {
	config: {
		name: "help",
		version: "1.17",
		author: "NTKhang", // original author Kshitiz 
		countDown: 5,
		role: 0,
		shortDescription: {
			en: "View command usage and list all commands directly",
		},
		longDescription: {
			en: "View command usage and list all commands directly",
		},
		category: "cmd-list",
		guide: {
			en: "{pn} / help cmdName ",
		},
		priority: 1,
	},

	onStart: async function ({ message, args, event, threadsData, role }) {
		const { threadID } = event;
		const threadData = await threadsData.get(threadID);
		const prefix = getPrefix(threadID);

		if (args.length === 0) {
			const categories = {};
			let msg = "";

			msg += `\n\n    🌿❤️══𝗗𝗮𝘃𝗶𝗱✧𝗯𝗼𝘁══❤️🌿

 `; // replace with your name 

			for (const [name, value] of commands) {
				if (value.config.role > 1 && role < value.config.role) continue;

				const category = value.config.category || "Uncategorized";
				categories[category] = categories[category] || { commands: [] };
				categories[category].commands.push(name);
			}

			Object.keys(categories).forEach((category) => {
				if (category !== "info") {
					msg += `\n╭━❤️${category.toUpperCase()} `;


					const names = categories[category].commands.sort();
					for (let i = 0; i < names.length; i += 3) {
						const cmds = names.slice(i, i + 3).map((item) => ` ★${item}`);
						msg += `\n│${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
					}

					msg += `\n╰────────────❤️`;
				}
			});

			const totalCommands = commands.size;
			msg += `\n𝐋𝐚𝐮𝐫𝐢𝐚𝐧𝐞☆𝐁𝐨𝐭 𝐡𝐚𝐬  ${totalCommands} 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 ✔\n`;
			msg += `${prefix}𝐡𝐞𝐥𝐩 𝐭𝐨 𝐥𝐨𝐨𝐤 𝐜𝐦𝐝𝐬\n`;
          msg += `𝐀𝐧𝐲 𝐩𝐫𝐨𝐛𝐥𝐞𝐦 𝐫𝐞𝐥𝐚𝐭𝐞𝐝 𝐭𝐨 𝐛𝐨𝐭 𝐭𝐡𝐞𝐧 𝐮𝐬𝐞 ${prefix}𝐜𝐚𝐥𝐥𝐚𝐝\n`;
			msg += `Admin :👑☆David☆mpongo☆\n\n`; // its not decoy so change it if you want
          msg += `           ❤

ᕯᕯDavid mpongo l'aigle royal ᕯᕯ 

[👑| David mp ]`;

msg += `𝐅𝐛: ✰ m.me/www.facebook.com/100092277325670☆ `;



msg+= `🌿❤️══ David✧bot══❤️🌿 `;
			await message.reply({
				body: msg,
			});
		} else {
			const commandName = args[0].toLowerCase();
			const command = commands.get(commandName) || commands.get(aliases.get(commandName));

			if (!command) {
				await message.reply(`Command "${commandName}" not found.`);
			} else {
				const configCommand = command.config;
				const roleText = roleTextToString(configCommand.role);
				const author = configCommand.author || "Unknown";
             const category = configCommand.category

				const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

				const guideBody = configCommand.guide?.en || "No guide available.";
				const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

const response = `✣━☆••LOVELY••☆━✤      
         

❐𝙉𝙖𝙢𝙚 ➢${configCommand.name}
❐𝙊𝙩𝙝𝙚𝙧𝙉𝙖𝙢𝙚 ➢${configCommand.aliases  ? configCommand.aliases.join(", ") : "Do not have"}
❐𝘾𝙖𝙩𝙚𝙜𝙤𝙧𝙮  ➢${category}	 

❑𝘾𝙢𝙙_𝙈𝙖𝙠𝙚𝙧 ➢${author}

❒𝙍𝙤𝙡𝙚 ➢${roleText}
❒𝙏𝙞𝙢𝙚 𝙥𝙚𝙧 𝙘𝙢𝙙 ➢${configCommand.countDown || 1}s
❒𝘿𝙚𝙨𝙘𝙧𝙞𝙥𝙩𝙞𝙤𝙉 ➢${longDescription}
❒𝙐𝙨𝙖𝙜𝙚 ➢ ${usage}
`;

				await message.reply(response);
			}
		}
	},
};

function roleTextToString(roleText) {
	switch (roleText) {
		case 0:
			return "0 (All users)";
		case 1:
			return "1 (Group administrators)";
		case 2:
			return "2 (Admin bot)";
		default:
			return "Unknown role";
	}
	}
