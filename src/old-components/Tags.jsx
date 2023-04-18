import "../styles/guides.css";
import { errorNotification } from "../components/Notifications";

const Tags = ({ tags, setTags }) => {
  const addTags = async (event) => {
    if (tags.length >= 3) {
      errorNotification("Max 3 tags per guide");

      event.target.value = "";

      return;
    }

    if (
      event.target.value.trim() !== "" &&
      event.target.value.trim().length < 9
    ) {
      await setTags((prevTags) => [...prevTags, event.target.value.trim()]);
      event.target.value = "";
    } else if (event.target.value.trim().length > 8) {
      errorNotification("Max 8 characters for tag name");

      event.target.value = "";
    }
  };
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-col-reverse">
      <ul className="tags" style={{ listStyleType: "none" }}>
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className="tag-title">{tag.toLowerCase()}</span>
            <span className="tag-close-icon" onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>

      <input
        type="text"
        className="tags-input"
        placeholder="Hit space to add Tags"
        onKeyUp={(e) => (e.key === " " ? addTags(e) : null)}
      ></input>
    </div>
  );
};

export default Tags;
