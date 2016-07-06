var React = require('react');

module.exports = class ShowNextMonth extends React.Component{
  showNextWeek(){
    var nextMonth = this.props.currentMonth.slice(this.props.currentMonth.length-(this.props.weekdayOflastDay+1),this.props.currentMonth.length);
    nextMonth = nextMonth.concat(this.props.nextMonth);
    return(nextMonth.map((day,i)=>{
      if(i < 7-this.props.nextMonth.length){
        return <td className="current-month days" key={i+1}>{day}</td>
      } else{
        return <td className="next-month days" key={i+1}>{day}</td>
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showNextWeek()}</tr>)}
}
