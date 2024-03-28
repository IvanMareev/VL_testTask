import React, { useEffect, useState } from 'react';
import styles from './Filtering.module.css';
import { Priority, Tags } from '../../types/global';

export interface FilteringProps {
  onFilteringChange: (priority?: Priority[], tags?: Tags[]) => void;
}

export function Filtering({ onFilteringChange }: FilteringProps) {
  const [selectedPriority, setSelectedPriority] = useState<Priority[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const handleFilteringCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setSelectedPriority(prevState => {
      let updatedPriority: Priority[] = [...prevState];

      if (checked) {
        updatedPriority.push(name as Priority);
      } else {
        updatedPriority = updatedPriority.filter(tag => tag !== name);
      }

      return updatedPriority;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setSelectedTags(prevState => {
      let updatedTags: Tags[] = [...prevState];

      if (checked) {
        updatedTags.push(name as Tags);
      } else {
        updatedTags = updatedTags.filter(tag => tag !== name);
      }

      return updatedTags;
    });
  };

  useEffect(() => {
    if (selectedPriority || selectedTags) {
      onFilteringChange(selectedPriority, selectedTags);
    }
  }, [selectedPriority, selectedTags]);
  return (
    <div className={styles.form}>
      <div className={styles.form__section}>
        <div className={styles.form__title}>ПРИОРИТЕТ</div>
        <div className={styles.form__option}>
          <label>
            <input
              className={styles.form__checkbox}
              type="checkbox"
              onChange={handleFilteringCheckboxChange}
              name={Priority.LOW} />
            {Priority.LOW}
          </label>
        </div>
        <div className={styles.form__option}>
          <label>
            <input
              className={styles.form__checkbox}
              type="checkbox"
              name={Priority.NORMAL}
              onChange={handleFilteringCheckboxChange}
            />
            {Priority.NORMAL}
          </label>
        </div>
        <div className={`${styles.form__option}`}>
          <label>
            <input
              className={styles.form__checkbox}
              type="checkbox"
              name={Priority.HIGH}
              onChange={handleFilteringCheckboxChange}
            />
            {Priority.HIGH}
          </label>
        </div>
      </div>
      <div className={styles.form__section}>
        <div className={styles.form__title}>ОТМЕТКА</div>
        <div className={styles.form__option}>
          <label>
            <input
              type="checkbox"
              className={styles.form__checkbox}
              name={Tags.RESEARCH}
              onChange={handleCheckboxChange}
            />
            {Tags.RESEARCH}
          </label>
        </div>
        <div className={`${styles.form__option} ${styles['form__option']}`}>
          <label>
            <input
              type="checkbox"
              className={styles.form__checkbox}
              name={Tags.DESIGN}
              onChange={handleCheckboxChange}
            />
            {Tags.DESIGN}
          </label>
        </div>
        <div className={`${styles.form__option} ${styles['form__option']}`}>
          <label>
            <input
              type="checkbox"
              className={styles.form__checkbox}
              name={Tags.DEVELOPMENT}
              onChange={handleCheckboxChange}
            />
            {Tags.DEVELOPMENT}
          </label>
        </div>
      </div>
    </div>
  );
}
