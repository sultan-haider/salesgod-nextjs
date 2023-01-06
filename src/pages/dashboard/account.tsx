import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { AccountBillingSettings } from '../../components/dashboard/account/account-billing-settings';
import { AccountGeneralSettings } from '../../components/dashboard/account/account-general-settings';
import { AccountNotificationsSettings } from '../../components/dashboard/account/account-notifications-settings';
import { AccountTeamSettings } from '../../components/dashboard/account/account-team-settings';
import { AccountSecuritySettings } from '../../components/dashboard/account/account-security-settings';
import { gtm } from '../../lib/gtm';
import {AccountIntegrationSettings} from "../../components/dashboard/account/account-integration-settings";
import {CommissionRoleSettings} from "../../components/dashboard/account/commission-role-settings";
import {getWorkspaceMembersThunk} from "../../thunks/workspace-members";
import {useDispatch, useSelector} from "../../store";

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Integrations', value: 'integrations' },
  { label: 'Team', value: 'team' },
  { label: 'Commissions', value: 'commissions' },
  { label: 'Products', value: 'products' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Billing', value: 'billing' },
  { label: 'Security', value: 'security' }
];

const Account: NextPage = () => {
    const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<string>('general');
    const currentWorkspace = useSelector((state) => state.workspace.currentWorkspace);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
    useEffect(() => {
        dispatch(getWorkspaceMembersThunk({workspaceId: currentWorkspace?.id }))

    }, []);

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>
          Dashboard: Account | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4">
            Account
          </Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === 'general' && <AccountGeneralSettings />}
          {currentTab === 'integrations' && <AccountIntegrationSettings />}
          {currentTab === 'team' && <AccountTeamSettings />}
          {currentTab === 'commissions' && <CommissionRoleSettings />}
          {currentTab === 'products' && <AccountTeamSettings />}
          {currentTab === 'notifications' && <AccountNotificationsSettings />}
          {currentTab === 'billing' && <AccountBillingSettings />}
          {currentTab === 'security' && <AccountSecuritySettings />}
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Account;
