import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Image,
  Modal,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const MAX_IMAGE_WIDTH = windowWidth - 48;
const MAX_IMAGE_HEIGHT = 300;

export default function AddItem({ navigation, route }) {
  const [tipo, setTipo] = useState('');
  const [imagem, setImagem] = useState('');
  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [validImage, setValidImage] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sucessoVisible, setSucessoVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (text) => {
    setImagem(text);
    
    if (!text) {
      setValidImage(false);
      setPreviewImage(null);
      setErrorMessage('Por favor, insira uma URL de imagem');
      return;
    }

    // Limpa a URL e adiciona https:// se necessário
    let urlLimpa = text.trim();
    if (!urlLimpa.startsWith('http://') && !urlLimpa.startsWith('https://')) {
      urlLimpa = 'https://' + urlLimpa;
    }

    // Exemplos de URLs que funcionam bem para testes:
    // https://i.imgur.com/your-image-id.jpg
    // https://images.unsplash.com/photo-id
    // https://www.themealdb.com/images/media/meals/image-id.jpg
    
    // Tenta carregar a imagem
    fetch(urlLimpa)
      .then(response => {
        if (response.ok) {
          setValidImage(true);
          setPreviewImage(urlLimpa);
          setErrorMessage('');
        } else {
          throw new Error('URL inválida');
        }
      })
      .catch(() => {
        setValidImage(false);
        setErrorMessage('URL inválida. Tente uma URL de imagem diferente.');
      });
  };

  const handleSave = () => {
    if (!tipo || !nome || !ingredientes || !preparo || !descricao) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios!');
      return;
    }

    if (imagem && !validImage) {
      Alert.alert('Erro', 'Imagem inválida. Use uma URL válida.');
      return;
    }

    setModalVisible(true);
  };

  const confirmarSalvar = () => {
    const novaReceita = {
      id: Date.now().toString(),
      tipo,
      imagem,
      titulo: nome,
      ingredientes,
      preparo,
      descricao,
    };

    console.log('Nova receita:', novaReceita);
    route.params?.addReceita?.(novaReceita);
    setModalVisible(false);
    setSucessoVisible(true);
    setTimeout(() => {
      setSucessoVisible(false);
      navigation.goBack();
    }, 2000);
  };

  const handleTipoChange = (value) => {
    if (value !== '') {
      setShowPlaceholder(false);
      setTipo(value);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar backgroundColor="#FF7D63" barStyle="light-content" />
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          <Text style={styles.headerTitleC}>C</Text>
          <Text style={styles.headerTitleRest}>adastro de receitas</Text>
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={styles.form} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Tipo da Receita</Text>
          <View style={styles.tipoContainer}>
            <View style={styles.tipoButtons}>
              <TouchableOpacity 
                style={[styles.tipoButton, tipo === 'salgado' && styles.tipoButtonSelected]}
                onPress={() => setTipo('salgado')}
              >
                <Text style={[styles.tipoButtonText, tipo === 'salgado' && styles.tipoButtonTextSelected]}>
                  🥪 Salgado
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.tipoButton, tipo === 'doce' && styles.tipoButtonSelected]}
                onPress={() => setTipo('doce')}
              >
                <Text style={[styles.tipoButtonText, tipo === 'doce' && styles.tipoButtonTextSelected]}>
                  🍰 Doce
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            value={imagem}
            onChangeText={handleImageChange}
            placeholder="URL da imagem"
            placeholderTextColor="#a1a1a1"
            style={[styles.input, !validImage && { borderColor: '#FF7D63' }]}
          />
          {previewImage && (
            <View style={styles.imagePreviewContainer}>
              <View style={styles.imagePlaceholder}>
                <ActivityIndicator size="large" color="#FF7D63" />
              </View>
              <Image
                source={{ 
                  uri: previewImage,
                  cache: 'force-cache',
                  headers: {
                    Pragma: 'no-cache'
                  }
                }}
                style={[styles.imagePreview, { position: 'absolute', top: 0, left: 0 }]}
                resizeMode="contain"
                onError={() => {
                  setValidImage(false);
                  setErrorMessage('Erro ao carregar a imagem. Verifique a URL.');
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Nome da Receita"
            placeholderTextColor="#a1a1a1"
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            value={ingredientes}
            onChangeText={setIngredientes}
            placeholder="Adicionar ingredientes"
            placeholderTextColor="#a1a1a1"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            value={preparo}
            onChangeText={setPreparo}
            placeholder="Modo de Preparo"
            placeholderTextColor="#a1a1a1"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Descrição da Receita"
            placeholderTextColor="#a1a1a1"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Receita</Text>
            <Text style={styles.modalText}>
              Deseja salvar esta receita?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmarSalvar}
              >
                <Text style={styles.confirmButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={sucessoVisible}
        onRequestClose={() => setSucessoVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, styles.sucessoContainer]}>
            <View style={styles.sucessoIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={[styles.modalTitle, styles.sucessoTitle]}>Receita salva!</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  header: {
    backgroundColor: '#FF7D63',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 18,
    top: 45,
    zIndex: 2,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
  },
  headerTitleC: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
    fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed',
  },
  headerTitleRest: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Arial Rounded MT Bold' : 'sans-serif-condensed',
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#AD2A2A',
    marginBottom: 8,
    marginLeft: 4,
  },
  tipoContainer: {
    marginBottom: 8,
  },
  tipoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  tipoButton: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF7D63',
    alignItems: 'center',
  },
  tipoButtonSelected: {
    backgroundColor: '#FF7D63',
  },
  tipoButtonText: {
    color: '#FF7D63',
    fontSize: 16,
    fontWeight: '600',
  },
  tipoButtonTextSelected: {
    color: '#FFF',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#FF7D63',
    borderRadius: 8,
    height: 58,
    paddingHorizontal: 14,
    fontSize: 18,
    color: '#AD2A2A',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: 200,
    padding: 5,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
  imageWarningText: {
    fontSize: 12,
    color: '#FF7D63',
    textAlign: 'center',
    marginTop: 2,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF7D63',
    borderRadius: 16,
    paddingVertical: 16,
    width: 160,
    alignSelf: 'center',
    shadowColor: '#FF7D63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF4E6',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7D63',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF7D63',
  },
  confirmButton: {
    backgroundColor: '#FF7D63',
  },
  cancelButtonText: {
    color: '#FF7D63',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sucessoContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
  },
  sucessoIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sucessoTitle: {
    color: '#4CAF50',
    fontSize: 28,
    marginBottom: 0,
  },
});
