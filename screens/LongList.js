import React from "react";
import { SectionList, Text, View, StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: "black",
    height: 1,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#33CCFF",
  },
});

const groupPeopleByLastName = (data) => {
  const groupedData = data.reduce((accumulator, item) => {
    const group = item.name.last[0].toUpperCase();

    if (accumulator[group]) {
      accumulator[group].data.push(item);
    } else {
      accumulator[group] = {
        title: group,
        data: [item],
      };
    }
    return accumulator;
  }, {});

  return Object.keys(groupedData)
    .map((key) => groupedData[key])
    .sort((a, b) => (a.title > b.title ? 1 : -1));
};

const LongList = () => {
  const sections = groupPeopleByLastName(PEOPLE);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.name}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const PEOPLE = [
  // A
  { name: { title: "Ms", first: "Alicaae", last: "Anderson" } },
  { name: { title: "Mr", first: "Aaron", last: "Adams" } },
  { name: { title: "Ms", first: "Ava", last: "Arnold" } },
  { name: { title: "Mr", first: "Albert", last: "Allen" } },
  { name: { title: "Ms", first: "Alyssa", last: "Avery" } },

  // B
  { name: { title: "Mr", first: "Bob", last: "Brown" } },
  { name: { title: "Ms", first: "Brittany", last: "Baker" } },
  { name: { title: "Mr", first: "Benjamin", last: "Bennett" } },
  { name: { title: "Ms", first: "Beth", last: "Black" } },
  { name: { title: "Mr", first: "Brian", last: "Brooks" } },
  { name: { title: "Ms", first: "Bella", last: "Boone" } },

  // C
  { name: { title: "Ms", first: "Charlie", last: "Clark" } },
  { name: { title: "Mr", first: "Chris", last: "Cole" } },
  { name: { title: "Ms", first: "Catherine", last: "Cook" } },
  { name: { title: "Mr", first: "Carl", last: "Cooper" } },
  { name: { title: "Ms", first: "Claire", last: "Carroll" } },
  { name: { title: "Mr", first: "Craig", last: "Cruz" } },

  // D
  { name: { title: "Mr", first: "David", last: "Davis" } },
  { name: { title: "Ms", first: "Diana", last: "Diaz" } },
  { name: { title: "Mr", first: "Daniel", last: "Duncan" } },
  { name: { title: "Ms", first: "Daisy", last: "Dawson" } },
  { name: { title: "Mr", first: "Derek", last: "Dunn" } },
  { name: { title: "Ms", first: "Deborah", last: "Delgado" } },

  // E
  { name: { title: "Ms", first: "Emily", last: "Evans" } },
  { name: { title: "Mr", first: "Edward", last: "Ellis" } },
  { name: { title: "Ms", first: "Eva", last: "Eaton" } },
  { name: { title: "Mr", first: "Ethan", last: "Edwards" } },
  { name: { title: "Ms", first: "Ella", last: "Elliott" } },
  { name: { title: "Mr", first: "Eric", last: "Emerson" } },

  // F
  { name: { title: "Mr", first: "Frank", last: "Fisher" } },
  { name: { title: "Ms", first: "Fiona", last: "Foster" } },
  { name: { title: "Mr", first: "Fred", last: "Fox" } },
  { name: { title: "Ms", first: "Faith", last: "Fitzgerald" } },
  { name: { title: "Mr", first: "Felix", last: "Freeman" } },
  { name: { title: "Ms", first: "Frances", last: "Fowler" } },
  { name: { title: "Mr", first: "Francis", last: "Farrell" } },

  // G
  { name: { title: "Ms", first: "Grace", last: "Green" } },
  { name: { title: "Mr", first: "George", last: "Garcia" } },
  { name: { title: "Ms", first: "Gina", last: "Gray" } },
  { name: { title: "Mr", first: "Gordon", last: "Graham" } },
  { name: { title: "Ms", first: "Gemma", last: "Gordon" } },
  { name: { title: "Mr", first: "Glenn", last: "Gonzalez" } },

  // H
  { name: { title: "Mr", first: "Hank", last: "Harris" } },
  { name: { title: "Ms", first: "Hannah", last: "Howard" } },
  { name: { title: "Mr", first: "Harry", last: "Hall" } },
  { name: { title: "Ms", first: "Helen", last: "Hughes" } },
  { name: { title: "Mr", first: "Howard", last: "Hughes" } },
  { name: { title: "Ms", first: "Holly", last: "Hudson" } },
  { name: { title: "Mr", first: "Henry", last: "Harper" } },

  // I
  { name: { title: "Ms", first: "Ivy", last: "Irwin" } },
  { name: { title: "Mr", first: "Ian", last: "Ingram" } },
  { name: { title: "Ms", first: "Isabel", last: "Inoue" } },
  { name: { title: "Mr", first: "Isaac", last: "Ishikawa" } },

  // J
  { name: { title: "Mr", first: "Jack", last: "Johnson" } },
  { name: { title: "Ms", first: "Jasmine", last: "James" } },
  { name: { title: "Mr", first: "James", last: "Jones" } },
  { name: { title: "Ms", first: "Jennifer", last: "Jackson" } },
  { name: { title: "Mr", first: "Jason", last: "Jenkins" } },
  { name: { title: "Ms", first: "Jessica", last: "Jenkins" } },
  { name: { title: "Mr", first: "Jordan", last: "Joseph" } },

  // K
  { name: { title: "Ms", first: "Karen", last: "King" } },
  { name: { title: "Mr", first: "Kyle", last: "Klein" } },
  { name: { title: "Ms", first: "Katherine", last: "Kelly" } },
  { name: { title: "Mr", first: "Kevin", last: "Kramer" } },
  { name: { title: "Ms", first: "Kimberly", last: "Keller" } },

  // L
  { name: { title: "Mr", first: "Leo", last: "Lewis" } },
  { name: { title: "Ms", first: "Laura", last: "Lee" } },
  { name: { title: "Mr", first: "Liam", last: "Long" } },
  { name: { title: "Ms", first: "Lucy", last: "Lloyd" } },
  { name: { title: "Mr", first: "Logan", last: "Lucas" } },
  { name: { title: "Ms", first: "Lila", last: "Lowe" } },

  // M
  { name: { title: "Mr", first: "Michael", last: "Martin" } },
  { name: { title: "Ms", first: "Megan", last: "Moore" } },
  { name: { title: "Mr", first: "Matthew", last: "Miller" } },
  { name: { title: "Ms", first: "Madison", last: "Mitchell" } },
  { name: { title: "Mr", first: "Mark", last: "Morgan" } },
  { name: { title: "Ms", first: "Melissa", last: "Morris" } },

  // N
  { name: { title: "Ms", first: "Nina", last: "Nelson" } },
  { name: { title: "Mr", first: "Nathan", last: "Nash" } },
  { name: { title: "Ms", first: "Nancy", last: "Nixon" } },
  { name: { title: "Mr", first: "Neil", last: "Newman" } },

  // O
  { name: { title: "Ms", first: "Olivia", last: "O'Connor" } },
  { name: { title: "Mr", first: "Oscar", last: "O'Brien" } },
  { name: { title: "Ms", first: "Opal", last: "Ortega" } },
  { name: { title: "Mr", first: "Owen", last: "Olson" } },

  // P
  { name: { title: "Mr", first: "Paul", last: "Parker" } },
  { name: { title: "Ms", first: "Paige", last: "Peters" } },
  { name: { title: "Mr", first: "Peter", last: "Phillips" } },
  { name: { title: "Ms", first: "Penelope", last: "Porter" } },
  { name: { title: "Mr", first: "Patrick", last: "Price" } },

  // Q
  { name: { title: "Ms", first: "Quinn", last: "Quinn" } },
  { name: { title: "Mr", first: "Quincy", last: "Quinlan" } },

  // R
  { name: { title: "Mr", first: "Ryan", last: "Roberts" } },
  { name: { title: "Ms", first: "Rachel", last: "Reed" } },
  { name: { title: "Mr", first: "Robert", last: "Richardson" } },
  { name: { title: "Ms", first: "Riley", last: "Russell" } },
  { name: { title: "Mr", first: "Roger", last: "Robinson" } },

  // S
  { name: { title: "Ms", first: "Sarah", last: "Smith" } },
  { name: { title: "Mr", first: "Samuel", last: "Scott" } },
  { name: { title: "Ms", first: "Samantha", last: "Stewart" } },
  { name: { title: "Mr", first: "Steven", last: "Sullivan" } },
  { name: { title: "Ms", first: "Sophie", last: "Sanders" } },

  // T
  { name: { title: "Mr", first: "Thomas", last: "Turner" } },
  { name: { title: "Ms", first: "Tina", last: "Thompson" } },
  { name: { title: "Mr", first: "Tyler", last: "Tucker" } },
  { name: { title: "Ms", first: "Tracy", last: "Taylor" } },

  // U
  { name: { title: "Mr", first: "Ulysses", last: "Underwood" } },
  { name: { title: "Ms", first: "Ursula", last: "Upton" } },

  // V
  { name: { title: "Ms", first: "Victoria", last: "Vasquez" } },
  { name: { title: "Mr", first: "Vincent", last: "Vega" } },

  // W
  { name: { title: "Mr", first: "William", last: "White" } },
  { name: { title: "Ms", first: "Wendy", last: "Walker" } },
  { name: { title: "Mr", first: "Walter", last: "Watson" } },
  { name: { title: "Ms", first: "Willow", last: "Wilson" } },

  // X
  { name: { title: "Ms", first: "Xena", last: "Xiang" } },
  { name: { title: "Mr", first: "Xander", last: "Xiong" } },

  // Y
  { name: { title: "Ms", first: "Yasmine", last: "Young" } },
  { name: { title: "Mr", first: "Yosef", last: "Yates" } },

  // Z
  { name: { title: "Ms", first: "Zoe", last: "Zimmerman" } },
  { name: { title: "Mr", first: "Zachary", last: "Zhang" } },
];

export default LongList;
