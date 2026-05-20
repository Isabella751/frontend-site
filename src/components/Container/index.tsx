import styles from './styles.module.css';
import type { ReactNode } from "react";
interface ContainerProps {
    children: ReactNode;
}
export function Container({ children }: ContainerProps) {
    //type Script
    return (
        // Estrutura html
        <>
        <div className={styles.container}>
            {children}
        </div>
        </>
    );
}
  