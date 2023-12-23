import { useNavigate } from "react-router-dom";
import profile from "../../../assets/chatprofile.png";
import { useGetUserAllConversationsQuery } from "../../../features/chat/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessageUser } from "../../../features/chat/chatSlice";

const ChatProfiles = ({ user, searchText }) => {
  const { data } = useGetUserAllConversationsQuery(user?._id);
  const { selectedMsgUser } = useSelector((state) => state.chat);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleFilter = (data) => {
    if (searchText) {
      const searchName = `${data?.first_name + " " + data?.last_name}`;
      return searchName
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    } else {
      return true;
    }
  };

  const handleClick = (userData) => {
    dispatch(setSelectedMessageUser(userData));
    navigate(`/dashboard/messages/${userData?._id}`);
  };
  return (
    <>
      <div className="profiles_list">
        <h6>Messages</h6>

        {data &&
          data?.length > 0 &&
          data.filter(handleFilter).map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(item)}
              style={{ cursor: "pointer" }}
              className={`${selectedMsgUser?._id === item?._id && "bg-light"} `}
            >
              <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
                <div className="d-flex align-items-start gap-3">
                  <div>
                    <img src={profile} alt="profile" />
                  </div>
                  <div>
                    <h5>
                      {item?.first_name} {item?.last_name}
                    </h5>
                    {/* <span>Yeah, I’m done with it...</span> */}
                  </div>
                </div>

                <div>{/* <p>12:34</p> */}</div>
              </div>
              <hr className="chat_line" />
            </div>
          ))}
        {/* <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
          <div className="d-flex align-items-start gap-3">
            <div>
              <img src={profile} alt="profile" />
            </div>
            <div>
              <h5>Abram Korsgaard</h5>
              <span>Yeah, I’m done with it...</span>
            </div>
          </div>

          <div>
            <p>12:34</p>
          </div>
        </div>
        <hr className="chat_line" />
        <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
          <div className="d-flex align-items-start gap-3">
            <div>
              <img src={profile} alt="profile" />
            </div>
            <div>
              <h5>Abram Korsgaard</h5>
              <span>Yeah, I’m done with it...</span>
            </div>
          </div>

          <div>
            <p>12:34</p>
          </div>
        </div>
        <hr className="chat_line" />
        <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
          <div className="d-flex align-items-start gap-3">
            <div>
              <img src={profile} alt="profile" />
            </div>
            <div>
              <h5>Abram Korsgaard</h5>
              <span>Yeah, I’m done with it...</span>
            </div>
          </div>

          <div>
            <p>12:34</p>
          </div>
        </div>
        <hr className="chat_line" />
        <div className="d-flex align-items-start chat_wrapper justify-content-between w-100 ">
          <div className="d-flex align-items-start gap-3">
            <div>
              <img src={profile} alt="profile" />
            </div>
            <div>
              <h5>Abram Korsgaard</h5>
              <span>Yeah, I’m done with it...</span>
            </div>
          </div>

          <div>
            <p>12:34</p>
          </div>
        </div> */}
        {/* <hr className='chat_line' /> */}
      </div>
    </>
  );
};

export default ChatProfiles;
