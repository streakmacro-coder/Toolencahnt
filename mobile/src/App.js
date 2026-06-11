import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';

const App = () => {
  const [tools, setTools] = useState([]);
  const [toolName, setToolName] = useState('');
  const [selectedTool, setSelectedTool] = useState(null);

  const handleRegisterTool = useCallback(() => {
    if (toolName.trim() === '') {
      Alert.alert('Error', 'Please enter a tool name');
      return;
    }

    if (tools.find(tool => tool.name === toolName)) {
      Alert.alert('Error', 'Tool already exists');
      return;
    }

    setTools([...tools, { id: Date.now().toString(), name: toolName }]);
    setToolName('');
    Alert.alert('Success', `Tool "${toolName}" registered successfully`);
  }, [toolName, tools]);

  const handleExecuteTool = useCallback((toolId) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      Alert.alert('Executing', `Running tool: ${tool.name}`);
      setSelectedTool(tool);
    }
  }, [tools]);

  const handleDeleteTool = useCallback((toolId) => {
    setTools(tools.filter(tool => tool.id !== toolId));
    Alert.alert('Success', 'Tool deleted');
  }, [tools]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e90ff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toolencahnt</Text>
        <Text style={styles.headerSubtitle}>Tool Manager</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Register Tool Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Register New Tool</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter tool name"
            placeholderTextColor="#999"
            value={toolName}
            onChangeText={setToolName}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleRegisterTool}
          >
            <Text style={styles.buttonText}>Register Tool</Text>
          </TouchableOpacity>
        </View>

        {/* Registered Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Registered Tools ({tools.length})
          </Text>

          {tools.length === 0 ? (
            <Text style={styles.emptyText}>No tools registered yet</Text>
          ) : (
            <FlatList
              data={tools}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.toolCard}>
                  <View style={styles.toolInfo}>
                    <Text style={styles.toolName}>{item.name}</Text>
                    <Text style={styles.toolId}>ID: {item.id}</Text>
                  </View>

                  <View style={styles.toolActions}>
                    <TouchableOpacity
                      style={[styles.toolButton, styles.executeButton]}
                      onPress={() => handleExecuteTool(item.id)}
                    >
                      <Text style={styles.toolButtonText}>Execute</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.toolButton, styles.deleteButton]}
                      onPress={() => handleDeleteTool(item.id)}
                    >
                      <Text style={styles.toolButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>

        {/* Selected Tool Section */}
        {selectedTool && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Currently Selected</Text>
            <View style={[styles.toolCard, styles.selectedToolCard]}>
              <Text style={styles.toolName}>{selectedTool.name}</Text>
              <Text style={styles.toolId}>Status: Active</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e90ff',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  toolCard: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: '#1e90ff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedToolCard: {
    borderLeftColor: '#28a745',
    backgroundColor: '#f0fff4',
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toolId: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  toolActions: {
    flexDirection: 'row',
    gap: 8,
  },
  toolButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  executeButton: {
    backgroundColor: '#28a745',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  toolButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default App;
