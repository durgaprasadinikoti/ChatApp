import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { COLORS } from "../../constants";
import Email from "./Email";
import PhoneNumber from "./PhoneNumber";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("email");
  const renderScreen = () => {
    switch (activeTab) {
      case "email":
        return <Email />;
      case "phone":
        return <PhoneNumber />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "email" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("email")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "email" && styles.activeTabText,
            ]}
          >
            Email
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "phone" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("phone")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "phone" && styles.activeTabText,
            ]}
          >
            Phone
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={styles.contentContainer}>
        {renderScreen()}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 80,
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: COLORS.secondary100,
    fontFamily: "navFont",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderColor: COLORS.primary200,
  },
  activeTabText: {
    color: COLORS.primary200,
  },
  contentContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "flex-start",
  },
  buttonsContainer: {
    marginVertical: 20,
  },
});

export default Tabs;
