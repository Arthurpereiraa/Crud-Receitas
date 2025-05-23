import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EditarReceita({ route, navigation }) {
  const { receita, onUpdate } = route.params;
  const [imagem, setImagem] = useState(receita.imagem || '');
  const [titulo, setTitulo] = useState(receita.titulo || '');
  const [ingredientes, setIngredientes] = useState(receita.ingredientes || '');
  const [preparo, setPreparo] = useState(receita.preparo || '');
  const [descricao, setDescricao] = useState(receita.descricao || '');
  const [tipo, setTipo] = useState(receita.tipo || 'salgado');
  const [modalVisible, setModalVisible] = useState(false);
  const [sucessoVisible, setSucessoVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState(receita.imagem || '');
  const [validImage, setValidImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validarCampos = () => {
    const novosErros = {};

    if (!titulo.trim()) {
      novosErros.titulo = 'O nome da receita é obrigatório';
    } else if (titulo.trim().length < 3) {
      novosErros.titulo = 'O nome deve ter pelo menos 3 caracteres';
    }

    if (!ingredientes.trim()) {
      novosErros.ingredientes = 'Os ingredientes são obrigatórios';
    }

    if (!preparo.trim()) {
      novosErros.preparo = 'O modo de preparo é obrigatório';
    }

    if (!descricao.trim()) {
      novosErros.descricao = 'A descrição é obrigatória';
    } else if (descricao.trim().length < 10) {
      novosErros.descricao = 'A descrição deve ter pelo menos 10 caracteres';
    }

    if (!tipo) {
      novosErros.tipo = 'Selecione o tipo da receita';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleImageChange = (text) => {
    setImagem(text);
    
    if (!text) {
      setValidImage(false);
      setPreviewImage(null);
      setErrorMessage('Por favor, insira uma URL de imagem');
      return;
    }

    let urlLimpa = text.trim();
    if (!urlLimpa.startsWith('http://') && !urlLimpa.startsWith('https://')) {
      urlLimpa = 'https://' + urlLimpa;
    }
    
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
        setPreviewImage(null);
        setErrorMessage('URL inválida. Tente uma URL de imagem diferente.');
      });
  };

  const handleSalvar = () => {
    if (!validarCampos()) {
      setModalVisible(true);
      return;
    }

    if (imagem && !validImage) {
      setErrorMessage('URL da imagem inválida. Por favor, verifique.');
      return;
    }

    setModalVisible(true);
  };

  const confirmarSalvar = () => {
    const receitaAtualizada = {
      ...receita,
      imagem: imagem.trim(),
      titulo: titulo.trim(),
      ingredientes: ingredientes.trim(),
      preparo: preparo.trim(),
      descricao: descricao.trim(),
      tipo: tipo,
    };

    if (onUpdate) {
      onUpdate(receitaAtualizada);
      setModalVisible(false);
      setSucessoVisible(true);
      setTimeout(() => {
        setSucessoVisible(false);
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF7D63" barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar receita</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Tipo e Nome */}
        <View style={styles.headerSection}>
          <Text style={styles.label}>Título da Receita</Text>
          <TextInput
            style={[styles.input, styles.tituloInput, errors.titulo && styles.inputError]}
            value={titulo}
            onChangeText={(text) => {
              setTitulo(text);
              if (errors.titulo) {
                const novosErros = { ...errors };
                delete novosErros.titulo;
                setErrors(novosErros);
              }
            }}
            placeholder="Ex: Bolo de Chocolate"
            placeholderTextColor="#999"
          />
          {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

          {/* Tipo da Receita */}
          <Text style={styles.label}>Categoria da Receita</Text>
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
            {errors.tipo && <Text style={styles.errorText}>{errors.tipo}</Text>}
          </View>
        </View>

        {/* Imagem */}
        <Text style={styles.label}>Foto da Receita</Text>
        <View style={styles.imageSection}>
          {previewImage ? (
            <>
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
                style={[styles.previewImage, { position: 'absolute', top: 0, left: 0 }]}
                resizeMode="cover"
                onError={() => {
                  setValidImage(false);
                  setPreviewImage(null);
                  setErrorMessage('Erro ao carregar a imagem. Verifique a URL.');
                }}
              />
            </>
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={50} color="#999" />
              <Text style={styles.placeholderText}>Sem imagem</Text>
            </View>
          )}
        </View>

        <TextInput
          style={[styles.input, !validImage && styles.inputError]}
          value={imagem}
          onChangeText={handleImageChange}
          placeholder="Cole aqui a URL da imagem"
          placeholderTextColor="#999"
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.descricao && styles.inputError]}
          value={descricao}
          onChangeText={(text) => {
            setDescricao(text);
            if (errors.descricao) {
              const novosErros = { ...errors };
              delete novosErros.descricao;
              setErrors(novosErros);
            }
          }}
          placeholder="Descreva brevemente sua receita"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />
        {errors.descricao && <Text style={styles.errorText}>{errors.descricao}</Text>}

        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.ingredientes && styles.inputError]}
          value={ingredientes}
          onChangeText={(text) => {
            setIngredientes(text);
            if (errors.ingredientes) {
              const novosErros = { ...errors };
              delete novosErros.ingredientes;
              setErrors(novosErros);
            }
          }}
          placeholder="Digite um ingrediente por linha&#10;Ex:&#10;2 xícaras de farinha&#10;3 ovos&#10;1 xícara de leite"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />
        {errors.ingredientes && <Text style={styles.errorText}>{errors.ingredientes}</Text>}

        <Text style={styles.label}>Modo de Preparo</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.preparo && styles.inputError]}
          value={preparo}
          onChangeText={(text) => {
            setPreparo(text);
            if (errors.preparo) {
              const novosErros = { ...errors };
              delete novosErros.preparo;
              setErrors(novosErros);
            }
          }}
          placeholder="Digite um passo por linha&#10;Ex:&#10;1. Misture os ingredientes secos&#10;2. Adicione os ovos e o leite&#10;3. Mexa bem até ficar homogêneo"
          placeholderTextColor="#999"
          multiline
          textAlignVertical="top"
        />
        {errors.preparo && <Text style={styles.errorText}>{errors.preparo}</Text>}

        <TouchableOpacity style={styles.salvarButton} onPress={handleSalvar}>
          <Text style={styles.salvarButtonText}>Salvar Receita</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Erro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Alterações</Text>
            <Text style={styles.modalText}>
              Deseja salvar as alterações nesta receita?
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

      {/* Modal de Sucesso */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sucessoVisible}
        onRequestClose={() => setSucessoVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, styles.sucessoModalContainer]}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <Text style={[styles.modalTitle, styles.sucessoModalTitle]}>Receita atualizada!</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  header: {
    backgroundColor: '#FF7D63',
    paddingTop: Platform.OS === 'ios' ? 50 : 45,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: -50,
    paddingTop: 65,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 65 : 60,
    zIndex: 1,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  tituloInput: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
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
  imageSection: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  placeholderText: {
    marginTop: 8,
    color: '#999',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF7D63',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  salvarButton: {
    backgroundColor: '#FF7D63',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  salvarButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sucessoModalContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 30,
  },
  modalIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  sucessoModalTitle: {
    color: '#4CAF50',
    fontSize: 28,
    marginBottom: 0,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
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
}); 