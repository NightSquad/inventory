import styles from './weight.module.css'

function Weight(props) {
    return ( 
        <p className={styles.weight}><span className={styles.currentWeight}>{props.currentWeight}</span>/{props.totalWeight} кг</p>
    );
}

export default Weight;