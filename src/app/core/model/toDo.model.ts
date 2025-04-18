export class getListToDoModel {
  objectId?: string;
  ownerId?: string;
  assigner?: string;
  assignee?: string;
  pageNumber: number;
  pageSize: number;
}

export class createToDoModel {
  title?: string;
  description?: string;
  priority?: number;
  status?: number;
  createdDate?: string;
  modifiedDate?: string;
  dueDate?: string;
  owner?: string;
  ownerName?: string;
  assigner?: string;
  assignee?: string;
  assigneeName?: string;
  objectId?: string;
  parentTodoItemId?: string;
  [key: string]: any;
}
export class updateToDoModel {
  id?: string;
  title?: string;
  description?: string;
  priority?: number;
  status?: number;
  createdDate?: string;
  modifiedDate?: string;
  dueDate?: string;
  owner?: string;
  ownerName?: string;
  assigner?: string;
  assignee?: string;
  assigneeName?: string;
  objectId?: string;
  isDone?: boolean;
  [key: string]: any;
}

export class changeParentToDoModel {
  id: string;
  parentId: string;
}

export class changeObjectToDoModel {
  id: string;
  objectId: string;
}
