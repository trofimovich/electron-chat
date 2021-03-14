import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { withBaseLayout } from "../layouts/Base";
import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";

import { fetchChats } from "../actions/chats";
import Notification from "../utils/notifications";

const Home = () => {
  const dispatch = useDispatch();
  const joinedChats = useSelector(({ chats }) => chats.joined);
  const availableChats = useSelector(({ chats }) => chats.available);
  const userId = useSelector(({ auth }) => auth.user.uid);

  useEffect(() => {
    dispatch(fetchChats(userId));
    Notification.setup();
  }, [dispatch]);
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel">
          <Link className="btn btn-outline-primary" to="/chatCreate">
            New
          </Link>
        </ViewTitle>
        <div className="container-fluid">
          <AvailableChatsList chats={availableChats} />
        </div>
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
