import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/tasks.js";
import { TaskService } from "../services/TaskService.js";
import { format } from "date-fns/format";

const taskService = new TaskService();
export const addTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, category, priority, parentId } = req.body;
    const formattedDate = format(new Date(), "dd/MM/yyyy HH:mm");
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      status: "to do",
      assigned: undefined,
      timestamp: formattedDate,
      priority,
      parentId,
      subtasks: [],
    };
    const task = await taskService.addTask(newTask);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const addSubtask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { parentId } = req.params;
    const { title, description, category, priority } = req.body;
    const formattedDate = format(new Date(), "dd/MM/yyyy HH:mm");
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      status: "to do",
      assigned: undefined,
      timestamp: formattedDate,
      priority,
      parentId,
      subtasks: [],
    };
    const subtask = await taskService.addSubtask(parentId, newTask);
    res.status(201).json(subtask);
  } catch (error) {
    next(error);
  }
}

export const assignTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;
    const task = await taskService.assignTask(id, memberId);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const markTaskAsDone = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await taskService.markTaskAsDone(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await taskService.removeTask(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Task not found or task is not done" });
    }
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const updateTaskPriority = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { priority } = req.body;
    const task = await taskService.updateTaskPriority(id, priority);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    next(error);
  }
};