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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}></Text>
        {/* Sección ACCOUNT y IMAGE */}
       <View style={styles.cardCentered}>
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Account</Text>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Name: {fortniteProfile.account?.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Image</Text>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Image: {fortniteProfile.image}</Text>
              </View>
            </View>
          </View>
        </View>
       </View>
        {/* Sección BATTLE PASS */}
        <View style={styles.cardCentered}>
          <Text style={styles.cardTitle}>Battle Pass</Text>
          <Text style={styles.cardText}>Level: {fortniteProfile.battlePass?.level}</Text>
          <Text style={styles.cardText}>Progress: {fortniteProfile.battlePass?.progress}</Text>
        </View>
        {/* Sección OVERALL STATS */}
        <View style={styles.cardCentered}>
          <Text style={styles.cardTitle}>Overall Stats</Text>
          <Text style={styles.cardText}>Score: {fortniteProfile.stats?.all?.overall?.score}</Text>
          <Text style={styles.cardText}>Score Per Min: {fortniteProfile.stats?.all?.overall?.scorePerMin}</Text>
          <Text style={styles.cardText}>Score Per Match: {fortniteProfile.stats?.all?.overall?.scorePerMatch}</Text>
          <Text style={styles.cardText}>Wins: {fortniteProfile.stats?.all?.overall?.wins}</Text>
          <Text style={styles.cardText}>Top 3: {fortniteProfile.stats?.all?.overall?.top3}</Text>
          <Text style={styles.cardText}>Top 5: {fortniteProfile.stats?.all?.overall?.top5}</Text>
          <Text style={styles.cardText}>Top 6: {fortniteProfile.stats?.all?.overall?.top6}</Text>
          <Text style={styles.cardText}>Top 10: {fortniteProfile.stats?.all?.overall?.top10}</Text>
          <Text style={styles.cardText}>Top 12: {fortniteProfile.stats?.all?.overall?.top12}</Text>
          <Text style={styles.cardText}>Top 25: {fortniteProfile.stats?.all?.overall?.top25}</Text>
          <Text style={styles.cardText}>Kills: {fortniteProfile.stats?.all?.overall?.kills}</Text>
          <Text style={styles.cardText}>Kills Per Min: {fortniteProfile.stats?.all?.overall?.killsPerMin}</Text>
          <Text style={styles.cardText}>Kills Per Match: {fortniteProfile.stats?.all?.overall?.killsPerMatch}</Text>
          <Text style={styles.cardText}>Deaths: {fortniteProfile.stats?.all?.overall?.deaths}</Text>
          <Text style={styles.cardText}>KD: {fortniteProfile.stats?.all?.overall?.kd}</Text>
          <Text style={styles.cardText}>Matches: {fortniteProfile.stats?.all?.overall?.matches}</Text>
          <Text style={styles.cardText}>Win Rate: {fortniteProfile.stats?.all?.overall?.winRate}</Text>
          <Text style={styles.cardText}>Minutes Played: {fortniteProfile.stats?.all?.overall?.minutesPlayed}</Text>
          <Text style={styles.cardText}>Players Outlived: {fortniteProfile.stats?.all?.overall?.playersOutlived}</Text>
          <Text style={styles.cardText}>Last Modified: {fortniteProfile.stats?.all?.overall?.lastModified}</Text>
        </View>
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
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'space-between'

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  row: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  card: {
    alignContent: 'center',
    width:'48%',
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.yellow,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    alignContent:'center',
    alignItems:'center',
    flex: 1,
  },
  cardCentered: {
    width: '100%',
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  imageContainer: {
    marginLeft: 16,
    padding: 15,

  },
});

