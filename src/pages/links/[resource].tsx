import ReactMarkdown from "react-markdown";
import { formatName } from "@/lib/helper";
import { SERVER_URL } from "@/lib/config";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { errorNotification } from "@/components/Notifications";

const Links = () => {
  const router = useRouter();
  const resource = router.query.resource as string;

  const fetchDataFromReddit = async () => {
    const url = SERVER_URL + "/api/wiki/" + resource;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const prev = data.data;
      const finalData = prev.substring(prev.indexOf("# ►"));
      return finalData;
    } catch (err) {
      errorNotification("Error fetching data!");
    }
  };

  const {
    data: resources,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["links"],
    enabled: !!resource,
    queryFn: fetchDataFromReddit,
  });

  return (
    <div className="resources p-4 pt-0">
      {error ? <p className="text-red-500">Error fetching data!</p> : <></>}
      <p
        className="text-capitalize mb-0 tracking-tight font-semibold"
        style={{ fontSize: "2rem" }}
      >
        {!error ? formatName(resource) : ""}
      </p>

      {isLoading ? <p className="text-gray-500">Loading...</p> : <></>}
      {/* @ts-ignore */}
      <ReactMarkdown>{resources}</ReactMarkdown>
    </div>
  );
};

export default Links;
