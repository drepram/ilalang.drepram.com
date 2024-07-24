import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

const CreateAuthor: React.FC = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [yearOfLife, setYearOfLife] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      Router.push("/"); // Redirect to home if not authenticated
    }
  }, [session, status]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, profilePicture, yearOfLife, bio };
      const apiUrl = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:3000';
      const method = "POST";

      await fetch(`${apiUrl}/api/author`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center bg-gray-100">
        <form
          onSubmit={submitData}
          className="w-full max-w-lg bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-2xl font-bold mb-6">New Author</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              value={name}
              required
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="Profile Picture URL"
              type="text"
              value={profilePicture}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Year of Life</label>
            <input
              onChange={(e) => setYearOfLife(e.target.value)}
              placeholder="Year of Life"
              type="text"
              value={yearOfLife}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={4}
              value={bio}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              disabled={!name}
              type="submit"
              value="Create"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => Router.push("/")}
              className="text-gray-700 hover:text-gray-900 ml-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateAuthor;
