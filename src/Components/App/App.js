
import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchResults:[]
      , playlistName:"playlistname"
      , playlistTracks:[]
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlayList=this.savePlayList.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    
    let tracks=this.state.playlistTracks;
    tracks.push(track);
    

    this.setState({playlistTracks: tracks});
    
  }

  removeTrack(track){
    /*let tracks=[];
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (this.state.playlistTracks[i].id !== track.id) {
        tracks.push(this.state.playlistTracks[i]);
      }
    
    }*/
    let tracks=this.state.playlistTracks;
    tracks=tracks.filter(currentTrack=>currentTrack.id!==track.id)

    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistname: name});
  }

  savePlayList(){
    const trackURIs=this.state.playlistTracks.map(track=>track.uri);
    Spotify.savePlayList(this.state.playlistName, trackURIs).then(()=>
      {
        this.setState({
          playListName:"New Playlist Name",
          playListTracks:[]
        })
      }
    )

  }

  search(term){
    Spotify.search(term).then(searchResults=>{
      this.setState({searchResults:searchResults})
    }); 
  } 

  render () {
      return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
                         onAdd={this.addTrack}
          /> 
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlayList}/>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
