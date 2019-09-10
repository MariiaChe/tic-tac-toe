import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button, ImageBackground } from 'react-native';
// import ResponsiveImage from 'react-native-responsive-image';
export default class App extends React.Component{
  constructor(props){
    super(props); 
    this.state = {
      gameState:[
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer:1 ,
      Steve:0,
      Creeper:0
    }
  }
  
  componentDidMount(){
    this.initializeGame();
  }
  initializeGame = () =>{
    this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ], 
    currentPlayer: 1
    })
  }
  getWinner =() =>{
    const NUM_TILES = 3;
    // const NUM_TILES_TOTAL = 9;
    var arr = this.state.gameState;
    var sum;
  
    //revisa lineas
    for(var i = 0; i< NUM_TILES;i++){
      sum = arr[i][0]+arr[i][1]+arr[i][2];
      if(sum === 3){
        return 1
      }else if(sum === -3){
        return -1
      }
   
    }
    // revisa columnas
    for(var i = 0; i< NUM_TILES;i++){
      sum = arr[0][i]+arr[1][i]+arr[2][i];
      if(sum === 3){
        return 1
      }else if(sum === -3){
        return -1
     
      }
    }
    // revisa diagonales
    sum = arr[0][0]+arr[1][1]+arr[2][2];
    if(sum === 3){
      return 1
     
    }else if(sum === -3){
      return -1
     
    }
 
    sum = arr[2][0]+arr[1][1]+arr[0][2];
    if(sum === 3){
      return 1
     
    }else if(sum === -3){
      return -1
     
    }
    const arrFull = []
    for(var i = 0; i< NUM_TILES;i++){
      for(var x = 0; x< NUM_TILES;x++){
        if(arr[i][x]!==0){
          arrFull.push(arr[i][x])
        }
      }
    }
    if(arrFull.length===9&&sum!==3&&sum!==-3){
        return 0
    }
  
  }
  onTilePress=(row, col)=>{
    var value = this.state.gameState[row][col]
    
    if(value !== 0){ return;}

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();

    arr[row][col]= currentPlayer;
    this.setState({
      gameState:arr
    })

    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer:nextPlayer});

    //revisa ganadores
   
    var winner = this.getWinner();
    if(winner === 1){
      alert("Победил Стив!")
      this.setState({Steve:this.state.Steve + 1})
     
      this.initializeGame()
    }else if(winner===-1){
      alert("Победил Крипер!")
      this.setState({Creeper:this.state.Creeper + 1})
      this.initializeGame()
    }else if(winner === 0){
      alert("Ничья!")
      this.initializeGame()
    }
  }
  renderIcon = (row, col)=>{
    var value = this.state.gameState[row][col];
    switch(value)
    {
      case 1:return <Image 
      style={styles.tileSteve}
      source={require('./img/steve.png')}/>;
      case -1: return  <Image
      style={styles.tileCreeper}
      source={require('./img/creeper.png')}
      />
      default:return <View/>
    }

  }
  handlePress = () => {
    this.initializeGame()
    this.setState({Steve:0})
    this.setState({Creeper:0})
  }

  render(){
    return (
    <ImageBackground source={require('./img/back4.jpg')} style={styles.container}>
      {/* <View style={{flex: 1, justifyContent: 'center',}}> */}
        {/* <ResponsiveImage  source={{uri:'./img/stevevs.png'}} initWidth="80" initHeight="80" item={item} /> */}
      {/* </View> */}
     <Image source={require('./img/stevevs.png')} style={styles.img}/>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile, {borderLeftWidth:0, borderTopWidth:0}]}>
        {this.renderIcon(0,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile, {borderTopWidth:0}]}>
        {this.renderIcon(0,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0}]}>
        {this.renderIcon(0,2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile, {borderLeftWidth:0}]}>
        {this.renderIcon(1,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={styles.tile}>
        {this.renderIcon(1,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile, {borderRightWidth:0}]}>
        {this.renderIcon(1,2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile, {borderLeftWidth:0,borderBottomWidth:0}]}>
        {this.renderIcon(2,0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile, {borderBottomWidth:0}]}>
        {this.renderIcon(2,1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile, {borderRightWidth:0, borderBottomWidth:0}]}>
        {this.renderIcon(2,2)}
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.text}>Стив: {this.state.Steve}</Text>
        <Text style={styles.text}>Крипер: {this.state.Creeper}</Text>
      </View>
      
        <TouchableOpacity onPress={this.handlePress}>
          <Text style={styles.button}>играть сначала!</Text>
        </TouchableOpacity>
    </ImageBackground>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img:{
    width:'70%',
    height:20,
    marginBottom:40,
    marginTop:0,
  },
  tile:{
    borderColor:"white",
    borderWidth:5,
    width:80,
    height:80,
  },
  tileSteve:{
    alignItems:"center",
    justifyContent: "center",
    width:'100%',
    height:'100%',
  },
  tileCreeper:{
    alignItems:"center",
    justifyContent: "center",
    width:'100%',
    height:'100%',
  },
  text:{
    marginTop:20,
    marginRight:20,
    color:'white',
    marginLeft:20,
    fontSize:28,
    fontWeight:'bold'
  },
  button:{
    color:'white',
    borderColor:"white",
    borderWidth:4,
    borderRadius:10,
    padding:8,
    fontSize:20,
    marginTop:20,
    fontWeight:'bold'
  }
});
