import Toast from "react-native-toast-message";

export class ToastrService {

  public error(message: string) {
    Toast.show({
      type: 'error',
      text1: message,
    });
  }

}