import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { ITask } from '../interfaces/Task';

// styles
import styles from './TaskForm.module.css';

// Interface

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, level: number): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    const storedTaskList = localStorage.getItem('taskList');
    if (storedTaskList) {
      setTaskList?.(JSON.parse(storedTaskList));
    }
  }, [setTaskList]);

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setLevel(task.level);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, level);
    } else {
      const id = Math.floor(Math.random() * 1000);
      const newTask: ITask = { id, title, level };
      setTaskList!([...taskList, newTask]);
      localStorage.setItem('taskList', JSON.stringify([...taskList, newTask]));
      setTitle('');
      setLevel(1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setLevel(parseInt(e.target.value));
    }
  };
  return (
    <div className={styles.input_container}>
      <form className={styles.form} onSubmit={addTaskHandler}>
        <input
          type="text"
          name="title"
          placeholder="Ex: Fazer compras"
          onChange={handleChange}
          value={title}
          required
        />
        <label htmlFor="level">
          Prioridade:
          {level === 1 && <p className={styles.p1}>Baixa</p>}
          {level === 2 && <p className={styles.p2}>Média</p>}
          {level === 3 && <p className={styles.p3}>Alta</p>}
          {level === 4 && <p className={styles.p4}>Urgente</p>}
        </label>
        <input
          id="range-input"
          type="range"
          min="1"
          max="4"
          name="level"
          onChange={handleChange}
          value={level}
        />

        <input type="submit" value={btnText} />
      </form>
    </div>
  );
};

export default TaskForm;
