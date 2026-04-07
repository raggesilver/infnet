import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParamList = {
  MainTabs: undefined;
  Products: { categoryId: string; categoryName: string };
  ProductDetail: { productId: string };
  Checkout: undefined;
  RestaurantDetail: { restaurantId: string };
  Settings: undefined;
};

export type ProductsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "Products"
>;

export type ProductDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "ProductDetail"
>;

export type RestaurantDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  "RestaurantDetail"
>;
