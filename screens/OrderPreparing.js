import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const OrderPreparing = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      // Move to the delivery screen
      navigation.navigate("Delivery");
    }, 3100);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../assets/images/delivery.gif")}
        className="h-80 w-80"
      />
    </View>
  );
};

export default OrderPreparing;
