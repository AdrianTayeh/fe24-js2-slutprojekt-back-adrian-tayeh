import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../models/tasks.js";
import { TaskService } from "../services/TaskService.js";
import { format } from "date-fns/format";

const taskService = new TaskService();
export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category } = req.body;
    const formattedDate = format(new Date(), "dd/MM/yyyy HH:mm");
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      status: "to do",
      assigned: undefined,
      timestamp: formattedDate,
    };
    const task = await taskService.addTask(newTask);
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const assignTask = async (
  req: Request,
  res: Response
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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const markTaskAsDone = async (
  req: Request,
  res: Response
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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const removeTask = async (
  req: Request,
  res: Response
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
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
