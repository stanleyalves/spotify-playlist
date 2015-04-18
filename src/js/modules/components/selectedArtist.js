var SelectedArtst = React.createClass({
  //Note getDefaultProps get overwritten on render.
  //This is why the name gets overwritten, but the info doesnt
  //The name is getting overwitten by the set props, which are initially done in the state.
  getDefaultProps() {
    return {
      selectedArtist : {
        name: "Default Props",
        info: "Here is the default props info"
      }
    }
  },
  render() {
    if (this.props.artist === undefined ) {
      return (
        <div></div>
      )
    } else {
      return (
        <div className="info-wrapper">
          <div className="selected-artist">
            <h2>{this.props.artist.name}</h2>
            <div className="img-wrapper">
              <a target="_blank" href={this.props.artist.href}>
                <img className="artist-pic" src={this.props.artist.pic} alt="Artist name" />
              </a>
              <p>Followers: {this.props.artist.followers}</p>
            </div>
            <div className="text-wrapper">
              {this.props.artist.bio}
            </div>
          </div>
        </div>
      )
    }
  }
});

export default { SelectedArtst };  