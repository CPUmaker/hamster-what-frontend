import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { Card, Skeleton, Button } from "@rneui/themed";
import axios from "axios";

import { endpoints } from "../../config";

export default function CouponListScreen() {
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {
    axios
      .get(endpoints.coupon)
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((error) => {
        console.log(`ConponList error: ${JSON.stringify(error.response.data)}`);
      });
  });

  if (coupons === null) {
    return (
      <ScrollView>
        <Card style={styles.skelenton}>
          <Skeleton animation="pulse" height={22} />
          <Card.Divider />
          <Skeleton
            animation="pulse"
            height={200}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"80%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"40%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={26}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
        </Card>

        <Card style={styles.skelenton}>
          <Skeleton animation="pulse" height={22} />
          <Card.Divider />
          <Skeleton
            animation="pulse"
            height={200}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"80%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"40%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={26}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
        </Card>

        <Card style={styles.skelenton}>
          <Skeleton animation="pulse" height={22} />
          <Card.Divider />
          <Skeleton
            animation="pulse"
            height={200}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"80%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={22}
            width={"40%"}
            style={{ marginTop: 10 }}
          />
          <Skeleton
            animation="pulse"
            height={26}
            width={"100%"}
            style={{ marginTop: 10 }}
          />
        </Card>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={coupons}
        initialNumToRender={5}
        renderItem={({ item }) => {
          return (
            <Card>
              <Card.Title
                style={styles.title}
              >{`${item.store}: ${item.title}`}</Card.Title>
              <Card.Divider />
              <View style={styles.coupon}>
                <Card.Image
                  style={styles.coupon_image}
                  source={{
                    uri:
                      item.image_url !== ""
                        ? item.image_url
                        : "https://img.freepik.com/premium-vector/coupon-icon-coupon-discount-promotion-sale-shopping-voucher-money-saving-shopping-concept_97458-1054.jpg?w=2000",
                  }}
                />
                <Text style={styles.coupon_name}>{item.description}</Text>
                <Text style={styles.coupon_name}>{`CODE: ${
                  item.code !== "" ? item.code : "details on the page"
                }`}</Text>
                <Text
                  style={styles.coupon_name}
                >{`Expire at: ${item.expire_date}`}</Text>
                <Button
                  icon={
                    <Ionicons name="link-outline" size={24} color="black" />
                  }
                  buttonStyle={styles.button}
                  title="VIEW NOW"
                  onPress={() => Linking.openURL(item.smart_link)}
                />
              </View>
            </Card>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skeleton_container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  skelenton: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
  coupon: {},
  coupon_image: {
    padding: 0,
  },
  coupon_name: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Roboto-Medium",
  },
  button: {
    backgroundColor: "#A04AAA",
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 20,
  },
});
