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
        <tr  id        ="memoModal"
              className ="modal">
          <td className="modal-content">
            <h3>{day} {month} {year}</h3>
            <div  className="btn"
                  onClick={()=>{this.props.toggleMemoForm("POST")}}>
                    Create Memos
                    <i className="material-icons right">add</i>
            </div>
            <ul>{this.props.printMemos(day,monthIndex+1,year,true)}</ul>
            <CreateMemos  year          ={year}
                          monthIndex    ={monthIndex}
                          date          ={day}
                          refreshData   ={this.props.refreshData} memoFormStatus={this.props.memoFormStatus}
                          selectedMemo  ={this.props.selectedMemo} toggleMemoForm={this.props.toggleMemoForm}/>
          </td>
        </tr>
    )
  }
}
