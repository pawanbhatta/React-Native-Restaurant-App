import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import themeColors from "./../theme/index";
import Icon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItemById,
} from "../slices/cartSlice";

const DishRow = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(addToCart({ ...item }));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({ id: item?.id }));
  };

  const totalItems = useSelector((state) =>
    selectCartItemById(state, item?.id)
  );

  return (
    <View className="flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2">
      <Image
        className="rounded-3xl"
        source={item?.image}
        style={{ height: 100, width: 100 }}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{item?.name} </Text>
          <Text className="text-gray-700">{item?.description} </Text>
        </View>

        <View className="flex-row justify-between items-center pl-3">
          <Text className="text-gray-700 text-lg font-bold">
            ${item?.price}{" "}
          </Text>
          <View className="flex-row items-center">
            <TouchableOpacity
              disabled={!totalItems.length}
              onPress={handleDecrease}
              className=" p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Icon name="minus" color={"white"} size={20} />
            </TouchableOpacity>
            <Text className="px-3">{totalItems.length}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              className=" p-1 rounded-full"
              style={{ backgroundColor: themeColors.bgColor(1) }}
            >
              <Icon name="plus" color={"white"} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DishRow;
