import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const statusTabs = ['Pendiente', 'En progreso', 'Resultado', 'En revisión'];

interface StatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      {statusTabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab,
          ]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText,
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingBottom: 8,
    marginBottom: -1,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#1E88E5',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#1E88E5',
    fontWeight: '600',
  },
});

export default StatusTabs;

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// const statusTabs = ['Pendiente', 'En progreso', 'Resultado', 'En revisión'];

// interface StatusTabsProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// const StatusTabs: React.FC<StatusTabsProps> = ({ activeTab, setActiveTab }) => {
//   return (
//     <View style={styles.container}>
//       {statusTabs.map(tab => (
//         <TouchableOpacity
//           key={tab}
//           style={[
//             styles.tab,
//             activeTab === tab && styles.activeTab,
//           ]}
//           onPress={() => setActiveTab(tab)}
//         >
//           <Text style={[
//             styles.tabText,
//             activeTab === tab && styles.activeTabText,
//           ]}>
//             {tab}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   tab: {
//     paddingBottom: 8,
//     marginBottom: -1,
//     borderBottomWidth: 2,
//     borderBottomColor: 'transparent',
//   },
//   activeTab: {
//     borderBottomColor: '#1E88E5',
//   },
//   tabText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   activeTabText: {
//     color: '#1E88E5',
//     fontWeight: '600',
//   },
// });

// export default StatusTabs;