import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Workspace } from '../types/workspace';

interface WorkspaceState {
  currentWorkspace: Workspace | null
  workspaceList: Workspace[] | null

}

const initialState: WorkspaceState = {
  currentWorkspace: null,
  workspaceList: null,

};

export const slice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setCurrentWorkspace(state: WorkspaceState, action: PayloadAction<Workspace>): void {
      state.currentWorkspace = action.payload;
    },
    setWorkspaceList(state: WorkspaceState, action: PayloadAction<Workspace[]>): void {
      state.workspaceList = action.payload;
    }

  }
});

export const { reducer } = slice;
