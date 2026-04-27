'use client';
import { useState } from 'react';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqiydYvwWvyEc14orE5RziwcyZS5An_YQokkoq_GF-F7fiulbEoEVF4R8jtQ3gY4AGZw/exec";

// ✅ FULL TOPIC LIST (correct)
const topics = [
  // Spring
  "Heavy rain prep and response","Mud hazards and slipping","Inspecting BMPs after storms",
  "Silt fence repairs","Inlet protection after rainfall","Erosion from disturbed soil",
  "Stormwater flow awareness","Equipment in wet conditions","Tracking sediment onto roads",
  "Drainage path awareness",

  // Summer
  "Heat stress and hydration","Fatigue in high heat","Dust control","Working long hours safely",
  "PPE in hot weather","Equipment overheating","Hydration planning","Sun exposure",
  "Working on dry loose soil","Increased production risks",

  // Fall
  "Seeding and stabilization safety","Preparing for colder weather","Leaf buildup in drains",
  "Changing daylight conditions","Wet mornings / dry afternoons","Slope stabilization",
  "Storm prep before winter","Material storage","Crew communication",
  "Inspecting aging BMPs",

  // Winter
  "Cold stress and frostbite","Frozen ground hazards","Working in rain","Vehicle safety in mud",
  "Equipment warm-up safety","Layered PPE","Short daylight hazards","Slippery surfaces",
  "Storm event response","Maintaining BMPs in winter",

  // General
  "Silt fence installation","Inlet protection install","Sediment basin work",
  "Wattles and check dams","Working on slopes","Excavator safety","Spotter communication",
  "Backing trucks safely","Trailer loading/unloading","Hand tool safety","Power tool safety",
  "Slip/trip/fall prevention","Hazard recognition","PPE requirements",
  "Keeping sediment on site","Jobsite communication","Working around traffic",
  "Utility awareness","Material handling","Housekeeping","Equipment inspections"
];

// ✅ FULL CREW LIST (separate from topics)
const crew = [
  "Martir Reyes (Saul)","Yunior Luciano","Walter Silva","Beny Garcia","Jose Lopez",
  "Ronald Orellana","Santose Romero","Edgar Arce Agoino","Miguel Duran","Arturo Contreras",
  "Francisco Quintanilla","Christian Romero","Roger Orellana","Jose Gonzalez",
  "Angel Hernandez","Erick Alvarado","Rodrigo Garcia","Emmanuel Guerrero","Marvin Landaverde",
  "Juan Orellana","Wilmer E Ruiz Garcia","Brandon Gurdian","Emerson Garcia","Ricardo Irias",
  "Alberto Sierra",
  "Steven Dunn","Christopher Mayberry","Justin Sanders","Jose Lobo","Seth Clark","Randy Sandoli",
  "Krysten Mayberry","Megan Wright","Thomas Corso","Jorge Rivera","Jorge Guerrero","Bret Mayberry"
];

export default function Page() {
  const [form,setForm]=useState({
    topic:'',date:'',weather:'',location:'Waxhaw',supervisor:'',notes:'',attendees:Array(30).fill('')
  });

  const handleSubmit=async()=>{
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',body:JSON.stringify(form)});
    alert('Saved to Google Sheets ✅');
  };

  return (
    <div style={{padding:16,maxWidth:500,margin:'auto'}}>
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

      <div style={{marginBottom:10}}>
        <strong>Talking Points:</strong>
        <ul style={{paddingLeft:20, marginTop:5}}>
          <li>Hazards related to today’s Topic</li>
          <li>Required PPE</li>
          <li>Equipment / tool risks</li>
          <li>Ground conditions / footing</li>
          <li>Keeping sediment on site</li>
          <li>Job-specific hazards</li>
        </ul>
      </div>

      <textarea placeholder="Notes / What was discussed" style={{width:'100%',padding:10,marginBottom:10}}
        onChange={e=>setForm({...form,notes:e.target.value})}/>

      <h4>Attendees (30)</h4>
      <div style={{maxHeight:200,overflowY:'scroll',marginBottom:10}}>
        {form.attendees.map((a,i)=>{
          // ✅ prevent duplicates
          const available = crew.filter(name => !form.attendees.includes(name) || name === a);

          return (
            <select key={i}
              value={a}
              style={{width:'100%',padding:8,marginBottom:5}}
              onChange={e=>{
                const updated=[...form.attendees];
                updated[i]=e.target.value;
                setForm({...form,attendees:updated});
              }}>
              <option value="">Select Person</option>
              {available.map((name,idx)=>(
                <option key={idx} value={name}>{name}</option>
              ))}
            </select>
          );
        })}
      </div>

      <button onClick={handleSubmit}
        style={{width:'100%',padding:15,fontSize:16}}>
        Save to Google Sheets
      </button>
    </div>
  );
}
