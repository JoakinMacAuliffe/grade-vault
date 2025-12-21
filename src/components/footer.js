import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        Made by <Link
          href="https://github.com/JoakinMacAuliffe"
          style={{ textDecoration: "none", color: "inherit", textUnderlineOffset: "4px" }}
        >
          Joakin Mac Auliffe
        </Link>
      </div>
    </footer>
  );
}