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
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Mail as MailIcon } from '../../../icons/mail';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export const CommissionRoleSettings: FC = () => {
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
        // NOTE: Make API request
        toast.success('Product created!');
        // router.push('/dashboard/products').catch(console.error);
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  const CloserCommissionTypeOptions = [
    {
      label: 'Percent of Cash Collected',
      value: 'healthcare',
      description: 'Only pay when you recieve cash'
    },
    {
      label: 'Percent of Total Deal Value',
      value: 'makeup',
      description: 'Pay for the total deal value up front'
    },
    {
      label: 'Flat Rate Per Deal Closed',
      value: 'dress',
      description: 'Pay a fixed rate for every deal'
    }
  ];
  const setterCommissionTypeOptions = [
    {
      label: 'Percent of Total Deal Value',
      value: 'healthcare',
      description: 'Pay for the total deal value up front'
    },
    {
      label: 'Flat Rate Per Deal Closed',
      value: 'makeup',
      description: 'Pay a fixed rate for every deal'
    },
    {
      label: 'Flat Rate Per Appointment Set',
      value: 'dress',
      description: 'Fixed rate for each sales call booked'
    }
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
                sx={{ mt: 1 }}
            >
              You can upgrade and downgrade whenever you want.
            </Typography>
          </div>
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
            <SeverityPill sx={{mr:1}}>
              Setter
            </SeverityPill>
            <TextField
                sx={{flexGrow: 1, mr:1}}
                error={Boolean(formik.touched.setterCommissionTypes && formik.errors.setterCommissionTypes)}
                label="Type"
                name="setterCommissionTypes"
                onBlur={formik.handleBlur}
                size={'small'}
                onChange={formik.handleChange}
                select
                value={formik.values.setterCommissionTypes}
            >
              {CloserCommissionTypeOptions.map((option) => (
                  <MenuItem
                      key={option.value}
                      value={option.value}
                  >
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                error={Boolean(formik.touched.setterCommissionValue && formik.errors.setterCommissionValue)}
                label="Commission Rate"
                name="setterCommissionValue"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                size={'small'}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                value={formik.values.setterCommissionValue}
            />
          </Box>
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
            <SeverityPill sx={{mr:1}}>
              Closer
            </SeverityPill>
            <TextField
                sx={{flexGrow: 1, mr:1}}
                error={Boolean(formik.touched.closerCommissionTypes && formik.errors.closerCommissionTypes)}
                label="Type"
                name="closerCommissionTypes"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                size={'small'}
                select
                value={formik.values.closerCommissionTypes}
            >
              {CloserCommissionTypeOptions.map((option) => (
                  <MenuItem
                      key={option.value}
                      value={option.value}
                  >
                    {option.label}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                error={Boolean(formik.touched.closerCommissionValue && formik.errors.closerCommissionValue)}
                label="Commission Rate"
                name="closerCommissionValue"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                size={'small'}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                value={formik.values.closerCommissionValue}
            />
          </Box>
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
                sx={{ mt: 1 }}
            >
                Select the level of security when it comes to claiming commissions for your team
            </Typography>
          </div>
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    minHeight: '100%',
                    mt:2
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
                                    control={<Radio />}
                                    key={typeOption.value}
                                    label={(
                                        <Box sx={{ ml: 2 }}>
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
)};
