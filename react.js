class ToDoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: JSON.parse(localStorage.toDoItems),
      doneItems: JSON.parse(localStorage.doneItems),
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToDoItemClick = this.handleToDoItemClick.bind(this);
    this.handleDoneItemClick = this.handleDoneItemClick.bind(this);
    this.handelItemDelete = this.handelItemDelete.bind(this);
    this.handlerDeleteAll = this.handlerDeleteAll.bind(this)
  }

  render() {
    return (
      <div>
        <h1 className="title">To do list</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <label>
            What I need to do?
          </label> */}
          <div className="form">
            <input
              id="new-task"
              onChange={this.handleChange}
              placeholder="Add a task"
              value={this.state.text}
              className="input-task"
            />
            <button className="btn-add">Add</button>
          </div>
        </form>
        { (this.state.toDoItems.length + this.state.doneItems.length > 0) && <button className="btn-del-all" onClick={this.handlerDeleteAll}>DELETE ALL</button> }
        <TodoList items={this.state.toDoItems} onItemClick={this.handleToDoItemClick} onDeleteClick={this.handelItemDelete}/>
        <DoneList items={this.state.doneItems} onDoneItemClick={this.handleDoneItemClick} onDeleteClick={this.handelItemDelete}/>
        
      </div>
    )
  }

  componentDidUpdate() {
    this.saveToLS();
  }

  saveToLS() {
    localStorage.setItem('toDoItems', JSON.stringify(this.state.toDoItems));
    localStorage.setItem('doneItems', JSON.stringify(this.state.doneItems));
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      toDoItems: this.state.toDoItems.concat(newItem),
      text: ''
    }));
  }

  handleToDoItemClick(itemId) {
    const foundItem = this.state.toDoItems.find(item => item.id === itemId);

    this.setState(state => ({
      doneItems: this.state.doneItems.concat(foundItem),
      toDoItems: this.state.toDoItems.filter(item => item.id !== itemId)
    }))
  }

  handleDoneItemClick(itemId) {
    const foundDoneItem = this.state.doneItems.find(item => item.id === itemId);

    this.setState(state => ({
      toDoItems: this.state.toDoItems.concat(foundDoneItem),
      doneItems: this.state.doneItems.filter(item => item.id !== itemId)
    }))
  }

  handelItemDelete(itemId) {
    this.setState(state => ({
      toDoItems: this.state.toDoItems.filter(item => item.id !== itemId),
      doneItems: this.state.doneItems.filter(item => item.id !== itemId)
    }))
  }

  handlerDeleteAll() {
    this.setState(state => ({
      toDoItems: [],
      doneItems: []
    }))
  }
}

class TodoList extends React.Component {
  render() {
    const sortedItems = this.props.items.sort((a, b) => a.text.localeCompare(b.text))
    return (
      <div>
        { this.props.items.length > 0 && <h2>Not Completed</h2> }
        <ul>
          {
            sortedItems.map(item => {
              return (
                <li className="item-todo" key={item.id}>
                  <span className="text-item-todo" onClick={(e) => (this.props.onItemClick(item.id))}>{item.text}</span>
                  <button className="btn-del-item" onClick={(e) => (this.props.onDeleteClick(item.id))}>X</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

class DoneList extends React.Component {
  render() {
    return (
      <div>
        { this.props.items.length > 0 && <h2>Completed</h2> }
        <ul>
          {
            this.props.items.map(item => {
              return (
                <li className="item-done" key={item.id}>
                  <span className="stroked-item text-item-done" onClick={(e) => (this.props.onDoneItemClick(item.id))}>{item.text}</span>
                  <button className="btn-del-item" onClick={(e) => (this.props.onDeleteClick(item.id))}>X</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<ToDoApp/>, document.getElementById('root'))


// class Cup {
//   constructor(color, volume){
//     this.color = color;
//     this.volume = volume + 'ml';
//   }
// }

// const myCup = new Cup('red', 500);
// console.log(myCup)
// myCup.color


// const sashaCup = new Cup('violet', 250);
