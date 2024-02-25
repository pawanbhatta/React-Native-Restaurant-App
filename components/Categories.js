import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { categories } from "../constants";

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <View className="mt-4">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {categories.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnClass = isActive ? "bg-gray-600" : "bg-gray-200";
          let textClass = isActive
            ? "text-gray-800 font-semibold"
            : "text-gray-500";
          return (
            <View key={index} className="flex justify-center items-center mr-6">
              <TouchableOpacity
                className={"p-1 rounded-full shadow bg-gray-200 " + btnClass}
                onPress={() => setActiveCategory(category.id)}
              >
                <Image
                  source={category.image}
                  style={{ width: 45, height: 45 }}
                />
              </TouchableOpacity>
              <Text className={"text-sm " + textClass}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;
