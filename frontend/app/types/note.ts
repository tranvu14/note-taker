export interface Note {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isArchived: boolean;
  tags: Tag[];
  reminderDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestNote {
  title: string;
  content: string;
  isPinned?: boolean;
  tags?: string[];
  reminderDate?: string;
}

export interface Tag {
  id: string;
  name: string;
} 