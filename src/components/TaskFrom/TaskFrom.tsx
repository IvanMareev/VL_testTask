import React, { useState, useEffect } from 'react';
import { ITask, Priority, Tags } from '../../types/global';
import styles from './TaskFrom.module.css';
import { addTask, editTask } from '../../store/actionCreators';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export interface TaskFormProps {
  task?: ITask;
}

export function TaskForm({ task }: TaskFormProps) {
  const nav = useNavigate();
  const [isTouched, setIsTouched] = useState(false)
  const [formError, setFormError] = useState<string>('');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<ITask>({
    id: task ? task.id : uuidv4(),
    title: task ? task.title : '',
    description: task ? task.description : '',
    createdAt: task ? task.createdAt : new Date(),
    priority: task ? task.priority : Priority.LOW,
    tags: task ? task.tags : [],
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setIsTouched(true)

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      priority: value as Priority,
    }));
  };


  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTags = Array.from(e.target.selectedOptions, option => option.value);
    console.log(selectedTags)

    setFormData(prevState => ({
      ...prevState,
      tags: selectedTags as Tags[],
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData.title.trim()) {
      setFormError('У задачи обязательно должно быть название');
      return;
    } else if (!formData.description.trim()) {
      setFormError('У задачи обязательно должно быть описание');
      return; 
    }
    setFormError('');
  
    if (task) {
      dispatch(editTask(task.id, formData));
    } else {
      dispatch(addTask(formData));
    }
    nav("/");
  };
  


  return (
    <div className={styles.TaskForm}>
      {task && <button onClick={() => location.reload()}>назад</button>}
      <h2>{!task ? 'Создать задачу' : 'Редактировать задачу'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder='Введите название вашей задачи'
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {!formData.title.trim() && isTouched && <span className={styles.error}>{formError}</span>}

        <label>Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handlePriorityChange}
        >
          {Object.values(Priority).map(priority => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <label>Tags:</label>
        <select
          className={styles.selectTags}
          multiple
          name="tags"
          value={formData.tags}
          onChange={handleMultiSelectChange}
        >
          {Object.values(Tags).map(tag => (
            <option key={tag} value={tag} >
              {tag}
            </option>
          ))}
        </select>

        <label>Description:</label>
        <textarea
          name="description"
          placeholder='Введите описание вашей задачи'
          value={formData.description}
          onChange={handleChange}
        />
        {!formData.description.trim() &&  <span className={styles.error}>{formError}</span>} 
        <button type="submit">{task ? 'Редактировать задачу' : 'Сохранить'}</button>
      </form>
    </div>
  );
}
