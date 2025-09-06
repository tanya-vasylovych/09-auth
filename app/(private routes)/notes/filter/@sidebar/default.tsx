import Link from "next/link";
import css from "./SidebarNotes.module.css";

const tagsList: string[] = [
  "All notes",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const Sidebar = () => {
  return (
    <ul className={css.menuList}>
      {tagsList.map((item) => (
        <li className={css.menuItem} key={item}>
          <Link href={`/notes/filter/${item}`} className={css.menuLink}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
