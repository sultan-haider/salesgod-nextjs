import {Permission, SalesRole, WorkspacePermission} from "./workspace";


export interface MemberList {
  workspaceId: string,
  workspaceMember: WorkspaceMember[]
}


export interface WorkspaceMember {
  id: string,
  memberId: string,
  workspacePermissionId: string,
  permissionId: string,
  isCustomCommission: boolean,
  isCustomPermission: boolean,
  member: Member,
  workspaceMemberRole: WorkspaceMemberRole[]
  workspacePermission: WorkspacePermission
  permission: Permission

}

export interface Member {
  id: string,
  memberName: string,
  memberEmail: string,
  memberAvatar: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface WorkspaceMemberRole {

  id: string,
  workspaceMemberId: string,
  salesRoleId: string,
  commissionId: string,
  createdAt?: Date,
  updatedAt?: Date,
  salesRole: SalesRole

}