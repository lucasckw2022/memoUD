var React = require('react');

module.exports = class ShowPrevMonth extends React.Component{
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  showPrevWeek(){
    var prevMonth       = this.props.prevMonth,
        month           = this.props.monthIndex-1 < 0 ? 0 : this.props.monthIndex,
        prevMonthNumber = month-1 < 0 ? 12 : month,
        year            = this.props.year,
        prevYear        = prevMonthNumber == 12 ? this.props.year-1 : this.props.year;

    prevMonth = prevMonth.concat(
      this.props.currentMonth.slice(0,7-prevMonth.length)
    );

    return(prevMonth.map((day,i)=>{
      if(i < this.props.prevMonth.length){
        return( <td className="prev-month modal-trigger card"
                    onClick  ={()=>{this.props.toggleShowMemo(day,prevMonthNumber-1,prevYear)}}
                    key      ={i+1}
                    href     ="#memoModal">
                  <div className="date">{day}</div>
                  <ul>{this.props.printMemos(day,prevMonthNumber,prevYear)}</ul>
                </td>)
      } else{
        return( <td className="current-month modal-trigger card"
                    onClick  ={()=>{this.props.toggleShowMemo(day)}}
                    key      ={i+1}
                    href     ="#memoModal">
                  <div className="date">{day}</div>
                  <ul>{this.props.printMemos(day,month+1,year)}</ul>
                </td>)
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showPrevWeek()}</tr>)}
}
