import styles from './TaskList.module.css';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { ITask } from '../interfaces/Task';

type Props = {
  taskList: ITask[];
  handleDelete(id: number): void;
  handleEdit(task: ITask): void;
};

const TaskList = ({ taskList, handleDelete, handleEdit }: Props) => {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Prioridade: {task.level}</p>
            </div>
            <div className={styles.actions}>
              <Pencil onClick={() => handleEdit(task)} />
              <Trash
                onClick={() => {
                  handleDelete(task.id);
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Ainda nao há</p>
      )}
    </>
  );
};

export default TaskList;
