export enum Tags {
  RESEARCH= 'research',
  DESIGN = 'design',
  DEVELOPMENT = "development"
}

export enum ISort {
  decreasing = 'decreasing',
  increasing = 'increasing'
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high'
}

export interface ITask {
  id: string,
  title: string;
  description: string;
  createdAt: Date;
  priority: Priority,
  tags: Tags[],
}

