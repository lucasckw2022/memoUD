var React = require('react');
var Modal = require('react-bootstrap').Modal;
var CreateMemos = require('./memo_create.jsx');

module.exports = class ShowMemo extends React.Component{
  printMemos(day,monthIndex,year){
    debugger
    return this.props.memoList.map((memo,index)=>{
      if(memo.date === day && memo.month === monthIndex+1 && memo.year === year){
        return <li key={index}>{memo.content}</li>
      }
    })
  }
  render(){
    var year        = this.props.year,
        month       = this.props.month,
        monthIndex  = this.props.monthIndex,
        day        = this.props.date
    return(
        <div id="memoModal" className="modal">
          <div className="modal-content">
            <h1>{day} {month} {year}</h1>
            <ul>{this.printMemos(day,monthIndex,year)}</ul>
            <CreateMemos year={year} monthIndex={monthIndex} date={day} refreshData={this.props.refreshData}/>
          </div>
        </div>
    )
  }
}
