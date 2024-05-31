/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import chatAvatar from "../../../assets/avatar.png";
import messageProfile from "../../../assets/coach_img.png";
import mDetails from "../../../assets/m_details.svg";
import send from "../../../assets/send-icon.svg";
import { useGetUserByIdQuery } from "../../../features/auth/authApi";
import {
  chatApi,
  useAddMessagesMutation,
  useCreateConversationMutation,
} from "../../../features/chat/chatApi";
import {
  setConversationId,
  setMessages,
  setSelectedMessageUser,
} from "../../../features/chat/chatSlice";
import { useCreateNotificationMutation } from "../../../features/notification/notificationApi";
import { formatMessageTime } from "../../../utils/formateChatTIme";
import ChatProfiles from "./ChatProfiles";
import "./Message.css";

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

  //person who send message
  // console.log("messageUser", messageUser);

  // person who receved the message
  // console.log("selectedMsgUser", selectedMsgUser);

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
                  <h3>All Messages</h3>
                  <div className="form-group has-search1">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>

                  <ChatProfiles
                    messages={messages}
                    user={user}
                    searchText={searchText}
                  />
                </div>
              </div>
            </div>

            <div className={`col-lg-9 d-flex`}>
              <div className="messaging" style={{ width: "100%" }}>
                <div className="mplayer_info d-flex justify-content-between align-content-center mb-4">
                  <div className=" d-flex align-items-center gap-4">
                    <div className="person_img">
                      <img
                        style={{ borderRadius: "100%" }}
                        src={`${import.meta.env.VITE_FILE_ROOT_PATH}/${
                          selectedMsgUser?.image
                        }`}
                        alt="message-profile"
                      />
                    </div>
                    <div className="person_name">
                      <h2 onClick={close} className="pointer">
                        {selectedMsgUser?.first_name}{" "}
                        {selectedMsgUser?.last_name}
                      </h2>
                      <p>{selectedMsgUser?.role}</p>
                    </div>
                  </div>
                  <button className="bg-transparent">
                    <img src={mDetails} alt="details-icon" />
                  </button>
                </div>

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
                              <div className="position-absolute avatar_img2 ">
                                <img
                                  style={{
                                    height: "35px",
                                    width: "35px",
                                    borderRadius: "100%",
                                  }}
                                  src={
                                    selectedMsgUser?.image
                                      ? `${
                                          process.env.NODE_ENV !== "production"
                                            ? import.meta.env.VITE_LOCAL_API_URL
                                            : import.meta.env.VITE_LIVE_API_URL
                                        }/api/v1/uploads/${
                                          selectedMsgUser?.image
                                        }`
                                      : chatAvatar
                                  }
                                  alt=""
                                />
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
                                    {/* <img src={senticon} alt="sent" /> */}
                                  </div>
                                </div>
                                <p className="message_time position-absolute">
                                  {formatMessageTime(item?.createdAt)}
                                </p>
                              </div>

                              <div className="position-absolute avatar_img">
                                {/* <img src={chatAvatar} alt="" /> */}
                                <img
                                  style={{
                                    height: "35px",
                                    width: "35px",
                                    borderRadius: "100%",
                                  }}
                                  src={
                                    user?.image
                                      ? `${
                                          process.env.NODE_ENV !== "production"
                                            ? import.meta.env.VITE_LOCAL_API_URL
                                            : import.meta.env.VITE_LIVE_API_URL
                                        }/api/v1/uploads/${user?.image}`
                                      : chatAvatar
                                  }
                                  alt="Avater"
                                />
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
                  {/* 
                  <div className="upload_img">
                    <div>
                      <label htmlFor="upload">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none">
                          <path
                            d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z"
                            fill="#2B3674"
                          />
                        </svg>
                      </label>
                    </div>

                    <div>
                      <input
                        id="upload"
                        type="file"
                        className="bg-none d-none"
                      />
                    </div>
                  </div> */}
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
