import React from 'react';

import styles from './Sorting.module.css';
import { ISort } from '../../types/global';

export interface SortingProps {
  onSortChange: (type: ISort) => void;
}

export function Sorting({ onSortChange }: SortingProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sortType: ISort = e.target.value === 'decreasing' ? ISort.decreasing : ISort.increasing;
    onSortChange(sortType);
  };
  return (
    <div className={styles.sorting}>
      <h3 className={styles.priority__title}>СОРТИРОВКА</h3>
      <label className={styles.sorting__label}>
        <input
          type="radio"
          name="sort"
          className={styles.sorting__option}
          onChange={handleSortChange}
          value={ISort.decreasing}
          defaultChecked

        />
        <span className={styles.checkmark}></span>
        Старые
      </label>
      <label className={styles.sorting__label}>
        <input
          type="radio"
          name="sort"
          className={styles.sorting__option}
          onChange={handleSortChange}
          value={ISort.increasing}
        />
        <span className={styles.checkmark}></span>
        Новые
      </label>
    </div>
  );
}
