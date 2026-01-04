import styles from "./header.module.css";
import LogoutButton from "./logout_button";
import { isLoggedIn } from "../lib/auth-helpers";
import Link from "next/link";

export default async function Header() {
  const loggedIn = await isLoggedIn();

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {loggedIn && <LogoutButton />}
        <Link href="/" className={styles.headerTitle}>Grade Vault</Link>
      </div>
    </header>
  );
}
