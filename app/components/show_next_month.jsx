var React = require('react');

module.exports = class ShowNextMonth extends React.Component{
  showNextWeek(){
    var nextMonth = this.props.currentMonth.slice(this.props.currentMonth-(this.props.weekdayOflastDay+1),this.props.currentMonth-this.props.nextMonth);
    nextMonth = nextMonth.concat(this.props.nextMonth);
    debugger
    return(nextMonth.map((day,i)=>{
      if(i < 7-this.props.nextMonth){
        return <td className="current-month days" key={i+1}>{day}</td>
      } else{
        return <td className="next-month days" key={i+1}>{day}</td>
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showNextWeek()}</tr>)}
}
