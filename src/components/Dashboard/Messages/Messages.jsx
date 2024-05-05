/* eslint-disable no-unused-vars */
import "./Message.css";
import ChatProfiles from "./ChatProfiles";
import Messaging from "./Messaging";
import chaticon from "../../../assets/chaticon.png";
import chatclose from "../../../assets/chatclose.png";
import profile from "../../../assets/chat_info-profile.png";
import senticon from "../../../assets/sentIcon.png";
import send from "../../../assets/send.png";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  chatApi,
  useAddMessagesMutation,
  useCreateConversationMutation,
} from "../../../features/chat/chatApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversationId,
  setMessages,
  setSelectedMessageUser,
} from "../../../features/chat/chatSlice";
import { formatMessageTime } from "../../../utils/formateChatTIme";
import { useGetUserByIdQuery } from "../../../features/auth/authApi";
import { useCreateNotificationMutation } from "../../../features/notification/notificationApi";
import chatAvatar from "../../../assets/avatar.png";

const Messages = () => {
  const { user } = useSelector((state) => state.auth);
  const { messages, conversationId, selectedMsgUser } = useSelector(
    (state) => state.chat
  );

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  const [createConversation] = useCreateConversationMutation();
  const [addMessages, { isLoading }] = useAddMessagesMutation();
  const [createNotification] = useCreateNotificationMutation();
  const { data: messageUser } = useGetUserByIdQuery(id);
  const [searchText, setSearchText] = useState("");

  const [messageText, setMessageText] = useState("");

  //   create conversation id
  const checkConversationId = async () => {
    const data = {
      senderId: user?._id,
      receiverId: id,
    };
    try {
      const res = await createConversation(data);
      if (res?.data?.message === "Conversation exists!") {
        dispatch(setConversationId(res?.data?.conversationId));

        // if conversation id existed, it will get the messages of the conversation id.
        const messageRes = await dispatch(
          chatApi.endpoints.getMessagesByConversationId.initiate(
            res?.data?.conversationId,
            { forceRefetch: true }
          )
        );

        // it will store the messages to the redux store
        if (messageRes?.data) {
          dispatch(setMessages(messageRes?.data?.data));
        }
      }
      if (res?.data?.success) {
        // console.log(res, "noo res");
        dispatch(setConversationId(res?.data?.data?._id));
        dispatch(setMessages([]));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // send messages
  const handleSendClick = async () => {
    const data = { chat: conversationId, sender: user?._id, text: messageText };
    const notificationInfo = {
      user: id,
      type: "Message Received",
      message: `${user?.first_name} ${user?.last_name} sent you a message.`,
      senderId: user?._id,
    };
    try {
      const res = await addMessages(data);
      if (res?.data?.success) {
        const newMessage = [...messages, res?.data?.data];
        dispatch(setMessages(newMessage));
        await createNotification(notificationInfo);
        setMessageText("");
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  useEffect(() => {
    checkConversationId();
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setSelectedMessageUser(messageUser));
  }, [messageUser]);

  // console.log("|myParam|", myParam)

  const [showChatDetails, setShowChatDetails] = useState(true);

  const handleChatCloseClick = () => {
    setShowChatDetails(false);
  };
  const close = () => {
    setShowChatDetails(true);
  };
  // messaging ----------function

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const lastChatMessage = chatContainer.lastElementChild;
      //   console.log(lastChatMessage, "dddd");
      if (lastChatMessage) {
        lastChatMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const hanldeViewProfile = () => {
    console.log(selectedMsgUser, "selectedMsgUser");
    if (selectedMsgUser.role === "Coach") {
      navigate(`/dashboard/coacheDetails/${selectedMsgUser?._id}`);
    } else {
      navigate(`/dashboard/viewDetails/${selectedMsgUser?._id}`);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="container-fluid">
        <div className="message_wrapper">
          <div className="row w-100">
            <div className={`col-lg-3 d-lg-block d-none`}>
              <div className="chat_profile">
                <div className="chat_list_wrapper ">
                  <h3>Message details</h3>
                  <div className="form-group has-search1">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                  <ChatProfiles user={user} searchText={searchText} />
                </div>
              </div>
            </div>
            <div className={`col-lg-9 d-flex`}>
              <div className="messaging" style={{ width: "100%" }}>
                <h2 onClick={close} className="pointer">
                  {selectedMsgUser?.first_name} {selectedMsgUser?.last_name}
                </h2>
                <div className="message_content">
                  {messages &&
                    messages?.length > 0 &&
                    messages.map((item, idx) => (
                      <div ref={chatContainerRef} key={idx} className="pb-5">
                        {item?.sender !== user?._id ? (
                          <div className="d-flex align-items-end">
                            {/* <div className="bg_curve_blue">
                              <div className="bg_curve_white"></div>
                            </div> */}
                            <div className="position-relative w-100">
                              <div className="message_one">
                                <div className="message1 position-relative">
                                  <p>{item?.text}</p>
                                  <span>
                                    {formatMessageTime(item?.createdAt)}
                                  </span>
                                </div>
                                <p className="message_time_one position-absolute">
                                  {formatMessageTime(item?.createdAt)}
                                </p>
                              </div>
                              <div className="position-absolute avatar_img2">
                                <img src={chatAvatar} alt="" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="d-flex align-items-end" key={idx}>
                            <div className="position-relative w-100">
                              <div className="message_two">
                                <div className="message2 position-relative">
                                  <p>{item?.text}</p>
                                  <div className="d-flex justify-content-end mt-2 align-items-center">
                                    {/* <span>
                                      {formatMessageTime(item?.createdAt)}
                                    </span> */}
                                    <img src={senticon} alt="sent" />
                                  </div>
                                </div>
                                <p className="message_time position-absolute">
                                  {formatMessageTime(item?.createdAt)}
                                </p>
                              </div>

                              <div className="position-absolute avatar_img">
                                <img src={chatAvatar} alt="" />
                              </div>
                            </div>

                            {/* <div className="bg_curve_blue1">
                              <div className="bg_curve_white1"></div>
                            </div> */}
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* message type */}
                <div className="type_message">
                  <input
                    type="text"
                    placeholder="Type Something..."
                    className="form-control"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <div className="send_img">
                    <button
                      onClick={handleSendClick}
                      className="bg-none"
                      disabled={!messageText}
                    >
                      <img src={send} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
