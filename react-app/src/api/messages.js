import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchUserInfoHelper} from "./userInfo"

const fetchUserMessagesHelper = async function (token) {
    let url = `http://127.0.0.1:8000/messenger/api/v1/messages/`
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

    const resolvedUsers = await Promise.all(userPromises);
    chatsInfo = resolvedUsers.filter((info) => info !== undefined);

    return chatsInfo
}

export const fetchChatMessages = createAsyncThunk(
    'fetchChatMessages',
    async function (data, {rejectWithValue}) {
        try {
            let {token, chatId} = data
            let url = `http://127.0.0.1:8000/messenger/api/v1/messages/`
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
    let url = `http://127.0.0.1:8000/messenger/api/v1/chatlist/${chatId}`
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
