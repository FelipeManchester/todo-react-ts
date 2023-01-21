import styles from './Main.module.css';
import { ITask } from '../interfaces/Task';
import { useState } from 'react';
// components
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Modal from './Modal';

const Main = () => {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal');
    if (display) {
      modal!.classList.remove('hide');
    } else {
      modal!.classList.add('hide');
    }
  };

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, level: number) => {
    const updatedTask: ITask = { id, title, level };
    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    });

    setTaskList(updatedItems);
    hideOrShowModal(false);
  };

  return (
    <main className={styles.main}>
      <Modal
        children={
          <TaskForm
            btnText="Editar tarefa"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <div>
        <TaskForm
          btnText="Criar"
          taskList={taskList}
          setTaskList={setTaskList}
        />
      </div>
      <div>
        <h2>Suas tarefas:</h2>
        <TaskList
          taskList={taskList}
          handleDelete={deleteTask}
          handleEdit={editTask}
        />
      </div>
    </main>
  );
};

export default Main;
