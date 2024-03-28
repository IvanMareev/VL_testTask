import { useState } from 'react';
import styles from './TaskPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TasksState } from '../../types/reduxType/type';
import { useDispatch } from 'react-redux';
import { deleteTask, fetchTaskById } from '../../store/actionCreators';
import { TaskForm } from '..';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';


export function TaskPage() {
  const [isOpen, setIsopen] = useState(false)
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  if (id)
    dispatch(fetchTaskById(id));
  const selectedTask = useSelector((state: TasksState) => state.selectedTask);

  function deleteThisTask() {
    if (id)
      dispatch(deleteTask(id))
    nav('/')

  }

  return selectedTask && isOpen ? <TaskForm task={selectedTask} /> : (selectedTask && <div className={styles.TaskPage}>
    <div className={styles.task}>
      <div className={styles.panel}>
        <div>
          <button className={styles.backBTN} onClick={() => nav('/')}>Назад</button>
          <button onClick={() => setIsopen(true)}>Редактировать</button>
        </div>
        <button onClick={() => deleteThisTask()} className={styles.deleteBTN}>Удалить</button>
      </div>

      <h1 className={styles.title}><span>Название задачи:</span><br></br>{selectedTask.title}</h1>
      <p className={styles.date}><span>Дата создания:</span><br></br>{format(selectedTask.createdAt, "d MMMM yyyy, HH:mm", { locale: ru })}</p>
      <p className={styles.priority}><span>Приоритет:</span><br></br>{selectedTask.priority}</p>
      <p className={styles.tags}><span>Отметки:</span><br></br>{selectedTask.tags.join(', ')}</p>
      <p className={styles.description}><span>Описание:</span><br></br>{selectedTask.description}</p>
    </div>
  </div>);
}
