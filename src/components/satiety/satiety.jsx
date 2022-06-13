import styles from './satiety.module.css'

function Satiety() {
    return ( 
        <div className={styles.satiety}>
            <div className={styles.title}>ГОЛОД</div>
                <div className={styles.indicators}>
                    <div className={[styles.indicator, styles.eat].join(" ")}></div>
                    <div className={[styles.indicator, styles.water].join(" ")}></div>
                </div>
        </div>
    );
}

export default Satiety;