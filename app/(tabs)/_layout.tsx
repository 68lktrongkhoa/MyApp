import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import SumIcon from '@/assets/images/tong-quan.svg';
import DonHangIcon from '@/assets/images/don-hang.svg';
import GanttIcon from '@/assets/images/sodogatt.svg';
import LenhSXIcon from '@/assets/images/lenh-san-xuat.svg';
import XemThemIcon from '@/assets/images/xem-them.svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', 
          },
          default: {}, 
        }),
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          title: 'Tổng quan',
          tabBarIcon: ({ color }) => <SumIcon width={24} height={24} color={color} />, 
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color }) => <DonHangIcon width={24} height={24}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="gantt-chart"
        options={{
          title: 'Sơ đồ Gantt',
          tabBarIcon: ({ color }) => <GanttIcon width={24} height={24}   color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lệnh SX',
          tabBarIcon: ({ color }) => <LenhSXIcon width={24} height={24}  color={color} />, 
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'Xem thêm',
          tabBarIcon: ({ color }) => <XemThemIcon width={24} height={24}  color={color} />,
        }}
      />
    </Tabs>
  );
}