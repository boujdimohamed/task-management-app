import React, { useState, useEffect } from 'react';
import api from '../AxiosApi';
import AddTaskModal from './AddTaskModal';
import UpdateTaskModal from './UpdateTaskModal';
import './styles/TaskList.css'; // Import the global CSS file

interface Tag {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  priority: string;
  progress: number;
  status: string;
  taskCompleted: boolean;
  tags: Tag[];
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const ProgressWithTooltip = () => {
    const [progress, setProgress] = useState(0);
  
    // Simulate progress updates
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 10 : 100
        );
      }, 1000);
      return () => clearInterval(interval);
      }, []);
  
      return (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
            aria-label={`${progress}% abgeschlossen`}
          ></div>
          <div className="hint">Progress: {progress}%</div>
        </div>
      );
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/all');
      setTasks(response.data);
    } catch (error) {
      console.error('Fehler beim Abrufen der Aufgaben:', error);
    }
  };

  const handleUpdate = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTaskToUpdate(task);
      setShowUpdateTaskModal(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/delete/${id}`);
      setTasks(tasks.filter((task: Task) => task.id !== id));
    } catch (error) {
      console.error('Fehler beim Löschen der Aufgabe:', error);
    }
  };

  const addTask = async (newTask: { name: string; startDate: string; endDate: string; startTime: string; endTime: string; priority: string; progress: number; status: string; taskCompleted: boolean; tags: { id: number; name: string }[] }) => {
    try {
      const response = await api.post('/add', newTask);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Aufgabe:', error);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? response.data : task)));
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Aufgabe:', error);
    }
  };

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Render a task card
  const renderTaskCard = (task: Task) => (
    <div key={task.id} className={`task-card ${task.progress === 100 ? 'completed' : ''}`}>
      <h3>{task.name}</h3>
      <p><strong>Startdatum:</strong> {task.startDate}</p>
      <p><strong>Enddatum:</strong> {task.endDate}</p>
      <p><strong>Startzeit:</strong> {task.startTime}</p>
      <p><strong>Endzeit:</strong> {task.endTime}</p>
      <p><strong>Priorität:</strong> {task.priority}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <div className="hint-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${task.progress}%` }}
          aria-label={`${task.progress}% abgeschlossen`}
        ></div>
      </div>
      <div className="hint">Progress: {task.progress}%</div>
      </div>
      <div className="task-tags">
        {task.tags.map((tag) => (
          <span key={tag.id} className="task-tag">{tag.name}</span>
        ))}
      </div>
      <div className="task-actions">
        {task.progress < 100 && (
          <button onClick={() => handleUpdate(task.id)}>Aktualisieren</button>
        )}
        <button onClick={() => handleDelete(task.id)} disabled={task.progress === 100}>Löschen</button>
      </div>
    </div>
  );

  // Render pagination
  const renderPagination = () => (
    <div className="pagination">
      {[...Array(totalPages).keys()].map(number => (
        <button key={number + 1} onClick={() => setCurrentPage(number + 1)}>
          {number + 1}
        </button>
      ))}
    </div>
  );

  return (
    <div className="task-list">
      <h1></h1>
      <h2>Aufgabenliste</h2>
      <div className="task-grid">
        {currentTasks.map(renderTaskCard)}
      </div>
      <AddTaskModal
        show={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onAddTask={addTask}
      />
      <UpdateTaskModal
        show={showUpdateTaskModal}
        task={taskToUpdate}
        onClose={() => setShowUpdateTaskModal(false)}
        onUpdateTask={updateTask}
      />
      {totalPages > 1 && renderPagination()}
      <div className="add-task">
        <button onClick={() => setShowAddTaskModal(true)} className="fab">+</button>
      </div>
    </div>
  );
};

export default TaskList;
