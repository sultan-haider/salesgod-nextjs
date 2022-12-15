import type { FC } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Dialog,
    DialogActions,
    DialogTitle,
  DialogContent,
  DialogContentText

} from '@mui/material';
import Stack from '@mui/material/Stack';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { useAuth } from '../../../hooks/use-auth'
import {auth0UserManagementCall, auth0RequestPasswordChange} from "../../../apis";
import {useRef, useState} from "react";
import {services} from "../../../config";
import {LoadingButton} from "@mui/lab";

export const AccountGeneralSettings: FC = (props) => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.name || '')
  const [userEmail, setUserEmail] = useState(user?.email || '')
  const [loading, setLoading] = useState<string | null>(null)
  const [openSnack, setOpenSnack] = useState<boolean | undefined>(false)
  const [snackMessage, setSnackMessage] = useState<string | null >('Success')
  const [openSnackError, setOpenSnackError] = useState<boolean | string | null >(null)
  const [openPasswordDialog, setOpenPasswordDialog] = useState<boolean>(false)


  // const user = {
  //   avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
  //   name: 'Anika Visser'
  // };

  const handlePasswordChange = async (type: string) => {
    setOpenPasswordDialog(true)
  }
  const handlePasswordApi = async (type: string) => {
    const reqPayload = {
      email: user?.email,
    }
    setLoading(null)
    setLoading(type)
    await auth0RequestPasswordChange({ url: `/user/update-user`, payload:reqPayload, method: 'POST'}).then(res=>{
      setLoading(null)
      setOpenSnack(true)
      setOpenPasswordDialog(false)
    }).catch((err)=>{
      setLoading(null)
      setOpenPasswordDialog(false)
    })
  }
  const handleUpdateProfile = async (payload: any, loading: any) => {
    setLoading(loading)
    const reqPayload = {
      userId: user?.id,
      data: {
       ...payload
      }
    }
    await auth0UserManagementCall({ url: `/user/update-user`, payload:reqPayload, method: 'POST'}).then(res=>{
      setSnackMessage('Successfully updated profile!')
      setLoading(null)
      setOpenSnack(true)
    }).catch((err)=>{
      if (err?.status === 409) {
          setOpenSnackError('This email already exists!')
      }
      setLoading(null)
    })
  }
  const handleClose = () => {
    setOpenSnack(false)
    setOpenSnackError(null)
    setOpenPasswordDialog(false)

  }

  // @ts-ignore
  return (
    <Box
      sx={{ mt: 4 }}
      {...props}
    >
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Basic details
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                    mb: 2
                  }}
              >
                <Snackbar open={openSnack}
                          autoHideDuration={2000}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                          onClose={handleClose}>
                  <Alert onClose={handleClose}
                         severity="success"
                         sx={{ width: '100%' }}>
                    {snackMessage}
                  </Alert>
                </Snackbar>
                <Snackbar open={!!openSnackError}
                          autoHideDuration={2000}
                          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                          onClose={handleClose}>
                  <Alert onClose={handleClose}
                         severity="error"
                         sx={{ width: '100%' }}>
                    {openSnackError}
                  </Alert>
                </Snackbar>
              </Box>

              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Stack direction="row"
                       alignItems="center"
                       spacing={2}>
                  {/*<Button variant="contained"*/}
                  {/*        component="label">*/}
                  {/*  Change*/}
                  {/*  <input hidden*/}
                  {/*         accept="image/*"*/}
                  {/*         multiple={false}*/}
                  {/*         type="file" />*/}
                  {/*</Button>*/}
                </Stack>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.name}
                  label="Full Name"
                  onChange={(e)=>{
                    setUserName(e.target.value)
                  }
                  }
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <LoadingButton
                    size="small"
                    onClick={()=> {handleUpdateProfile({name: userName}, 'userName')}}
                    loading={loading === 'userName'}
                    variant="text"
                >Save</LoadingButton>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user?.email}
                  label="Email Address"
                  type="email"
                  onChange={(e)=>{
                    setUserEmail(e.target.value)
                  }}
                  error={!!openSnackError}
                  helperText={!openSnackError ? 'You need to verify your email that will be sent to your email box.' : openSnackError}
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed'
                    }
                  }}
                />
                <LoadingButton
                    size="small"
                    onClick={()=> {handleUpdateProfile({email: userEmail}, 'userEmail')}}
                    loading={loading === 'userEmail'}
                    variant="text"
                >Save</LoadingButton>
              </Box>
              <Box
                  sx={{
                    display: 'flex',
                    mt: 3,
                    alignItems: 'center'
                  }}
              >
                <Button
                    size="small"
                    onClick={()=>(handlePasswordChange('changePassword'))}
                    variant="text"
                >Send Change Password Request</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Public profile
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              sm={12}
              xs={12}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Make Contact Info Public
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Means that anyone viewing your profile will be able to see your contacts
                    details.
                  </Typography>
                </div>
                <Switch />
              </Box>
              <Divider />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Available to hire
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Toggling this will let your teammates know that you are available for
                    acquiring new projects.
                  </Typography>
                </div>
                <Switch defaultChecked />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Delete Account
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Typography
                sx={{ mb: 3 }}
                variant="subtitle1"
              >
                Delete your account and all of your source data. This is irreversible.
              </Typography>
              <Button
                color="error"
                variant="outlined"
              >
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/*Dialogues and interactions*/}
      <Dialog
          open={openPasswordDialog}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Send email to change password?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Send an email to your address to change the password.
            Click on the link in the email and then type and confirm the new password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus
                  onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton onClick={()=>{handlePasswordApi('changePassword')}}
                  autoFocus
          loading={(loading === 'changePassword')}>
            Send Email
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </Box>
  );
};
