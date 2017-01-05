var React = require('react');

module.exports = class ShowNextMonth extends React.Component{
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  showNextWeek(){
    var nextMonth = this.props.currentMonth.slice(
      (this.props.currentMonth.length-(this.props.weekdayOflastDay+1)),
      this.props.currentMonth.length),
        month     = this.props.monthIndex+1 > 11 ? 12 : this.props.monthIndex+1,
        year      = this.props.year;

    nextMonth = nextMonth.concat(this.props.nextMonth);

    return(nextMonth.map((day,i)=>{
      if(i < 7-this.props.nextMonth.length){
        return( <td className="current-month modal-trigger card"
                    onClick  ={()=>{this.props.toggleShowMemo(day)}}
                    key      ={i+1}
                    href     ="#memoModal">
                  <div className="date">{day}</div>
                  <ul>{this.props.printMemos(day,month,year)}</ul>
                </td>)
      } else{
        return( <td className="next-month modal-trigger card"
                    onClick  ={()=>{this.props.toggleShowMemo(day,month,year)}}
                    key      ={i+1}
                    href     ="#memoModal">
                  <div className="date">{day}</div>
                  <ul>{this.props.printMemos(day,month+1,year)}</ul>
                </td>)
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showNextWeek()}</tr>)}
}
