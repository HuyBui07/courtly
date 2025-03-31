import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../colors";
import { textStyles } from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type CourtLineProps = {
  time: string;
  slots: number;
};

const CourtLine = ({ time, slots }: CourtLineProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <MaterialCommunityIcons name="clock-outline" size={20} color="black" />
      <Text style={textStyles.body}>{time}</Text>
      <MaterialCommunityIcons name="account-group" size={20} color="black" />
      <Text style={textStyles.body}>{slots} Slots</Text>
    </View>
  );
};

type CourtViewProps = {
  image: any;
  name: string;
  location: string;
  date: string;
  time: string;
  slots: number;
};

const CourtView = ({ image, name, location, date, time, slots }: CourtViewProps) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        padding: 12,
        marginVertical: 8,
        elevation: 4,
      }}
    >
      <Image
        source={image}
        style={{ width: "100%", height: 180, borderRadius: 10 }}
        resizeMode="cover"
      />

      <Text style={{ ...textStyles.title, fontWeight: "bold", marginTop: 8 }}>
        {name}
      </Text>
      <Text style={{ ...textStyles.body, color: "gray" }}>{location}</Text>

      <CourtLine time={time} slots={slots} />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
        <TouchableOpacity style={{ backgroundColor: "#FF5733", padding: 10, borderRadius: 8 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Get Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: "#28A745", padding: 10, borderRadius: 8 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Download Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourtView;
