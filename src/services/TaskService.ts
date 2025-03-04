import { Task } from "../models/tasks.js";
import { MemberService } from "./MemberService.js";
import fs from "fs/promises";

const tasksFilePath = "./src/data/tasks.json";
const memberService = new MemberService();

export class TaskService {
  async readTasksFromFile(): Promise<Task[]> {
    try {
      const data = await fs.readFile(tasksFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error reading tasks file");
    }
  }
  async writeTasksToFile(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));
    } catch (error) {
      throw new Error("Error writing tasks file");
    }
  }
  async addTask(task: Task): Promise<Task> {
    try {
      const tasks = await this.readTasksFromFile();
      tasks.push(task);
      await this.writeTasksToFile(tasks);
      return task;
    } catch (error) {
      throw new Error("Error adding task");
    }
  }
  async assignTask(id: string, memberId: string): Promise<Task> {
    try {
      const tasks = await this.readTasksFromFile();
      const task = tasks.find((task) => task.id === id);
      const members = await memberService.getMembers();
      const member = members.find((member) => member.id === memberId);

      if (task && member && member.roles.includes(task.category)) {
        task.assigned = memberId;
        task.status = "in progress";
        await this.writeTasksToFile(tasks);
        return task;
      }
      return null;
    } catch (error) {
      throw new Error("Error assigning task");
    }
  }
  async markTaskAsDone(id: string): Promise<Task | null> {
    try {
      const tasks = await this.readTasksFromFile();
      const task = tasks.find((task) => task.id === id);
      if (task) {
        task.status = "done";
        await this.writeTasksToFile(tasks);
        return task;
      }
      return null;
    } catch (error) {
      throw new Error("Error marking task as done");
    }
  }
  async removeTask(id: string): Promise<boolean> {
    try {
      const tasks = await this.readTasksFromFile();
      const taskIndex = tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1 && tasks[taskIndex].status === "done") {
        tasks.splice(taskIndex, 1);
        await this.writeTasksToFile(tasks);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error("Error removing task");
    }
  }
  async getTasks(): Promise<Task[]> {
    try {
        const tasks = await this.readTasksFromFile();
        return tasks;
      } catch (error) {
        throw new Error("Error getting tasks");
      }
  }
}
