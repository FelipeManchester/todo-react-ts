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
  const [level, setLevel] = useState<number>(0);

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

      setTitle('');
      setLevel(0);
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
          placeholder="Insira a sua tarefa"
          onChange={handleChange}
          value={title}
        />
        <label htmlFor="level">Prioridade:</label>
        <input
          type="range"
          max="3"
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
