/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { FILTER_STATUS } from './utils/FILTER_STATUS';
import { getActive } from './services/todo';
import { getCompleted } from './services/todo';
import { getAllTodos } from './services/todo';
import { handleQuery } from './utils/handleQuery';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_STATUS.ALL);
  const [query, setQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    switch (filterBy) {
      case FILTER_STATUS.ALL:
        setIsLoading(true);

        getAllTodos()
          .then(result => setTodos(handleQuery(result, query)))
          .finally(() => setIsLoading(false));
        break;
      case FILTER_STATUS.ACTIVE:
        setIsLoading(true);
        getActive()
          .then(result => setTodos(handleQuery(result, query)))
          .finally(() => setIsLoading(false));
        break;
      case FILTER_STATUS.COMPLETED:
        setIsLoading(true);

        getCompleted()
          .then(result => setTodos(handleQuery(result, query)))
          .finally(() => setIsLoading(false));
        break;
    }
  }, [filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterBy={setFilterBy}
                filterBy={filterBy}
                onQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={todos}
                onCurrentTodo={setCurrentTodo}
                currentTodo={currentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} onCurrentTodo={setCurrentTodo} />
      )}
    </>
  );
};
