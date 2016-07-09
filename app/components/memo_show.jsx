var React = require('react');
var Modal = require('react-bootstrap').Modal;

module.exports = class ShowMemo extends React.Component{
  render(){
    return (
        <Modal
           show={this.props.show}
           onHide={this.props.close}
         >
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title">
                {this.props.date} {this.props.month} {this.props.year}
              </Modal.Title>
           </Modal.Header>
           <Modal.Body>
             Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
           </Modal.Body>
         </Modal>
    )
  }
}
