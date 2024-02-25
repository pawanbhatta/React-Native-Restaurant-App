import { ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import themeColors from "./../theme/index";
import Categories from "../components/Categories";
import { featured } from "../constants";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle={"dark-content"} />

      {/* Searchbar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 mt-4">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon name="search" color="gray" size={20} />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon name="map-pin" color="gray" size={20} />
            <Text className="text-gray-600">Mahendranagar, MHN</Text>
          </View>
          <View
            className="p-3 rounded-full"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            <Icon name="sliders" color="gray" size={20} />
          </View>
        </View>
      </View>

      {/* main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* categories */}
        <Categories />

        {/* Featured */}
        <View className="mt-5">
          {[featured, featured, featured].map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
