import {
    Text,
    View,
    StatusBar,
    Alert,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import {Post} from "../components/Post";
import axios from "axios";
import {useEffect, useState} from "react";
import {Loading} from "../components/Loading";

export const HomeScreen = ({ navigation }) => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchPosts = () => {
        setIsLoading(true)
        axios.get('https://my-json-server.typicode.com/Eneier/fakeAPI/posts/')
            .then(({data}) => {
                setItems(data)
            }).catch(err => {
            console.log(err)
            Alert.alert('Error', 'impossible to get articles')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    useEffect(fetchPosts, [])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={fetchPosts}
                    />}
                data={items}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title})}>
                        <Post
                            title={item.title}
                            imageUrl={item.imageUrl}
                            createdAt={item.createdAt}
                        />
                    </TouchableOpacity>
                )}
            />
            <StatusBar theme="auto"/>
        </View>
    );
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
