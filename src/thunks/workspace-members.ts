
import { getWorkspaceTeamMembersApi} from '../apis'
import { slice } from '../slices/workspace-members';
import { AppThunk } from '../store';

export const getWorkspaceMembersThunk = (payload: unknown): AppThunk => async (dispatch): Promise<void> => {
  const response = await getWorkspaceTeamMembersApi(payload);
  if (response) {
    console.log(response)
    dispatch(slice.actions.setMembersList(response));
  }


};
