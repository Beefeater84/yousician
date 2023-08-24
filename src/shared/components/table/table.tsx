import styles from "./table.module.scss";

interface TableProps {
  children: React.ReactNode;
  classes?: string;
}

export default function Table({ children, classes = "" }: TableProps) {
  const tableClasses = `${styles.table} ${classes}`;

  return <div className={tableClasses}>{children}</div>;
}
