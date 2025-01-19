import React, { useState, useEffect } from 'react';
import './styles/UpdateTaskModal.css'; // Import the global CSS file

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

interface UpdateTaskModalProps {
  show: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({ show, task, onClose, onUpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>({
    id: 0,
    name: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    priority: '',
    progress: 0,
    status: '',
    taskCompleted: false,
    tags: [{ id: 0, name: '' }],
  });

  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]);

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask(updatedTask);
    onClose();
  };

  if (!show || !task) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Aufgabe aktualisieren</h2>
        <form onSubmit={handleUpdateTask}>
          <div className="form-grid">
            <div className="form-row">
              <label>Aufgabenname:</label>
              <input
                type="text"
                value={updatedTask.name}
                onChange={(e) => setUpdatedTask({ ...updatedTask, name: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Startdatum:</label>
              <input
                type="date"
                value={updatedTask.startDate}
                onChange={(e) => setUpdatedTask({ ...updatedTask, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Enddatum:</label>
              <input
                type="date"
                value={updatedTask.endDate}
                onChange={(e) => setUpdatedTask({ ...updatedTask, endDate: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Startzeit:</label>
              <input
                type="time"
                value={updatedTask.startTime}
                onChange={(e) => setUpdatedTask({ ...updatedTask, startTime: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Endzeit:</label>
              <input
                type="time"
                value={updatedTask.endTime}
                onChange={(e) => setUpdatedTask({ ...updatedTask, endTime: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Priorität:</label>
              <input
                type="text"
                value={updatedTask.priority}
                onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Fortschritt:</label>
              <input
                type="number"
                value={updatedTask.progress}
                onChange={(e) => setUpdatedTask({ ...updatedTask, progress: Number(e.target.value) })}
                required
                min="0"
                max="100"
              />
            </div>
            <div className="form-row">
              <label>Status:</label>
              <input
                type="text"
                value={updatedTask.status}
                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Aufgabe abgeschlossen:</label>
              <input
                type="checkbox"
                checked={updatedTask.taskCompleted}
                onChange={(e) => setUpdatedTask({ ...updatedTask, taskCompleted: e.target.checked })}
              />
            </div>
            <div className="form-row">
              <label>Tags:</label>
              <input
                type="text"
                value={updatedTask.tags.length > 0 ? updatedTask.tags[0].name : ''}
                onChange={(e) => {
                  const newTags = updatedTask.tags.length > 0 ? [...updatedTask.tags] : [{ id: 0, name: '' }];
                  newTags[0].name = e.target.value;
                  setUpdatedTask({ ...updatedTask, tags: newTags });
                }}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Aktualisieren</button>
            <button type="button" onClick={onClose}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaskModal;