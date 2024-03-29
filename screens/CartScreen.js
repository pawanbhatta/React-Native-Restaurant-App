import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import themeColors from "./../theme/index";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectRestaurant } from "./../slices/restaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/cartSlice";

const CartScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const [groupedItems, setGroupedItems] = useState({});

  const deliveryFee = 50;

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});

    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1">
      {/* back button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon name="arrow-left" color={"white"} size={20} />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant?.name} </Text>
        </View>
      </View>

      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row px-4 items-center"
      >
        <Image
          source={require("../assets/images/bikeGuy.jpg")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="flex-1 pl-4">Deliver in 20-30 minutes </Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>

      {/* Dishes */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-white pt-5"
      >
        {Object.entries(groupedItems).map(([key, items]) => {
          let dish = items?.[0];
          console.log("dish here cart screen : ", dish);
          return (
            <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold" style={{ color: themeColors.text }}>
                {items.length} x
              </Text>
              <Image className="h-14 w-14 rounded-full" source={dish.image} />
              <Text className="font-bold text-gray-700 flex-1">
                {dish.name}{" "}
              </Text>
              <Text className="font-semibold text-base">
                ${dish.price * items.length}{" "}
              </Text>

              <TouchableOpacity
                className="p-1 rounded-full"
                onPress={() => dispatch(removeFromCart({ id: dish.id }))}
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon name="minus" color={"white"} size={20} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Totals */}
      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">${deliveryFee} </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total</Text>
          <Text className="text-gray-700 font-extrabold">
            ${deliveryFee + cartTotal}{" "}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPreparing")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              Place Order{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartScreen;
