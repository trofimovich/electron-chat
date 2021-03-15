import * as api from "../api/chats";
import db from "../db/firestore";

export const fetchChats = (userId) => async (dispatch) => {
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();
  chats.forEach((chat) => {
    chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
  });

  const sortedChats = chats.reduce(
    (result, chat) => {
      if (chat.joinedUsers.includes(userId)) {
        result.joined.push(chat);
      } else {
        result.available.push(chat);
      }

      return result;
    },
    { joined: [], available: [] }
  );

  dispatch({
    type: "CHATS_FETCH_SUCCESS",
    ...sortedChats,
  });

  return sortedChats;
};

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat: { ...newChat, id: chatId } });
  return chatId;
};

export const joinChat = (chat, userId) => async (dispatch) => {
  await api.joinChat(userId, chat.id);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const userSnapshot = await userRef.get();
        return userSnapshot.data();
      })
    );

    chat.joinedUsers = joinedUsers;
    dispatch({ type: "CHATS_SET_ACTIVE_CHAT", chat });
  });

export const subscribeToProfile = (userId, chatId) => (dispatch) =>
  api.subscribeToProfile(userId, (user) => {
    dispatch({ type: "CHATS_UPDATE_USER_STATE", user, chatId });
  });
