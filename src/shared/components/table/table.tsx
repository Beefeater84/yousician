import styles from "./table.module.scss";

export default function Table({ children }: { children: React.ReactNode }) {
  return <div className={styles.table}>{children}</div>;
}
