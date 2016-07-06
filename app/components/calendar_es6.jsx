var React = require('react');
var ShowCurrentMonth = require('./show_current_month.jsx');
var ShowPrevMonth = require('./show_prev_month.jsx');
var ShowNextMonth = require('./show_next_month.jsx');

module.exports = class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {today: new Date(),
                  calendar_month: "",
                  calendar_year: new Date().getFullYear(),
                  month: new Date().getMonth(),
                  printedMonth: [],
                  month_list:  ["January","February","March","April","May","June","July","August","September","October","November","December"]}
    this.changeMonth = this.changeMonth.bind(this)
    this.showWeeks = this.showWeeks.bind(this)
  }
  componentDidMount(){
    this.setState({calendar_month: this.state.month_list[this.state.month]})
    this.showWeeks()
  }
  changeMonth(next,month = this.state.month){
    $("h1").addClass("rubberBand animated")
    var currentCalendarYear = next === true ?
      month+1 === 12 ? this.state.calendar_year+1 : this.state.calendar_year
      :
      month-1 < 0 ? this.state.calendar_year-1 : this.state.calendar_year;
    var newPrintedMonth = next === true ?
      month+1
      :
      month-1 < 0 ? month = 11 : month-1;
    newPrintedMonth = newPrintedMonth%12;
    this.setState({calendar_month: this.state.month_list[newPrintedMonth], calendar_year: currentCalendarYear, month: newPrintedMonth,},()=>this.showWeeks())
    $("h1").one('animationend', ()=>{$("h1").removeClass("rubberBand animated")})

  }
  showWeeks(){
    var newCurrentMonth = [],
        newPrevMonth = [],
        newNextMonth = [],
        weekdayOfFirstDay = new Date(this.state.calendar_year,this.state.month,1).getDay(),
        totalDaysInMonth = new Date(this.state.calendar_year,this.state.month+1,0).getDate(),
        DaysOfprevMonth = new Date(this.state.calendar_year,this.state.month,0).getDate(),
        weekdayOflastDay =  new Date(this.state.calendar_year,this.state.month,totalDaysInMonth).getDay(),
        show = [],
        weeksInMonth = Math.ceil((weekdayOfFirstDay + totalDaysInMonth)/7);

    ([...Array(weekdayOfFirstDay)].map((day,i)=>{
      var countPrevMonth = DaysOfprevMonth-(weekdayOfFirstDay-(i+1))
      newPrevMonth.push(countPrevMonth);
    }),
    [...Array(totalDaysInMonth)].map((day,i)=>{
      newCurrentMonth.push(i+1);
    }),
    [...Array(7-(weekdayOflastDay+1))].map((day,i)=>{
      newNextMonth.push(i+1);
    }));

    show.push(<ShowPrevMonth prevMonth={newPrevMonth} currentMonth={newCurrentMonth}/>)
    for(var i = 1; i <= weeksInMonth-2; i++){
    show.push(<ShowCurrentMonth curWeek={i} month={newCurrentMonth} prevMonthLength={newPrevMonth.length} weekdayOfFirstDay={weekdayOfFirstDay} key={i}/>)
    }
    show.push(<ShowNextMonth nextMonth={newNextMonth} currentMonth={newCurrentMonth} weekdayOflastDay={weekdayOflastDay} />)
    this.setState({printedMonth: show});
  }

  render(){
    return(
      <div>
      <h1>MemoUD</h1>
        <table className="table borderless">
          <tbody>
            <tr>
              <th className="col-sm-3" colSpan="3"></th>
              <th className="col-sm-1">
                <span className="changeMonth"  onClick={()=>this.changeMonth(false,this.state.month)}>
                  Prev
                </span>
              </th>
              <th className="col-sm-2" colSpan="2">
                {this.state.calendar_month} {this.state.calendar_year}
              </th>
              <th className="col-sm-1">
                <span className="changeMonth"  onClick={()=>this.changeMonth(true,this.state.month)}>
                  Next
                </span>
              </th>
            </tr>
            <tr className="weekday">
              <td>Sunday</td>
              <td>Monday</td>
              <td>Tuesday</td>
              <td>Wednesday</td>
              <td>Thursday</td>
              <td>Friday</td>
              <td>Saturday</td>
            </tr>
            {this.state.printedMonth}
          </tbody>
        </table>
      </div>
      )
  }
}
