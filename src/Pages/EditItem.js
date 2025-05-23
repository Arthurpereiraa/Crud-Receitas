import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function EditItem({ route, navigation }) {
  const { item } = route.params;

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [ingredients, setIngredients] = useState(item.ingredients || '');
  const [preparation, setPreparation] = useState(item.preparation || '');
  const [type, setType] = useState(item.type || '');
  const [imageUrl, setImageUrl] = useState(item.imageUrl || '');

  // Opções do Picker: removendo a opção vazia
  const pickerOptions = [
    { label: '🍰 Doce', value: 'doce' },
    { label: '🥪 Salgado', value: 'salgado' },
  ];

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Erro', 'A descrição é obrigatória.');
      return;
    }
    if (!type) {
      Alert.alert('Erro', 'Selecione o tipo da receita.');
      return;
    }

    Alert.alert('Sucesso', 'Receita atualizada com sucesso!');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Editar receita</Text>

        <Text style={styles.label}>Tipo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={type}
            onValueChange={setType}
            style={[styles.picker, { elevation: 0 }]}
            mode="dropdown"
            itemStyle={{ backgroundColor: '#FFF' }}
            android_ripple={{ color: 'transparent' }}
          >
            {pickerOptions.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} style={{ backgroundColor: '#FFF' }} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>URL da Imagem</Text>
        <TextInput
          style={styles.input}
          placeholder="URL da imagem"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Digite o título da receita"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Digite a descrição da receita"
          multiline
        />

        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Liste os ingredientes, separados por vírgula ou linha"
          multiline
        />

        <Text style={styles.label}>Modo de Preparo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={preparation}
          onChangeText={setPreparation}
          placeholder="Descreva o modo de preparo"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF4E6',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF7D63',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AD2A2A',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    color: '#000',
    borderWidth: 1.5,
    borderColor: '#FF7D63',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#FF7D63',
    elevation: 0,
  },
  picker: {
    height: 50,
    color: '#000',
    backgroundColor: '#FFF',
    elevation: 0,
  },
  button: {
    backgroundColor: '#FF7D63',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFF4E6',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
