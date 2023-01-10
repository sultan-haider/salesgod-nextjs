
import {
  addWorkspacePermissionApi,
  addWorkspaceRoleCommissionApi,
  getUserWorkspace,
  getUserWorkspaceRecursive
} from '../apis'
import { slice } from '../slices/workspace';
import { AppThunk } from '../store';
import {Workspace} from "../types/workspace";

export const getWorkspaces = (payload: unknown): AppThunk => async (dispatch): Promise<void> => {
  const response = await getUserWorkspaceRecursive(payload);
  if (response) {
    const masterWorkspace = response.find((object: Workspace) => object.workspaceType == "MASTER")
    console.log(response)
    dispatch(slice.actions.setCurrentWorkspace(masterWorkspace));
    dispatch(slice.actions.setWorkspaceList(response))
  }


};

export const createWorkspaceRoleCommissionsThunk = (payload: unknown): AppThunk => async (dispatch): Promise<void> => {
  return await addWorkspaceRoleCommissionApi(payload);
};
export const createWorkspacePermissionsThunk = (payload: unknown): AppThunk => async (dispatch): Promise<void> => {
  return await addWorkspacePermissionApi(payload);


};
