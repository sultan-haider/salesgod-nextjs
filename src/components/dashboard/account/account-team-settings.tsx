import type { FC } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent, Chip,
    Divider,
    IconButton,
    InputAdornment, MenuItem, Select, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Mail as MailIcon } from '../../../icons/mail';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import {useDispatch, useSelector} from "../../../store";
import {useEffect, useState} from "react";
import {WorkspacePermission, WorkspaceRoleCommission} from "../../../types/workspace";
import cuid from 'cuid';
import {addMemberToWorkspaceThunk} from "../../../thunks/workspace-members";
import { LoadingButton } from '@mui/lab';

export const AccountTeamSettings: FC = () => {
    const dispatch = useDispatch();
    // states
    const [selectedMemberRole, setSelectedMemberRole] = useState<any>(null)
    const [selectedMemberPermission, setSelectedMemberPermission] = useState<any>(null)
    const [memberEmail, setMemberEmail] = useState<String | null>(null)
    const [isValidInput, setIsValidInput] = useState(true)
    const [isAddingMember, setIsAddingMember] = useState(false)
    const [showSnack, setShowSnack] = useState(false)
    const [snackContent, setSnackContent] = useState<any>(null)
    const [snackSeverity, setSnackSeverity] = useState<any>('success')
    const emailValidationReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // selectors
  const currentWorkspace = useSelector((state) => state.workspace.currentWorkspace);
  const workspaceMembers = useSelector((state) => state.workspaceMembers.workspaceMembers);
  useEffect(()=>{
    console.log({permissions: currentWorkspace?.workspacePermission, roleCommission: currentWorkspace?.workspaceRoleCommission})
    console.log({workspaceMembers})
  },[currentWorkspace])

    const handleSendInvite = () =>{
      setIsAddingMember(true)
      const inviteMemberPayload = {
          memberId: cuid(), // its a new members
          memberName: "member name",
          memberEmail: memberEmail,
          memberAvatar: "https://cdn.salesgod.com/user/avatar/2.png",
          workspaceMemberId: cuid(),
          permissionId: cuid(), // permission Id for default permission of the user.
          workspacePermissionId: selectedMemberPermission?.id, // workspace permission selected.
          isCustomCommission: false,
          isCustomPermission: false,

          roles: [{
              workspaceMemberRoleId: cuid(),
              salesRoleId: selectedMemberRole.salesRoleId,
              commissionId: cuid(),  // default commission for the user if he has enabled custom commission.
              commissionTypeId: selectedMemberRole.commission.commissionTypeId,
              commissionValue:selectedMemberRole.commission.commissionValue
          }],
          workspaceId: currentWorkspace?.id
      }


        console.log({inviteMemberPayload}, !!inviteMemberPayload.memberEmail?.match(emailValidationReg))
        dispatch<any>(addMemberToWorkspaceThunk(inviteMemberPayload)).then((res: any) => {
            setIsAddingMember(false)
            showSnackBar('Success! Member has been added Successfully.', 'success')
            console.log(res)
        }).catch((error: any)=>{
            setIsAddingMember(false)
            showSnackBar('Error! Could not add Member.', 'error')
            console.log(error)
        })
    }
    const showSnackBar  = (message: string, severity: string) => {
        setShowSnack(true)
        setSnackContent(message)
        setSnackSeverity(severity)
    }
    const handleSelectChange = (event: any) =>{
      console.log(event.target)
        if(event.target.name === 'ROLE') {
            const selectedWorkspaceRoleCommission = currentWorkspace?.workspaceRoleCommission.find((object:WorkspaceRoleCommission)=> object.salesRole.id === event.target.value )
            setSelectedMemberRole(selectedWorkspaceRoleCommission)

        } else if (event.target.name === 'PERMISSION'){
            const selectedWorkspacePermission = currentWorkspace?.workspacePermission.find((object:WorkspacePermission)=> object.permissionId ===  event.target.value)
            setSelectedMemberPermission(selectedWorkspacePermission)
        }

    }

    const handleEmailInput = (event: any) => {
        setMemberEmail(event.target.value)
    }
    useEffect(()=>{
        console.log({selectedMemberRole, selectedMemberPermission})
    }, [selectedMemberRole, selectedMemberPermission])
  return(
      <Card>
        <CardContent>
          <div>
            <Typography variant="h6">
              Invite members
            </Typography>
            <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
            >
              You currently pay for 2 Editor Seats.
            </Typography>
          </div>
          <Divider
              sx={{
                mt: 3,
                mb: 3
              }}
          />
          <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                m: -3
              }}
          >
            <TextField
                label="Email address"
                placeholder="Add multiple addresses separated by commas"
                size="small"
                sx={{
                  m: 1.5,
                  flexGrow: 1
                }}
                onChange={handleEmailInput}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon fontSize="small" />
                      </InputAdornment>
                  )
                }}
            />
            <Select  name={'ROLE'} placeholder={'Select Role'} size="small"
                    onChange={handleSelectChange}
                    sx={{
                      flexGrow: 0.5
                    }}>
                    {currentWorkspace?.workspaceRoleCommission?.map((workspaceRole: WorkspaceRoleCommission, workspaceRoleIndex: number)=>{
                        return(
                        <MenuItem key={workspaceRoleIndex}
                        value={workspaceRole?.salesRole?.id}
                        >{workspaceRole?.salesRole?.roleName}
                        </MenuItem>
                        )
                    })}
            </Select>

            <Select name={'PERMISSION'} size="small"
                    onChange={handleSelectChange}
                    sx={{
                      m:1.5,
                      flexGrow: 0.5
                    }}>
                {currentWorkspace?.workspacePermission?.map((workspacePermission: WorkspacePermission, workspacePermissionIndex: number)=>{
                    return(
                        <MenuItem key={workspacePermissionIndex}
                                  value={workspacePermission?.permission?.id}
                        >{workspacePermission?.permission?.permissionType}
                        </MenuItem>
                    )
                })}
            </Select>

            <LoadingButton
                sx={{ m: 1.5 }}
                variant="contained"
                loading={isAddingMember}
                disabled={!selectedMemberRole || !selectedMemberPermission || !memberEmail || !isValidInput}
                onClick={handleSendInvite}
            >
              Send Invite
            </LoadingButton>
          </Box>
        </CardContent>
        <Scrollbar>
          <Table sx={{ minWidth: 400 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Names
                </TableCell>
                <TableCell>
                  Roles
                </TableCell>
                <TableCell>
                  Commissions
                </TableCell>
                <TableCell>
                  Persmissions
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <>
                {workspaceMembers?.map((workspaceMember, index)=>{
                  return(
                      <TableRow key={index}>
                        <TableCell>
                          <Box
                              sx={{
                                alignItems: 'center',
                                display: 'flex'
                              }}
                          >
                            <Avatar
                                sx={{
                                  height: 40,
                                  width: 40,
                                  mr: 1
                                }}
                            >
                              <UserCircleIcon fontSize="small" />
                            </Avatar>
                            <div>
                              <Typography variant="subtitle2">
                                {workspaceMember?.member?.memberName}
                              </Typography>
                              <Typography
                                  color="textSecondary"
                                  variant="body2"
                              >
                                {workspaceMember?.member?.memberEmail}
                              </Typography>
                            </div>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <>
                            {workspaceMember?.workspaceMemberRole.map((memberRole, roleIndex)=>{
                              return(
                                  <Chip label={memberRole?.salesRole?.roleName}
                                        color={memberRole?.salesRole?.roleType === "SETTER" ? 'primary': 'success'}
                                        size="small"
                                        key={roleIndex}
                                        sx={{ mr: 1 }}
                                  />
                              )
                            })}
                          </>
                        </TableCell>
                        <TableCell>
                            {workspaceMember?.isCustomCommission ? 'Custom' : 'Default'}
                        </TableCell>
                        <TableCell>
                          <Select size="small" value={workspaceMember?.workspacePermission?.permission.permissionType} fullWidth>
                            <MenuItem value="ADMIN">Member</MenuItem>
                            <MenuItem value="MEMBER">Admin</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton component="a">
                            <PencilAltIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                  )
                })}
              </>
            </TableBody>
          </Table>
        </Scrollbar>
          <Snackbar open={showSnack}
                    autoHideDuration={2000}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    onClose={()=>{setShowSnack(false)}}>
              <Alert onClose={()=>{setShowSnack(false)}}
                     severity={snackSeverity!}
                     sx={{ width: '100%' }}>
                  {snackContent}
              </Alert>
          </Snackbar>
      </Card>
  );
}

