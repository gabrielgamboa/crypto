import logoImg from '../../assets/logo.svg'
import styles from './header.module.css'
import { Link } from 'react-router-dom'
export function Header() {
    return (
        <header>
            <div className={styles.container}>
                <Link to="/">
                    <img src={logoImg} alt="logo" />
                </Link>
            </div>
        </header>
    )
}