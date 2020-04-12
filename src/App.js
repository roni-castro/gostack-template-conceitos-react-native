import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import RepositoryItem from './RepositoryItem';
import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('repositories');
      setRepositories(response.data);
    })();
  }, []);

  const handleLikeRepository = async (id) => {
    const response = await api.post(`repositories/${id}/like`).catch(err => console.warn(err));
    const repositoriesUpdated = repositories.map(repo => repo.id === id
      ? response.data
      : repo
    );
    setRepositories(repositoriesUpdated);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          style={styles.container}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <RepositoryItem
              key={item.id}
              id={item.id}
              title={item.title}
              likes={item.likes}
              techs={item.techs}
              onLikePress={() => handleLikeRepository(item.id)}
            />
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
});
