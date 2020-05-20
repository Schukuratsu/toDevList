import React from 'react';

function App() {
  const [list, setList] = React.useState([{ id: 0, text: 'this is a task', checked: false }, { id: 1, text: 'this is a task done', checked: true }])
  const [taskInput, setTaskInput] = React.useState('');
  const [newId, setNewId] = React.useState(2);

  const addTask = () => {
    setList(list => [...list, { id: newId, text: taskInput, checked: false }]);
    setNewId(id=>id+1);
    setTaskInput('');
  };

  const onChangeTaskInput = (evt) => {
    setTaskInput(evt.target.value);
  };

  const onCheck = (id) => {
    const newList = [...list]; 
    const index = list.findIndex(e => e.id === id);
    const newItem = { ...list[index] };
    newItem.checked = !newItem.checked;
    newList.splice(index, 1, newItem);
    setList(newList);
  };

  return <div style={s.container}>
    <span style={s.title}>MyDevList</span>
    <div style={s.list}>
      {
        list.filter(e => !e.checked).reverse().map(
          (listItem) => {
            const { id, text, checked } = listItem;
            return <div style={s.listItem} key={id}>
              <input checked={checked} type="checkbox" onChange={()=>onCheck(id)} /><span style={s.listItemUnchecked}>{text}</span>
            </div>;
          }
        )
      }
      {
        list.filter(e => e.checked).reverse().map(
          (listItem) => {
            const { id, text, checked } = listItem;
            return <div style={s.listItem} key={id}>
              <input checked={checked} type="checkbox" onChange={()=>onCheck(id)} /><span style={s.listItemChecked}>{text}</span>
            </div>;
          }
        )
      }
    </div>
    <form style={s.footer} onSubmit={(evt)=>evt.preventDefault()}>
      <input value={taskInput} onChange={onChangeTaskInput} />
      <button type="submit" onClick={addTask}>+</button>
    </form>
  </div>;
}

const s = {
  container: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
    margin: '0px auto',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    color: '#28b0ed'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    width: 205,
  },
  listItem: {
    display: 'flex',
  },
  listItemUnchecked: {
    color: '#666',
    wordBreak: 'break-word'
  },
  listItemChecked: {
    color: '#999',
    wordBreak: 'break-word',
    textDecoration: 'line-through'
  }
};

export default App;
