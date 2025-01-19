import React, { useState } from 'react';
import './styles/AddTaskModal.css'; // Import the global CSS file

interface AddTaskModalProps {
  show: boolean;
  onClose: () => void;
  onAddTask: (task: { name: string; startDate: string; endDate: string; startTime: string; endTime: string; priority: string; progress: number; status: string; taskCompleted: boolean; tags: { id: number; name: string }[] }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ show, onClose, onAddTask }) => {
  const [newTask, setNewTask] = useState({
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

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(newTask);
    setNewTask({
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
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Neue Aufgabe hinzufügen</h2>
        <form onSubmit={handleAddTask}>
          <div className="form-grid">
            <div className="form-row">
              <label>Aufgabenname:</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Startdatum:</label>
              <input
                type="date"
                value={newTask.startDate}
                onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Enddatum:</label>
              <input
                type="date"
                value={newTask.endDate}
                onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Startzeit:</label>
              <input
                type="time"
                value={newTask.startTime}
                onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Endzeit:</label>
              <input
                type="time"
                value={newTask.endTime}
                onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Priorität:</label>
              <input
                type="text"
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Fortschritt:</label>
              <input
                type="number"
                value={newTask.progress}
                onChange={(e) => setNewTask({ ...newTask, progress: Number(e.target.value) })}
                required
                min="0"
                max="100"
              />
            </div>
            <div className="form-row">
              <label>Status:</label>
              <input
                type="text"
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <label>Aufgabe abgeschlossen:</label>
              <input
                type="checkbox"
                checked={newTask.taskCompleted}
                onChange={(e) => setNewTask({ ...newTask, taskCompleted: e.target.checked })}
              />
            </div>
            <div className="form-row">
              <label>Tags:</label>
              <input
                type="text"
                value={newTask.tags[0].name}
                onChange={(e) => setNewTask({ ...newTask, tags: [{ id: newTask.tags[0].id, name: e.target.value }] })}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Aufgabe hinzufügen</button>
            <button type="button" onClick={onClose}>
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;