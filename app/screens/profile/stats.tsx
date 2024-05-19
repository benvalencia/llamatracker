import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import {useCallback, useEffect, useState} from "react";
import {IUserProfile} from "@/app/services/fortnite/fortnite.interface";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";

export default function StatsScreen({route}: any) {

  const fortniteService = new FortniteService();
  const {fortniteUsername} = route.params;
  const [fortniteProfile, setFortniteProfile] = useState<IUserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  //Function para obtener el perfil de Fortnite
  const fetchProfile = useCallback(async () => {
    try {
      if (!refreshing) setLoading(true); // Solo establece loading si no está refrescando
      const profile = await fortniteService.getProfileByUsername(fortniteUsername);
      setFortniteProfile(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fortniteUsername, refreshing]);

// Obtener perfil al montar el componente
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Función de refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchProfile();
  };
// Mostrar indicador de carga mientras se obtiene el perfil
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.secondary}/>
      </View>
    );
  }
  // Mostrar mensaje de error si no se encuentra el perfil
  if (!fortniteProfile) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Perfil no encontrado.</Text>
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}
                        style={styles.scrollReloadContainer}/>}>
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Fortnite Profile</Text>
        <Text style={styles.profileText}>ACCOUNT</Text>
        <Text style={styles.profileText}>Name: {fortniteProfile.account?.name}</Text>
        <Text style={styles.profileText}>ID: {fortniteProfile.account?.id}</Text>
        <Text style={styles.profileText}>BATTLE PASS</Text>
        <Text style={styles.profileText}>Level: {fortniteProfile.battlePass?.level}</Text>
        <Text style={styles.profileText}>Progress: {fortniteProfile.battlePass?.progress}</Text>
        <Text style={styles.profileText}>IMAGE</Text>
        <Text style={styles.profileText}>Image: {fortniteProfile.image}</Text>
        <Text style={styles.profileText}>STATS - Overall</Text>
        <Text style={styles.profileText}>Score: {fortniteProfile.stats?.all?.overall?.score}</Text>
        <Text style={styles.profileText}>Score Per Min: {fortniteProfile.stats?.all?.overall?.scorePerMin}</Text>
        <Text style={styles.profileText}>Score Per
          Match: {fortniteProfile.stats?.all?.overall?.scorePerMatch}</Text>
        <Text style={styles.profileText}>Wins: {fortniteProfile.stats?.all?.overall?.wins}</Text>
        <Text style={styles.profileText}>Top 3: {fortniteProfile.stats?.all?.overall?.top3}</Text>
        <Text style={styles.profileText}>Top 5: {fortniteProfile.stats?.all?.overall?.top5}</Text>
        <Text style={styles.profileText}>Top 6: {fortniteProfile.stats?.all?.overall?.top6}</Text>
        <Text style={styles.profileText}>Top 10: {fortniteProfile.stats?.all?.overall?.top10}</Text>
        <Text style={styles.profileText}>Top 12: {fortniteProfile.stats?.all?.overall?.top12}</Text>
        <Text style={styles.profileText}>Top 25: {fortniteProfile.stats?.all?.overall?.top25}</Text>
        <Text style={styles.profileText}>Kills: {fortniteProfile.stats?.all?.overall?.kills}</Text>
        <Text style={styles.profileText}>Kills Per Min: {fortniteProfile.stats?.all?.overall?.killsPerMin}</Text>
        <Text style={styles.profileText}>Kills Per
          Match: {fortniteProfile.stats?.all?.overall?.killsPerMatch}</Text>
        <Text style={styles.profileText}>Deaths: {fortniteProfile.stats?.all?.overall?.deaths}</Text>
        <Text style={styles.profileText}>KD: {fortniteProfile.stats?.all?.overall?.kd}</Text>
        <Text style={styles.profileText}>Matches: {fortniteProfile.stats?.all?.overall?.matches}</Text>
        <Text style={styles.profileText}>Win Rate: {fortniteProfile.stats?.all?.overall?.winRate}</Text>
        <Text style={styles.profileText}>Minutes
          Played: {fortniteProfile.stats?.all?.overall?.minutesPlayed}</Text>
        <Text style={styles.profileText}>Players
          Outlived: {fortniteProfile.stats?.all?.overall?.playersOutlived}</Text>
        <Text style={styles.profileText}>Last Modified: {fortniteProfile.stats?.all?.overall?.lastModified}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingBottom: 16,
  },
  scrollReloadContainer: {
    backgroundColor: Colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 18,
  },
  profileSection: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  profileText: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
});

