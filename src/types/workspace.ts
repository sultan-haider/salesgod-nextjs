

export interface Workspace {
  id: string;
  workspaceName: string;
  workspaceType: workspaceType;
  workspaceOwnerId: string;
  workspaceLogo: string;
  workspaceFavicon: string;
  workspaceRoleCommission: WorkspaceRoleCommission[] | []
  workspacePermission: WorkspacePermission[] | []
}

export type workspaceType = 'MASTER' | 'SUB';

export interface WorkspacePermission {
  id: string,
  workspaceId: string,
  permissionId: string,
  createdAt?: Date,
  updatedAt: Date,
  permission: Permission
}

export interface Permission {
  id: string,
  permissionType: string,
  homeDashboard: boolean,
  setterDashboard: boolean,
  closerDashboard: boolean,
  fbDashboard: boolean,
  createdAt?: Date,
  updatedAt?: Date,

}

export interface WorkspaceRoleCommission {
  id: string,
  commissionId: string,
  salesRoleId: string,
  workspaceId: string,
  createdAt?: Date,
  updatedAt?: Date,
  commission: Commission,
  salesRole: SalesRole
}

export interface Commission {
  id: string,
  commissionTypeId: string,
  commissionValue: string,
  createdAt?: string,
  updatedAt?: string
}
export interface  SalesRole {
  id: string,
  roleType: string,
  roleName: string,
  createdAt?: Date,
  updatedAt?: Date
}




