import styles from './QuickSlots.module.css'

function QuickSlots() {
    return ( 
        <div style={{alignSelf: 'flex-end'}} className={styles.border}>
            <h2 className={styles.title}>БЫСТРАЯ ПАНЕЛЬ</h2>
            <div className={styles.items}>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                <div className={styles.item}></div>
                    <div className={styles.item}></div>
            </div>
            <div className={styles.buttons}>
                <p className={styles.button}>8</p>
                <p className={styles.button}>7</p>
                <p className={styles.button}>6</p>
                <p className={styles.button}>5</p>
                <p className={styles.button}>4</p>
            </div>
        </div>
    );
}

export default QuickSlots;