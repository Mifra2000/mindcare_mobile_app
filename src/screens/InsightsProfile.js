import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('Insights Profile')}
      >
        <Text style={styles.cardTitle}>Insights</Text>
        <Text style={styles.cardSubtitle}>View your insights</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('View Pyschological Profile')}
      >
        <Text style={styles.cardTitle}>Psychological Profile</Text>
        <Text style={styles.cardSubtitle}>Explore your profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('Sleep Tracker')}
      >
        <Text style={styles.cardTitle}>Sleep Tracker</Text>
        <Text style={styles.cardSubtitle}>Track your sleep</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCardPress('Connect to SOS Support')}
      >
        <Text style={styles.cardTitle}>Connect to SOS Support</Text>
        <Text style={styles.cardSubtitle}>Emergency support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCardPress('Invite to Friends')}
      >
        <Text style={styles.cardTitle}>Invite to Friends</Text>
        <Text style={styles.cardSubtitle}>Connect with friends</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleCardPress('View / Edit Goals')}
      >
        <Text style={styles.cardTitle}>View / Edit Goals</Text>
        <Text style={styles.cardSubtitle}>Set and track goals</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => navigation.navigate('Set Reminder')}
      >
        <Text style={styles.cardTitle}>Reminders</Text>
        <Text style={styles.cardSubtitle}>Set reminders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'gray',
  },
});

export default HomeScreen;
