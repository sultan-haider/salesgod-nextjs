import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {WorkspaceMember, MemberList} from "../types/members";


interface MemberState {
  workspaceMembers: WorkspaceMember[] | null

}

const initialState: MemberState = {
  workspaceMembers: null,

};

export const slice = createSlice({
  name: 'workspaceMembers',
  initialState,
  reducers: {
    setMembersList(state: MemberState, action: PayloadAction<MemberList>): void {
      state.workspaceMembers = action.payload.workspaceMember;
    }
  }
});

export const { reducer } = slice;
