'use client';
import { useState } from 'react';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqiydYvwWvyEc14orE5RziwcyZS5An_YQokkoq_GF-F7fiulbEoEVF4R8jtQ3gY4AGZw/exec";

export default function Page() {
  const topics = ["Silt fence","Inlet protection","Sediment basins","Dust control","Heat stress","Cold weather"];

  const [form,setForm]=useState({topic:'',date:'',weather:'',location:'Waxhaw',supervisor:'',notes:'',attendees:Array(30).fill('')});

  const handleSubmit=async()=>{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',body:JSON.stringify(form)});
    alert('Saved');
  };

  return (
    <div style={{padding:16,maxWidth:400,margin:'auto'}}>
      <h2>KHC Toolbox Talk</h2>
      <select onChange={e=>setForm({...form,topic:e.target.value})}>
        {topics.map((t,i)=><option key={i}>{t}</option>)}
      </select>
      <input type="date" onChange={e=>setForm({...form,date:e.target.value})}/>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
