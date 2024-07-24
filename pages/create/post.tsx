import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

type Author = {
  id: string;
  name: string;
};

const CreatePost: React.FC = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [content, setContent] = useState("");

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

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content, author: selectedAuthor };
      await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/post`, {
        method: "POST",
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
      <div className="flex items-center justify-center  bg-gray-100">
        <form
          onSubmit={submitData}
          className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8"
        >
          <h1 className="text-2xl font-bold mb-6">New Post</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
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
            <label className="block text-gray-700">Content</label>
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
              className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              disabled={!content || !title}
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

export default CreatePost;
