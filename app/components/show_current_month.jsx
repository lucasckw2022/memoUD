var React = require('react');

module.exports = class ShowCurrentMonth extends React.Component{
  constructor(props){
    super(props)
    this.state = {memos: []}
  }
  componentDidMount(){
    $('.modal-trigger').leanModal();
  }
  printMemos(day){
    var temp = []
    return this.props.memoList.map((memo,index)=>{
      if(memo.date === day && memo.month === this.props.monthIndex+1 && memo.year === this.props.year){
        ()=>{this.setState({memos: this.state.memos.concat(<li key={index}>{memo.content}</li>)})}
        return <li key={index}>{memo.content}</li>
      }
    })
  }
  showWeek(){
    var curWeek = this.props.curWeek+1,
        week    = this.props.curMonth.slice(((7*curWeek)-7-this.props.weekdayOfFirstDay),(7*curWeek-this.props.weekdayOfFirstDay))
    return(week.map((day,i)=>{
      return( <td className="current-month modal-trigger"
                  onClick={()=>{this.props.toggleShowMemo(day)}}
                  key={i+1}
                  href="#memoModal">
                <span className="date">{day}</span>
                <ul>{this.printMemos(day)}</ul>
              </td>)
    }))
  }
  render(){
    return(<tr className="weeks" key={this.props.curWeek}>{this.showWeek()}</tr>)}
}
