const genarateChatId = (chats) => {

    while (true) {
        const chatId = Math.floor(100000 + Math.random() * 900000);

        const alreadyExists = chats.find(chat => chat.chatId === chatId)
        if (!alreadyExists) return chatId
    }

}

export default genarateChatId;