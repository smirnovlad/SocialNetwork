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
            let {userId, token} = data;
            let secondUserInfo = {}
            let messagesInfo =  await fetchUserMessagesHelper(token);

            const userPromises = messagesInfo.map(async (info) => {
                let chatId = info.chat;
                let previewMessage = info;
                let secondUserId = userId === previewMessage.receiver ? previewMessage.sender : previewMessage.receiver;
                if (!(secondUserId in secondUserInfo)) {
                    secondUserInfo[secondUserId] = await fetchUserInfoHelper(secondUserId);
                }

                return {
                    chatId: chatId,
                    message: {
                        receiver: previewMessage.receiver,
                        sender: previewMessage.sender,
                        text: previewMessage.text,
                        timestamp: previewMessage.timestamp,
                        name: secondUserInfo[secondUserId].first_name + " " + secondUserInfo[secondUserId].last_name
                    }
                };
            });

            messagesInfo = await Promise.all(userPromises);

            messagesInfo.sort(function(first, second)  {
                return first.message.timestamp < second.message.timestamp ? 1 : -1;
            })

            return messagesInfo;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

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
    let {token, secondUserId} = data

    let url = `http://${HOST}:8000/messenger/api/v1/chatlist/`
    let requestBody = {
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
    const {token, secondUserId} = data;
    const chatList = await fetchChatList({token});

    const chat = chatList.filter((item) => {
        return parseInt(item.firstUser) === parseInt(secondUserId) ||
            parseInt(item.secondUser) === parseInt(secondUserId);
    })
    if (chat.length === 0) {
        return await createChat({token, secondUserId});
    } else {
        return chat[0];
    }
}