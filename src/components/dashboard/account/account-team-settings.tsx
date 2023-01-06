import type { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent, Chip,
  Divider,
  IconButton,
  InputAdornment, MenuItem, Select,
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
import {useSelector} from "../../../store";
import {useEffect} from "react";
import {WorkspaceRoleCommission} from "../../../types/workspace";

export const AccountTeamSettings: FC = () => {
  // selectors
  const currentWorkspace = useSelector((state) => state.workspace.currentWorkspace);
  const workspaceMembers = useSelector((state) => state.workspaceMembers.workspaceMembers);
  useEffect(()=>{
    console.log({permissions: currentWorkspace?.workspacePermission, roleCommission: currentWorkspace?.workspaceRoleCommission})
    console.log({workspaceMembers})
  },[currentWorkspace])
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
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon fontSize="small" />
                      </InputAdornment>
                  )
                }}
            />
            <Select placeholder={'Select Role'} size="small"
                    sx={{
                      flexGrow: 0.5
                    }}>
                    {currentWorkspace?.workspaceRoleCommission?.map((workspaceRole: WorkspaceRoleCommission, workspaceRoleIndex: number)=>{
                        return(
                        <MenuItem key={workspaceRoleIndex}
                        value={workspaceRole?.salesRole?.roleType}
                        >{workspaceRole?.salesRole?.roleName}
                        </MenuItem>
                        )
                    })}
            </Select>

            <Select size="small"
                    sx={{
                      m:1.5,
                      flexGrow: 0.5
                    }}>
              <MenuItem value="engineering">Member</MenuItem>
              <MenuItem value="design">Admin</MenuItem>
            </Select>

            <Button
                sx={{ m: 1.5 }}
                variant="contained"
            >
              Send Invite
            </Button>
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
      </Card>
  );
}

