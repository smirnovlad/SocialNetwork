import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchUserInfoHelper} from "./userInfo"
import {HOST} from "./config"

const fetchUserMessagesHelper = async function (token) {
    let url = `http://${HOST}:8000/messenger/api/v1/messages/`
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error')
    }
    return await response.json()
}

export const fetchUserMessages = createAsyncThunk(
    'fetchUserMessages',
    async function (data, {rejectWithValue}) {
        try {
            let {token} = data;
            return await fetchUserMessagesHelper(token)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchChatsPreviewInfo = async function (data) {
    let {userId, token} = data;
    let chatsInfo = []
    let usedChats = []

    const userMessages = await fetchUserMessagesHelper(token);

    const userPromises = userMessages.map(async (message) => {
        if (!usedChats.includes(message.chat)) {
            usedChats.push(message.chat);
            let secondUserId = userId === message.receiver ? message.sender : message.receiver;
            const secondUserInfo = await fetchUserInfoHelper(secondUserId);

            return {
                chatId: message.chat,
                message: {
                    receiver: message.receiver,
                    sender: message.sender,
                    text: message.text,
                    timestamp: message.timestamp,
                    name: secondUserInfo.first_name + " " + secondUserInfo.last_name
                }
            };
        }
    });

    // TODO: run promises sequentially to order message (we need to save the most recent)
    const resolvedUsers = await Promise.all(userPromises);
    chatsInfo = resolvedUsers.filter((info) => info !== undefined);

    return chatsInfo
}

export const fetchChatMessages = createAsyncThunk(
    'fetchChatMessages',
    async function (data, {rejectWithValue}) {
        try {
            let {token, chatId} = data
            let url = `http://${HOST}:8000/messenger/api/v1/messages/`
            const response = await fetch(url + '?' + new URLSearchParams({
                chat_id: chatId
            }), {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                }
            })
            if (!response.ok) {
                throw new Error('Error')
            }
            const res = await response.json()
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchChatInfo = async function (data) {
    let {token, chatId} = data
    let url = `http://${HOST}:8000/messenger/api/v1/chatlist/${chatId}`
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error')
    }
    const res = await response.json()
    return res
}

export const postMessage = async function (data) {
    let {token, message, chatId} = data

    let url = `http://${HOST}:8000/messenger/api/v1/messages/`
    let requestBody = {
        text: message,
        chat: chatId
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(requestBody)
    })
    if (!response.ok) {
        throw new Error('Error')
    }
    const res = await response.json()
    return res
}

export const fetchChatList = async function (data) {
    let {token} = data
    let url = `http://${HOST}:8000/messenger/api/v1/chatlist/`
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
        }
    })
    if (!response.ok) {
        throw new Error('Error')
    }
    const res = await response.json()
    return res
}

export const createChat = async function (data) {
    let {token, senderUserId, secondUserId} = data

    let url = `http://${HOST}:8000/messenger/api/v1/chatlist/`
    let requestBody = {
        firstUser: senderUserId,
        secondUser: secondUserId
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(requestBody)
    })
    if (!response.ok) {
        throw new Error('Error')
    }
    const res = await response.json()
    return res
}

export const getChat = async function (data) {
    const {token, senderUserId, secondUserId} = data;
    const chatList = await fetchChatList({token});

    const chat = chatList.filter((item) => {
        return parseInt(item.firstUser) === parseInt(secondUserId) ||
            parseInt(item.secondUser) === parseInt(secondUserId);
    })
    if (chat.length === 0) {
        return await createChat({token, senderUserId, secondUserId});
    } else {
        return chat[0];
    }
}