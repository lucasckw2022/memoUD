var React = require('react');

module.exports = class ShowNextMonth extends React.Component{
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  showNextWeek(){
    var nextMonth = this.props.currentMonth.slice(this.props.currentMonth.length-(this.props.weekdayOflastDay+1),this.props.currentMonth.length),
    month         = this.props.monthIndex+1 > 11 ? 0 : this.props.monthIndex+1,
    year          = this.props.monthIndex === 11 ? this.props.year+1 : this.props.year;

    nextMonth     = nextMonth.concat(this.props.nextMonth);
    return(nextMonth.map((day,i)=>{
      if(i < 7-this.props.nextMonth.length){
        return( <td className="current-month modal-trigger"
                    onClick={()=>{this.props.toggleShowMemo(day)}}
                    key={i+1}
                    href="#memoModal">
                  <span className="date">{day}</span>
                  <ul>{this.props.printMemos(day,month+2,year)}</ul>
                </td>)
      } else{
        return( <td className="next-month modal-trigger"
                    onClick={()=>{this.props.toggleShowMemo(day,month,year)}}
                    key={i+1}
                    href="#memoModal">
                  <span className="date">{day}</span>
                  <ul>{this.props.printMemos(day,month+1,year)}</ul>
                </td>)
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showNextWeek()}</tr>)}
}
