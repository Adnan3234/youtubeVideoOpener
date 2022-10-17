
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, FlatList, Image, Text, TouchableOpacity, Share } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { moderateScale, scale } from 'react-native-size-matters';
import CommonFonts from '../../Components/Common/CommonFonts';
import { getVideoDataServices } from '../../Services/VideoService';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function ListContent() {
  // declaring states
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)

  // function to share
  const onShareFunction = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //  Function to get Video data--
  const getVideoDataFunction = async () => {
    const response = await getVideoDataServices(pageNumber) // Api Call
    console.log(response.data.results[0], '--data')
    // setData([...response.data.results, JSON.parse(JSON.stringify(response.data.results))])
    setData(data.concat(response.data.results))
  }
  // UseEffect Area
  useEffect(() => {
    let mount = true
    if (mount) {
      //  condition if you want to use Scroll to Refresh
      if (pageNumber > 1) {
        getVideoDataFunction()
      }
    }
    return () => {
      mount = false
    }
  }, [pageNumber])

  useEffect(() => {
    let mount = true;
    if (mount) {
      getVideoDataFunction()
    }
    return () => {
      mount = false
    }
  }, [])

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center',  paddingHorizontal: scale(10), paddingVertical: scale(5),position:'absolute',zIndex:999 ,top:moderateScale(320)}}>
            <Text style={[{ color: '#fff' }, CommonFonts.medium]}>Up Next</Text>
          </TouchableOpacity> */}
      <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Ionicons name="chevron-back" size={24} color="#fff" />
        <View>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#fff', paddingHorizontal: scale(10), paddingVertical: scale(5) }}>
            <FontAwesome name='whatsapp' color={'#fff'} size={30} backgroundColor={'#fff'} style={{ backgroundColor: 'green', borderRadius: 100 }} />
            <Text style={[{ color: '#fff' }, CommonFonts.medium]}>  Share</Text>
          </TouchableOpacity>
        </View>
      </View>



      <FlatList
        data={data}
        keyExtractor={(item, index) => index}
        onEndReached={() => { setPageNumber(pageNumber + 1) }}
        onEndReachedThreshold={0.7}
        renderItem={({ item }) => (
          <View style={{ width: "95%", alignSelf: 'center', marginVertical: scale(10), backgroundColor: '#000', paddingVertical: scale(10) }}>
            {/* youtubr iframe */}
            <YoutubePlayer
              height={moderateScale(200)}
              videoId={item?.video_id}
            />

            <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 10 }}>
              <View style={{ height: 40, width: 40, borderRadius: 100, overflow: 'hidden' }}>
                <Image source={require('../../../assets/Login.jpg')} style={{ height: "100%", width: '100%', borderRadius: 100 }} />
              </View>
              <View>
                <Text style={[CommonFonts.medium, { color: '#fff', marginLeft: scale(10) }]}>{item?.title}</Text>
                <Text style={[CommonFonts.medium, { color: '#fff', marginLeft: scale(10) }]}>{item?.channel?.channel_name}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    alignSelf: 'center',
    width: '95%',
    height: 200,
    marginTop: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})