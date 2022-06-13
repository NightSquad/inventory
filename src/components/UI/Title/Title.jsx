import styles from './Title.module.css'

function Title(props) {
    return ( 
        <p {...props} data-justify={props.justify} className={styles.title} data-content={props.children}>{props.children}</p>
    );
}

export default Title;