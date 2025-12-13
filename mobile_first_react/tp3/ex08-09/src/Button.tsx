import styles from "./Button.module.css";

export function Button({
  children,
  style,
  disabled,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  return (
    <button className={styles.button} style={style} disabled={disabled}>
      {children}
    </button>
  );
}
