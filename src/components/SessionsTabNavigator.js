import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UpcomingSessions from './AppointmentNavigator';
import CancelledSessions from '../screens/FindingTherapistScreens/CancelledSessions';
import CompletedSessions from '../screens/FindingTherapistScreens/CompletedSessions';
const Tab = createMaterialTopTabNavigator();

const TopTabsScreen = () => {
  return (    
      <Tab.Navigator>
        <Tab.Screen name="Pending" component={CancelledSessions} />
        <Tab.Screen name="Approved" component={UpcomingSessions} />
        <Tab.Screen name="Completed" component={CompletedSessions} />
      </Tab.Navigator>    
  );
};

export default TopTabsScreen;
