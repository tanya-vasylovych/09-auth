"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { getMe, updateUsername } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const ProfileEditPage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [user, setLocalUser] = useState<{
    username: string;
    email: string;
    avatar: string;
  } | null>(null);
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      setLocalUser(data);
      setUserName(data.username);
    };
    fetchUser();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUsername(username);
      setUser(updatedUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update username", error);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority
        />

        <form
          className={css.profileInfo}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProfileEditPage;
