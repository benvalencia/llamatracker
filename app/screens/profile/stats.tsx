import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React, {useCallback, useEffect, useState} from "react";
import {IUserProfile} from "@/app/services/fortnite/fortnite.interface";
import {FortniteService} from "@/app/services/fortnite/fortnite.service";
import {Ionicons} from '@expo/vector-icons';


export default function StatsScreen({route}: any) {

  const fortniteService = new FortniteService();
  const {fortniteUsername} = route.params;
  const [fortniteProfile, setFortniteProfile] = useState<IUserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);

  const formatDateDifference = (lastModified: string | number | Date) => {
    const currentDate = new Date();
    const modifiedDate = new Date(lastModified);
  
    const differenceInMilliseconds = currentDate.getTime() - modifiedDate.getTime();
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds}s`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)}m`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)}h`;
    } else {
      return `${Math.floor(differenceInSeconds / 86400)}D`;
    }
  };

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
         {/* Sección ACCOUNT y IMAGE */}
       <View style={styles.topContainer}>     
         <View style={styles.cardCentered}>
           <View style={styles.row}>
            <View style={[styles.card, styles.flexCard]}>
               <Text style={styles.cardTitle}>Image</Text>
              <View style={styles.cardContent}>
                 <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>Image: {fortniteProfile.image}</Text>
                 </View>
              </View> 
            </View>   
          <View style={[styles.card, styles.flexCard]}>
            <Text style={styles.cardTitle}>Account</Text>
            <View style={styles.cardContent}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}> {fortniteProfile.account?.name}</Text>
              </View>
            </View> 
          </View>
         </View>
        <View style={styles.card}>         
          <Text style={styles.cardTitle}>Battle Pass</Text>
          <Text style={styles.cardText}>Level: {fortniteProfile.battlePass?.level}</Text>
          <Text style={styles.cardText}>Progress: {fortniteProfile.battlePass?.progress}</Text>
         </View>                   
        </View>
       </View>       
      
           
        {/* Sección OVERALL STATS */}
   <View style={styles.cardCentered}>
      <View style={styles.statsRow}>
          <Text style={styles.cardTitle}>Overall Stats</Text>
          <Text style={styles.cardText}>Last Modified: {formatDateDifference(fortniteProfile.stats?.all?.overall?.lastModified)}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
         <Ionicons name="trophy-outline" size={24} color={Colors.yellow} />
         <Text style={styles.cardText}>Wins: {fortniteProfile.stats?.all?.overall?.wins}</Text>
      </View>
    
    <View style={styles.statItem}>
        <Ionicons name="checkmark-done-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Win Rate: {fortniteProfile.stats?.all?.overall?.winRate}</Text>
    </View>
    <View style={styles.statItem}>
       <Ionicons name="game-controller-outline" size={24} color={Colors.yellow} />
       <Text style={styles.cardText}>Matches: {fortniteProfile.stats?.all?.overall?.matches}</Text>
    </View>
    </View>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="skull-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Kills: {fortniteProfile.stats?.all?.overall?.kills}</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="skull-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Deaths: {fortniteProfile.stats?.all?.overall?.deaths}</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="speedometer-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>KD: {fortniteProfile.stats?.all?.overall?.kd}</Text>
      </View>
    </View>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="hourglass-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Minutes Played: {fortniteProfile.stats?.all?.overall?.minutesPlayed}</Text>
      </View>
      <View style={styles.statItem}>
      <Ionicons name="podium-outline" size={24} color={Colors.yellow} />
      <Text style={styles.cardText}>Top 3: {fortniteProfile.stats?.all?.overall?.top3}</Text>
    </View>
      <View style={styles.statItem}>
      <Ionicons name="people-outline" size={24} color={Colors.yellow} />
      <Text style={styles.cardText}>Top 10: {fortniteProfile.stats?.all?.overall?.top10}</Text>
    </View>
    
</View>

</View>
<View style={styles.cardCentered}>
      <View style={styles.statsRow}>
          <Text style={styles.cardTitle}>Solo Stats</Text>
          <Text style={styles.cardText}>Last Modified: {formatDateDifference(fortniteProfile.stats?.all?.solo?.lastModified)}</Text>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
         <Ionicons name="trophy-outline" size={24} color={Colors.yellow} />
         <Text style={styles.cardText}>Wins: {fortniteProfile.stats?.all?.solo?.wins}</Text>
      </View>
    
    <View style={styles.statItem}>
        <Ionicons name="checkmark-done-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Win Rate: {fortniteProfile.stats?.all?.solo?.winRate}</Text>
    </View>
    <View style={styles.statItem}>
       <Ionicons name="game-controller-outline" size={24} color={Colors.yellow} />
       <Text style={styles.cardText}>Matches: {fortniteProfile.stats?.all?.solo?.matches}</Text>
    </View>
    </View>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="skull-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Kills: {fortniteProfile.stats?.all?.solo?.kills}</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="skull-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Deaths: {fortniteProfile.stats?.all?.solo?.deaths}</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="speedometer-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>KD: {fortniteProfile.stats?.all?.solo?.kd}</Text>
      </View>
    </View>
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <Ionicons name="hourglass-outline" size={24} color={Colors.yellow} />
        <Text style={styles.cardText}>Minutes Played: {fortniteProfile.stats?.all?.solo?.minutesPlayed}</Text>
      </View>
      <View style={styles.statItem}>
      <Ionicons name="podium-outline" size={24} color={Colors.yellow} />
      <Text style={styles.cardText}>Top 10: {fortniteProfile.stats?.all?.solo?.top10}</Text>
    </View>
      <View style={styles.statItem}>
      <Ionicons name="people-outline" size={24} color={Colors.yellow} />
      <Text style={styles.cardText}>Top 25: {fortniteProfile.stats?.all?.solo?.top25}</Text>
    </View>
</View>
</View>

</View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  scrollReloadContainer: {
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.secondary,
    fontSize: 18,
  },
  topContainer: {
    width: '100%',
    flexGrow:1,
  },
  profileSection: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    justifyContent:'space-between',
    width:"95%"

  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
    alignItems: 'center',
  },
  row: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    
  },
  card: {

    backgroundColor: 'purple',
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
    width:"100%",
  },
  flexCard: {
    flex: 1,
    marginHorizontal: 8, // Optional: Add some horizontal margin to space them out
    width:"100%"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.yellow,
    marginBottom: 8,
    flexDirection:'column',
  },
  cardText: {
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTextContainer: {
    alignContent:'center',
    alignItems:'center',
    padding: 2,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
});

