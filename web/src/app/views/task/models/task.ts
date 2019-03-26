import { Client } from "./client";
import { Vendor } from "./vendor";
import { SubTask } from './subtask';

export class Task {
  id: string;
  title: string;
  category: string[];
  estimated_hours: number;
  commencement_date: string;
  amount: number;
  client: Client;
  vendor: Vendor;
  sub_task: SubTask[];
}
