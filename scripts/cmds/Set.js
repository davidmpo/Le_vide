+cmd install set.js module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Ronald",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission =["",
"100092277325670"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("●═════❍═════●\n〽 𝐭𝐞𝐬 𝐩𝐚𝐫𝐞𝐧𝐭𝐬 𝐭'𝐨𝐧𝐭 𝐣𝐚𝐦𝐚𝐢𝐬 𝐚𝐩𝐩𝐫𝐢𝐬 𝐚 𝐫𝐞𝐬𝐩𝐞𝐜𝐭𝐞𝐫 𝐥𝐞𝐬 𝐚𝐟𝐟𝐚𝐢𝐫𝐞𝐬 𝐝𝐞 𝐠𝐫𝐚𝐧𝐝😑 🤦‍♂?!\n●═════❍═════●", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("Invalid command arguments. Usage: set [query] [amount]", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`Set experience points to ${amount} for ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
