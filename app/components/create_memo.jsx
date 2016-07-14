var React = require('react');

module.exports = class CreateMemos extends React.Component{
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this)
  }
  submitForm(event){
    event.preventDefault();
    var content = this.refs.memoContent.value.trim();
    $.ajax({url:  "/api/memos",
            method: "POST",
            data: { year: this.props.year,
                    month: this.props.monthIndex,
                    date: this.props.date,
                    content: content}
    }).done((result)=>{console.log(result)})
  }
  render(){
    return( <form>
                <textarea id="memoContent" ref="memoContent" className="materialize-textarea"></textarea>
                <div type="submit" className="btn" onClick={this.submitForm}>Create Memo</div>
            </form>
    )
  }
}
