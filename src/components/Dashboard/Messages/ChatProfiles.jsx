import { useNavigate } from "react-router-dom";
import profile from "../../../assets/chatprofile.png";
import { useGetUserAllConversationsQuery } from "../../../features/chat/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessageUser } from "../../../features/chat/chatSlice";
import { formatMessageTime } from "../../../utils/formateChatTIme";
import moment from "moment";

const ChatProfiles = ({ user, searchText, messages }) => {
  const { data } = useGetUserAllConversationsQuery(user?._id);
  const { selectedMsgUser } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleFilter = (data) => {
    if (searchText) {
      const searchName = `${data?.first_name + " " + data?.last_name}`;
      return (
        searchName
          .toLocaleLowerCase()
          // eslint-disable-next-line react/prop-types
          .includes(searchText.toLocaleLowerCase())
      );
    } else {
      return true;
    }
  };

  // console.log("messages", messages);
  // console.log("data", data[data.length - 1]);

  const handleClick = (userData) => {
    dispatch(setSelectedMessageUser(userData));
    navigate(`/dashboard/messages/${userData?._id}`);
  };
  return (
    <>
      <div className="profiles_list">
        {/* <h6>Messages</h6> */}
        {/* <p
          className="text-base fw-normal"
          style={{ color: "#8593BC", marginTop: "50px" }}>
          Pinned
        </p> */}
        {data &&
          data?.length > 0 &&
          data.filter(handleFilter).map((item, idx) => {
            return item?.message !== 0 ? (
              <div
                key={idx}
                onClick={() => handleClick(item)}
                style={{ cursor: "pointer" }}
                className={`${
                  selectedMsgUser?._id === item?._id && "bg-light rounded"
                } px-2 py-2 my-2`}
              >
                <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
                  <div className="d-flex align-items-center gap-3 w-100 h-100">
                    <div className="d-flex gap-2">
                      <img
                        src={
                          item?.image
                            ? `${
                                process.env.NODE_ENV !== "production"
                                  ? import.meta.env.VITE_LOCAL_API_URL
                                  : import.meta.env.VITE_LIVE_API_URL
                              }/api/v1/uploads/${item?.image}`
                            : profile
                        }
                        alt="profile"
                        style={{
                          height: "49px",
                          width: "49px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />

                      <h5>
                        {item?.first_name} {item?.last_name}
                        <br />
                        <span>
                          {messages?.length > 0 &&
                            messages[messages?.length - 1].text}
                        </span>
                      </h5>
                    </div>
                  </div>

                  <div>
                    <p className="pt-2">
                      {moment(
                        messages?.length > 0 &&
                          messages[messages?.length - 1].createdAt
                      )
                        .format("LT")
                        .slice(0, 5)}
                    </p>{" "}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            );
          })}
      </div>
    </>
  );
};

export default ChatProfiles;
