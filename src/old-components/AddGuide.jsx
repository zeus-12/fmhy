import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Tags from "../../components/Tags";
import {
  notSignedInNotification,
  successNotification,
  errorNotification,
} from "../../components/Notifications";

const AddGuide = () => {
  const SERVER_URL = "";

  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [nsfw, setNsfw] = useState("");
  const [credits, setCredits] = useState("");

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!username) {
      notSignedInNotification("Login inorder to add Guides!");
      navigate("/guides");
    }
  }, [username]);

  async function guideHandler(event) {
    event.preventDefault();

    const data = await fetch(SERVER_URL + "/api/guides", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, nsfw, username, tags, credits }),
    });
    // const data = await response.json();

    if (data.status === 200) {
      successNotification("Guide Added Successfuly!");
      navigate("/guides");
    } else {
      errorNotification("Guide already exist!");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="login-header mt-2">
        Add <span style={{ color: "#E78EA9" }}>Guide</span>
      </h1>
      <div>
        <form className="login-form" onSubmit={guideHandler}>
          <div className="user-box ">
            <input
              className="input-text"
              id="guideName"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
            <label>Guide Title</label>
          </div>
          <div className="user-box">
            <input
              className="input-text"
              id="guideLink"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required={true}
            />
            <label>Guide Link</label>
          </div>
          <div className="user-box ">
            <input
              className="input-text"
              id="credits"
              type="text"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
            />
            <label>Credits</label>
          </div>
          <Tags tags={tags} setTags={setTags} />
          <div className="flex justify-start items-center">
            <input
              className="mr-1"
              type="checkbox"
              name="nsfw"
              value={nsfw}
              onChange={(e) => setNsfw(e.target.checked)}
            />{" "}
            NSFW
          </div>
          <input
            className="block py-2 submit-btn"
            value="Submit"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default AddGuide;
