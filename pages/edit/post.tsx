import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { useSession, getSession } from "next-auth/react";

type Author = {
  id: string;
  name: string;
};

type Post = {
  id: string;
  title: string;
  published: boolean;
  highlighted: boolean;
};

const EditPost: React.FC = () => {
  const { data: session, status } = useSession();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [newAuthor, setNewAuthor] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      Router.push("/"); // Redirect to home if not authenticated
    }
  }, [session, status]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  useEffect(() => {
    if (selectedAuthor) {
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/author/${selectedAuthor}/posts`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [selectedAuthor]);

  useEffect(() => {
    if (selectedPost) {
      fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/post/${selectedPost}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setPublished(data.published);
          setHighlighted(data.highlighted);
          setSelectedAuthor(data.authorId); // Set the selected author to the post's current author
        });
    }
  }, [selectedPost]);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        title,
        content,
        published,
        highlighted,
        authorId: newAuthor || selectedAuthor,
      };
      await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/post/${selectedPost}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/api/post/${selectedPost}`, {
          method: "DELETE",
        });
        await Router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center py-6">
        <form
          onSubmit={submitData}
          className="form-shell w-full max-w-2xl p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-[#2f241c]">Edit Post</h1>
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
            <label className="field-label block">Post</label>
            <select
              value={selectedPost}
              onChange={(e) => setSelectedPost(e.target.value)}
              disabled={!selectedAuthor}
              className="field-select"
            >
              <option value="">Select a post</option>
              {posts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>
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
          <div className="mb-4">
            <label className="field-label block">Status</label>
            <select
              value={published.toString()}
              onChange={(e) => setPublished(e.target.value === "true")}
              className="field-select"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="field-label block">Highlighted</label>
            <select
              value={highlighted.toString()}
              onChange={(e) => setHighlighted(e.target.value === "true")}
              className="field-select"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="field-label block">
              Change Author (optional)
            </label>
            <select
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
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
          <div className="flex items-center justify-between">
            <input
              disabled={!content || !title || !selectedPost}
              type="submit"
              value="Update"
              className="btn-primary"
            />
            <button
              type="button"
              onClick={deletePost}
              disabled={!selectedPost}
              className="btn-danger ml-4"
            >
              Delete
            </button>
          </div>
          <button
            className="btn-secondary mt-4"
            onClick={() => Router.push("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditPost;
