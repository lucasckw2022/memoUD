var React = require('react');

module.exports = class CreateMemos extends React.Component{
  constructor(props){
    super(props)
    this.state = {buttonClass   : "btn disabled"}
    this.submitForm = this.submitForm.bind(this)
    this.disableButton = this.disableButton.bind(this)
  }
  submitForm(event){
    event.preventDefault();
    var content = this.refs.memoContent.value.trim(),
        refreshData = this.props.refreshData
    debugger
    $.ajax({url:  "/api/memos"+this.props.selectedMemoId,
            method: this.props.memoFormStatus,
            data: { year: this.props.year,
                    month: this.props.monthIndex+1,
                    date: this.props.date,
                    content: content}
    }).done(()=>{
      refreshData();
      this.props.toggleMemoForm();
    })
  }
  disableButton(){
    return this.refs.memoContent.value ?
      this.setState({buttonClass: "btn"})
      :
      this.setState({buttonClass: "btn disabled"})
  }
  memoForm(){
    if(this.props.memoFormStatus){
      return(
        <div>
          {this.props.memoFormStatus == "POST" ? <h4>Create Memo</h4> : <h4>Edit Memo</h4>}
          <form>
            <textarea id="memoContent" ref="memoContent" className="materialize-textarea" onKeyUp={this.disableButton}></textarea>
            <div type="submit" className={this.state.buttonClass} onClick={this.submitForm}>Create Memo<i className="small material-icons right">send</i></div>
          </form>
        </div>
      )
    }
  }
  render(){
    return( <div>
              {this.memoForm()}
            </div>
    )
  }
}
