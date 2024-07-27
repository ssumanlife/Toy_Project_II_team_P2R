import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ref } from 'firebase/database';

const PayrollHistory: React.FC = () => {
  const [todo, setTodo] = useState('');

  const handleTodoChange = (e: any) => {
    setTodo(e.target.value);
  };
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const url = `https://workcheck-d7768-default-rtdb.asia-southeast1.firebasedatabase.app/`;
    // const json = JSON.stringify(url)
    try {
      const data = await axios.get(JSON.stringify(url));
      console.log(data);
      if (data) {
        setTodo(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Write
  // const writeData = () => {
  //   const name: string = 'sumin';
  //   set(ref(firebase, `test/${name}`), {
  //     todo,
  //     name,
  //   });
  //   setTodo('');
  // };

  return (
    <div className="App">
      <input type="text" value={todo} onChange={handleTodoChange} />
      {/* <button onClick={writeData}>Submit</button> */}
    </div>
  );
};

export default PayrollHistory;
