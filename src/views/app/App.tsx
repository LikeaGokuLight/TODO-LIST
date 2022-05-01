import React, {FC, useEffect} from 'react';
import styles from "./app.module.scss";
import {useToDoStore} from "../../data/useToDoStore";
import InputPlus from "../components/input-plus/InputPlus";
import {BiTaskX} from "react-icons/bi";
import InputTask from "../components/input-task/InputTask";

const App: FC = () => {
   const { tasks } = useToDoStore((state) => state);

  return (
      <article className={styles.wrapper}>
          <h1 className={styles.title}>Todo-List || App</h1>
          <section>
            <InputPlus />
          </section>
          <hr />
          <section>
              {
                  !tasks.length && (
                      <div className={styles.noTasks}>
                          <h1>No Tasks for now</h1>
                          <BiTaskX/>
                      </div>
                  )
              }
              {
                  tasks.length >= 1 && (
                      tasks.map((task) => {
                          return <InputTask key={task.id} id={task.id} title={task.title} />
                      })
                  )
              }
          </section>
      </article>
  );
};

export default App;
