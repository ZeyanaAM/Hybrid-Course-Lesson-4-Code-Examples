import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  SectionList,
  ScrollView,
} from 'react-native';

const ArrayExample = () => {
  let [components, setComponents] = useState(['text', 'view']);

  return (
    <View style={styles.container}>
      <Text>There are {components.length} in the array</Text>
      <Text>The second item is {components[1]}</Text>
      <Text>The third item is {components[2]}</Text>
      <Button
        title="Add item"
        onPress={() => {
          // let len = components.push('image');
          // console.log('components: ', components);
          // console.log('components len: ', len);

          // copy of the array state variable, then we add a value, call the set function
          setComponents(['image', ...components, 'button']);
          // setComponents(['image', 'text', 'view', 'button']);

          // let componentsCopy = components.slice();
          // componentsCopy[1] = 'background';
          // setComponents(componentsCopy);
        }}
      />
      <Button
        title="Remove item"
        onPress={() => {
          // let deletedItems = components.splice(1, 0, 'button', 'safearea');
          // console.log('components: ', components);
          // console.log('deleted: ', deletedItems);

          // setComponents([...components].splice(1, 1));
          let componentsCopy = components.slice(); //[...components]
          componentsCopy.splice(1, 1);
          setComponents(componentsCopy);
        }}
      />
      <Button
        title="Make copy"
        onPress={() => {
          let componentsCopy = components.slice();
          console.log('components: ', components);
          console.log('components copy: ', componentsCopy);
        }}
      />
      <Button
        title="Loop"
        onPress={() => {
          components.forEach((item, index) => {
            console.log('Item at index: ' + index + ' is item: ' + item);
            console.log(`Item at index: ${index} is item: ${item}`);
          });
        }}
      />
    </View>
  );
};

const TextInputArrayExample = () => {
  const [textInputValues, setTextInputValues] = useState(['', '', '']);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter name"
        value={textInputValues[0]}
        onChangeText={(text) => {
          let textInputValuesCopy = [...textInputValues];
          textInputValuesCopy[0] = text;
          setTextInputValues(textInputValuesCopy);
        }}
      />
      <TextInput
        placeholder="Enter email"
        value={textInputValues[1]}
        onChangeText={(text) => {
          let textInputValuesCopy = [...textInputValues];
          textInputValuesCopy[1] = text;
          setTextInputValues(textInputValuesCopy);
        }}
      />
      <Text>The first text input field says: {textInputValues[0]}</Text>
      <Text>The second text input field says: {textInputValues[1]}</Text>
    </View>
  );
};

const MapExample = () => {
  const [array, setArray] = useState([
    { id: 1, item: 'eggs' },
    { id: 2, item: 'milk' },
    { id: 3, item: 'bread' },
  ]);
  const [newItem, setNewItem] = useState('');

  const notAllowedItems = ['bread', 'rice'];
  const filterItems = () => {
    setArray(array.filter((item) => item.item.includes(newItem)));
  };
  return (
    <View style={styles.container}>
      {array
        .filter((item) => item.item.includes(newItem))
        .filter((item) => {
          let shouldRemove = notAllowedItems.includes(item.item);
          console.log(`should remove ${item.item}: ${shouldRemove}`);
          return !shouldRemove;
        })
        .map((value, index) => (
          <Text key={value.id}>
            The {index}th item is {value.item}
          </Text>
        ))}

      <Button
        title="Add item"
        onPress={() =>
          setArray([...array, { id: array.length + 1, item: newItem }])
        }
      />
      <TextInput
        style={{
          backgroundColor: 'lightgrey',
          width: 200,
          marginTop: 20,
          padding: 10,
        }}
        placeholder="Enter item"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
      <TextInput
        style={{
          backgroundColor: 'lightgrey',
          width: 200,
          marginTop: 20,
          padding: 10,
        }}
        placeholder="Filter by"
        value={newItem}
        onChangeText={(text) => setNewItem(text)}
      />
    </View>
  );
};

const ItemComponent = ({ value }) => {
  return (
    <View
      style={{
        // width: '80%',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
      }}
    >
      <Image
        source={require('./assets/icon.png')}
        style={{ width: 100, height: 100 }}
      />
      <Text style={{ textAlign: 'center' }}>{value}</Text>
    </View>
  );
};

const FlatListExample = () => {
  const shoppingListArray = [
    { id: 1, value: 'eggs' },
    { id: 2, value: 'milk' },
    { id: 3, value: 'bread' },
  ];
  const [shoppingList, setShoppingList] = useState(shoppingListArray);

  const [selectItemIndex, setSelectItemIndex] = useState(-1);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Shopping List Items</Text> */}
      <FlatList
        style={{
          backgroundColor: 'yellow',
          height: 200,
          flexGrow: 0,
          // width: '100%',
        }}
        data={shoppingList}
        // renderItem={({ item }) => <ItemComponent value={item.value} />}
        renderItem={({ item, index }) => (
          <Text
            style={{
              backgroundColor: selectItemIndex === index ? 'yellow' : 'white',
            }}
            onPress={() => setSelectItemIndex(index)}
          >
            {item.value}
          </Text>
        )}
        // {
        //   console.log('item: ', item);
        //   // return <Text>{item.value}</Text>;
        //   return <ItemComponent value={item.value} />;
        // }}

        keyExtractor={(item) => item.id.toString()}
        // ListHeaderComponent={<Text>Shopping List Items</Text>}
        // ListFooterComponent={() => <Button title="Press me" />}
        // ItemSeparatorComponent={() => {
        //   return (
        //     <View
        //       style={{ height: 10, width: '100%', backgroundColor: 'black' }}
        //     ></View>
        //   );
        // }}
      />
    </SafeAreaView>
  );
};

const SectionListExample = () => {
  const data = [
    { heading: 'Dairy', data: ['Milk', 'Yoghurt'] },
    { heading: 'Carbs', data: ['Bread', 'Pasta', 'Rice'] },
  ];
  const [array, setArray] = useState(data);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Items in your cart:</Text>
      <View style={{ flex: 0.4, width: '60%' }}>
        <SectionList
          sections={array}
          renderItem={(itemData) => {
            console.log('item data: ', itemData);
            return (
              <Text>
                {itemData.item} of {itemData.section.heading}
              </Text>
            );
          }}
          renderSectionHeader={({ section: { heading } }) => (
            <Text style={{ fontWeight: 'bold' }}>{heading}</Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const NetworkDataExample = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        // console.log('json results:', json);
        let dataResults = [];
        json.forEach((item) => {
          let result = { title: item.title, id: item.id };
          dataResults.push(result);
        });
        setData(dataResults);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Fetch Data" onPress={fetchData} />

      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default function App() {
  // return <ArrayExample />;
  // return <TextInputArrayExample />;
  // return <MapExample />;
  // return <FlatListExample />;
  // return <SectionListExample />;
  return <NetworkDataExample />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
