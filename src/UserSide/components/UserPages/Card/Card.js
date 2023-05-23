import React from "react";
import styles from './Card.module.css'
import Cards from '../../../images/waste 1.jpeg'

const Card = () => {
    return (
    <div className={styles.card}>
        <img className={styles.cardImage} src={Cards} alt="Card" />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>Reduce, reuse, recycle</h3>
          <p className={styles.cardDescription}>Recycling plays a crucial role in waste management by transforming discarded materials into new products or raw materials. By diverting waste from landfills and utilizing recycled materials, we conserve resources, reduce the extraction of virgin materials, and decrease the energy and emissions associated with manufacturing.</p>
        </div>
      </div>
    );
  };
  
  export default Card;
  