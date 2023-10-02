import { BiSearch } from 'react-icons/bi'
import styles from './home.module.css'

export function Home() {
    return (
        <main className={styles.container}>
            <form className={styles.form}>
                <input placeholder="Digite o nome da moeda" type="text" />
                <button>
                    <BiSearch size={30} color="#FFF"/>
                </button>
            </form>
        </main>
    )
}