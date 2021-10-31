import React from 'react';

class ImageFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 'someUniqueId', // I would use this.props.id for a real world implementation
      imageURI: this.props.imageURI,
    };
  }

  buildImgTag() {
    let imgTag = null;
    if (this.state.imageURI !== null)
      imgTag = (
        <div className="row">
          <div className="small-9 small-centered columns">
            <img className="thumbnail" src={this.props.imageURI} width='100%'></img>
          </div>
        </div>
      );
    return imgTag;
  }

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        this.setState({ imageURI: ev.target.result });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e) {
    this.readURI(e);
    if (this.props.onChange !== undefined) this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();

    return (
      <>
        {imgTag}
      </>
    );
  }
}
export default ImageFile;
