
import { Filtering, Sorting, TODOList, TaskForm, TaskPage } from './components';
import { Provider } from 'react-redux';
import { useState } from 'react';
import { ISort, Priority, Tags } from './types/global';
import store from './store/store';
import styles from './App.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export default function App() {
  const [sortingType, setSortingType] = useState<ISort>(ISort.decreasing);
  const [filters, setFiltres] = useState<{ priority?: Priority[], tags?: Tags[] }>()

  const handleSortChange = (type: ISort) => {
    setSortingType(type);
  };
  const handleFilterChange = (priority?: Priority[], tags?: Tags[]) => {
    setFiltres({ priority, tags })
  }

  return (
    <Provider store={store}>
      <div className={styles.task_manager}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className={styles['task_manager__TODO-list']}>
                <div className={styles.task_manager__side_bar}>
                  <Sorting onSortChange={handleSortChange} />
                  <Filtering onFilteringChange={handleFilterChange} />
                </div>
                <TODOList sortingType={sortingType} filters={filters} />
              </div>
            } />
            <Route path="tasks/:id" element={<TaskPage />} />
            <Route path="add_task" element={<TaskForm />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}
