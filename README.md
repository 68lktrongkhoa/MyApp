# Tab Navigation Documentation

## Overview
This file (`tab.tsx`) sets up the main tab navigation for the application using Expo Router. It defines 5 main tabs that users can navigate between.

## Tab Structure

### Tab Configuration
- **Initial Route**: The app will always start on the "Lệnh SX" (Production Orders) tab
- **Tab Bar Style**: 
  - Absolute positioning on iOS
  - Default positioning on other platforms
- **Custom Components**:
  - `HapticTab`: Provides haptic feedback when tabs are pressed
  - `TabBarBackground`: Custom background for the tab bar

### Available Tabs

| Tab Name      | Display Name | Icon Component      | Description                  |
|---------------|--------------|---------------------|------------------------------|
| `overview`    | Tổng quan    | `SumIcon`           | Main dashboard/overview      |
| `orders`      | Đơn hàng     | `DonHangIcon`       | Order management             |
| `gantt-chart` | Sơ đồ Gantt  | `GanttIcon`         | Gantt chart visualization    |
| `index`       | Lệnh SX      | `LenhSXIcon`        | Production orders (default)  |
| `more`        | Xem thêm     | `XemThemIcon`       | Additional options           |

## Implementation Details

### Dependencies
- `expo-router`: For navigation functionality
- `react-native`: For platform-specific styling
- Custom SVG icons for each tab

### Key Features
1. **Dynamic Coloring**:
   - Tab icons change color based on active state using the `color` prop
   - Colors are pulled from the app's theme system (`Colors` constant)

2. **Platform Adaptability**:
   - Different tab bar positioning for iOS vs other platforms
   - Uses `Platform.select()` for platform-specific styles

3. **Custom Components**:
   - Haptic feedback on tab press
   - Custom tab bar background

## File Structure Requirements
For this navigation to work properly, ensure you have these files in your `app` directory:
```
app/
  (tabs)/
    overview.tsx
    orders.tsx
    gantt-chart.tsx
    index.tsx      # Production Orders screen
    more.tsx
```

## Troubleshooting

### Common Issues
1. **Tabs not showing**:
   - Verify all screen components exist in `app/(tabs)`
   - Check console for any errors about missing components

2. **Icons not displaying**:
   - Ensure all SVG icon files exist in `@/assets/images/`
   - Verify SVG components accept `width`, `height`, and `color` props

3. **Default tab not working**:
   - Confirm `initialRouteName="index"` is set
   - Check that `app/(tabs)/index.tsx` exists and exports a valid component

### Development Notes
- To change the default tab, modify the `initialRouteName` prop
- To add more tabs, create a new `<Tabs.Screen>` component and add the corresponding file in `app/(tabs)`
- Tab order can be rearranged by moving the `<Tabs.Screen>` components

## Style Customization
To modify the tab bar appearance, edit these properties in `screenOptions`:
- `tabBarActiveTintColor`: Active tab icon color
- `tabBarStyle`: Overall tab bar styling
- `tabBarBackground`: Custom background component