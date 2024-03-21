import { useState } from "react";
import { useRouter } from "next/navigation";
export default function organization() {
  const [organizationName, setOrganizationName] = useState("");
  const [organizationURL, setOrganizationURL] = useState("");
  let router = useRouter();

  let handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to new API endpoint
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ organizationName, organizationURL }),
    });
   // router.replace(`organization/${organizationURL}`);
  };

  return (
    <div className="w-full min-h-screen blur-second bg-no-repeat bg-fixed bg-top bg-cover">
      <div className="bg-dimWhite rounded-xl shadow-2xl p-6 max-w-[400px] mx-auto mt-10">
        <h1 className="text-2xl font-poppins font-semibold mb-3 text-black">
          Add new Project
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter organization Name"
          ></input>
          <input
            name="organizationURL"
            value={organizationURL}
            onChange={(e) => setOrganizationURL(e.target.value)}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter organization URL"
          ></input>

          <button
            type="submit"
            className="bg-blue-700 text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 self-center"
          >
            Add to db
          </button>
        </form>
      </div>
    </div>
  );
}
