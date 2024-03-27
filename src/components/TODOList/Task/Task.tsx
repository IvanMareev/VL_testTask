import React from 'react';
import styles from './Task.module.css'
import { ITask } from '../../../types/global';
import useRelativeTime from '../../../Hooks/useRelativeTime';
import useModal from '../../../Hooks/useModal';
import { TemplateModal } from '../../ModalWin/components';
import { TaskForm } from '../..';



const Task: React.FC<ITask> = ({ id, title, description, createdAt, priority, tags }) => {
  const { isOpen, toggle } = useModal();
  const relativeTime = useRelativeTime(new Date(createdAt));


  return (
    <div className={styles.Task} key={id}>
      <div className="task-header">
        <a onClick={toggle}><h3>{title}</h3></a>
        <TemplateModal isOpen={isOpen} toggle={toggle}>
          <TaskForm task={{ id, title, description, createdAt, priority, tags }} />
        </TemplateModal>
        <p>дата создания: {relativeTime}</p>
        <p>приоритет: {priority}</p>
        <p>Теги: {tags.join(', ')}</p>
      </div>
    </div>
  );
};

export default Task;
