import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { receitasIniciais } from '../data/receitasIniciais';

export default function Home({ navigation, route }) {
  const [tipoSelecionado, setTipoSelecionado] = useState('salgado');
  const [pesquisa, setPesquisa] = useState('');
  const [receitas, setReceitas] = useState(receitasIniciais);

  // Atualiza a lista de receitas quando uma nova é adicionada
  useEffect(() => {
    if (route.params?.novaReceita) {
      setReceitas(prevReceitas => [...prevReceitas, route.params.novaReceita]);
      // Limpa o parâmetro para evitar duplicação
      navigation.setParams({ novaReceita: null });
    }
  }, [route.params?.novaReceita]);

  const receitasFiltradas = receitas.filter(receita => {
    const matchTipo = receita.tipo.toLowerCase() === tipoSelecionado.toLowerCase();
    const matchPesquisa = receita.titulo.toLowerCase().includes(pesquisa.toLowerCase());
    return matchTipo && matchPesquisa;
  });

  const addReceita = (novaReceita) => {
    setReceitas(prevReceitas => [...prevReceitas, novaReceita]);
  };

  const deleteReceita = (id) => {
    setReceitas(prevReceitas => prevReceitas.filter(receita => receita.id !== id));
  };

  const updateReceita = (receitaAtualizada) => {
    setReceitas(prevReceitas => 
      prevReceitas.map(receita => 
        receita.id === receitaAtualizada.id ? receitaAtualizada : receita
      )
    );
  };

  function handleVerReceita(item) {
    navigation.navigate('VerReceita', { 
      receita: item,
      onDelete: deleteReceita,
      onUpdate: updateReceita
    });
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Pedacinho</Text>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#a1a1a1" style={styles.searchIcon} />
            <TextInput
              placeholder="Pesquisar por receita"
              value={pesquisa}
              onChangeText={setPesquisa}
              placeholderTextColor="#a1a1a1"
              style={styles.input}
            />
          </View>
        </View>
      </View>

      {/* FILTROS + BOTÃO */}
      <View style={styles.filtrosRow}>
        <View style={styles.filtros}>
          <TouchableOpacity onPress={() => setTipoSelecionado('salgado')}>
            <Text
              style={[
                styles.filtroTexto,
                tipoSelecionado === 'salgado' && styles.filtroSelecionado
              ]}
            >
              Salgado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTipoSelecionado('doce')}>
            <Text
              style={[
                styles.filtroTexto,
                tipoSelecionado === 'doce' && styles.filtroSelecionado
              ]}
            >
              Doce
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('Adicionar', { addReceita })}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* LISTAGEM OU MENSAGEM */}
      {receitasFiltradas.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhuma receita {tipoSelecionado.toLowerCase()} encontrada
        </Text>
      ) : (
        <FlatList
          data={receitasFiltradas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleVerReceita(item)}
            >
              <View style={styles.cardImageContainer}>
                {item.imagem ? (
                  <>
                    <View style={styles.imagePlaceholder}>
                      <ActivityIndicator size="large" color="#FF7D63" />
                    </View>
                    <Image
                      source={{ 
                        uri: item.imagem,
                        cache: 'force-cache',
                        headers: {
                          Pragma: 'no-cache'
                        }
                      }}
                      style={[
                        styles.cardImage,
                        { position: 'absolute', top: 0, left: 0 }
                      ]}
                      resizeMode="cover"
                      onError={() => {
                        // Em caso de erro, mostra um ícone de erro
                        return (
                          <View style={styles.errorContainer}>
                            <Ionicons name="image-outline" size={40} color="#a1a1a1" />
                            <Text style={styles.errorText}>Erro ao carregar imagem</Text>
                          </View>
                        );
                      }}
                    />
                  </>
                ) : (
                  <View style={styles.noImageContainer}>
                    <Ionicons name="image-outline" size={40} color="#a1a1a1" />
                    <Text style={styles.noImageText}>Sem imagem</Text>
                  </View>
                )}
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.titulo}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {item.descricao}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4E6',
  },
  header: {
    backgroundColor: '#FF7D63',
    paddingTop: 75,
    paddingBottom: 45,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 35,
  },
  searchWrapper: {
    width: '94%',
    alignSelf: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF4E6',
    borderWidth: 0,
    paddingVertical: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
  filtrosRow: {
    marginTop: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF4E6',
  },
  filtros: {
    flexDirection: 'row',
    gap: 16,
  },
  filtroTexto: {
    fontSize: 16,
    color: '#FF7D63',
  },
  filtroSelecionado: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  addBtn: {
    backgroundColor: '#FF7D63',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#FFF4E6',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  listContent: {
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 80,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 0,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImageContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: '#a1a1a1',
    marginTop: 8,
    fontSize: 14,
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noImageText: {
    color: '#a1a1a1',
    marginTop: 8,
    fontSize: 14,
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
});
