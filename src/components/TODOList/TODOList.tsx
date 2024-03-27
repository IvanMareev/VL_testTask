import { useSelector } from 'react-redux';
import { ISort, ITask, Priority, Tags } from '../../types/global';
import { TasksState } from '../../types/reduxType/type';
import styles from './TODOList.module.css';
import Task from './Task/Task';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export interface TODOListProps {
  sortingType: ISort;
  filters?: { priority?: Priority[], tags?: Tags[] }
}

export function TODOList({ sortingType = ISort.increasing, filters }: TODOListProps) {
  const navigate = useNavigate();
  const [tasksToShow, setTasksToShow] = useState(15);
  const tasksToLoad = 15;
  const lastTaskRef = useRef<HTMLDivElement>(null);
  const tasks: ITask[] = useSelector(
    (state: TasksState) => state.tasks
  )
  const [processedTasks, setProcessedTasks] = useState<ITask[]>(tasks);

  useEffect(() => {
    let filteredTasks = tasks.slice();


    filteredTasks = filteredTasks.filter(task => {
      if (filters && filters.priority && filters.priority.length > 0) {
        return filters.priority.includes(task.priority);
      } else {
        return true;
      }
    });


    filteredTasks = filteredTasks.filter(task => {
      if (filters && filters.tags && filters.tags.length > 0) {
        return filters.tags.every(tag => task.tags.includes(tag));
      } else {
        return true;
      }
    });



    if (sortingType === ISort.decreasing) {
      filteredTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      filteredTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setProcessedTasks(filteredTasks);
  }, [tasks, filters, sortingType]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setTasksToShow(tasksToShow + tasksToLoad);
    }

    if (lastTaskRef.current) {
      const rect = lastTaskRef.current.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight) {
        setTasksToShow(tasksToShow + tasksToLoad);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tasksToShow]);

  return (
    <div className={styles.TODOList}>
      <button onClick={() => navigate("add_task")}>Добавить задачу</button>
      {processedTasks.slice(0, tasksToShow).map((task: ITask, index) => (
        <div ref={index === processedTasks.length - 1 ? lastTaskRef : null} key={task.id}>
          <Link className={styles.link} to={`/tasks/${task.id}`}>
            <Task
              id={task.id}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
              priority={task.priority}
              tags={task.tags}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}