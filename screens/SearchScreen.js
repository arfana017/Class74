import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';

export default class Searchscreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      allTransactons: [],
      lastVisibleTransaction: null
    }
  }

  fetchMoreTransactions = async ()=>{
    var text = this.state.search.toUpperCase()
    var enteredText = text.split("")

    
    if (enteredText[0].toUpperCase() ==='B'){
    const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions: [...this.state.allTransactions, doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }
    else if(enteredText[0].toUpperCase() === 'S'){
      const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
}

  searchTransactions = async(text) =>{
    var enteredT = text.split("")[0]
    var enteredText = enteredT.toUpperCase()
    if(enteredText === "B"){
      const transaction =  await db.collection("transactions").where('bookId','==',text).limit(10).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })

        })
    }
    else if(enteredText === 'S'){
      const transaction = await db.collection('transactions').where('studentId','==',text).limit(10).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }


  } 

    render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput style = {styles.bar}
              placeholder = 'Enter Book/Student ID'
              onChangeText = {(text)=>{this.setState({search: text})}}
            ></TextInput>
            <TouchableOpacity style = {styles.searchButton} 
            onPress = {()=>{this.searchTransaction(this.state.search)}}>
         <Text>Search</Text>
         </TouchableOpacity>
          </View>
<FlatList 
data ={this.state.allTransactons} 

renderItem={({item})=>(
  <View style={{borderBottomWidth: 2}}>
    <Text>{"Book Id: " + item.bookId}</Text>
    <Text>{"Student id: " + item.studentId}</Text>
    <Text>{"Transaction Type: " + item.transactionType}</Text>
    <Text>{"Date: " + item.date.toDate()}</Text>
  </View>
)}

keyExtractor= {(item, index)=> index.toString()}

onEndReached = {this.fetchMoreTransactions}
onEndReachedThreshold = {0.7}


/>



        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    searchBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    searchButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })