var React = require('react');
var Modal = require('react-bootstrap').Modal;
var CreateMemos = require('./memo_create.jsx');

module.exports = class ShowMemo extends React.Component{
  render(){
    var year        = this.props.year,
        month       = this.props.month,
        monthIndex  = this.props.monthIndex,
        date        = this.props.date
    return(
        <div id="memoModal" className="modal">
          <div className="modal-content">
            <h1>{date} {month} {year}</h1>
            <CreateMemos year={year} monthIndex={monthIndex} date={date} refreshData={this.props.refreshData}/>
          </div>
        </div>
    )
  }
}
