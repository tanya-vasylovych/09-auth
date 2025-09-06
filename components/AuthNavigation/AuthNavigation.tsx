"use client";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import TagsMenu from "../TagsMenu/TagsMenu";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button
              className={css.logoutButton}
              type="button"
              onClick={handleClickLogOut}
            >
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign-In
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign-Up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
