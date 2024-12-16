import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '@/Firebase/firebase.config';
import DbServices from '@/Services/DbServices';

type profiledata = {
  name : string , 
  email : string 
}

const Profile = () => {
  const [data, setData] = useState<profiledata | null>(null)
  const userUid = auth?.currentUser?.uid;
  useEffect(() => {
    (async () => {
      try {
        await DbServices.getDocment("users", userUid || '').then((response) => {
          if (response) {
            const data = {
              email: response.email,
              name: response.name
            }
            setData(data)
          }
        })
      } catch (error) {
        console.log("can't get the user data ", error)
      }
    })()
 }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerr}>
        <Text style={styles.headerrText}>{data?.name[0].toLowerCase()}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.profileImage}>
        {data?.name[0].toLowerCase()}
        </Text>
      </View>
      
        <Text style={styles.username}>{data?.name}</Text>
        <Text style={styles.userDetails}>{data?.email}</Text>

      {/* Profile Options */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>My Saved Places</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Button
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    paddingTop: 50,
    justifyContent :"center",
    marginBottom : 50 ,
  },
  headerr: {
    position: "absolute",
    top: 40,
    right: 25,
    width: 50,
    height: 50,
    borderRadius: "50%",
    padding: 2,
    backgroundColor: "#4CAF50",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerrText: {
    color: "white",
    fontWeight: "600",
    fontSize: 25
  },
  header: {
    width: 120,
    height: 120,
    borderRadius: "50%",
    padding: 2,
    backgroundColor: "#4CAF50",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom : 10 ,
  },
  profileImage: {
    color: "white",
    fontWeight: "600",
    fontSize: 70
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 16,
    color: '#777',
    marginBottom : 30 ,
  },
  options: {
    width: '90%',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '60%',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
