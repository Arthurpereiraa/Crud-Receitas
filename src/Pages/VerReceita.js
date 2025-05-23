import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function VerReceita({ route, navigation }) {
  const { receita, onDelete } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [sucessoVisible, setSucessoVisible] = useState(false);

  const mostrarMensagemSucesso = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Receita excluída com sucesso!', ToastAndroid.SHORT);
    } else {
      Alert.alert(
        'Sucesso',
        'Receita excluída com sucesso!',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  const handleExcluir = () => {
    setModalVisible(true);
  };

  const confirmarExclusao = () => {
    if (onDelete) {
      onDelete(receita.id);
      setModalVisible(false);
      setSucessoVisible(true);
      setTimeout(() => {
        setSucessoVisible(false);
        navigation.goBack();
      }, 2000);
    }
  };

  const handleEditar = () => {
    navigation.navigate('Editar', {
      receita,
      onUpdate: (receitaAtualizada) => {
        route.params?.onUpdate?.(receitaAtualizada);
        navigation.goBack();
      },
    });
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
          <Ionicons name="chevron-back" size={28} color="#FFF4E6" />
        </TouchableOpacity>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={handleEditar}
          >
            <Text style={styles.headerButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.headerButton, styles.deleteButton]}
            onPress={handleExcluir}
          >
            <Text style={[styles.headerButtonText, styles.deleteButtonText]}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja excluir esta receita?
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
                onPress={confirmarExclusao}
              >
                <Text style={styles.confirmButtonText}>Excluir</Text>
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
        <View style={styles.sucessoBackground}>
          <View style={styles.sucessoContainer}>
            <View style={styles.sucessoIconContainer}>
              <Ionicons name="checkmark-circle" size={50} color="#4CAF50" />
            </View>
            <Text style={styles.sucessoTitle}>Receita excluída</Text>
            <Text style={styles.sucessoText}>com sucesso!</Text>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Imagem e Título */}
        <View style={styles.imagemContainer}>
          <View style={styles.imagePlaceholder}>
            <ActivityIndicator size="large" color="#FF7D63" />
          </View>
          <Image
            source={{ 
              uri: receita.imagem,
              cache: 'force-cache',
              headers: {
                Pragma: 'no-cache'
              }
            }}
            style={[styles.imagem, { position: 'absolute', top: 0, left: 0 }]}
            resizeMode="cover"
            onError={() => {
              return (
                <View style={styles.errorContainer}>
                  <Ionicons name="image-outline" size={40} color="#a1a1a1" />
                  <Text style={styles.errorText}>Erro ao carregar imagem</Text>
                </View>
              );
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <Text style={styles.imagemTitulo}>{receita.titulo.toUpperCase()}</Text>
          </LinearGradient>
        </View>
        <View style={styles.categoriaWrapper}>
          <View style={[
            styles.categoriaContainer,
            receita.tipo === 'doce' ? styles.categoriaDoce : styles.categoriaSalgado
          ]}>
            <View style={styles.categoriaIconContainer}>
              <Ionicons 
                name={receita.tipo === 'doce' ? 'ice-cream-outline' : 'pizza-outline'} 
                size={18} 
                color="#FFF" 
              />
            </View>
            <Text style={styles.categoriaTexto}>
              {receita.tipo === 'doce' ? 'Receita Doce' : 'Receita Salgada'}
            </Text>
          </View>
        </View>

        {/* Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          {receita.ingredientes.split('\n').map((ingrediente, index) => {
            const textoLimpo = ingrediente.trim();
            if (!textoLimpo) return null;
            return (
              <View key={index} style={styles.ingredienteItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.ingredienteTexto}>{textoLimpo}</Text>
              </View>
            );
          })}
        </View>

        {/* Modo de Preparo */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
          {receita.preparo.split('\n').map((passo, index) => {
            const textoLimpo = passo.trim();
            if (!textoLimpo) return null;
            return (
              <View key={index} style={styles.preparoItem}>
                <Text style={styles.preparoNumero}>{index + 1}.</Text>
                <Text style={styles.preparoTexto}>{textoLimpo}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 45 : 40,
    paddingBottom: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -50,
    paddingTop: 55,
  },
  backButton: {
    padding: 8,
    marginTop: Platform.OS === 'ios' ? 8 : 5,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Platform.OS === 'ios' ? 8 : 5,
  },
  headerButton: {
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  headerButtonText: {
    color: '#FF7D63',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FFF4E6',
  },
  deleteButtonText: {
    color: '#FF7D63',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  imagemContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imagem: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  errorText: {
    color: '#a1a1a1',
    marginTop: 8,
    fontSize: 14,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imagemTitulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'left',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  categoriaWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 125, 99, 0.1)',
  },
  categoriaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingLeft: 10,
    paddingRight: 16,
    borderRadius: 20,
    justifyContent: 'center',
  },
  categoriaDoce: {
    backgroundColor: 'rgba(255, 158, 205, 0.9)',
  },
  categoriaSalgado: {
    backgroundColor: 'rgba(255, 125, 99, 0.9)',
  },
  categoriaIconContainer: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoriaTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
    backgroundColor: '#FFF4E6',
  },
  lastSection: {
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7D63',
    marginBottom: 16,
  },
  ingredienteItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: 16,
    color: '#FF7D63',
    marginRight: 8,
    marginTop: 4,
  },
  ingredienteTexto: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  preparoItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingRight: 16,
  },
  preparoNumero: {
    fontSize: 16,
    color: '#FF7D63',
    marginRight: 8,
    minWidth: 24,
  },
  preparoTexto: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
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
  sucessoBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sucessoContainer: {
    backgroundColor: '#FFF4E6',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sucessoIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  sucessoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7D63',
    marginBottom: 8,
    textAlign: 'center',
  },
  sucessoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});
