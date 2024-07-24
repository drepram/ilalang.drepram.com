import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

type Author = {
  id: string;
  name: string;
  profilePicture: string;
  yearOfLife: string;
  bio: string;
};

const EditAuthor: React.FC = () => {
  const { data: session, status } = useSession();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
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

  useEffect(() => {
    // Fetch authors
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author`)
        .then((res) => res.json())
        .then((data) => setAuthors(data));
    }
  }, [session]);

  useEffect(() => {
    // Fetch author details when an author is selected
    if (selectedAuthor) {
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author/${selectedAuthor}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data.name);
          setProfilePicture(data.profilePicture || "");
          setYearOfLife(data.yearOfLife || "");
          setBio(data.bio || "");
        });
    }
  }, [selectedAuthor]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, profilePicture, yearOfLife, bio };
      await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author/${selectedAuthor}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAuthor = async () => {
    if (confirm("Are you sure you want to delete this author?")) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author/${selectedAuthor}`, {
          method: "DELETE",
        });
        await Router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!session) {
    return (
      <Layout>
        <h1>Edit Author</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page flex items-center justify-center bg-gray-100">
        <form
          onSubmit={submitData}
          className="w-full max-w-lg bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-2xl font-bold mb-6">Edit Author</h1>
          <div className="mb-4">
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
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
            <input
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="Profile Picture URL"
              type="text"
              value={profilePicture}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <input
              onChange={(e) => setYearOfLife(e.target.value)}
              placeholder="Year of Life"
              type="text"
              value={yearOfLife}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
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
              disabled={!name || !selectedAuthor}
              type="submit"
              value="Update"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={deleteAuthor}
              disabled={!selectedAuthor}
              className="ml-4 bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
          <button
            className="mt-4 text-gray-700 hover:text-gray-900"
            onClick={() => Router.push("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditAuthor;
