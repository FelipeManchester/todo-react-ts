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
              <p>
                {task.level === 1 && (
                  <span>
                    Prioridade: <span className={styles.p1}>Baixa</span>
                  </span>
                )}
              </p>
              <p>
                {task.level === 2 && (
                  <span>
                    Prioridade: <span className={styles.p2}>Média</span>
                  </span>
                )}
              </p>
              <p>
                {task.level === 3 && (
                  <span>
                    Prioridade: <span className={styles.p3}>Alta</span>
                  </span>
                )}
              </p>
              <p>
                {task.level === 4 && (
                  <span>
                    Prioridade: <span className={styles.p4}>Urgente</span>
                  </span>
                )}
              </p>
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
