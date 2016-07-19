var React = require('react');
var Modal = require('react-bootstrap').Modal;
var CreateMemos = require('./memo_create.jsx');

module.exports = class ShowMemo extends React.Component{
  render(){
    var year        = this.props.year,
        month       = this.props.month,
        monthIndex  = this.props.monthIndex,
        day         = this.props.date
    return(
        <div id="memoModal" className="modal">
          <div className="modal-content">
            <h1>{day} {month} {year}</h1>
            <div  className="btn"
                  onClick={()=>{this.props.toggleMemoForm("POST")}}>
                    Create Memos
                    <i className="material-icons right">add</i>
            </div>
            <ul>{this.props.printMemos(day,monthIndex+1,year,true)}</ul>
            <CreateMemos  year={year}
                          monthIndex={monthIndex}
                          date={day}
                          refreshData={this.props.refreshData} memoFormStatus={this.props.memoFormStatus}    selectedMemoId={this.props.selectedMemoId}    toggleMemoForm={this.props.toggleMemoForm}/>
          </div>
        </div>
    )
  }
}
