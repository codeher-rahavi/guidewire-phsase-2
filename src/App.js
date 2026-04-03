import { useState } from "react";

const INDIA_LOCATIONS = {
  "Tamil Nadu": {
    districts: {
      "Chennai": { areas: ["Anna Nagar","T. Nagar","Adyar","Velachery","Tambaram","Porur","Guindy","Chrompet","Perambur","Sholinganallur","OMR","Kodambakkam","Mylapore","Royapettah","Nungambakkam"], floodRisk:85,heatRisk:70,aqiRisk:75,strikeRisk:60 },
      "Coimbatore": { areas: ["RS Puram","Gandhipuram","Peelamedu","Saibaba Colony","Singanallur","Hope College","Tidel Park","Ukkadam","Podanur","Ganapathy","Race Course","Kavundampalayam"], floodRisk:45,heatRisk:82,aqiRisk:55,strikeRisk:40 },
      "Madurai": { areas: ["Anna Nagar","KK Nagar","Tallakulam","Goripalayam","Palanganatham","Vilangudi","Thirunagar","Simmakkal"], floodRisk:50,heatRisk:88,aqiRisk:50,strikeRisk:45 },
      "Salem": { areas: ["Fairlands","Alagapuram","Hasthampatti","Suramangalam","Kondalampatti","Gugai"], floodRisk:40,heatRisk:82,aqiRisk:48,strikeRisk:35 },
      "Tiruchirappalli": { areas: ["Srirangam","Ariyamangalam","Thillai Nagar","Woraiyur","Palakarai","Kattur"], floodRisk:55,heatRisk:85,aqiRisk:52,strikeRisk:40 },
      "Tiruppur": { areas: ["Avinashi Road","Palladam","Veerapandi","Rayapuram","Selvapuram"], floodRisk:38,heatRisk:78,aqiRisk:60,strikeRisk:55 },
    }
  },
  "Karnataka": {
    districts: {
      "Bengaluru Urban": { areas: ["Koramangala","Indiranagar","Whitefield","HSR Layout","Electronic City","Marathahalli","JP Nagar","Jayanagar","Malleshwaram","Yelahanka","Hebbal","Bellandur","Sarjapur","BTM Layout","RT Nagar","Rajajinagar"], floodRisk:60,heatRisk:55,aqiRisk:70,strikeRisk:50 },
      "Mysuru": { areas: ["Vijayanagar","Kuvempunagar","Saraswathipuram","Jayalakshmipuram","Nazarbad","Hebbal","Gokulam"], floodRisk:35,heatRisk:65,aqiRisk:40,strikeRisk:35 },
      "Mangaluru": { areas: ["Bejai","Falnir","Hampankatta","Kadri","Kankanady","Urwa","Balmatta"], floodRisk:72,heatRisk:60,aqiRisk:38,strikeRisk:30 },
      "Hubballi-Dharwad": { areas: ["Vidyanagar","Gokul Road","Keshwapur","Unkal","Navanagar"], floodRisk:40,heatRisk:75,aqiRisk:50,strikeRisk:42 },
    }
  },
  "Maharashtra": {
    districts: {
      "Mumbai City": { areas: ["Andheri","Bandra","Dadar","Kurla","Worli","Chembur","Malad","Borivali","Powai","Juhu","Goregaon","Kandivali","Vikhroli","Ghatkopar","Lower Parel","Dharavi"], floodRisk:95,heatRisk:65,aqiRisk:80,strikeRisk:70 },
      "Mumbai Suburban": { areas: ["Thane","Navi Mumbai","Kalyan","Dombivli","Ulhasnagar","Bhiwandi","Vasai","Virar","Mira Road","Ambernath"], floodRisk:90,heatRisk:62,aqiRisk:75,strikeRisk:65 },
      "Pune": { areas: ["Kothrud","Hinjewadi","Viman Nagar","Baner","Hadapsar","Kharadi","Shivajinagar","Aundh","Wakad","Pimple Saudagar","Sinhagad Road"], floodRisk:55,heatRisk:70,aqiRisk:65,strikeRisk:50 },
      "Nagpur": { areas: ["Dharampeth","Sadar","Sitabuldi","Wardhaman Nagar","Manish Nagar","Trimurti Nagar"], floodRisk:45,heatRisk:90,aqiRisk:60,strikeRisk:45 },
    }
  },
  "Delhi": {
    districts: {
      "New Delhi": { areas: ["Connaught Place","Karol Bagh","Lajpat Nagar","Saket","Hauz Khas","Vasant Kunj","Dwarka","Rohini","Pitampura","Janakpuri","Shahdara","Preet Vihar","Mayur Vihar","Dilshad Garden","Civil Lines"], floodRisk:70,heatRisk:92,aqiRisk:95,strikeRisk:75 },
      "South Delhi": { areas: ["Greater Kailash","Malviya Nagar","Kalkaji","Okhla","Tughlakabad","Sarita Vihar","Badarpur"], floodRisk:65,heatRisk:90,aqiRisk:93,strikeRisk:72 },
      "North Delhi": { areas: ["Civil Lines","Kamla Nagar","Model Town","Burari","Jahangirpuri","Pitampura","Shalimar Bagh"], floodRisk:72,heatRisk:91,aqiRisk:94,strikeRisk:76 },
    }
  },
  "Telangana": {
    districts: {
      "Hyderabad": { areas: ["Banjara Hills","Jubilee Hills","Madhapur","Gachibowli","Kondapur","Ameerpet","SR Nagar","Kukatpally","LB Nagar","Secunderabad","Begumpet","Somajiguda","HITEC City"], floodRisk:65,heatRisk:85,aqiRisk:70,strikeRisk:55 },
      "Rangareddy": { areas: ["Shamshabad","Rajendranagar","Shadnagar","Maheshwaram","Puppalaguda"], floodRisk:58,heatRisk:82,aqiRisk:65,strikeRisk:48 },
      "Warangal": { areas: ["Hanamkonda","Kazipet","Subedari","Balasamudram"], floodRisk:50,heatRisk:86,aqiRisk:55,strikeRisk:40 },
    }
  },
  "Gujarat": {
    districts: {
      "Ahmedabad": { areas: ["Navrangpura","Vastrapur","Satellite","Bopal","SG Highway","Maninagar","Naroda","Ghatlodia","Chandkheda","Vastral","Prahlad Nagar"], floodRisk:60,heatRisk:88,aqiRisk:72,strikeRisk:45 },
      "Surat": { areas: ["Adajan","Vesu","Pal","Katargam","Udhna","Varachha","Althan"], floodRisk:65,heatRisk:85,aqiRisk:68,strikeRisk:42 },
      "Vadodara": { areas: ["Alkapuri","Fatehgunj","Karelibaug","Manjalpur","Gotri"], floodRisk:55,heatRisk:87,aqiRisk:60,strikeRisk:38 },
    }
  },
  "West Bengal": {
    districts: {
      "Kolkata": { areas: ["Salt Lake","New Town","Park Street","Howrah","Dum Dum","Behala","Tollygunge","Jadavpur","Gariahat","Ballygunge","Kasba","Bhowanipore"], floodRisk:80,heatRisk:75,aqiRisk:82,strikeRisk:80 },
      "North 24 Parganas": { areas: ["Barasat","Rajarhat","Baguiati","Madhyamgram","Newtown","Sodepur"], floodRisk:78,heatRisk:72,aqiRisk:78,strikeRisk:75 },
    }
  },
  "Rajasthan": {
    districts: {
      "Jaipur": { areas: ["Malviya Nagar","Mansarovar","Vaishali Nagar","C-Scheme","Jagatpura","Tonk Road","Sanganer","Gopalpura"], floodRisk:30,heatRisk:95,aqiRisk:65,strikeRisk:35 },
      "Jodhpur": { areas: ["Ratanada","Sardarpura","Shastri Nagar","Pratap Nagar","Paota"], floodRisk:20,heatRisk:97,aqiRisk:60,strikeRisk:30 },
    }
  },
  "Uttar Pradesh": {
    districts: {
      "Lucknow": { areas: ["Hazratganj","Gomti Nagar","Aliganj","Indira Nagar","Alambagh","Vikas Nagar","Rajajipuram","Chinhat"], floodRisk:65,heatRisk:88,aqiRisk:85,strikeRisk:65 },
      "Noida": { areas: ["Sector 18","Sector 62","Sector 137","Greater Noida","Sector 44","Sector 76","Sector 50"], floodRisk:68,heatRisk:89,aqiRisk:92,strikeRisk:68 },
      "Kanpur": { areas: ["Kakadeo","Civil Lines","Kidwai Nagar","Arya Nagar","Swaroop Nagar","Govind Nagar"], floodRisk:60,heatRisk:90,aqiRisk:88,strikeRisk:60 },
    }
  },
  "Kerala": {
    districts: {
      "Thiruvananthapuram": { areas: ["Kowdiar","Pattom","Vellayambalam","Kazhakkoottam","Technopark","Vanchiyoor","Kesavadasapuram"], floodRisk:72,heatRisk:65,aqiRisk:42,strikeRisk:45 },
      "Ernakulam": { areas: ["MG Road","Kakkanad","Edapally","Thrikkakara","Vyttila","Kaloor","Aluva"], floodRisk:80,heatRisk:68,aqiRisk:45,strikeRisk:50 },
      "Kozhikode": { areas: ["Calicut Beach","Mavoor Road","Nadakkave","Thiruvannur","Pavangad"], floodRisk:75,heatRisk:63,aqiRisk:40,strikeRisk:45 },
    }
  },
  "Punjab": {
    districts: {
      "Ludhiana": { areas: ["Model Town","Sarabha Nagar","BRS Nagar","Civil Lines","Dugri","Pakhowal Road"], floodRisk:50,heatRisk:82,aqiRisk:85,strikeRisk:55 },
      "Amritsar": { areas: ["Ranjit Avenue","Majitha Road","Batala Road","Lawrence Road","Green Avenue"], floodRisk:48,heatRisk:80,aqiRisk:80,strikeRisk:50 },
    }
  },
};

function calcRisk(state, district, area, platform, earnings) {
  const sd = INDIA_LOCATIONS[state]?.districts[district];
  if (!sd) return { score:50, level:"Medium", premiums:{Basic:29,Standard:49,Premium:89}, dominant:"—", bd:{floodRisk:50,heatRisk:50,aqiRisk:50,strikeRisk:50,platformMult:1,earningsMult:1,areaMod:0} };
  const { floodRisk, heatRisk, aqiRisk, strikeRisk } = sd;
  const areaIdx = sd.areas.indexOf(area);
  const areaMod = areaIdx >= 0 ? ((areaIdx % 3) - 1) * 3 : 0;
  const base = Math.round(floodRisk*0.35 + heatRisk*0.25 + aqiRisk*0.25 + strikeRisk*0.15 + areaMod);
  const pMult = {Zomato:1.05,Swiggy:1.05,Zepto:1.1,Blinkit:1.08,Amazon:0.95,Flipkart:0.95,Dunzo:1.1,BigBasket:0.92}[platform]||1.0;
  const eMult = parseInt(earnings)>4000?1.15:parseInt(earnings)>2500?1.0:0.9;
  const score = Math.min(99, Math.max(10, Math.round(base * pMult * eMult)));
  const riskFactor = score / 60;
  return {
    score,
    level: score>=75?"High":score>=50?"Medium":"Low",
    premiums: { Basic:Math.round(29*riskFactor), Standard:Math.round(49*riskFactor), Premium:Math.round(89*riskFactor) },
    dominant: [[floodRisk,"Flooding"],[heatRisk,"Extreme Heat"],[aqiRisk,"Air Pollution"],[strikeRisk,"Curfew/Strike"]].sort((a,b)=>b[0]-a[0])[0][1],
    bd: { floodRisk, heatRisk, aqiRisk, strikeRisk, platformMult:pMult, earningsMult:eMult, areaMod }
  };
}

const MOCK_DB = {
  users: [
    { id:"ADM001",email:"admin@gigshield.in",password:"admin123",role:"admin",name:"Arjun Sharma",phone:"+91 98765 43210" },
    { id:"WRK001",email:"ravi@gmail.com",password:"ravi123",role:"worker",name:"Ravi Kumar",phone:"+91 91234 56789",platform:"Zomato",state:"Karnataka",district:"Bengaluru Urban",area:"Koramangala",pincode:"560034",joinDate:"2024-01-15",weeklyEarnings:3200,activePolicy:"POL-2025-001" },
    { id:"WRK002",email:"priya@gmail.com",password:"priya123",role:"worker",name:"Priya Devi",phone:"+91 93456 78901",platform:"Swiggy",state:"Tamil Nadu",district:"Chennai",area:"T. Nagar",pincode:"600017",joinDate:"2024-03-10",weeklyEarnings:2800,activePolicy:"POL-2025-002" },
  ],
  policies: [
    { id:"POL-2025-001",workerId:"WRK001",plan:"Standard",weeklyPremium:52,coverage:2200,startDate:"2025-06-01",status:"Active",hoursProtected:40,riskScore:78 },
    { id:"POL-2025-002",workerId:"WRK002",plan:"Premium",weeklyPremium:84,coverage:3800,startDate:"2025-06-08",status:"Active",hoursProtected:40,riskScore:68 },
  ],
  claims: [
    { id:"CLM-001",policyId:"POL-2025-001",workerId:"WRK001",type:"Heavy Rain",date:"2025-06-12",hoursLost:6,payout:528,status:"Paid",trigger:"Rainfall >50mm",autoApproved:true },
    { id:"CLM-002",policyId:"POL-2025-002",workerId:"WRK002",type:"Extreme Heat",date:"2025-06-14",hoursLost:4,payout:340,status:"Processing",trigger:"Temp >42°C",autoApproved:false },
    { id:"CLM-003",policyId:"POL-2025-001",workerId:"WRK001",type:"Air Pollution",date:"2025-06-18",hoursLost:8,payout:704,status:"Paid",trigger:"AQI >300",autoApproved:true },
  ],
  weatherAlerts: [
    { id:1,district:"Bengaluru Urban",area:"Koramangala",state:"Karnataka",type:"Heavy Rain",severity:"High",value:"62mm",threshold:"50mm",date:new Date().toLocaleDateString(),triggered:true },
    { id:2,district:"Chennai",area:"T. Nagar",state:"Tamil Nadu",type:"Extreme Heat",severity:"Medium",value:"39°C",threshold:"42°C",date:new Date().toLocaleDateString(),triggered:false },
    { id:3,district:"Mumbai City",area:"Andheri",state:"Maharashtra",type:"Air Pollution",severity:"High",value:"AQI 318",threshold:"AQI 300",date:new Date().toLocaleDateString(),triggered:true },
    { id:4,district:"New Delhi",area:"Connaught Place",state:"Delhi",type:"Curfew/Strike",severity:"Critical",value:"Active",threshold:"Any",date:new Date().toLocaleDateString(),triggered:true },
    { id:5,district:"Hyderabad",area:"Banjara Hills",state:"Telangana",type:"Extreme Heat",severity:"High",value:"44°C",threshold:"42°C",date:new Date().toLocaleDateString(),triggered:true },
  ],
  platforms:["Zomato","Swiggy","Zepto","Blinkit","Amazon","Flipkart","Dunzo","BigBasket"],
  analytics:{totalWorkers:14820,activePolicies:11240,totalClaimsPaid:2340000,avgWeeklyPremium:64,claimApprovalRate:91.2,fraudCasesBlocked:47,weeklyNewPolicies:[820,940,1100,980,1240,1380,1520],claimsByType:{"Heavy Rain":42,"Extreme Heat":28,"Air Pollution":18,"Curfew/Strike":12}}
};

const th = { bg:"#080C18",card:"#0F1729",card2:"#162035",accent:"#3B82F6",green:"#10B981",amber:"#F59E0B",red:"#EF4444",purple:"#8B5CF6",text:"#F1F5F9",muted:"#64748B",border:"rgba(255,255,255,0.07)" };

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${th.bg};color:${th.text};font-family:'Plus Jakarta Sans',sans-serif;min-height:100vh;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:2px;}
input,select,textarea{background:#12213a;border:1px solid rgba(255,255,255,0.1);color:${th.text};border-radius:10px;padding:10px 14px;font-family:inherit;font-size:14px;width:100%;outline:none;transition:all 0.2s;}
input:focus,select:focus,textarea:focus{border-color:${th.accent};box-shadow:0 0 0 3px rgba(59,130,246,0.12);}
input::placeholder{color:#334155;}select option{background:#12213a;}
button{cursor:pointer;font-family:inherit;transition:all 0.18s;}
.pulse{animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
@keyframes sIn{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
@keyframes fIn{from{opacity:0;}to{opacity:1;}}
.sIn{animation:sIn 0.36s ease forwards;}.fIn{animation:fIn 0.24s ease forwards;}
.card{background:${th.card};border:1px solid ${th.border};border-radius:16px;padding:20px;}
.card2{background:${th.card2};border:1px solid ${th.border};border-radius:12px;padding:14px;}
.bs{background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.25);}
.bw{background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.25);}
.bd{background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.25);}
.bi{background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);}
.bp{background:rgba(139,92,246,0.12);color:#a78bfa;border:1px solid rgba(139,92,246,0.25);}
.nav-h:hover{background:rgba(59,130,246,0.08);}
.bp-btn{background:linear-gradient(135deg,#3B82F6,#2563EB);color:#fff;border:none;border-radius:10px;padding:11px 20px;font-size:14px;font-weight:600;}
.bp-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(59,130,246,0.35);}
.bp-btn:disabled{opacity:0.6;transform:none;box-shadow:none;}
.bs-btn{background:rgba(255,255,255,0.05);color:${th.text};border:1px solid ${th.border};border-radius:10px;padding:10px 18px;font-size:14px;font-weight:500;}
.bs-btn:hover{background:rgba(255,255,255,0.09);}
.bg-btn{background:linear-gradient(135deg,#10B981,#059669);color:#fff;border:none;border-radius:10px;padding:11px 20px;font-size:14px;font-weight:600;}
.bg-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(16,185,129,0.35);}
.tr:hover{background:rgba(255,255,255,0.025);}
.prog{height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;}
.prog-f{height:100%;border-radius:3px;transition:width 1.2s ease;}
.loc-tag{display:inline-flex;align-items:center;gap:5px;background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:20px;padding:3px 10px;font-size:12px;color:#60a5fa;}
`;

// Helpers
const Bdg = ({c="bi",children,s={}}) => <span className={c} style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,display:"inline-block",...s}}>{children}</span>;
const Lbl = ({children}) => <label style={{fontSize:13,color:th.muted,display:"block",marginBottom:6,fontWeight:500}}>{children}</label>;
const Bar = ({v,max=100,color}) => <div className="prog"><div className="prog-f" style={{width:`${Math.min(100,Math.round(v/max*100))}%`,background:color}}/></div>;
const SH = ({title,sub}) => <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:800}}>{title}</h2>{sub&&<p style={{color:th.muted,fontSize:13,marginTop:5}}>{sub}</p>}</div>;
const SC = ({icon,label,value,sub,color=th.accent}) => (
  <div style={{background:`linear-gradient(135deg,${th.card2},${th.card})`,border:`1px solid ${th.border}`,borderRadius:14,padding:18,position:"relative",overflow:"hidden"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <p style={{color:th.muted,fontSize:12,marginBottom:5,fontWeight:500}}>{label}</p>
        <p style={{fontSize:24,fontWeight:800}}>{value}</p>
        {sub&&<p style={{color:th.muted,fontSize:12,marginTop:4}}>{sub}</p>}
      </div>
      <div style={{background:`${color}18`,borderRadius:10,padding:9,fontSize:20}}>{icon}</div>
    </div>
  </div>
);
function RiskGauge({score,size=88}) {
  const r=34,cx=size/2,cy=size/2,circ=2*Math.PI*r,da=circ*0.75,dOff=da*(1-score/100);
  const color=score>=75?"#EF4444":score>=50?"#F59E0B":"#10B981";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={7} strokeDasharray={`${da} ${circ}`} transform={`rotate(-135 ${cx} ${cy})`} strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={7} strokeDasharray={`${da} ${circ}`} strokeDashoffset={dOff} transform={`rotate(-135 ${cx} ${cy})`} strokeLinecap="round" style={{transition:"stroke-dashoffset 1.2s ease"}}/>
      <text x={cx} y={cy+2} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize="16" fontWeight="800" fontFamily="Plus Jakarta Sans">{score}</text>
      <text x={cx} y={cy+15} textAnchor="middle" dominantBaseline="middle" fill="#64748B" fontSize="9" fontFamily="Plus Jakarta Sans">RISK</text>
    </svg>
  );
}

// ─── LOCATION SELECTOR ───────────────────────────────────────────────────────
function LocSelect({form,setForm}) {
  const states = Object.keys(INDIA_LOCATIONS);
  const districts = form.state ? Object.keys(INDIA_LOCATIONS[form.state]?.districts||{}) : [];
  const areas = form.state&&form.district ? (INDIA_LOCATIONS[form.state]?.districts[form.district]?.areas||[]) : [];
  return (
    <div style={{display:"grid",gap:12}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        <div>
          <Lbl>State</Lbl>
          <select value={form.state||""} onChange={e=>setForm(f=>({...f,state:e.target.value,district:"",area:""}))}>
            <option value="">— Select State —</option>
            {states.map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <Lbl>District / City</Lbl>
          <select value={form.district||""} onChange={e=>setForm(f=>({...f,district:e.target.value,area:""}))} disabled={!form.state}>
            <option value="">— Select District —</option>
            {districts.map(d=><option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <Lbl>Locality / Area</Lbl>
          <select value={form.area||""} onChange={e=>setForm(f=>({...f,area:e.target.value}))} disabled={!form.district}>
            <option value="">— Select Area —</option>
            {areas.map(a=><option key={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div style={{maxWidth:160}}>
        <Lbl>PIN Code</Lbl>
        <input placeholder="e.g. 560034" value={form.pincode||""} onChange={e=>setForm(f=>({...f,pincode:e.target.value}))}/>
      </div>
    </div>
  );
}

// ─── LIVE RISK CARD ──────────────────────────────────────────────────────────
function RiskCard({form}) {
  const ok = form.state&&form.district&&form.area;
  if(!ok) return (
    <div style={{background:"rgba(59,130,246,0.05)",border:"1px solid rgba(59,130,246,0.15)",borderRadius:12,padding:16,textAlign:"center"}}>
      <p style={{color:th.muted,fontSize:13}}>📍 Select State → District → Area to see your personalised risk score and weekly premium</p>
    </div>
  );
  const r = calcRisk(form.state,form.district,form.area,form.platform||"Zomato",form.weeklyEarnings||2500);
  const bd = r.bd;
  return (
    <div style={{background:"rgba(59,130,246,0.05)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:14,padding:16}} className="fIn">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <div>
          <p style={{fontWeight:700,fontSize:14}}>AI Risk Assessment</p>
          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
            <span className="loc-tag">📍 {form.area}</span>
            <span className="loc-tag">🏙️ {form.district}</span>
            <span className="loc-tag">🗺️ {form.state}</span>
          </div>
        </div>
        <RiskGauge score={r.score}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        {[["🌊 Flood",bd.floodRisk,th.accent],["☀️ Heat",bd.heatRisk,th.amber],["😷 AQI",bd.aqiRisk,th.purple],["🚫 Strike",bd.strikeRisk,th.red]].map(([l,v,c])=>(
          <div key={l} style={{background:"rgba(255,255,255,0.03)",borderRadius:8,padding:9}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:th.muted}}>{l}</span><span style={{fontWeight:700,color:c}}>{v}</span></div>
            <Bar v={v} color={c}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",borderTop:`1px solid ${th.border}`,paddingTop:10}}>
        <div><p style={{fontSize:11,color:th.muted}}>Primary risk</p><p style={{fontWeight:700,color:th.amber,fontSize:13}}>{r.dominant}</p></div>
        <div style={{textAlign:"right"}}><p style={{fontSize:11,color:th.muted}}>Suggested premium</p><p style={{fontWeight:800,fontSize:17,color:th.green}}>₹{r.premiums.Standard}/wk</p></div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({onLogin}) {
  const [tab,setTab]=useState("login");
  const [step,setStep]=useState(1);
  const [form,setForm]=useState({email:"",password:"",name:"",phone:"",platform:"Zomato",state:"",district:"",area:"",pincode:"",weeklyEarnings:"2500"});
  const [err,setErr]=useState("");
  const [ld,setLd]=useState(false);

  const doLogin=()=>{
    setLd(true);setErr("");
    setTimeout(()=>{
      const u=MOCK_DB.users.find(u=>u.email===form.email&&u.password===form.password);
      if(u)onLogin(u);else{setErr("Invalid credentials. Try ravi@gmail.com/ravi123 or admin@gigshield.in/admin123");setLd(false);}
    },900);
  };

  const doReg=()=>{
    if(step<4){setStep(step+1);return;}
    setLd(true);
    setTimeout(()=>onLogin({...form,id:`WRK${Date.now()}`,role:"worker",joinDate:new Date().toISOString().split("T")[0],activePolicy:null}),1400);
  };

  const r=calcRisk(form.state,form.district,form.area,form.platform,form.weeklyEarnings);
  const steps=["Account","Work","Location","Confirm"];

  return (
    <div style={{minHeight:"100vh",background:th.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px"}}>
      <style>{CSS}</style>
      <div style={{textAlign:"center",marginBottom:26}} className="sIn">
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:46,height:46,borderRadius:13,background:"linear-gradient(135deg,#3B82F6,#1d4ed8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 0 28px rgba(59,130,246,0.4)"}}>🛡️</div>
          <span style={{fontSize:30,fontWeight:800,background:"linear-gradient(90deg,#3B82F6,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GigShield</span>
        </div>
        <p style={{color:th.muted,fontSize:14}}>Parametric income protection for India's gig workers</p>
        <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:10,flexWrap:"wrap"}}>
          {["🍕 Zomato","🛵 Swiggy","⚡ Zepto","📦 Amazon","🛒 Blinkit"].map(p=>(
            <span key={p} style={{fontSize:11,background:"rgba(255,255,255,0.05)",padding:"3px 10px",borderRadius:20,color:th.muted}}>{p}</span>
          ))}
        </div>
      </div>

      <div className="card sIn" style={{width:"100%",maxWidth:tab==="register"&&step===3?600:460,boxShadow:"0 0 40px rgba(59,130,246,0.1)",animationDelay:"0.1s"}}>
        <div style={{display:"flex",background:"rgba(255,255,255,0.04)",borderRadius:10,padding:4,marginBottom:22}}>
          {["login","register"].map(tb=>(
            <button key={tb} onClick={()=>{setTab(tb);setStep(1);setErr("");}} style={{flex:1,padding:"9px 0",borderRadius:8,border:"none",background:tab===tb?"linear-gradient(135deg,#3B82F6,#2563EB)":"transparent",color:tab===tb?"#fff":th.muted,fontWeight:600,fontSize:14}}>
              {tb==="login"?"Sign In":"Register"}
            </button>
          ))}
        </div>

        {tab==="login"?(
          <div className="fIn">
            <div style={{marginBottom:14}}><Lbl>Email Address</Lbl><input type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
            <div style={{marginBottom:16}}><Lbl>Password</Lbl><input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==="Enter"&&doLogin()}/></div>
            {err&&<div style={{background:"rgba(239,68,68,0.09)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#f87171",marginBottom:14}}>{err}</div>}
            <button className="bp-btn" style={{width:"100%",padding:"13px 0",fontSize:15}} onClick={doLogin} disabled={ld}>{ld?"Signing in…":"Sign In →"}</button>
            <div style={{marginTop:14,padding:"12px 14px",background:"rgba(59,130,246,0.07)",borderRadius:10,fontSize:12,color:th.muted}}>
              <strong style={{color:th.accent}}>Demo:</strong> ravi@gmail.com / ravi123 &nbsp;|&nbsp; admin@gigshield.in / admin123
            </div>
          </div>
        ):(
          <div className="fIn">
            {/* step bar */}
            <div style={{display:"flex",gap:6,marginBottom:18,alignItems:"center"}}>
              {steps.map((sl,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,flex:1}}>
                  <div style={{width:26,height:26,borderRadius:"50%",background:step>i+1?"#10B981":step===i+1?"linear-gradient(135deg,#3B82F6,#2563EB)":"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:step>=i+1?"#fff":th.muted,flexShrink:0}}>
                    {step>i+1?"✓":i+1}
                  </div>
                  {i<3&&<div style={{height:2,flex:1,background:step>i+1?"#10B981":"rgba(255,255,255,0.07)",borderRadius:1}}/>}
                </div>
              ))}
            </div>
            <p style={{fontSize:11,color:th.muted,marginBottom:14,fontWeight:600,letterSpacing:"0.05em"}}>STEP {step} — {steps[step-1].toUpperCase()}</p>

            {step===1&&<div style={{display:"grid",gap:12}}>
              <div><Lbl>Full Name</Lbl><input placeholder="e.g. Ravi Kumar" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <div><Lbl>Mobile Number</Lbl><input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
                <div><Lbl>Email Address</Lbl><input type="email" placeholder="you@gmail.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
              </div>
              <div><Lbl>Create Password</Lbl><input type="password" placeholder="Min. 8 characters" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>
            </div>}

            {step===2&&<div style={{display:"grid",gap:12}}>
              <div><Lbl>Delivery Platform</Lbl>
                <select value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})}>
                  {MOCK_DB.platforms.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div><Lbl>Average Weekly Earnings (₹)</Lbl><input type="number" placeholder="2500" value={form.weeklyEarnings} onChange={e=>setForm({...form,weeklyEarnings:e.target.value})}/></div>
              <div style={{padding:"12px 14px",background:"rgba(16,185,129,0.07)",borderRadius:10,fontSize:13,color:"#34d399",border:"1px solid rgba(16,185,129,0.2)"}}>
                💡 Higher weekly earnings = higher coverage limits available for your plan.
              </div>
            </div>}

            {step===3&&<div>
              <p style={{fontSize:13,color:th.muted,marginBottom:14}}>📍 Your state → district → area drives your hyper-local risk score for weather, AQI, and civic events.</p>
              <LocSelect form={form} setForm={setForm}/>
              <div style={{marginTop:14}}><RiskCard form={form}/></div>
            </div>}

            {step===4&&<div>
              <div style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:14,marginBottom:14}}>
                {[["Name",form.name],["Phone",form.phone],["Platform",form.platform],["Weekly Earnings","₹"+form.weeklyEarnings],["State",form.state||"—"],["District",form.district||"—"],["Area",form.area||"—"],["PIN Code",form.pincode||"—"]].map(([k,v])=>(
                  <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${th.border}`,fontSize:14}}>
                    <span style={{color:th.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
                  </div>
                ))}
              </div>
              {form.state&&form.district&&form.area&&(
                <div style={{background:"rgba(59,130,246,0.07)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:12,padding:14,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><p style={{color:th.muted,fontSize:12}}>AI Risk Score — {form.area}</p><p style={{fontWeight:800,fontSize:17,color:r.score>=75?th.red:r.score>=50?th.amber:th.green}}>{r.score}/100 · {r.level} Risk</p></div>
                  <div style={{textAlign:"right"}}><p style={{color:th.muted,fontSize:12}}>Suggested premium</p><p style={{fontWeight:800,fontSize:17,color:th.green}}>₹{r.premiums.Standard}/wk</p></div>
                </div>
              )}
              <p style={{fontSize:12,color:th.muted,marginTop:10}}>✅ Income loss only &nbsp;·&nbsp; ✅ IRDAI compliant &nbsp;·&nbsp; ✅ India only</p>
            </div>}

            <div style={{display:"flex",gap:10,marginTop:18}}>
              {step>1&&<button className="bs-btn" style={{flexBasis:90}} onClick={()=>setStep(step-1)}>← Back</button>}
              <button className="bp-btn" style={{flex:1,padding:"13px 0"}} onClick={doReg} disabled={ld}>
                {ld?"Creating…":step<4?"Continue →":"🚀 Create Account"}
              </button>
            </div>
          </div>
        )}
      </div>
      <p style={{color:th.muted,fontSize:12,marginTop:16,textAlign:"center",opacity:0.65}}>🇮🇳 GigShield Insurance Pvt. Ltd. · IRDAI · Income protection only</p>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({items,active,setActive,user,onLogout,role}) {
  return (
    <div style={{width:215,background:th.card,borderRight:`1px solid ${th.border}`,display:"flex",flexDirection:"column",padding:"18px 10px",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:role==="admin"?2:26,paddingLeft:8}}>
        <span style={{fontSize:20}}>🛡️</span>
        <span style={{fontSize:17,fontWeight:800,background:"linear-gradient(90deg,#3B82F6,#34d399)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>GigShield</span>
      </div>
      {role==="admin"&&<p style={{fontSize:10,color:th.muted,marginBottom:18,paddingLeft:8,fontWeight:600,letterSpacing:"0.06em"}}>ADMIN CONSOLE</p>}
      {items.map(n=>(
        <button key={n.id} className="nav-h" onClick={()=>setActive(n.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,border:"none",background:active===n.id?"rgba(59,130,246,0.15)":"transparent",color:active===n.id?th.accent:th.muted,fontWeight:active===n.id?600:400,fontSize:14,width:"100%",textAlign:"left",marginBottom:3,borderLeft:active===n.id?`3px solid ${th.accent}`:"3px solid transparent"}}>
          <span style={{fontSize:15}}>{n.icon}</span>{n.label}
          {n.badge&&<span style={{marginLeft:"auto",background:"rgba(239,68,68,0.2)",color:"#f87171",fontSize:11,fontWeight:700,padding:"1px 7px",borderRadius:10}}>{n.badge}</span>}
        </button>
      ))}
      <div style={{marginTop:"auto"}}>
        <div style={{padding:"11px 12px",borderRadius:10,background:"rgba(255,255,255,0.03)",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,flexShrink:0}}>{user.name?.[0]}</div>
            <div style={{overflow:"hidden"}}>
              <p style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{user.name}</p>
              <p style={{fontSize:11,color:th.muted}}>{role==="admin"?"Administrator":user.platform}</p>
            </div>
          </div>
        </div>
        <button className="bs-btn" style={{width:"100%",padding:"8px 0",fontSize:13}} onClick={onLogout}>Sign Out</button>
      </div>
    </div>
  );
}

// ─── WORKER PAGES ─────────────────────────────────────────────────────────────
function WHome({user,policy,claims,setTab}) {
  const risk=calcRisk(user.state,user.district,user.area,user.platform,user.weeklyEarnings);
  const paid=claims.filter(c=>c.status==="Paid").reduce((a,c)=>a+c.payout,0);
  return (
    <div className="sIn">
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:24,fontWeight:800}}>Hello, {user.name?.split(" ")[0]} 👋</h1>
        <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
          {user.area&&<span className="loc-tag">📍 {user.area}</span>}
          {user.district&&<span className="loc-tag">🏙️ {user.district}</span>}
          {user.state&&<span className="loc-tag">🗺️ {user.state}</span>}
          {user.platform&&<span className="loc-tag">🛵 {user.platform}</span>}
        </div>
      </div>
      {policy?(
        <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:16,padding:20,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 0 28px rgba(16,185,129,0.1)"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#34d399"}}/>
              <span style={{color:"#34d399",fontSize:12,fontWeight:700}}>ACTIVE POLICY</span>
            </div>
            <p style={{fontSize:19,fontWeight:800}}>{policy.plan} — <span style={{color:"#34d399"}}>₹{policy.weeklyPremium}/wk</span></p>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13,marginTop:4}}>Coverage ₹{policy.coverage.toLocaleString()} · Risk {policy.riskScore}/100</p>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>Policy ID</p>
            <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13}}>{policy.id}</p>
          </div>
        </div>
      ):(
        <div style={{background:"rgba(59,130,246,0.07)",border:"1px solid rgba(59,130,246,0.25)",borderRadius:16,padding:20,marginBottom:20,textAlign:"center"}}>
          <p style={{fontWeight:700,fontSize:16}}>No active policy</p>
          <p style={{color:th.muted,fontSize:13,margin:"8px 0 14px"}}>For {user.area||"your area"}: est. premium <strong style={{color:th.green}}>₹{risk.premiums.Standard}/wk</strong></p>
          <button className="bp-btn" onClick={()=>setTab("policy")}>Get Coverage →</button>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:22}}>
        <SC icon="💰" label="Total Payouts" value={`₹${paid.toLocaleString()}`} sub="Income protected" color={th.green}/>
        <SC icon="📊" label="Risk Score" value={`${risk.score}/100`} sub={risk.level+" · "+risk.dominant} color={risk.score>=75?th.red:risk.score>=50?th.amber:th.green}/>
        <SC icon="📄" label="Pending Claims" value={claims.filter(c=>c.status==="Processing").length} sub="In processing" color={th.amber}/>
        <SC icon="💸" label="Weekly Premium" value={policy?`₹${policy.weeklyPremium}`:"—"} sub="Current plan" color={th.purple}/>
      </div>
      <div className="card">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontWeight:700}}>Recent Claims</h3>
          <button style={{background:"none",border:"none",color:th.accent,fontSize:13,fontWeight:600}} onClick={()=>setTab("claims")}>All →</button>
        </div>
        {claims.length===0?<p style={{color:th.muted,fontSize:14}}>No claims yet</p>:claims.map(c=>(
          <div key={c.id} className="tr" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${th.border}`}}>
            <div><p style={{fontWeight:600,fontSize:14}}>{c.type}</p><p style={{color:th.muted,fontSize:12}}>{c.date} · {c.hoursLost}h · {c.trigger}</p></div>
            <div style={{textAlign:"right"}}>
              <p style={{fontWeight:800,color:"#34d399"}}>₹{c.payout}</p>
              <Bdg c={c.status==="Paid"?"bs":c.status==="Approved"?"bi":"bw"}>{c.status}</Bdg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WRisk({user}) {
  const [f,setF]=useState({state:user.state||"",district:user.district||"",area:user.area||"",platform:user.platform||"Zomato",weeklyEarnings:user.weeklyEarnings||2500,pincode:user.pincode||""});
  const r=calcRisk(f.state,f.district,f.area,f.platform,f.weeklyEarnings);
  const bd=r.bd;
  return (
    <div className="sIn">
      <SH title="My Risk Profile" sub="Hyper-local AI risk assessment — state → district → area granularity"/>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20}}>
        <div>
          <div className="card" style={{marginBottom:16}}>
            <h3 style={{fontWeight:700,marginBottom:14}}>Update My Location</h3>
            <LocSelect form={f} setForm={setF}/>
            <div style={{marginTop:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><Lbl>Platform</Lbl>
                <select value={f.platform} onChange={e=>setF({...f,platform:e.target.value})}>
                  {MOCK_DB.platforms.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div><Lbl>Weekly Earnings (₹)</Lbl><input type="number" value={f.weeklyEarnings} onChange={e=>setF({...f,weeklyEarnings:e.target.value})}/></div>
            </div>
          </div>
          <div className="card">
            <h3 style={{fontWeight:700,marginBottom:14}}>Risk Breakdown — {f.district||"Select District"}</h3>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[["🌊 Flood / Rain",bd.floodRisk,th.accent,"Probability of flood/rainfall disruption"],["☀️ Extreme Heat",bd.heatRisk,th.amber,"Heatwave risk for outdoor workers"],["😷 Air Pollution",bd.aqiRisk,th.purple,"AQI spike likelihood by zone"],["🚫 Curfew/Strike",bd.strikeRisk,th.red,"Civil disruption history in district"]].map(([l,v,c,d])=>(
                <div key={l} style={{background:"rgba(255,255,255,0.025)",borderRadius:10,padding:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:13,fontWeight:600}}>{l}</span>
                    <span style={{fontWeight:800,color:c}}>{v}</span>
                  </div>
                  <Bar v={v} color={c}/>
                  <p style={{fontSize:11,color:th.muted,marginTop:6}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="card" style={{marginBottom:16,textAlign:"center"}}>
            <p style={{fontWeight:700,marginBottom:8}}>Composite Risk Score</p>
            <RiskGauge score={r.score} size={120}/>
            <p style={{marginTop:8,fontWeight:800,fontSize:17,color:r.score>=75?th.red:r.score>=50?th.amber:th.green}}>{r.level} Risk</p>
            {f.area&&<div style={{display:"flex",gap:5,justifyContent:"center",marginTop:8,flexWrap:"wrap"}}><span className="loc-tag">📍 {f.area}</span></div>}
            <p style={{color:th.muted,fontSize:13,marginTop:6}}>Top risk: <strong style={{color:th.amber}}>{r.dominant}</strong></p>
          </div>
          <div className="card">
            <h3 style={{fontWeight:700,marginBottom:12}}>AI Premium Breakdown</h3>
            {[["Composite risk",bd.compositeRisk||"—"],["Platform ("+f.platform+")","×"+bd.platformMult],["Earnings factor","×"+bd.earningsMult],["Area adjustment",(bd.areaMod>=0?"+":"")+bd.areaMod]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${th.border}`,fontSize:13}}>
                <span style={{color:th.muted}}>{k}</span><span style={{fontWeight:600,color:th.accent}}>{v}</span>
              </div>
            ))}
            {r.premiums&&(
              <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                {[["Basic",r.premiums.Basic,"#64748b"],["Standard",r.premiums.Standard,th.accent],["Premium",r.premiums.Premium,th.purple]].map(([n,p,c])=>(
                  <div key={n} style={{background:`${c}12`,border:`1px solid ${c}30`,borderRadius:9,padding:10,textAlign:"center"}}>
                    <p style={{fontSize:11,color:th.muted}}>{n}</p>
                    <p style={{fontSize:17,fontWeight:800,color:c}}>₹{p}</p>
                    <p style={{fontSize:10,color:th.muted}}>/wk</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WPolicy({user,policy}) {
  const [sel,setSel]=useState("Standard");
  const [buying,setBuying]=useState(false);
  const [done,setDone]=useState(false);
  const risk=calcRisk(user.state,user.district,user.area,user.platform,user.weeklyEarnings);
  const plans=[
    {name:"Basic",coverage:1000,hours:20,desc:"Part-time protection",color:"#64748b"},
    {name:"Standard",coverage:2000,hours:40,desc:"Full-time worker",color:th.accent,popular:true},
    {name:"Premium",coverage:4000,hours:50,desc:"Maximum coverage",color:th.purple},
  ];
  return (
    <div className="sIn">
      <SH title="Insurance Policy" sub="Location-adjusted weekly income protection"/>
      {user.area&&(
        <div style={{background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.15)",borderRadius:12,padding:14,marginBottom:18,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <p style={{fontSize:12,color:th.muted}}>Premium calculated for your location</p>
            <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap"}}>
              <span className="loc-tag">📍 {user.area}</span>
              <span className="loc-tag">🏙️ {user.district}</span>
              <span className="loc-tag">🗺️ {user.state}</span>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <p style={{fontSize:12,color:th.muted}}>Risk</p>
            <p style={{fontSize:19,fontWeight:800,color:risk.score>=75?th.red:risk.score>=50?th.amber:th.green}}>{risk.score}/100</p>
          </div>
        </div>
      )}
      {!policy&&!done?(
        <>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:14,marginBottom:18}}>
            {plans.map(p=>(
              <div key={p.name} onClick={()=>setSel(p.name)} style={{background:sel===p.name?`${p.color}14`:"rgba(255,255,255,0.025)",border:`2px solid ${sel===p.name?p.color:th.border}`,borderRadius:14,padding:20,cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
                {p.popular&&<div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",background:p.color,color:"#fff",fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:20,whiteSpace:"nowrap"}}>POPULAR</div>}
                <p style={{fontSize:21,fontWeight:800,color:p.color}}>₹{risk.premiums[p.name]}<span style={{fontSize:12,fontWeight:400,color:th.muted}}>/wk</span></p>
                <p style={{fontSize:15,fontWeight:700,margin:"6px 0 4px"}}>{p.name}</p>
                <p style={{fontSize:12,color:th.muted,marginBottom:10}}>{p.desc}</p>
                {["Coverage ₹"+p.coverage.toLocaleString()+"/wk","Hours "+p.hours+"h","Auto-claim","Zero paperwork"].map(f=>(
                  <p key={f} style={{fontSize:12,color:th.muted,marginBottom:3}}>✅ {f}</p>
                ))}
              </div>
            ))}
          </div>
          <button className="bg-btn" style={{padding:"13px 28px",fontSize:15}} onClick={()=>{setBuying(true);setTimeout(()=>{setBuying(false);setDone(true)},1600)}}>
            {buying?"Processing…":`Activate ${sel} — ₹${risk.premiums[sel]}/week →`}
          </button>
        </>
      ):done?(
        <div style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:16,padding:28,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:12}}>🎉</div>
          <h2 style={{fontWeight:800,color:"#34d399"}}>Policy Activated!</h2>
          <p style={{color:th.muted,marginTop:8}}>{sel} plan active for {user.area||"your area"}.</p>
          <p style={{marginTop:12,fontFamily:"'JetBrains Mono',monospace",color:th.accent}}>POL-{Date.now().toString().slice(-6)}</p>
        </div>
      ):(
        <div style={{background:"linear-gradient(135deg,#064e3b,#065f46)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:16,padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <h3 style={{fontWeight:700,color:"#34d399"}}>Active: {policy.plan} Plan</h3>
            <Bdg c="bs">Active</Bdg>
          </div>
          {[["Policy ID",policy.id],["Weekly Premium","₹"+policy.weeklyPremium],["Coverage","₹"+policy.coverage.toLocaleString()+"/week"],["Hours",policy.hoursProtected+"h"],["Start",policy.startDate],["Risk",policy.riskScore+"/100"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.08)",fontSize:14}}>
              <span style={{color:"rgba(255,255,255,0.55)"}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WClaims({user,claims,policy}) {
  const [filing,setFiling]=useState(false);
  const [cf,setCf]=useState({type:"Heavy Rain",date:new Date().toISOString().split("T")[0],hoursLost:"4",desc:""});
  const [submitted,setSubmitted]=useState(false);
  const [proc,setProc]=useState(false);
  const hourly=policy?Math.round(policy.coverage/policy.hoursProtected):80;
  const est=Math.round(parseInt(cf.hoursLost||0)*hourly);
  const disrTypes=["Heavy Rain","Extreme Heat","Air Pollution (AQI)","Curfew/Section 144","Local Strike","Flooding","Dense Fog","Cyclone Warning"];
  return (
    <div className="sIn">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
        <SH title="My Claims" sub="File and track income protection claims"/>
        {policy&&<button className="bp-btn" onClick={()=>setFiling(!filing)}>+ New Claim</button>}
      </div>
      {submitted&&<div style={{background:"rgba(16,185,129,0.09)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:12,padding:14,marginBottom:16,display:"flex",gap:10}}>
        <span>✅</span><div><p style={{fontWeight:600,color:"#34d399"}}>Claim submitted</p><p style={{fontSize:13,color:th.muted}}>AI verification against {user.district} weather data. Payout within 2 min if trigger valid.</p></div>
      </div>}
      {filing&&(
        <div className="card" style={{marginBottom:20}}>
          <h3 style={{fontWeight:700,marginBottom:14}}>File New Claim</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div><Lbl>Disruption Type</Lbl><select value={cf.type} onChange={e=>setCf({...cf,type:e.target.value})}>{disrTypes.map(d=><option key={d}>{d}</option>)}</select></div>
            <div><Lbl>Date</Lbl><input type="date" value={cf.date} onChange={e=>setCf({...cf,date:e.target.value})}/></div>
            <div><Lbl>Hours Lost</Lbl><select value={cf.hoursLost} onChange={e=>setCf({...cf,hoursLost:e.target.value})}>{[1,2,3,4,5,6,7,8].map(h=><option key={h}>{h}</option>)}</select></div>
            <div style={{background:"rgba(59,130,246,0.07)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:10,padding:12}}>
              <p style={{fontSize:12,color:th.muted}}>Estimated Payout</p>
              <p style={{fontSize:22,fontWeight:800,color:th.accent}}>₹{est}</p>
              <p style={{fontSize:11,color:th.muted}}>{cf.hoursLost}h × ₹{hourly}/hr</p>
            </div>
            <div style={{gridColumn:"1/-1"}}><Lbl>Notes (optional)</Lbl><textarea rows={2} value={cf.desc} onChange={e=>setCf({...cf,desc:e.target.value})} style={{resize:"none"}} placeholder="Brief description…"/></div>
          </div>
          <div style={{marginTop:12,padding:10,background:"rgba(245,158,11,0.07)",borderRadius:9,fontSize:12,color:"#fbbf24"}}>⚠️ Claims verified against IMD data for {user.area}, {user.district}.</div>
          <div style={{display:"flex",gap:10,marginTop:12}}>
            <button className="bs-btn" onClick={()=>setFiling(false)}>Cancel</button>
            <button className="bg-btn" style={{flex:1}} onClick={()=>{setProc(true);setTimeout(()=>{setProc(false);setSubmitted(true);setFiling(false)},2000)}} disabled={proc}>{proc?"🔄 Verifying…":"Submit Claim →"}</button>
          </div>
        </div>
      )}
      <div className="card">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`1px solid ${th.border}`}}>
            {["Claim ID","Type","Date","Hours","Payout","Status","Method"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"8px 10px",color:th.muted,fontSize:12,fontWeight:600}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {claims.map(c=>(
              <tr key={c.id} className="tr" style={{borderBottom:`1px solid ${th.border}`}}>
                <td style={{padding:"11px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{c.id}</td>
                <td style={{padding:"11px 10px"}}>{c.type}</td>
                <td style={{padding:"11px 10px",color:th.muted}}>{c.date}</td>
                <td style={{padding:"11px 10px"}}>{c.hoursLost}h</td>
                <td style={{padding:"11px 10px",fontWeight:800,color:"#34d399"}}>₹{c.payout}</td>
                <td style={{padding:"11px 10px"}}><Bdg c={c.status==="Paid"?"bs":c.status==="Approved"?"bi":"bw"}>{c.status}</Bdg></td>
                <td style={{padding:"11px 10px"}}><Bdg c={c.autoApproved?"bs":"bw"}>{c.autoApproved?"Auto":"Manual"}</Bdg></td>
              </tr>
            ))}
            {claims.length===0&&<tr><td colSpan={7} style={{padding:24,textAlign:"center",color:th.muted}}>No claims yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WAlerts({user}) {
  const [triggered,setTriggered]=useState(false);
  const [ld,setLd]=useState(false);
  const alerts=MOCK_DB.weatherAlerts.filter(a=>a.state===user.state||a.district===user.district);
  const show=alerts.length>0?alerts:MOCK_DB.weatherAlerts;
  return (
    <div className="sIn">
      <SH title="Disruption Alerts" sub={`Parametric triggers${user.district?" — "+user.district+", "+user.state:""}`}/>
      <div style={{display:"grid",gap:12,marginBottom:20}}>
        {show.map(a=>(
          <div key={a.id} className="card" style={{border:`1px solid ${a.triggered?"rgba(16,185,129,0.3)":th.border}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:40,height:40,borderRadius:10,background:a.triggered?"rgba(16,185,129,0.12)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                  {a.type.includes("Rain")?"🌧️":a.type.includes("Heat")?"🌡️":a.type.includes("Poll")?"😷":"🚫"}
                </div>
                <div>
                  <p style={{fontWeight:700}}>{a.type}</p>
                  <div style={{display:"flex",gap:5,marginTop:4}}>
                    <span className="loc-tag">📍 {a.area}</span>
                    <span className="loc-tag">🏙️ {a.district}</span>
                  </div>
                </div>
              </div>
              <Bdg c={a.triggered?"bs":a.severity==="Critical"?"bd":"bw"}>{a.triggered?"TRIGGERED":a.severity}</Bdg>
            </div>
            <div style={{display:"flex",gap:16,marginTop:10,fontSize:13}}>
              <span style={{color:th.muted}}>Measured: <strong style={{color:th.text}}>{a.value}</strong></span>
              <span style={{color:th.muted}}>Threshold: <strong style={{color:th.text}}>{a.threshold}</strong></span>
              {a.triggered&&<span style={{color:"#34d399"}}>✓ Auto-claim fired</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="card" style={{background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.18)"}}>
        <h3 style={{fontWeight:700,marginBottom:6}}>🧪 Simulate Disruption</h3>
        <p style={{color:th.muted,fontSize:13,marginBottom:12}}>Trigger a mock rainstorm in {user.district||"your district"}</p>
        {triggered?<p style={{color:"#34d399",fontSize:13}}>✅ 68mm rain in {user.district||"district"} → threshold exceeded → claim auto-initiated → AI approved → ₹480 queued</p>
          :<button className="bp-btn" style={{background:"linear-gradient(135deg,#dc2626,#b91c1c)"}} onClick={()=>{setLd(true);setTimeout(()=>{setLd(false);setTriggered(true)},1800)}}>{ld?"Triggering…":"⚡ Simulate Rainstorm"}</button>}
      </div>
    </div>
  );
}

function WProfile({user,setTab}) {
  const risk=calcRisk(user.state,user.district,user.area,user.platform,user.weeklyEarnings);
  return (
    <div className="sIn">
      <SH title="My Profile"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:18,marginBottom:18}}>
        <div className="card" style={{textAlign:"center"}}>
          <div style={{width:66,height:66,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 12px",fontWeight:700}}>{user.name?.[0]}</div>
          <p style={{fontWeight:700,fontSize:16}}>{user.name}</p>
          <p style={{color:th.muted,fontSize:13,marginTop:3}}>{user.platform} Partner</p>
          <Bdg c="bs" s={{marginTop:10}}>Verified</Bdg>
          <div style={{marginTop:14,padding:12,background:"rgba(255,255,255,0.03)",borderRadius:10}}>
            <p style={{fontSize:12,color:th.muted}}>Risk Score</p>
            <p style={{fontSize:22,fontWeight:800,color:risk.score>=75?th.red:risk.score>=50?th.amber:th.green}}>{risk.score}/100</p>
            <p style={{fontSize:12,color:th.muted}}>{risk.level} Risk</p>
          </div>
        </div>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:14}}>Account Details</h3>
          {[["Full Name",user.name],["Email",user.email],["Phone",user.phone||"—"],["Platform",user.platform],["Weekly Earnings","₹"+(user.weeklyEarnings||"—")],["Member Since",user.joinDate||"—"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${th.border}`,fontSize:14}}>
              <span style={{color:th.muted}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:14}}>Location Details</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:14}}>
          {[["🗺️ State",user.state||"—"],["🏙️ District",user.district||"—"],["📍 Area",user.area||"—"],["📮 PIN",user.pincode||"—"]].map(([k,v])=>(
            <div key={k} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:12}}>
              <p style={{fontSize:11,color:th.muted}}>{k}</p><p style={{fontWeight:700,fontSize:14,marginTop:4}}>{v}</p>
            </div>
          ))}
        </div>
        {user.area&&user.district&&(
          <div style={{padding:14,background:"rgba(59,130,246,0.05)",borderRadius:10}}>
            <p style={{fontWeight:600,marginBottom:10,fontSize:13}}>Location Risk Factors — {user.area}</p>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
              {[["Flood/Rain",risk.bd.floodRisk,th.accent],["Heat",risk.bd.heatRisk,th.amber],["AQI",risk.bd.aqiRisk,th.purple],["Strike",risk.bd.strikeRisk,th.red]].map(([l,v,c])=>(
                <div key={l}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}><span style={{color:th.muted}}>{l}</span><span style={{color:c,fontWeight:700}}>{v}%</span></div><Bar v={v} color={c}/></div>
              ))}
            </div>
          </div>
        )}
        <button className="bs-btn" style={{marginTop:12,fontSize:13}} onClick={()=>setTab("risk")}>Recalculate Risk →</button>
      </div>
    </div>
  );
}

// ─── WORKER APP ───────────────────────────────────────────────────────────────
function WorkerApp({user,onLogout}) {
  const [tab,setTab]=useState("home");
  const policy=MOCK_DB.policies.find(p=>p.workerId===user.id);
  const claims=MOCK_DB.claims.filter(c=>c.workerId===user.id);
  const nav=[
    {id:"home",icon:"🏠",label:"Home"},
    {id:"risk",icon:"📊",label:"Risk Profile"},
    {id:"policy",icon:"📋",label:"Policy"},
    {id:"claims",icon:"⚡",label:"Claims",badge:claims.filter(c=>c.status==="Processing").length||null},
    {id:"alerts",icon:"🌧️",label:"Alerts"},
    {id:"profile",icon:"👤",label:"Profile"},
  ];
  return (
    <div style={{minHeight:"100vh",background:th.bg,display:"flex"}}>
      <style>{CSS}</style>
      <Sidebar items={nav} active={tab} setActive={setTab} user={user} onLogout={onLogout} role="worker"/>
      <div style={{flex:1,overflowY:"auto",padding:28}}>
        {tab==="home"    &&<WHome user={user} policy={policy} claims={claims} setTab={setTab}/>}
        {tab==="risk"    &&<WRisk user={user}/>}
        {tab==="policy"  &&<WPolicy user={user} policy={policy}/>}
        {tab==="claims"  &&<WClaims user={user} claims={claims} policy={policy}/>}
        {tab==="alerts"  &&<WAlerts user={user}/>}
        {tab==="profile" &&<WProfile user={user} setTab={setTab}/>}
      </div>
    </div>
  );
}

// ─── ADMIN PAGES ──────────────────────────────────────────────────────────────
function AOverview() {
  const a=MOCK_DB.analytics;
  return (
    <div className="sIn">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div><h1 style={{fontSize:24,fontWeight:800}}>Platform Overview</h1><p style={{color:th.muted,fontSize:13,marginTop:4}}>GigShield India · Live</p></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><div className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#34d399"}}/><span style={{fontSize:13,color:th.muted}}>Live</span></div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(185px,1fr))",gap:14,marginBottom:22}}>
        <SC icon="👥" label="Total Workers" value={a.totalWorkers.toLocaleString()} sub="+520 this week" color={th.accent}/>
        <SC icon="📋" label="Active Policies" value={a.activePolicies.toLocaleString()} sub={Math.round(a.activePolicies/a.totalWorkers*100)+"% coverage"} color={th.green}/>
        <SC icon="💰" label="Claims Paid" value={"₹"+(a.totalClaimsPaid/100000).toFixed(1)+"L"} sub="Total" color={th.amber}/>
        <SC icon="✅" label="Auto-Approval" value={a.claimApprovalRate+"%"} sub="AI processed" color={th.purple}/>
        <SC icon="🛡️" label="Fraud Blocked" value={a.fraudCasesBlocked} sub="This month" color={th.red}/>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <h3 style={{fontWeight:700,marginBottom:14}}>Weekly Policy Additions</h3>
        <div style={{display:"flex",alignItems:"flex-end",gap:10,height:100}}>
          {a.weeklyNewPolicies.map((v,i)=>{
            const mx=Math.max(...a.weeklyNewPolicies);
            const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
            return (
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <span style={{fontSize:10,color:th.muted}}>{v}</span>
                <div style={{width:"100%",height:`${Math.round((v/mx)*100)}px`,background:i===6?"linear-gradient(180deg,#3B82F6,#2563EB)":"rgba(59,130,246,0.3)",borderRadius:"4px 4px 0 0"}}/>
                <span style={{fontSize:10,color:th.muted}}>{days[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:14}}>Claims by Disruption Type</h3>
        {Object.entries(a.claimsByType).map(([t,p])=>(
          <div key={t} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span>{t}</span><span style={{fontWeight:700,color:th.accent}}>{p}%</span></div>
            <Bar v={p} color={t.includes("Rain")?th.accent:t.includes("Heat")?th.amber:t.includes("Poll")?th.purple:th.red}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function AWorkers() {
  return (
    <div className="sIn">
      <SH title="Worker Management" sub="Full location profile & risk data per worker"/>
      <div className="card">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`1px solid ${th.border}`}}>
            {["Worker","Platform","State","District","Area","PIN","Earnings","Risk Score","Status"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"8px 10px",color:th.muted,fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {MOCK_DB.users.filter(u=>u.role==="worker").map(w=>{
              const r=calcRisk(w.state,w.district,w.area,w.platform,w.weeklyEarnings);
              return (
                <tr key={w.id} className="tr" style={{borderBottom:`1px solid ${th.border}`}}>
                  <td style={{padding:"12px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#3B82F6,#8B5CF6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{w.name[0]}</div>
                      <div><p style={{fontWeight:600}}>{w.name}</p><p style={{fontSize:11,color:th.muted}}>{w.email}</p></div>
                    </div>
                  </td>
                  <td style={{padding:"12px 10px"}}>{w.platform}</td>
                  <td style={{padding:"12px 10px",color:th.muted}}>{w.state}</td>
                  <td style={{padding:"12px 10px"}}>{w.district}</td>
                  <td style={{padding:"12px 10px",color:th.muted}}>{w.area}</td>
                  <td style={{padding:"12px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{w.pincode}</td>
                  <td style={{padding:"12px 10px",fontWeight:700,color:"#34d399"}}>₹{w.weeklyEarnings}/wk</td>
                  <td style={{padding:"12px 10px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:r.score>=75?th.red:r.score>=50?th.amber:th.green}}/>
                      <span style={{fontWeight:700,color:r.score>=75?th.red:r.score>=50?th.amber:th.green}}>{r.score} — {r.level}</span>
                    </div>
                  </td>
                  <td style={{padding:"12px 10px"}}><Bdg c="bs">Active</Bdg></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AClaims() {
  return (
    <div className="sIn">
      <SH title="Claims Management" sub="Location-verified parametric claims"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}}>
        {[["Total",MOCK_DB.claims.length,"📋"],["Approved",MOCK_DB.claims.filter(c=>c.status!=="Processing").length,"✅"],["Processing",MOCK_DB.claims.filter(c=>c.status==="Processing").length,"🔄"],["Auto",MOCK_DB.claims.filter(c=>c.autoApproved).length,"🤖"]].map(([l,v,i])=>(
          <div key={l} className="card2" style={{textAlign:"center"}}><div style={{fontSize:20,marginBottom:5}}>{i}</div><p style={{fontSize:22,fontWeight:800}}>{v}</p><p style={{fontSize:12,color:th.muted}}>{l}</p></div>
        ))}
      </div>
      <div className="card">
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`1px solid ${th.border}`}}>
            {["Claim ID","Worker","Location","Type","Date","Hrs","Payout","Status","Method"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"8px 10px",color:th.muted,fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {MOCK_DB.claims.map(c=>{
              const w=MOCK_DB.users.find(u=>u.id===c.workerId);
              return (
                <tr key={c.id} className="tr" style={{borderBottom:`1px solid ${th.border}`}}>
                  <td style={{padding:"11px 10px",fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{c.id}</td>
                  <td style={{padding:"11px 10px",fontWeight:600}}>{w?.name}</td>
                  <td style={{padding:"11px 10px"}}><div style={{fontSize:11}}><div style={{fontWeight:600}}>{w?.area}</div><div style={{color:th.muted}}>{w?.district}, {w?.state?.slice(0,8)}</div></div></td>
                  <td style={{padding:"11px 10px"}}>{c.type}</td>
                  <td style={{padding:"11px 10px",color:th.muted,whiteSpace:"nowrap"}}>{c.date}</td>
                  <td style={{padding:"11px 10px"}}>{c.hoursLost}h</td>
                  <td style={{padding:"11px 10px",fontWeight:800,color:"#34d399"}}>₹{c.payout}</td>
                  <td style={{padding:"11px 10px"}}><Bdg c={c.status==="Paid"?"bs":c.status==="Approved"?"bi":"bw"}>{c.status}</Bdg></td>
                  <td style={{padding:"11px 10px"}}><Bdg c={c.autoApproved?"bs":"bw"}>{c.autoApproved?"Auto":"Manual"}</Bdg></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AFraud() {
  const [scanning,setScanning]=useState(false);
  const [scanned,setScanned]=useState(false);
  const sigs=[
    {w:"Unknown WRK",sig:"GPS location ≠ registered area (500m discrepancy)",sv:"Critical",ac:"Blocked",cn:"98%"},
    {w:"Test User",sig:"Duplicate claim — same area, same date",sv:"High",ac:"Blocked",cn:"95%"},
    {w:"Mock Acc",sig:"Claim filed from outside registered district",sv:"Medium",ac:"Review",cn:"87%"},
    {w:"Anon User",sig:"IMD weather mismatch for PIN 110001",sv:"High",ac:"Blocked",cn:"96%"},
  ];
  return (
    <div className="sIn">
      <SH title="Fraud Detection" sub="AI anomaly detection with location-level verification"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
        <SC icon="🛡️" label="Fraud Blocked" value="47" sub="This month" color={th.red}/>
        <SC icon="🤖" label="AI Accuracy" value="96.4%" sub="Detection rate" color={th.purple}/>
        <SC icon="💰" label="Prevented" value="₹1.8L" sub="Saved" color={th.green}/>
        <SC icon="📍" label="GPS Spoofing" value="12" sub="Blocked" color={th.amber}/>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <h3 style={{fontWeight:700}}>Fraud Signals</h3>
          <button className="bp-btn" style={{padding:"8px 16px",fontSize:13}} onClick={()=>{setScanning(true);setTimeout(()=>{setScanning(false);setScanned(true)},2200)}}>{scanning?"Scanning…":"Run AI Scan"}</button>
        </div>
        {scanned&&<div style={{background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:9,padding:11,marginBottom:12,fontSize:13,color:"#34d399"}}>✅ Scan complete. 0 new patterns. All location checks passed.</div>}
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead><tr style={{borderBottom:`1px solid ${th.border}`}}>
            {["Worker","Signal","Severity","Confidence","Action"].map(h=>(
              <th key={h} style={{textAlign:"left",padding:"8px 10px",color:th.muted,fontSize:12,fontWeight:600}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {sigs.map((s,i)=>(
              <tr key={i} className="tr" style={{borderBottom:`1px solid ${th.border}`}}>
                <td style={{padding:"11px 10px"}}>{s.w}</td>
                <td style={{padding:"11px 10px"}}>{s.sig}</td>
                <td style={{padding:"11px 10px"}}><Bdg c={s.sv==="Critical"||s.sv==="High"?"bd":"bw"}>{s.sv}</Bdg></td>
                <td style={{padding:"11px 10px",fontWeight:700,color:th.accent}}>{s.cn}</td>
                <td style={{padding:"11px 10px"}}><Bdg c={s.ac==="Blocked"?"bd":s.ac==="Review"?"bi":"bw"}>{s.ac}</Bdg></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:12}}>Detection Methods</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {[["📍 GPS vs Registered Area","Validates GPS against worker's registered PIN & area boundary"],["🌦️ IMD Data Correlation","Cross-checks claim date/location with India Met Dept data"],["🗺️ District Boundary Check","Confirms disruption occurred within registered district"],["🔁 Duplicate Detector","Blocks same-event claims across the same PIN code"],["📱 Device Fingerprint","Multi-account fraud detection via device IDs"],["📊 Earnings Pattern ML","Flags claims inconsistent with historical earning patterns"]].map(([t,d])=>(
            <div key={t} style={{background:"rgba(255,255,255,0.025)",borderRadius:10,padding:12}}>
              <p style={{fontWeight:600,fontSize:13,marginBottom:4}}>{t}</p>
              <p style={{fontSize:12,color:th.muted}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function APayouts() {
  const [proc,setProc]=useState(false);
  const [done,setDone]=useState(false);
  const pending=MOCK_DB.claims.filter(c=>c.status==="Approved");
  const total=pending.reduce((a,c)=>a+c.payout,0);
  return (
    <div className="sIn">
      <SH title="Payout Processing" sub="Instant UPI/IMPS disbursement by location"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
        <SC icon="⏳" label="Pending" value={pending.length} sub={"₹"+total+" total"} color={th.amber}/>
        <SC icon="✅" label="Processed Today" value="12" sub="₹9,840" color={th.green}/>
        <SC icon="⚡" label="Avg Payout Time" value="2.1 min" color={th.accent}/>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h3 style={{fontWeight:700}}>Pending Payouts</h3>
          <button className="bg-btn" onClick={()=>{setProc(true);setTimeout(()=>{setProc(false);setDone(true)},2200)}}>{proc?"Processing via UPI…":"Process All (UPI)"}</button>
        </div>
        {done&&<div style={{background:"rgba(16,185,129,0.09)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:9,padding:11,marginBottom:14,fontSize:13,color:"#34d399"}}>✅ {pending.length} payouts sent via Razorpay. UTR generated. SMS sent.</div>}
        {pending.map(c=>{
          const w=MOCK_DB.users.find(u=>u.id===c.workerId);
          return (
            <div key={c.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:`1px solid ${th.border}`}}>
              <div>
                <p style={{fontWeight:600}}>{w?.name}</p>
                <p style={{fontSize:12,color:th.muted}}>{c.type} · {c.date}</p>
                <p style={{fontSize:12,color:th.muted}}>📍 {w?.area}, {w?.district} · UPI: {w?.phone?.replace("+91 ","")?.replace(" ","")}@upi</p>
              </div>
              <div style={{textAlign:"right"}}>
                <p style={{fontWeight:800,fontSize:17,color:"#34d399"}}>₹{c.payout}</p>
                <Bdg c="bw">Pending</Bdg>
              </div>
            </div>
          );
        })}
        {pending.length===0&&<p style={{color:th.muted,textAlign:"center",padding:20}}>No pending payouts</p>}
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:12}}>Payment Channels</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {[["💳 Razorpay UPI","Primary","Active","bs"],["🏦 IMPS/NEFT","Bank fallback","Active","bs"],["📱 Paytm","Wallet","Sandbox","bw"]].map(([t,d,s,b])=>(
            <div key={t} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:12}}>
              <p style={{fontWeight:600,fontSize:13}}>{t}</p>
              <p style={{fontSize:11,color:th.muted,margin:"4px 0 8px"}}>{d}</p>
              <Bdg c={b}>{s}</Bdg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AAlerts() {
  const [testR,setTestR]=useState("");
  const [ld,setLd]=useState(false);
  return (
    <div className="sIn">
      <SH title="Parametric Alert Monitor" sub="Area-level disruption data feeds across India"/>
      <div style={{display:"grid",gap:12,marginBottom:20}}>
        {MOCK_DB.weatherAlerts.map(a=>(
          <div key={a.id} className="card" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:42,height:42,borderRadius:10,background:a.triggered?"rgba(16,185,129,0.12)":"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>
                {a.type.includes("Rain")?"🌧️":a.type.includes("Heat")?"🌡️":a.type.includes("Poll")?"😷":"🚫"}
              </div>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                  <p style={{fontWeight:700}}>{a.type}</p>
                  <Bdg c={a.triggered?"bs":a.severity==="Critical"?"bd":"bw"}>{a.triggered?"TRIGGERED":"MONITORING"}</Bdg>
                </div>
                <div style={{display:"flex",gap:5}}>
                  <span className="loc-tag">📍 {a.area}</span>
                  <span className="loc-tag">🏙️ {a.district}</span>
                  <span className="loc-tag">🗺️ {a.state}</span>
                </div>
                <p style={{color:th.muted,fontSize:12,marginTop:5}}>Observed: {a.value} · Threshold: {a.threshold}</p>
              </div>
            </div>
            <div style={{textAlign:"right",fontSize:12,color:th.muted}}>
              <p>{a.date}</p>
              {a.triggered&&<p style={{color:"#34d399",marginTop:4}}>Auto-claims fired</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:8}}>Test Parametric Trigger</h3>
        <p style={{color:th.muted,fontSize:13,marginBottom:12}}>Simulate AQI spike across Delhi NCR (Connaught Place, Rohini, Janakpuri)</p>
        {testR?<p style={{color:"#34d399",fontSize:13}}>{testR}</p>
          :<button className="bp-btn" onClick={()=>{setLd(true);setTimeout(()=>{setLd(false);setTestR("✅ AQI=348 in Delhi NCR · Threshold 300 exceeded · 842 policies triggered · Auto-claims for Connaught Place (124), Rohini (98), Janakpuri (87) · Payouts queued · SMS sent")},2200)}}>{ld?"Running…":"⚡ Simulate AQI Spike — Delhi NCR"}</button>}
      </div>
    </div>
  );
}

function AAnalytics() {
  return (
    <div className="sIn">
      <SH title="Analytics & Insights"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:14}}>Loss Ratio</h3>
          {[["Premium Collected","₹7,20,000",true],["Claims Paid","₹2,34,000",false],["Loss Ratio","32.5%",false],["Profit Margin","41.8%",true]].map(([k,v,p])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${th.border}`,fontSize:14}}>
              <span style={{color:th.muted}}>{k}</span><span style={{fontWeight:700,color:p?th.green:k.includes("Loss")||k.includes("Claims")?th.red:th.text}}>{v}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{fontWeight:700,marginBottom:14}}>Next Week Predictions</h3>
          {[["Expected claims","38–45"],["High risk zones","Mumbai, Kolkata"],["Primary trigger","Heavy Monsoon"],["Est. payout","₹28K–₹36K"],["Fraud risk","Low 0.3%"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${th.border}`,fontSize:14}}>
              <span style={{color:th.muted}}>{k}</span><span style={{fontWeight:600,color:th.accent}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <h3 style={{fontWeight:700,marginBottom:14}}>Top Risk Districts (All India)</h3>
        {[["Mumbai City, MH",92,th.red],["New Delhi, DL",90,th.red],["Kolkata, WB",82,th.amber],["Bengaluru Urban, KA",72,th.amber],["Hyderabad, TS",68,th.accent],["Chennai, TN",66,th.accent],["Jodhpur, RJ",60,th.green]].map(([d,s,c])=>(
          <div key={d} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span>{d}</span><span style={{fontWeight:700,color:c}}>{s}/100</span></div>
            <Bar v={s} color={c}/>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 style={{fontWeight:700,marginBottom:14}}>Workers by Platform</h3>
        {[["Zomato",35,th.red],["Swiggy",28,"#F97316"],["Zepto/Blinkit",18,th.purple],["Amazon",12,th.amber],["Others",7,"#64748b"]].map(([p,pc,c])=>(
          <div key={p} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}><span>{p}</span><span style={{fontWeight:700}}>{pc}%</span></div>
            <Bar v={pc} color={c}/>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminApp({user,onLogout}) {
  const [tab,setTab]=useState("overview");
  const nav=[
    {id:"overview",icon:"📊",label:"Overview"},
    {id:"workers",icon:"👥",label:"Workers"},
    {id:"claims",icon:"⚡",label:"Claims"},
    {id:"fraud",icon:"🔍",label:"Fraud"},
    {id:"payouts",icon:"💸",label:"Payouts"},
    {id:"alerts",icon:"🌧️",label:"Alerts"},
    {id:"analytics",icon:"📈",label:"Analytics"},
  ];
  return (
    <div style={{minHeight:"100vh",background:th.bg,display:"flex"}}>
      <style>{CSS}</style>
      <Sidebar items={nav} active={tab} setActive={setTab} user={user} onLogout={onLogout} role="admin"/>
      <div style={{flex:1,overflowY:"auto",padding:28}}>
        {tab==="overview"  &&<AOverview/>}
        {tab==="workers"   &&<AWorkers/>}
        {tab==="claims"    &&<AClaims/>}
        {tab==="fraud"     &&<AFraud/>}
        {tab==="payouts"   &&<APayouts/>}
        {tab==="alerts"    &&<AAlerts/>}
        {tab==="analytics" &&<AAnalytics/>}
      </div>
    </div>
  );
}

export default function App() {
  const [user,setUser]=useState(null);
  if(!user) return <Login onLogin={setUser}/>;
  if(user.role==="admin") return <AdminApp user={user} onLogout={()=>setUser(null)}/>;
  return <WorkerApp user={user} onLogout={()=>setUser(null)}/>;
}