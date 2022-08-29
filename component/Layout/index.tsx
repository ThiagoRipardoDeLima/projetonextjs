import { signIn, useSession } from 'next-auth/react';
import { ReactElement } from 'react';
import Navbar from '../Navbar';
import styles from './styles.module.css';

type Props = {
    children: ReactElement
}

const Layout = ({children}: Props) => {
    const {data: session, status: statusSession} = useSession();

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                    <h1>Meu projeto</h1>
            </header>

            {statusSession === 'loading' &&
                <div>Carregando</div>
            }

            {statusSession === 'unauthenticated' &&
                <div>Usuário não logado!</div>
            }

            {session &&
                [
                    <Navbar/>,
                    <main>{children}</main>
                ]
            }

            {!session &&
                <main><button onClick={ () => { signIn() }}>Fazer login</button></main>
            }
            
            <footer className={styles.footer}>
                Todos os direitos reservados.
            </footer>
        </div>
    );
};

export default Layout;