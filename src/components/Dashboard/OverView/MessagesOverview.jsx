import { Link } from "react-router-dom";
import profile from "../../../assets/chatprofile.png";

import starmessagegreen from "../../../assets/starmessagegreen.png";
import chatmessage from "../../../assets/chatmessage.png";
import startmessage from "../../../assets/startmessage.png";

import { useGetUserAllConversationsQuery } from "../../../features/chat/chatApi";
import { useSelector } from "react-redux";
import React, { useState } from "react";

const chatData = [
  {
    name: "Abram Korsgaard",
    message: "Yeah, I’m done with it...",
    time: "12:34",
    profile: profile,
  },
  {
    name: "John Doe",
    message: "Hello there!",
    time: "13:45",
    profile: profile,
  },
  {
    name: "Abram Korsgaard",
    message: "Yeah, I’m done with it...",
    time: "12:34",
    profile: profile,
  },
  {
    name: "John Doe",
    message: "Hello there!",
    time: "13:45",
    profile: profile,
  },
  {
    name: "John Doe",
    message: "Hello there!",
    time: "13:45",
    profile: profile,
  },
];
const MessagesOverview = () => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetUserAllConversationsQuery(user?._id);
  const [imageSrc, setImageSrc] = useState(startmessage); // Initial image source state
  const [isBookmarked, setIsBookmarked] = useState(false); // Initial bookmark state

  const handleClick = () => {
    // Toggle the image source and bookmark state upon click
    if (!isBookmarked) {
      setImageSrc(starmessagegreen);
    } else {
      setImageSrc(startmessage);
    }
    setIsBookmarked(!isBookmarked);
  };

  // console.log(data, "dfdff");
  return (
    <div>
      <div className="job_offer_overrview_wrapper p-0">
        <div className="d-flex justify-content-between message_overview_header">
          <h4>Messages</h4>
          {data?.length > 0 && <Link to="/dashboard/messages">View More</Link>}
        </div>

        <div className="messages_list">
          {data && data?.length > 0 ? (
            data.slice(1, 4).map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className="d-flex align-items-start justify-content-between chat_wrapper mt-3"
                  key={index}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div>
                      <img
                        src={
                          item?.image
                            ? `${process.env.NODE_ENV !== "production"
                              ? import.meta.env.VITE_LOCAL_API_URL
                              : import.meta.env.VITE_LIVE_API_URL
                            }/api/v1/uploads/${item?.image}`
                            : profile
                        }
                        alt="profile"
                        style={{
                          height: "46px",
                          width: "46px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="font-500">
                        {item.first_name}
                        {/* {item?.last_name} */}
                      </h5>
                      <span>  @adelapark</span>
                    </div>
                  </div>

                  <div className="d-flex" style={{ gap: "20px" }}>
                    <img style={{ height: "19px", width: "19px" }} src={chatmessage} alt="chatmessage" />
                    {/* <img style={{ height: "19px", width: "19px" }} src={startmessage} alt="startmessage" /> */}
                    <img
                      style={{ height: "19px", width: "19px" }}
                      src={imageSrc}
                      alt="startmessage"
                      onClick={handleClick}
                    />
                  </div>
                </div>
                {index !== chatData.length - 1 && (
                  <hr className="message_overview_hr" />
                )}
              </React.Fragment>
            ))
          ) : (
            <div className="d-flex justify-content-center py-5">
              No messages found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesOverview;
