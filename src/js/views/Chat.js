import React, { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

import { subscribeToChat, subscribeToProfile } from "../actions/chats";
import LoadingView from "../components/shared/LoadingView";

const ChatView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const peopleWatchers = useRef({});
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubscribeFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubscribeFromChat();
      unsubscribeFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);

    return () => {};
  }, [joinedUsers]);

  const subscribeToJoinedUsers = useCallback(
    (jUsers) =>
      jUsers.forEach((jUser) => {
        if (!peopleWatchers.current[jUser.uid]) {
          peopleWatchers.current[jUser.uid] = dispatch(
            subscribeToProfile(jUser.uid, id)
          );
        }
      }),
    [dispatch, id]
  );

  const unsubscribeFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  if (!activeChat?.id) {
    return <LoadingView />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default withBaseLayout(ChatView, { canGoBack: true });
