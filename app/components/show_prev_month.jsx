var React = require('react');

module.exports = class ShowPrevMonth extends React.Component{
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  showPrevWeek(){
    var prevMonth = this.props.prevMonth,
        month     = this.props.monthIndex-1 < 0 ? 11 : this.props.monthIndex-1,
        year      = this.props.monthIndex === 0 ? this.props.year-1 : this.props.year;

    prevMonth = prevMonth.concat(this.props.currentMonth.slice(0,7-prevMonth.length));
    return(prevMonth.map((day,i)=>{
      if(i < this.props.prevMonth.length){
        return( <td className="prev-month modal-trigger"
                    onClick={()=>{this.props.toggleShowMemo(day,month,year)}}
                    key={i+1}
                    href="#memoModal">
                  <span className="date">{day}</span>
                </td>)
      } else{
        return( <td className="current-month modal-trigger"
                    onClick={()=>{this.props.toggleShowMemo(day)}}
                    key={i+1}
                    href="#memoModal">
                  <span className="date">{day}</span>
                </td>)
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showPrevWeek()}</tr>)}
}
