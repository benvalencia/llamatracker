import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useTheme} from "@react-navigation/native";
import {Fonts} from "@/constants/Colors";


const Tick = ({value, type, color, size, weight}: any) => {
  return (
    <View>
      <Text style={{color: color, fontSize: size, fontWeight: weight}}>{value < 10 ? '0' : ''}{value}{type}</Text>
    </View>
  );
};

const CounterTimer = ({days, hours, minutes, seconds, color, size, weight}: any) => {
  return (
    <View>
      {days ? <Tick value={days} type={'Days'}></Tick> : null}
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Tick value={hours} type={'h'} color={color} size={size} weight={weight}></Tick>
        <Text style={{color: color, fontSize: size, fontWeight: weight}}>:</Text>
        <Tick value={minutes} type={'m'} color={color} size={size} weight={weight}></Tick>
        <Text style={{color: color, fontSize: size, fontWeight: weight}}>:</Text>
        <Tick value={seconds} type={'s'} color={color} size={size} weight={weight}></Tick>
      </View>
    </View>
  );
};

const Timer = ({targetDate, color, size, weight}: any) => {
  const {colors} = useTheme();

  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <Text></Text>;
  } else {
    return (
      <CounterTimer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        color={color ? color : colors.text}
        size={size ? size : Fonts.size.m}
        weight={weight ? weight : Fonts.weight.normal}
      />
    );
  }
};

const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default Timer;

