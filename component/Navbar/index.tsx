import Link from 'next/link';
import { useRouter } from 'next/router';
import { navigationLinks } from '../../util/data';
import styles from './styles.module.css';

const Navbar = () => {

    const router = useRouter();

    const verifyAciveLink = (loopPath: string) => {

        if(loopPath === '/' && router.pathname !== '/')
            return null;

        return router.pathname.indexOf(loopPath) === 0
                                    ? styles.linkActive
                                    : null
    }

    return (
        <ul className={styles.container}>
            { navigationLinks.map((link, index)=>(
                <li key={index} className={[
                    styles.linkItem,
                    verifyAciveLink(link.path)
                    ].join(' ')}>
                    <Link 
                        href={{
                            pathname: link.path,
                            query: link.query
                        }} 
                    ><a>{link.label}</a></Link>
                </li>
                
            )) }
        </ul>
    );
};

export default Navbar;