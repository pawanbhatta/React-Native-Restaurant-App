import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import themeColors from "./../theme/index";
import DishRow from "../components/DishRow";
import CartIcon from "../components/CartIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

const RestaurantScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  let item = params;

  useEffect(() => {
    if (item && item?.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);

  return (
    <View>
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={item?.image} />
          <TouchableOpacity
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" color={themeColors.bgColor(1)} size={15} />
          </TouchableOpacity>
        </View>

        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{item?.name} </Text>
            <View className="flex-row my-1 space-x-2">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-gray-700">{item?.stars}</Text>
                  <Text className="text-gray-700">
                    ({item?.reviews} review) ·{" "}
                    <Text className="font-semibold">{item?.category} </Text>
                  </Text>
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Icon name="map-pin" color="gray" size={15} />
                <Text className="text-xs text-gray-700">
                  Nearby · {item?.address}
                </Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2">{item?.description}</Text>
          </View>
        </View>

        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
          {/* dishes */}

          {item?.dishes?.map((dish, index) => {
            return <DishRow item={dish} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;
