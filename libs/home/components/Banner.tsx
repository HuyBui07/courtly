import { styles } from "@/libs/commons/design-system/styles";

import { View, Text, Image } from "react-native";

const Banner = () => {
  return (
    <View style={{ width: "100%", height: 120, paddingHorizontal: 12, marginTop: 16 }}>
      <Image
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
        source={require("../../../assets/images/banner.png")}
      />
    </View>
  );
};

export default Banner;
