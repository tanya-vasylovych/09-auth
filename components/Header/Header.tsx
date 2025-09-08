import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthProvider from "../AuthProvider/AuthProvider";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const Header = () => {
  return (
    <AuthProvider>
      <header className={css.header}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </header>
    </AuthProvider>
  );
};

export default Header;
