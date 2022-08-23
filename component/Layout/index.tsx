import { ReactElement } from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.css';

type Props = {
    children: ReactElement
}

const Layout = ({children}: Props) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Meu projeto</h1>
            </header>
            
            <Navbar/>

            <main>{children}</main>
            <footer className={styles.footer}>
                Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default Layout;