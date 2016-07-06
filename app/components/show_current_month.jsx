var React = require('react');

module.exports = class ShowCurrentMonth extends React.Component{
  showWeek(){
    var curWeek = this.props.curWeek+1,
        week    = this.props.month.slice(((7*curWeek)-7),(7*curWeek))

    return(week.map((day,i)=>{
      return(<td className="current-month days" key={i+1}>{day}</td>)
    }))
  }
  render(){
    return(<tr className="weeks" key={this.props.curWeek}>{this.showWeek()}</tr>)}
}
