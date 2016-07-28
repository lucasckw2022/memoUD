var React = require('react');

module.exports = class CreateMemos extends React.Component{
  constructor(props){
    super(props)
    this.state          = { buttonClass  : "btn disabled",
                            textareaValue: ""}
    this.submitForm     = this.submitForm.bind(this)
    this.disableButton  = this.disableButton.bind(this)
  }
  componentWillReceiveProps(props){
    this.setState({textareaValue: props.selectedMemo.content})
  }
  submitForm(event){
    event.preventDefault();
    var content     = this.refs.memoContent.value.trim(),
        refreshData = this.props.refreshData;
    $.ajax({url: "/api/memos/"+(this.props.selectedMemo ? this.props.selectedMemo._id : ""),
            method: this.props.memoFormStatus,
            data  : { year    : this.props.year,
                      month   : this.props.monthIndex+1,
                      date    : this.props.date,
                      content : content}
    }).done(()=>{
      refreshData();
      this.props.toggleMemoForm();
      this.setState({buttonClass: "btn disabled"});
    })
  }
  disableButton(){
    this.refs.memoContent.value ?
      this.setState({buttonClass: "btn"})
      :
      this.setState({buttonClass: "btn disabled"})
  }
  changeTextareaValue(event){
    this.setState({textareaValue: event.target.value});
  }
  memoForm(){
    if(this.props.memoFormStatus){
      return(
        <div>
          {this.props.memoFormStatus == "POST" ?
            <h4>Create Memo</h4> : <h4>Edit Memo</h4>}
          <form onSubmit={this.submitForm}>
            <textarea id        ="memoContent"
                      ref       ="memoContent"
                      className ="materialize-textarea"
                      onChange  ={(event)=>{this.disableButton();this.changeTextareaValue(event)}}
                      value     ={this.state.textareaValue}>
            </textarea>
            <button type      ="submit"
                    className ={this.state.buttonClass}>
                      {this.props.memoFormStatus == "POST" ? "Create" : "Update"} Memo
                      <i className="small material-icons right">send</i>
            </button>
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
