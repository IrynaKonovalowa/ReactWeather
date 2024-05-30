class Search extends React.Component {
  constructor(props) {
    super(props);
    this.onTextChanged = this.onTextChanged.bind(this);
  }

  onTextChanged(e) {
    let text = e.target.value.trim();
    this.props.meteo[0](text);
    this.props.meteo[1](text);
  }

  render() {
    return <input placeholder="Search city" onChange={this.onTextChanged} />;
  }
}
