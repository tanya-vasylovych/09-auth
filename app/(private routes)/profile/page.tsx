import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getMe();

  return {
    title: `${user.username} - NoteHub`,
    description: "An application for note-taking and organization",
    openGraph: {
      title: `${user.username} - NoteHub`,
      description: "An application for note-taking and organization",
      url: "https://09-auth-2fvb.vercel.app/",
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username} avatar`,
        },
      ],
    },
  };
}

const Profile = async () => {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
