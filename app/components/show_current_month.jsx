var React = require('react');

module.exports = class ShowCurrentMonth extends React.Component{
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  showWeek(){
    var curWeek    = this.props.curWeek+1,
        week       = this.props.curMonth.slice(
            ((7*curWeek)-7-this.props.weekdayOfFirstDay),
            (7*curWeek-this.props.weekdayOfFirstDay)
          ),
        monthIndex = this.props.monthIndex,
        year       = this.props.year
    return(week.map((day,i)=>{
      return( <td className="current-month modal-trigger card"
                  onClick  ={()=>{this.props.toggleShowMemo(day)}}
                  key      ={i+1}
                  href     ="#memoModal">
                <div className="date">{day}</div>
                <ul>{this.props.printMemos(day,monthIndex+1,year)}</ul>
              </td>)
    }))
  }
  render(){
    return( <tr  className="weeks"
                key={this.props.curWeek}>{this.showWeek()}
            </tr>)}
}
