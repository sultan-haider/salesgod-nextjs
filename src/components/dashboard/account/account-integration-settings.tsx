import type { FC } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import SvgIcon  from '@mui/material/SvgIcon';
import { Logo } from '../../logo';
import { Pencil as PencilIcon } from '../../../icons/pencil';
import { StripeIcon } from '../../../icons/stripe-integration';
import { FbIcon } from '../../../icons/fb-integration';
import { CalendlyIcon } from '../../../icons/calendly-integration';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

const plans = [
  {
    image:()=> {return(<StripeIcon/>)} ,
    name: 'Stripe',
    price: '0',
    current: true
  },
  {
    image: ()=> {return(<CalendlyIcon/>)},
    name: 'Calendly',
    price: '4.99',
    current: false
  },
  {
    image: ()=> {return(<FbIcon/>)},
    name: 'Facebook Ads',
    price: '29.99',
    current: false
  }
];

export const AccountIntegrationSettings: FC = (props) => {
  const [selected, setSelected] = useState<string>('Standard');

  return (
    <div {...props}>
      <Card>
        <CardContent>
          <div>
            <Typography variant="h6">
              Connect Your Resources
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ mt: 1 }}
              variant="body2"
            >
              Please connect your apps for the best experience
            </Typography>
          </div>
          <Box sx={{ mt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {plans.map((plan) => (
                <Grid
                  item
                  key={plan.name}
                  sm={4}
                  xs={12}
                >
                  <Card
                    elevation={0}
                    onClick={() => setSelected(plan.name)}
                    variant="outlined"
                    sx={{
                      cursor: 'pointer',
                      ...(selected === plan.name && {
                        borderColor: 'primary.main',
                        borderWidth: 2,
                        m: '-1px'
                      })
                    }}
                  >
                    <CardContent>
                      {plan.image()}
                      <Box
                        sx={{
                          display: 'flex',
                          mb: 1,
                          mt: 1
                        }}
                      >
                        <Typography variant="h5">
                          {plan.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant="overline">
                          <Button variant="contained" size="small">
                            Connect
                          </Button>
                        </Typography>

                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider
            sx={{
              mb: 3,
              mt: 3
            }}
          />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="h6">
              Active Connections
            </Typography>
            {/*<Button*/}
            {/*  startIcon={(*/}
            {/*    <PencilIcon fontSize="small" />*/}
            {/*  )}*/}
            {/*>*/}
            {/*  Edit*/}
            {/*</Button>*/}
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              mt: 3
            }}
          >
            <Table>
              {/*<TableHead>*/}
              {/*  <TableRow>*/}
              {/*    <TableCell>Date</TableCell>*/}
              {/*    <TableCell>Total (incl. tax)</TableCell>*/}
              {/*    <TableCell />*/}
              {/*  </TableRow>*/}
              {/*</TableHead>*/}
              <TableBody>
                <TableRow>
                  <TableCell>Facebook Ads</TableCell>
                  <TableCell>
                    <Typography color="secondary.main" variant="caption">
                      Connected
                    </Typography>
                  </TableCell>
                  <TableCell>Creators Training Masterclass</TableCell>
                  <TableCell align="right">
                    <Button disabled variant="contained" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Calendly</TableCell>
                  <TableCell>
                    <Typography color="secondary.main" variant="caption">
                      Connected
                    </Typography>
                  </TableCell>
                  <TableCell>Creators Training</TableCell>
                  <TableCell align="right">
                    <Button disabled variant="contained" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Stripe</TableCell>
                  <TableCell>
                    <Typography color="secondary.main" variant="caption">
                      Connected
                    </Typography>
                  </TableCell>
                  <TableCell>Creators Training</TableCell>
                  <TableCell align="right">
                    <Button disabled variant="contained" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
