import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {ActivityIndicator, Alert, Text, View} from "react-native";
import axios from "axios";
import {Loading} from "../components/Loading";

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`
const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`

export const FullPostScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const { id, title } = route.params

    useEffect(() => {
        navigation.setOptions({
            title
        })
        setIsLoading(true)
        axios.get('https://my-json-server.typicode.com/Eneier/fakeAPI/posts/' + id)
            .then(({data}) => {
                setData(data)
            }).catch(err => {
            console.log(err)
            Alert.alert('Error', 'impossible to get the article')
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View style={{padding: 20}}>
        <PostImage source={{uri: data.imageUrl}}/>
        <PostText>
            {data.text}
        </PostText>
        </View>
    );
};