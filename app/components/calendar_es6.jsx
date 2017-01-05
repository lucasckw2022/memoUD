var React             = require('react');
var ShowCurrentMonth  = require('./show_current_month.jsx');
var ShowPrevMonth     = require('./show_prev_month.jsx');
var ShowNextMonth     = require('./show_next_month.jsx');
var ShowMemo          = require('./memo_show.jsx');

module.exports = class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {today             : new Date(),
                  calendar_month    : "",
                  calendar_year     : new Date().getFullYear(),
                  month             : new Date().getMonth(),
                  printedMonth      : [],
                  month_list        :  ["January","February","March","April","May","June","July","August","September","October","November","December"],
                  showMemoModal     : false,
                  memoList          : [],
                  selectedDate      : "",
                  selectedMonth     : "",
                  selectedYear      : "",
                  selectedMonthIndex: "",
                  memoFormStatus    : false,
                  selectedMemo      : ""}
    this.changeMonth         = this.changeMonth.bind(this)
    this.showWeeks           = this.showWeeks.bind(this)
    this.toggleShowMemo      = this.toggleShowMemo.bind(this)
    this.componentDidMount   = this.componentDidMount.bind(this)
    this.printMemos          = this.printMemos.bind(this)
    this.toggleMemoForm      = this.toggleMemoForm.bind(this)
  }
  componentDidMount(){
    this.setState({calendar_month: this.state.month_list[this.state.month]});
    $.ajax({url: '/api/memos'}).
      done((memoList)=>{
        this.setState({memoList: memoList})
      }).
      done(()=>{
        this.showWeeks();
      })
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
    this.setState({
      calendar_month  : this.state.month_list[newPrintedMonth],
      calendar_year   : currentCalendarYear,
      month           : newPrintedMonth},
      ()=>this.showWeeks())
  }
  showWeeks(){
    var newCurrentMonth   = [],
        newPrevMonth      = [],
        newNextMonth      = [],
        weekdayOfFirstDay = new Date(this.state.calendar_year,this.state.month,1).getDay(),
        totalDaysInMonth  = new Date(this.state.calendar_year,this.state.month+1,0).getDate(),
        DaysOfprevMonth   = new Date(this.state.calendar_year,this.state.month,0).getDate(),
        weekdayOflastDay  =  new Date(this.state.calendar_year,this.state.month,totalDaysInMonth).getDay(),
        show              = [],
        weeksInMonth      = Math.ceil((weekdayOfFirstDay + totalDaysInMonth)/7);

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

    show.push(<ShowPrevMonth  toggleShowMemo  ={this.toggleShowMemo}
                              prevMonth       ={newPrevMonth}
                              currentMonth    ={newCurrentMonth}
                              monthIndex      ={this.state.month}
                              year            ={this.state.calendar_year}
                              memoList        ={this.state.memoList}
                              printMemos      ={this.printMemos} />)
    for(var i = 1; i <= weeksInMonth-2; i++){
      show.push(<ShowCurrentMonth   toggleShowMemo    ={this.toggleShowMemo}
                                    curWeek           ={i}
                                    curMonth          ={newCurrentMonth}
                                    prevMonthLength   ={newPrevMonth.length}
                                    weekdayOfFirstDay ={weekdayOfFirstDay}
                                    memoList          ={this.state.memoList}
                                    monthIndex        ={this.state.month}
                                    year              ={this.state.calendar_year}
                                    printMemos        ={this.printMemos}
                                    key               ={i} />)
    }
    show.push(<ShowNextMonth  toggleShowMemo    ={this.toggleShowMemo}
                              nextMonth         ={newNextMonth}
                              currentMonth      ={newCurrentMonth}
                              weekdayOflastDay  ={weekdayOflastDay}
                              monthIndex        ={this.state.month}
                              year              ={this.state.calendar_year}
                              memoList          ={this.state.memoList}
                              printMemos        ={this.printMemos} />)
    this.setState({printedMonth: show});
  }
  toggleShowMemo(date,month = this.state.month,year = this.state.calendar_year){
    this.setState({ showMemoModal     : !this.state.showMemoModal,
                    selectedDate      : date,
                    selectedMonth     : this.state.month_list[month],
                    selectedMonthIndex: month,
                    selectedYear      : year,
                    memoFormStatus    : false})
  }
  printMemos(day,month,year,modal = false){
    if(this.state.memoList){
      return this.state.memoList.map((memo,index)=>{
        if(memo.date === day && memo.month === month && memo.year === year){
          return (
            <li key={index}>
              {memo.content}
              {modal ?
                <div>
                  <span className="btn"
                        onClick={()=>{this.deleteMemo(memo._id)}}>
                        Remove
                  </span>
                  <span className="btn"
                        onClick={()=>{this.editMemo(memo)}}>
                        Modify
                  </span>
                </div>
                :
                ""}
            </li>
          )
        }
      })
    }
  }
  deleteMemo(memoId){
    var confirmMsg = confirm("Are you sure to delete this memo?");
    if(confirmMsg){
      $.ajax({url   : "/api/memos/"+memoId.toString(),
              method: "DELETE"}).
              done(()=>{this.setState({showMemoModal: false});
                        this.componentDidMount();})
    }
  }
  editMemo(memo){
    this.toggleMemoForm("PATCH",memo)
  }
  toggleMemoForm(status = false,memo = ""){
    this.setState({ memoFormStatus: status,
                    selectedMemo: memo})
  }
  render(){
    return(
      <div>
        <header>
          <h1>MemoUD</h1>
          <div className="selected-calendar right">
            <div  className="changeMonth"
                  onClick={()=>this.changeMonth(false,this.state.month)}>
              <i className="material-icons">arrow_back</i>
            </div>
            <div className="selected-month center">
              {this.state.calendar_month} {this.state.calendar_year}
            </div>
            <div  className="changeMonth"
                  onClick={()=>this.changeMonth(true,this.state.month)}>
              <i className="material-icons">arrow_forward</i>
            </div>
          </div>
        </header>
        <table className="row">
          <tbody>
            <tr className="weekday">
              <th className="col s1 center">Sunday</th>
              <th className="col s1 center">Monday</th>
              <th className="col s1 center">Tuesday</th>
              <th className="col s1 center">Wednesday</th>
              <th className="col s1 center">Thursday</th>
              <th className="col s1 center">Friday</th>
              <th className="col s1 center">Saturday</th>
            </tr>
            {this.state.printedMonth}
            <ShowMemo year           ={this.state.selectedYear}
                      month          ={this.state.selectedMonth}
                      monthIndex     ={this.state.selectedMonthIndex}
                      date           ={this.state.selectedDate}
                      refreshData    ={this.componentDidMount}
                      memoList       ={this.state.memoList}
                      printMemos     ={this.printMemos}
                      memoFormStatus ={this.state.memoFormStatus}
                      selectedMemo   ={this.state.selectedMemo}
                      toggleMemoForm ={this.toggleMemoForm}/>
          </tbody>
        </table>
      </div>
    )
  }
}
