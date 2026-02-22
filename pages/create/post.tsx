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
      <div className="flex items-center justify-center py-6">
        <form
          onSubmit={submitData}
          className="form-shell w-full max-w-2xl p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-[#2f241c]">New Post</h1>
          <div className="mb-4">
            <label className="field-label block">Title</label>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              className="field-input"
            />
          </div>
          <div className="mb-4">
            <label className="field-label block">Author</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="field-select"
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
            <label className="field-label block">Content</label>
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
              className="field-textarea"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              disabled={!content || !title}
              type="submit"
              value="Create"
              className="btn-primary"
            />
            <button
              type="button"
              onClick={() => Router.push("/")}
              className="btn-secondary ml-4"
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
