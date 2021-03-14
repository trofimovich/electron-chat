import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

import { subscribeToChat } from "../actions/chats";

const ChatView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  useEffect(() => {
    const unsubscribeFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubscribeFromChat();
    };
  }, []);

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
