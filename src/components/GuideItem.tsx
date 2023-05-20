import { Badge } from "@mantine/core";
import type { GuideType } from "@/pages/guides";
import Head from "next/head";

const GuideItem: React.FC<{ data: GuideType }> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Guides</title>
      </Head>
      <div className="guide-item my-2 border-[0.025px] border-gray-900 rounded-xl px-4 py-2">
        <div>
          <div className="flex justify-between items-center pt-2">
            <a
              className="inline"
              style={{ fontSize: "1.1rem" }}
              target="_blank"
              href={data.link}
              rel="noreferrer"
            >
              {data.title} {data.nsfw && <Badge color="red">NSFW</Badge>}
            </a>
          </div>

          <div className="flex items-center gap-2">
            {data.tags &&
              data.tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}

            {data.credits && <p className="m-0">🙏 {data.credits}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default GuideItem;

// const editLink = async (e) => {
//   let idToEdit = e.target.id;
//   navigate("/guides/edit/" + idToEdit);
// };

// const deleteLink = async (e) => {
//   let idToDelete = e.target.id;

//   const req = await fetch(SERVER_URL + "/api/guides/" + idToDelete, {
//     method: "DELETE",
//     headers: { "x-access-token": localStorage.getItem("token") },
//   });
//   const data = await req.json();
//   if (data.status === "ok") {
//     updateData((prevData) =>
//       prevData.filter((link) => link._id !== data.deletedGuide._id)
//     );
//   }
// };

/* {username && (data.owner === username || isAdmin) && (
                <div className="flex mr-2">
                  <svg
                    id={data._id}
                    onClick={editLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={data._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>

                  <svg
                    id={data._id}
                    onClick={deleteLink}
                    width="24"
                    height="24"
                    stroke="grey"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id={data._id}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </div>
              )} */
