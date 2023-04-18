import { useEffect, useState, useContext } from "react";
import "../styles/guides.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { formatName } from "../lib/helper";
import { category_channels } from "../lib/CONSTANTS";
import { Modal } from "@mantine/core";
import { SERVER_URL } from "../lib/config";
import { successNotification, errorNotification } from "./Notifications";

const LinkQueueModal = ({
  idToEdit,
  deleteLink,
  opened,
  setOpened,
  submittedLinks,
  setSubmittedLinks,
}) => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [channel, setChannel] = useState();

  const deleteInsideModal = () => {
    deleteLink(null, idToEdit);
    opened(false);
  };

  useEffect(() => {
    if (!username) {
      errorNotification("Require admin access");
      navigate("/link-queue");
    }
    const fetchSubmitLink = async () => {
      const res = await fetch(SERVER_URL + "/api/link-queue/" + idToEdit, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      const data = await res.json();
      const modalData = data.data;
      setTitle(modalData?.title);
      setLink(modalData?.link);
      setDescription(modalData?.description);
      setCategory(modalData?.category);
      setChannel(modalData?.channel);
    };
    fetchSubmitLink();
  }, [username, idToEdit]);

  async function linkHandler(event) {
    event.preventDefault();
    let updateData = {
      title,
      link,
      description,
      category,
      channel,
    };

    const data = await fetch(SERVER_URL + `/api/link-queue/${idToEdit}`, {
      method: "PUT",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updateData),
    });

    if (data.status === 200) {
      successNotification("Link updated!");
      opened(false);

      let entryToUpdate = submittedLinks.find((item) => item._id === idToEdit);

      let newSubmittedLinks = submittedLinks.filter(
        (item) => item._id !== idToEdit
      );

      newSubmittedLinks = [
        ...newSubmittedLinks,
        { ...entryToUpdate, ...updateData },
      ];
      setSubmittedLinks(newSubmittedLinks);
    } else {
      errorNotification("Something went wrong!!");
    }
  }

  return (
    <div>
      <Modal
        radius="md"
        size="lg"
        transition="fade"
        transitionDuration={600}
        centered
        lg
        overlayOpacity={0.55}
        overlayBlur={3}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <h1 className="login-header mt-2 pl-10">
            <span style={{ color: "#8ad6b0" }}>Update </span>Link
          </h1>
        }
      >
        <div className="p- flex flex-col items-center p-4">
          <div>
            <form className="login-form" onSubmit={linkHandler}>
              <div className="user-box ">
                <input
                  className="input-text"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
                />
                <label className="">Title</label>
              </div>
              <div className="user-box ">
                <input
                  className="input-text"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required={true}
                />
                <label className="">Link</label>
              </div>
              <div className="user-box ">
                <input
                  className="input-text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required={true}
                />
                <label className="">Description (Notes)</label>
              </div>
              <select
                className="form-select p-0 ps-1 rounded-sm mb-1 bg-[#60001f] border-gray-900"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                // defaultValue={category   }
              >
                <option value={null}>Select Category</option>

                {category_channels.map((item, index) => (
                  <option key={index} value={item.category}>
                    {formatName(item.category)}
                  </option>
                ))}
              </select>
              {category && (
                <select
                  className="form-select p-0 ps-1 rounded-sm mb-1 bg-[#60001f] border-gray-900"
                  name="channel"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                >
                  <option value={null}>Select Channel</option>
                  {category &&
                    category_channels.find(
                      (item) => item.category === category
                    ) &&
                    category_channels
                      .find((item) => item.category === category)
                      .channels.map((channel) => (
                        <option value={channel}>{formatName(channel)}</option>
                      ))}
                </select>
              )}
              <input
                className="block py-2 submit-btn"
                value="Update"
                type="submit"
              />
              <button
                className="block py-2 submit-btn text-red-500 mt-1"
                onClick={deleteInsideModal}
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default LinkQueueModal;
