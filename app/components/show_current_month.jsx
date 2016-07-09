var React = require('react');

module.exports = class ShowCurrentMonth extends React.Component{
  showWeek(){
    var curWeek = this.props.curWeek+1,
        week    = this.props.curMonth.slice(((7*curWeek)-7-this.props.weekdayOfFirstDay),(7*curWeek-this.props.weekdayOfFirstDay))

    return(week.map((day,i)=>{
      return( <td className="current-month"
                  onClick={()=>{this.props.toggleShowMemo(day)}}
                  key={i+1}>
                <span className="date">{day}</span>
              </td>)
    }))
  }
  render(){
    return(<tr className="weeks" key={this.props.curWeek}>{this.showWeek()}</tr>)}
}
