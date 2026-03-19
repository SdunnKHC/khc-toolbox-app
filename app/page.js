'use client';
import { useState } from 'react';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqiydYvwWvyEc14orE5RziwcyZS5An_YQokkoq_GF-F7fiulbEoEVF4R8jtQ3gY4AGZw/exec";

export default function Page() {
  const topics = [
    "Heavy rain prep and response","Mud hazards and slipping","Inspecting BMPs after storms",
    "Silt fence repairs","Inlet protection after rainfall","Erosion from disturbed soil",
    "Stormwater flow awareness","Equipment in wet conditions","Tracking sediment onto roads",
    "Drainage path awareness",
    "Heat stress and hydration","Fatigue in high heat","Dust control","Working long hours safely",
    "PPE in hot weather","Equipment overheating","Hydration planning","Sun exposure",
    "Working on dry loose soil","Increased production risks",
    "Seeding and stabilization safety","Preparing for colder weather","Leaf buildup in drains",
    "Changing daylight conditions","Wet mornings / dry afternoons","Slope stabilization",
    "Storm prep before winter","Material storage","Crew communication",
    "Inspecting aging BMPs",
    "Cold stress and frostbite","Frozen ground hazards","Working in rain","Vehicle safety in mud",
    "Equipment warm-up safety","Layered PPE","Short daylight hazards","Slippery surfaces",
    "Storm event response","Maintaining BMPs in winter",
    "Silt fence installation","Inlet protection install","Sediment basin work",
    "Wattles and check dams","Working on slopes","Excavator safety","Spotter communication",
    "Backing trucks safely","Trailer loading/unloading","Hand tool safety","Power tool safety",
    "Slip/trip/fall prevention","Hazard recognition","PPE requirements",
    "Keeping sediment on site","Jobsite communication","Working around traffic",
    "Utility awareness","Material handling","Housekeeping","Equipment inspections"
  ];

  const [form,setForm]=useState({
    topic:'',date:'',weather:'',location:'Waxhaw',supervisor:'',notes:'',attendees:Array(30).fill('')
  });

  const handleSubmit=async()=>{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',body:JSON.stringify(form)});
    alert('Saved to Google Sheets ✅');
  };

  return (
    <div style={{padding:16,maxWidth:500,margin:'auto',color:'white'}}>
      <h2>KHC Toolbox Talk</h2>

      <select style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,topic:e.target.value})}>
        <option>Select Topic</option>
        {topics.map((t,i)=><option key={i}>{t}</option>)}
      </select>

      <input type="date" style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,date:e.target.value})}/>

      <select style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,weather:e.target.value})}>
        <option>Weather</option>
        <option>Sunny</option>
        <option>Cloudy</option>
        <option>Rain</option>
        <option>Storm</option>
        <option>Hot</option>
        <option>Cold</option>
        <option>Windy</option>
        <option>Wet/Muddy</option>
      </select>

      <select style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,location:e.target.value})}>
        <option>Waxhaw</option>
        <option>Lexington</option>
      </select>

      <input placeholder="Supervisor" style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,supervisor:e.target.value})}/>

      <textarea placeholder="Notes" style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,notes:e.target.value})}/>

      <h4>Attendees (30)</h4>
      <div style={{maxHeight:200,overflowY:'scroll',marginBottom:10}}>
        {form.attendees.map((a,i)=>(
          <input key={i} placeholder={`Person ${i+1}`} 
            style={{width:'100%',padding:8,marginBottom:5}}
            onChange={e=>{
              const updated=[...form.attendees];
              updated[i]=e.target.value;
              setForm({...form,attendees:updated});
            }}/>
        ))}
      </div>

      <button onClick={handleSubmit}
        style={{width:'100%',padding:15,fontSize:16}}>
        Save to Google Sheets
      </button>
    </div>
  );
}
