import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Tags from "../../components/Tags";
import {
  successNotification,
  errorNotification,
} from "../../components/Notifications";
import { SERVER_URL } from "../../lib/config";

const EditGuide = (props) => {
  var { ID } = useParams();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [nsfw, setNsfw] = useState();
  const [credits, setCredits] = useState("");
  const [tags, setTags] = useState([]);
  const { username } = useContext(UserContext);

  useEffect(() => {
    const fetchGuide = async () => {
      const req = await fetch(SERVER_URL + "/api/guides/" + ID, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      let data = await req.json();
      if (data.status === "ok") {
        //access the data and then set it as default value for the usestates
        data = data.data;
        setTitle(data.title);
        setLink(data.link);
        setNsfw(data.nsfw);
        setTags(data.tags);
        setCredits(data.credits);
      } else {
        errorNotification("Invalid ID");
        navigate("/guides");
      }
    };
    fetchGuide();
  }, []);

  const navigate = useNavigate();

  async function guideHandler(event) {
    event.preventDefault();

    await fetch(SERVER_URL + "/api/guides/" + ID, {
      method: "PUT",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, link, nsfw, credits, tags, username }),
    }).then((data) => {
      if (data.status === 200) {
        successNotification("Guide successfully updated!");
        navigate("/guides");
      }
      // todo add error properly for guide already exist
      else {
        errorNotification("Guide already exist!");
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="login-header mt-2">
        Edit <span className="text-[#E78EA9]">Guide</span>
      </h1>
      <div>
        <form
          className="login-form"
          onSubmit={guideHandler}
          //also show a message saying link added
        >
          <div className="user-box">
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
          <div className="user-box">
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
              checked={nsfw ? "checked" : ""}
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

export default EditGuide;
