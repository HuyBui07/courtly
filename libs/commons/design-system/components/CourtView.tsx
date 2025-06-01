import { View } from "react-native";
import { Text } from "react-native-paper";
import { colors } from "../colors";
import { textStyles } from "../styles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Booking } from "@/libs/my-booking/types/Booking";

const CourtLine = ({
  court,
  duration,
}: {
  court: String;
  duration: String;
}) => {
  return (
    <View
      style={{
        justifyContent: "center",
        gap: 16,
      }}
    >
      <Text style={{ ...textStyles.body, fontSize: 20, fontWeight: "bold" }}>
        {court}
      </Text>

      <Text style={{ ...textStyles.body }}>
        <MaterialCommunityIcons name="timer-sand" size={20} color="black" />{" "}
        {duration}
      </Text>
    </View>
  );
};

const CourtView = ({ booking }: { booking: Booking }) => {
  const startTime = new Date(booking.start_time);
  const dayName = startTime.toLocaleString("en-US", { weekday: "short" });
  const dayNum = startTime.getDate();
  const time = startTime.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = new Date(booking.end_time);
  const durationMs = endTime.getTime() - startTime.getTime();
  const durationHours = Math.round(durationMs / (1000 * 60 * 60));
  const duration = `${durationHours} hour${durationHours > 1 ? "s" : ""}`;
  return (
    <View
      style={{
        height: "auto",
        flexDirection: "row",
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        padding: 12,
        marginTop: 16,
        elevation: 4,
        gap: 24,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: colors.primary,
          borderRadius: 10,
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 24,
        }}
      >
        <Text
          variant="titleLarge"
          style={{ ...textStyles.title, color: "white" }}
        >
          {dayName}, {dayNum}
        </Text>

        <Text
          variant="bodyMedium"
          style={{ ...textStyles.body, color: "white" }}
        >
          {time}
        </Text>
      </View>

      <CourtLine court={`Court ${booking.court_id}`} duration={`${duration}`} />
    </View>
  );
};

export default CourtView;
