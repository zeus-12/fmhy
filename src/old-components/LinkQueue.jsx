import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  successNotification,
  errorNotification,
} from "../../components/Notifications";
import "../styles/guides.css";
import LinkQueueModel from "../../components/LinkQueueModal";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { SERVER_URL } from "../../lib/config";

const LinkQueue = () => {
  const { isAdmin } = useContext(UserContext);
  const [opened, setOpened] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  const [submittedLinks, setSubmittedLinks] = useState([]);

  const modalHandler = async (e, id) => {
    setIdToEdit(e.target.id);
    setOpened(true);
  };
  const deleteLink = async (e, id) => {
    if (id) {
      var idToDelete = id;
    } else {
      idToDelete = e.target.id;
    }

    const req = await fetch(SERVER_URL + "/api/link-queue/" + idToDelete, {
      method: "DELETE",
      headers: { "x-access-token": localStorage.getItem("token") },
    });
    const data = await req.json();
    if (data.status === "ok") {
      setSubmittedLinks((prevData) =>
        prevData.filter((link) => link._id !== data.deletedSubmittedLink._id)
      );
      successNotification("Successfully deleted!");
    } else {
      errorNotification("Couldn't delete the link!");
    }
  };
  useEffect(() => {
    const fetchLinks = async () => {
      const req = await fetch(SERVER_URL + "/api/link-queue");
      let data = await req.json();
      setSubmittedLinks(data.data);
    };

    fetchLinks();
  }, []);
  return (
    <div className="p-2 pt-0">
      <div className="flex justify-between items-center">
        <p className="p-2 ps-4 mb-0 tex-gray-300 text-3xl font-semibold tracking-tight">
          Link Queue
        </p>
        <Link to="/submit-link">
          <Button variant="light" color="grape">
            Submit Link
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap">
        {submittedLinks?.map((link) => {
          return (
            <div
              className="mb-3 p-2 block mr-2 guide-item"
              style={{ borderRadius: "5px", verticalAlign: "top" }}
              key={link._id}
            >
              <p className="" style={{ color: "#5BA9E7" }}>
                {link.title}
              </p>

              {link.description && <p className="m-0">{link.description}</p>}

              <a href={link.link}>{link.link}</a>

              <p className="">
                🙏
                <span
                  className="px-2 py-1"
                  style={{
                    borderRadius: "2rem",
                    backgroundColor: "#aec5e8",
                    color: "black",
                  }}
                >
                  {link.username}
                </span>
              </p>
              <div className="flex pt-2">
                {/* category */}
                {link.category && (
                  <p className="m-0 tag me-2">{link.category}</p>
                )}

                {/* channel */}
                {link.channel && <p className="m-0 tag">{link.channel}</p>}
              </div>
              {/* delete and edit icon	 */}
              {isAdmin && (
                // add a tick svg inside to add it to the selected channel
                <div className="flex mr-2">
                  {/* edit */}
                  {/* uncomment for edit */}
                  <svg
                    id={link._id}
                    onClick={modalHandler}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={link._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>

                  {/* delete */}

                  <svg
                    id={link._id}
                    onClick={deleteLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={link._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {opened && (
        <LinkQueueModel
          opened={opened}
          setOpened={setOpened}
          idToEdit={idToEdit}
          deleteLink={deleteLink}
          submittedLinks={submittedLinks}
          setSubmittedLinks={setSubmittedLinks}
        />
      )}
    </div>
  );
};

export default LinkQueue;
