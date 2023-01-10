import type { FC } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider, FormControlLabel,
    IconButton,
    InputAdornment, MenuItem, Paper, Radio, RadioGroup, Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Mail as MailIcon } from '../../../icons/mail';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {values} from "lodash";
import {useDispatch, useSelector} from "../../../store";
import {WorkspaceRoleCommission} from "../../../types/workspace";
import {ArrowRight as ArrowRightIcon} from "../../../icons/arrow-right";
import cuid from "cuid";
import {useState} from "react";
import {createWorkspacePermissionsThunk, createWorkspaceRoleCommissionsThunk} from "../../../thunks/workspace";

export const CommissionRoleSettings: FC = () => {
    const dispatch = useDispatch();
    const currentWorkspace = useSelector((state) => state.workspace.currentWorkspace);
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            barcode: '925487986526',
            setterCommissionTypes: '',
            closerCommissionTypes: '',
            closerCommissionValue: 0,
            setterCommissionValue: 0,
            closerCommissionUnit: '',
            SetterCommissionUnit: '',
            submit: null
        },
        validationSchema: Yup.object({
            barcode: Yup.string().max(255),
            category: Yup.string().max(255),
            description: Yup.string().max(5000),
            images: Yup.array(),
            name: Yup.string().max(255).required(),
            newPrice: Yup.number().min(0).required(),
            oldPrice: Yup.number().min(0),
            sku: Yup.string().max(255)
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                console.log('Submitted the formik form...', values)
                // NOTE: Make API request
                toast.success('Product created!');
                // router.push('/dashboard/products').catch(console.error);
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });
    const CloserCommissionTypeOptions = [
        {
            id: 'clc5y85ep000008lbeg83ayon',
            commissionName: 'Percent of Cash Collected',
            commissionType: 'SETTER',
            commissionUnit: '%',
            comTypeDescription: 'Only pay when you receive cash',
        },
        {
            id: 'clc5y8r2s000108lb96jv91gp',
            commissionName: 'Percent of Total Deal Value',
            commissionType: 'SETTER',
            commissionUnit: '%',
            comTypeDescription: 'Pay for the total deal value up front',
        },
        {
            id: 'clc5y987a000208lb9ia42iip',
            commissionName: 'Flat Rate Per Deal Closed',
            commissionType: 'SETTER',
            commissionUnit: '$',
            comTypeDescription: 'Pay a fixed rate for every deal',
        },
        {
            id: 'clc5y9mov000308lbd4yudaq7',
            commissionName: 'Flat Rate Per Appointment Set',
            commissionType: 'CLOSER',
            commissionUnit: '$',
            comTypeDescription: 'Fixed rate for each sales call booked',
        },
    ];

    const typeOptions = [
        {
            description: 'Instantly approve all commission claims and order updates',
            title: 'Automatically approve commissions tracked by the system, as well as commissions claimed by sales reps.',
            value: 'freelancer'
        },
        {
            description: 'Automatically approve system tracked commissions, and only require approval for manual claims submitted by sales reps.',
            title: 'Require manual approval only for sales-rep change requests (reccomended)',
            value: 'projectOwner'
        },
        {
            description: 'Manually review all claimed commissions, both system tracked & manual claims made by reps.',
            title: 'Require manual approval always',
            value: 'affiliate'
        }
    ];

    const handleChangeSetterType = (event) => {
        console.log(event)
    }

    const handleDefaultsClick = () =>{
        setLoading(true)
        const commissionRole = [{
            commissionId: cuid(),
            commissionTypeId: "clc5y8r2s000108lb96jv91gp",
            commissionValue:"10",
            workspaceRoleCommissionId: cuid(),
            salesRoleId: "clc5wge9k0001uonxeddbqr6p",
            workspaceId: currentWorkspace?.id,
        },{
            commissionId: cuid(),
            commissionTypeId: "clc5y9mov000308lbd4yudaq7",
            commissionValue:"30",
            workspaceRoleCommissionId: cuid(),
            salesRoleId: "clc5wge9k0001uonxeddbqr6p",
            workspaceId: currentWorkspace?.id,
        }]

        const permissions = [{
            permissionId: cuid(),
            permissionType: "ADMIN",
            homeDashboard: true,
            setterDashboard: true,
            closerDashboard: true,
            fbDashboard: true,
            workspacePermissionId: cuid(),
            workspaceId: currentWorkspace?.id
        },{
            permissionId: cuid(),
            permissionType: "MEMBER",
            homeDashboard: true,
            setterDashboard: true,
            closerDashboard: true,
            fbDashboard: false,
            workspacePermissionId: cuid(),
            workspaceId: currentWorkspace?.id
        }]

        const comRole = commissionRole.map(async (role)=>{
            await dispatch<any>(createWorkspaceRoleCommissionsThunk(role))

        })
        const perm = permissions.map(async (permission)=>{
            await dispatch<any>(createWorkspacePermissionsThunk(permission))

        })

        setLoading(false)

    }

    return (
        <Card>
            <CardContent>
                <div>
                    <Typography variant="h6">
                        Commission Role Settings
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        sx={{mt: 1}}
                    >
                        You can upgrade and downgrade whenever you want.
                    </Typography>
                </div>
                {currentWorkspace?.workspaceRoleCommission.map((workspaceRoles: WorkspaceRoleCommission, workspaceRoleIndex: number)=>{
                    return(
                        <>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    mt: 3,
                                    mb: 3
                                }}
                            >
                                <SeverityPill sx={{mr: 1}}>
                                    {workspaceRoles?.salesRole.roleName}
                                </SeverityPill>
                                <TextField
                                    sx={{flexGrow: 1, mr: 1}}
                                    label="Type"
                                    name={workspaceRoles?.salesRole.roleType}
                                    size={'small'}
                                    onChange={handleChangeSetterType}
                                    select
                                    value={workspaceRoles.commission.commissionTypeId}
                                >
                                    {CloserCommissionTypeOptions.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.commissionName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Commission Rate"
                                    name="setterCommissionValue"
                                    onChange={handleChangeSetterType}
                                    size={'small'}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">{}</InputAdornment>
                                        ),
                                    }}
                                    type="number"
                                    value={workspaceRoles?.commission.commissionValue}
                                />
                            </Box>

                        </>
                    )

                })}
                {currentWorkspace?.workspaceRoleCommission?.length === 0  &&
                    <div  >
                        <Typography
                            color="textSecondary"
                            variant="body2"
                            sx={{mt: 1}}
                        >
                            Your Company is not ready yet. Add commissions and Permissions to continue, alternatively you can click this button to setup.
                        </Typography>
                        <LoadingButton endIcon={<ArrowRightIcon fontSize="small" />}
                                size="medium"
                                       loading={false}
                                variant="outlined"
                        onClick={handleDefaultsClick}>
                            Create Default Roles and Commissions
                        </LoadingButton>
                    </div>
                }

                {/*<Box*/}
                {/*    sx={{*/}
                {/*        alignItems: 'center',*/}
                {/*        display: 'flex',*/}
                {/*        flexWrap: 'wrap',*/}
                {/*        justifyContent: 'space-between',*/}
                {/*        mt: 3,*/}
                {/*        mb: 3*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <SeverityPill sx={{mr: 1}}>*/}
                {/*        Closer*/}
                {/*    </SeverityPill>*/}
                {/*    <TextField*/}
                {/*        sx={{flexGrow: 1, mr: 1}}*/}
                {/*        error={Boolean(formik.touched.closerCommissionTypes && formik.errors.closerCommissionTypes)}*/}
                {/*        label="Type"*/}
                {/*        name="closerCommissionTypes"*/}
                {/*        onBlur={formik.handleBlur}*/}
                {/*        onChange={formik.handleChange}*/}
                {/*        size={'small'}*/}
                {/*        select*/}
                {/*        value={formik.values.closerCommissionTypes}*/}
                {/*    >*/}
                {/*        {CloserCommissionTypeOptions.map((option) => (*/}
                {/*            <MenuItem*/}
                {/*                key={option.id}*/}
                {/*                value={option.id}*/}
                {/*            >*/}
                {/*                {option.commissionName}*/}
                {/*            </MenuItem>*/}
                {/*        ))}*/}
                {/*    </TextField>*/}
                {/*    <TextField*/}
                {/*        error={Boolean(formik.touched.closerCommissionValue && formik.errors.closerCommissionValue)}*/}
                {/*        label="Commission Rate"*/}
                {/*        name="closerCommissionValue"*/}
                {/*        onBlur={formik.handleBlur}*/}
                {/*        onChange={formik.handleChange}*/}
                {/*        size={'small'}*/}
                {/*        InputProps={{*/}
                {/*            startAdornment: (*/}
                {/*                <InputAdornment position="start">$</InputAdornment>*/}
                {/*            ),*/}
                {/*        }}*/}
                {/*        type="number"*/}
                {/*        value={formik.values.closerCommissionValue}*/}
                {/*    />*/}
                {/*</Box>*/}
            </CardContent>
            <Divider
                sx={{
                    mt: 1,
                    mb: 1
                }}
            />
            <CardContent>
                <div>
                    <Typography variant="h6">
                        Security Level
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                        sx={{mt: 1}}
                    >
                        Select the level of security when it comes to claiming commissions for your team
                    </Typography>
                </div>
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        minHeight: '100%',
                        mt: 2
                    }}
                >
                    <form onSubmit={(event) => event.preventDefault()}>
                        <RadioGroup
                            sx={{
                                '& > *:not(:last-of-type)': {
                                    mb: 2
                                }
                            }}
                        >
                            {typeOptions.map((typeOption) => (
                                <Paper
                                    key={typeOption.value}
                                    sx={{
                                        alignItems: 'flex-start',
                                        display: 'flex',
                                        p: 2
                                    }}
                                    variant="outlined"
                                >
                                    <FormControlLabel
                                        control={<Radio/>}
                                        key={typeOption.value}
                                        label={(
                                            <Box sx={{ml: 2}}>
                                                <Typography variant="subtitle2">
                                                    {typeOption.title}
                                                </Typography>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {typeOption.description}
                                                </Typography>
                                            </Box>
                                        )}
                                        value={typeOption.value}
                                    />
                                </Paper>
                            ))}
                        </RadioGroup>
                    </form>
                </Box>

            </CardContent>
        </Card>
    )
};
