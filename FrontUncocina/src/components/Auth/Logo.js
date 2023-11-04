import { Image } from "react-native";
import { homeStyles } from "./styles";

export default function Logo() {
  return(
    <Image source={{
      uri:'https://firebasestorage.googleapis.com/v0/b/uncocina.appspot.com/o/recipes%2FUncocina_gon7t0.png?alt=media&token=d4a6bf3d-d90e-4e7b-9a2f-f0b8b2c14af0'
    }}
    style={homeStyles.logo}
    />
  )
}