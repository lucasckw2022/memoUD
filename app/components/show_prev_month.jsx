var React = require('react');

module.exports = class ShowPrevMonth extends React.Component{
  showPrevWeek(){
    var prevMonth = this.props.prevMonth;
    prevMonth = prevMonth.concat(this.props.currentMonth.slice(prevMonth.length,7));
    return(prevMonth.map((day,i)=>{
      if(i < this.props.prevMonth.length){
        return <td className="prev-month days" key={i+1}>{day}</td>
      } else{
        return <td className="current-month days" key={i+1}>{day}</td>
      }
    }))
  }
  render(){
    return(<tr className="weeks">{this.showPrevWeek()}</tr>)}
}
