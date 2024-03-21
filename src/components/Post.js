import { useState } from "react";
export default function post() {
  const [projectName, setProjectName] = useState("");
  const [projectURL, setprojectURL] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to new API endpoint
    const res = await fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ projectName, projectURL }),
    });
  };

  return (
    <div className="w-full min-h-screen blur-second bg-no-repeat bg-fixed bg-top bg-cover">
      <div className="bg-dimWhite rounded-xl shadow-2xl p-6 max-w-[400px] mx-auto mt-10">
        <h1 className="text-2xl font-poppins font-semibold mb-3 text-black">
          Add new Project
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter Project Name"
          ></input>
          <input
            name="ProjectURL"
            value={projectURL}
            onChange={(e) => setprojectURL(e.target.value)}
            className="border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            placeholder="Enter project URL"
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
