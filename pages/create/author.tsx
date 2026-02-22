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
  const [description, setDescription] = useState("");

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
      const body = { name, profilePicture, yearOfLife, bio, description };
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
      <div className="flex items-center justify-center py-6">
        <form
          onSubmit={submitData}
          className="form-shell w-full max-w-lg p-8"
        >
          <h1 className="mb-6 text-2xl font-bold text-[#2f241c]">New Author</h1>
          <div className="mb-4">
            <label className="field-label block">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              type="text"
              value={name}
              required
              className="field-input"
            />
          </div>
          <div className="mb-4">
            <label className="field-label block">Profile Picture URL</label>
            <input
              onChange={(e) => setProfilePicture(e.target.value)}
              placeholder="Profile Picture URL"
              type="text"
              value={profilePicture}
              className="field-input"
            />
          </div>
          <div className="mb-4">
            <label className="field-label block">Year of Life</label>
            <input
              onChange={(e) => setYearOfLife(e.target.value)}
              placeholder="Year of Life"
              type="text"
              value={yearOfLife}
              className="field-input"
            />
          </div>
          <div className="mb-4">
            <label className="field-label block">Bio</label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              rows={4}
              value={bio}
              className="field-textarea"
            />
          </div>
          <div className="mb-4">
            <label className="field-label block">Description</label>
            <input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              value={description}
              className="field-input"
            />
          </div>
          <div className="flex items-center justify-between">
            <input
              disabled={!name}
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

export default CreateAuthor;
