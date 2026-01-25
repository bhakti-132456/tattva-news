import{c as i,r as l,j as e,N as d}from"./index-BX40Dz_y.js";const c=i("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]),p=i("Briefcase",[["rect",{width:"20",height:"14",x:"2",y:"7",rx:"2",ry:"2",key:"eto64e"}],["path",{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"zwj3tp"}]]),h=i("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]),v=i("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]),g=i("Headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]),m=i("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]),u=i("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]),f=i("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),b=i("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),y=i("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),w=l.memo(({toggleSidebar:r})=>{const[t,o]=l.useState("");return l.useEffect(()=>{const s=new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});o(s)},[]),e.jsxs("header",{className:"tattva-header animate-fade-in",style:{animationDelay:"0.1s"},children:[e.jsxs("div",{className:"header-left",children:[e.jsx("button",{className:"mobile-menu-btn",onClick:r,"aria-label":"Toggle Menu",children:e.jsx(u,{size:24,color:"var(--navy)"})}),e.jsx("a",{href:"/",className:"logo-container",children:e.jsx("img",{src:"/logo.png",alt:"Tattva News",loading:"eager"})}),e.jsxs("div",{className:"weather-widget",children:[e.jsx("span",{children:"24°C"})," ",e.jsx("span",{className:"weather-city",children:"Hyderabad"})]})]}),e.jsxs("div",{className:"header-meta",children:[e.jsx("span",{className:"date-display",children:t}),e.jsx("span",{className:"divider",children:"|"}),e.jsx("span",{className:"live-indicator",children:"● LIVE"})]})]})});w.displayName="Header";const x=[{name:"Home",icon:m,path:"/"},{name:"World",icon:v,path:"/category/world"},{name:"Business",icon:p,path:"/category/business"},{name:"Tech",icon:h,path:"/category/tech"},{name:"Audio Deep Dives",icon:g,path:"/#deep-dives"}],k=[{name:"Search",icon:f},{name:"Saved",icon:c},{name:"Account",icon:b}],A=({isOpen:r,onClose:t})=>{const o=(a,s)=>{if(t(),s.includes("#")){a.preventDefault();const n=document.querySelector(".deep-dive-section");n&&n.scrollIntoView({behavior:"smooth"})}};return e.jsxs(e.Fragment,{children:[r&&e.jsx("div",{className:"sidebar-backdrop",onClick:t}),e.jsxs("nav",{className:`tattva-sidebar ${r?"open":""}`,children:[e.jsx("button",{className:"sidebar-close-btn",onClick:t,"aria-label":"Close menu",children:e.jsx(y,{size:20})}),e.jsx("div",{className:"sidebar-logo",children:e.jsx("img",{src:"/logo.png",alt:"Tattva News",loading:"lazy"})}),e.jsx("div",{className:"sidebar-group primary-nav",children:x.map(a=>{const s=a.icon;return e.jsxs(d,{to:a.path,className:({isActive:n})=>`nav-item ${n&&!a.path.includes("#")?"active":""}`,onClick:n=>o(n,a.path),children:[e.jsx(s,{className:"nav-icon",size:22,strokeWidth:1.5}),e.jsx("span",{className:"nav-label",children:a.name}),e.jsx("div",{className:"nav-tooltip",children:a.name})]},a.name)})}),e.jsx("div",{className:"sidebar-group utility-nav",children:k.map(a=>{const s=a.icon;return e.jsxs("button",{className:"nav-item",onClick:t,type:"button",children:[e.jsx(s,{className:"nav-icon",size:22,strokeWidth:1.5}),e.jsx("span",{className:"nav-label",children:a.name}),e.jsx("div",{className:"nav-tooltip",children:a.name})]},a.name)})})]})]})},S=[{id:"aviation-safety",type:"hero",category:"Safety Alert",title:"Aviation Industry on High Alert After Deadliest Year in a Decade",excerpt:"Why 2025 has become a turning point for air safety, with pilot unions demanding urgent reforms.",author:"Aviation Desk",time:"Audio Deep Dive • 14 min",image:"https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"12 min read",hasAudio:!0,audioDuration:"14:20",audioSrc:"/2025_Aviation_Crisis__Are_Our_Skies_Still_Safe_.m4a",contentHTML:`
            <p class="drop-cap">The crash of Air India Flight 171 on June 12 has cemented 2025 as one of the most tragic years for civil aviation in recent memory, with global fatalities already surpassing 460 souls. The disaster, which occurred in Ahmedabad, India, claimed 260 lives—including 241 on board and 19 on the ground—when the Boeing 787-8 Dreamliner plummeted into a medical college hostel just seconds after takeoff.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--red)">2025: A Year of Tragedy</div>
                <div class="stat-grid">
                     <div class="stat-item">
                        <span class="stat-label">Total Fatalities</span>
                        <span class="stat-big" style="color:var(--red)">460+</span>
                    </div>
                     <div class="stat-item">
                        <span class="stat-label">Deadliest Crash</span>
                        <span class="stat-big">AI 171</span>
                    </div>
                     <div class="stat-item">
                        <span class="stat-label">Tech Snags (Jul)</span>
                        <span class="stat-big">183</span>
                    </div>
                </div>
                <div style="margin-top:1.5rem; background: #fff5f5; padding: 1rem; border-radius: 0.5rem; border: 1px solid #fed7d7;">
                    <strong style="color:var(--red)">Cockpit Voice Recorder Leak:</strong>
                    <p style="font-style:italic; margin-top:0.5rem; color:var(--text-muted)">"Why did you cut off?" — "I did not."</p>
                    <div style="font-size:0.8rem; margin-top:0.5rem;">A haunting exchange highlighting the debate between human error vs. mechanical failure.</div>
                </div>
            </div>

            <p>The incident marks the first fatal crash and total hull loss of a Boeing 787 aircraft. While preliminary reports confirm the plane was technically airworthy, a haunting exchange captured on the cockpit voice recorder has fueled industry-wide controversy. One pilot reportedly asked, "Why did you cut off?" to which the other replied, "I did not," referring to the fuel control switches that simultaneously moved to the "cut-off" position, causing total power loss.</p>

            <h3>The Human Cost & Systemic Flaws</h3>
            <p>Pilot unions have criticized the release of these lines, suggesting they unfairly point toward human error while ignoring potential mechanical flaws in switch locking systems previously flagged by the FAA. The psychological toll on the industry has been immediate. On June 16, 112 Air India pilots reported sick in a single day, prompting the Directorate General of Civil Aviation (DGCA) to reinforce mental health training.</p>
            
            <p>Furthermore, Indian airlines have reported a staggering 183 technical snags through July this year, with Air India and Air India Express accounting for 85 of those reported defects.</p>

            <div class="infographic-box">
                <div class="info-header">Global Incidents in 2025</div>
                <div style="display:flex;flex-direction:column;gap:0.75rem;">
                    <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem;background:#f8fafc;border-radius:0.5rem;">
                        <span style="font-weight:700;color:var(--red);">🇺🇸</span>
                        <div><strong>Potomac River Collision</strong> — 67 killed in deadliest US crash in 15 years</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem;background:#f8fafc;border-radius:0.5rem;">
                        <span style="font-weight:700;color:var(--red);">🇷🇺</span>
                        <div><strong>Angara Airlines An-24</strong> — 48 killed in Russia's Amur region</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:1rem;padding:0.75rem;background:#f8fafc;border-radius:0.5rem;">
                        <span style="font-weight:700;color:var(--red);">🇧🇩</span>
                        <div><strong>Bangladesh Air Force Jet</strong> — 20+ killed after crash into school</div>
                    </div>
                </div>
            </div>

            <div class="infographic-box">
                <div class="info-header">Comparative Safety Risks</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">Car</div>
                        <div class="bar-track"><div class="bar-fill accent" style="width: 85%;"></div></div>
                        <div class="info-change">High Risk</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Plane</div>
                        <div class="bar-track"><div class="bar-fill success" style="width: 2%;"></div></div>
                        <div class="info-change">1 in 13.4M</div>
                    </div>
                </div>
                <div class="stat-label" style="text-align:right; margin-top:0.5rem;">Despite headlines, aviation remains statistically safest.</div>
            </div>

            <blockquote class="pull-quote">Investigating a modern aviation disaster is like trying to solve a massive, high-stakes jigsaw puzzle where half the pieces are charred and the instructions are written in complex code.</blockquote>

            <p>As investigators continue to analyze black box data in labs from New Delhi to Washington, the industry is left to grapple with whether these events are a statistical anomaly or a sign of deeper systemic issues.</p>
        `},{id:"wb-unrest",type:"standard",category:"Politics",title:"West Bengal Gripped by Unrest: Institutional Failures & Demographic Shifts",excerpt:"Sources suggest current instability is not a glitch but a feature of a state pushed to its limits.",author:"Political Bureau",time:"Audio Deep Dive • 18 min",image:"/wb-unrest.jpg",readTime:"15 min read",hasAudio:!0,audioDuration:"18:45",audioSrc:"/West_Bengal__Unpacking_History_s_Wounds,_Contemporary_Conflicts,_and_Contentious_Demographic_Shifts.m4a",contentHTML:`
            <p class="drop-cap">Kolkata — West Bengal is currently facing a period of intense turmoil, characterized by high-profile criminal cases, allegations of state-sponsored suppression, and a historical cycle of political violence. The recent horrific assault and murder of Dr. Moumita Debnath at R.G. Kar Medical College has become a focal point for national outrage.</p>

            <p>According to the sources, the state administration faces serious allegations of evidence tampering and a "cover-up" attempt, including claims that the victim's parents were initially told their daughter had committed suicide and were made to wait hours before seeing her body.</p>

            <div class="infographic-box">
                <div class="info-header">The Demographic Shift (1971 - Today)</div>
                <div style="display:flex; align-items:flex-end; height: 150px; gap: 2rem; padding: 1rem 0; border-bottom: 1px solid #ccc;">
                    <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; text-align:center;">
                        <span style="font-weight:700; color:var(--navy); margin-bottom:0.5rem;">12%</span>
                        <div style="height: 40px; background:var(--navy-light); width:100%; border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">1971</span>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column; justify-content:flex-end; text-align:center;">
                         <span style="font-weight:700; color:var(--red); margin-bottom:0.5rem;">~30%</span>
                        <div style="height: 100px; background:var(--red); width:100%; border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">Today</span>
                    </div>
                </div>
                <div class="stat-label" style="margin-top:1rem;">Muslim population percentage in West Bengal, indicating significant demographic changes.</div>
            </div>

            <h3>A History of Violence</h3>
            <p>The sources suggest that this current instability is not a "glitch" but a "feature" of a state pushed to its limits. This pattern of violence is traced back to the 1947 West Bengal Riots, a "dark chapter" where the breakdown of law and order during Partition led to targeted attacks on religious minorities. This legacy of displacement continued through events like the Marichjhapi massacre in 1979, where the then-Communist government allegedly killed 1,700 Bengali Hindu refugees.</p>

            <div class="infographic-box" style="background:var(--navy);color:white;">
                <div class="info-header" style="color:var(--red);">Historical Timeline</div>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    <div style="display:flex;gap:1rem;align-items:flex-start;">
                        <span style="background:var(--red);padding:0.25rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:700;">1947</span>
                        <div>West Bengal Riots — Partition violence, targeted attacks on minorities</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:flex-start;">
                        <span style="background:var(--red);padding:0.25rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:700;">1979</span>
                        <div>Marichjhapi Massacre — 1,700 Bengali Hindu refugees allegedly killed</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:flex-start;">
                        <span style="background:var(--red);padding:0.25rem 0.5rem;border-radius:4px;font-size:0.75rem;font-weight:700;">2024</span>
                        <div>R.G. Kar Medical College Incident — Dr. Moumita Debnath case</div>
                    </div>
                </div>
            </div>

            <blockquote class="pull-quote">"Think of the current state of West Bengal as a failing dam... successive administrations have merely painted over the leaks."</blockquote>

            <p>The sources draw parallels between the current situation in West Bengal and the historical exodus of Hindus from Kashmir, noting that in areas like Murshidabad, Hindu families are again being displaced following violence related to the Waqf Bill.</p>

            <p>In response to what is described as a "failed" law and order machinery, some are calling for radical political shifts, discussing the potential application of the "Himanta Doctrine"—a model from Assam focused on consolidating the indigenous vote, implementing a Uniform Civil Code (UCC), and cracking down on illegal immigration and radicalization.</p>
        `},{id:"world-1",type:"standard",category:"World",title:"Global Economic Growth Slowing as Geopolitical Tensions Mount",excerpt:"Global GDP growth slowed to 3.2% in 2025, signaling an end to post-pandemic recovery momentum.",author:"Economics Team",time:"Dec 20, 2025",image:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"5 min read",contentHTML:`
            <p class="drop-cap">The world economy is experiencing a subtle but significant deceleration. Global GDP growth slowed to 3.2 percent in 2025, down from 3.3 percent in 2024, with further moderation projected to 3.1 percent in 2026. This represents a concerning trend driven primarily by escalating geopolitical tensions and rising protectionist trade policies.</p>

            <div class="infographic-box">
                <div class="info-header">Global GDP Growth Trajectory</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">2024</span>
                        <span class="stat-big">3.3%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">2025</span>
                        <span class="stat-big" style="color:var(--red);">3.2%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">2026 (Proj.)</span>
                        <span class="stat-big" style="color:var(--red);">3.1%</span>
                    </div>
                </div>
            </div>

            <h3>Regional Divergence</h3>
            <p>The slowdown is not uniform across regions. The United States is forecast to expand by approximately 2.6 percent in 2026—a modest but steady growth rate reflecting resilience despite external pressures.</p>

            <div class="infographic-box">
                <div class="info-header">Regional Growth Comparison (2025-26)</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">India</div>
                        <div class="bar-track"><div class="bar-fill success" style="width: 100%;"></div></div>
                        <div class="info-change positive">6.0%+</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">China</div>
                        <div class="bar-track"><div class="bar-fill" style="width: 77%; background:var(--navy);"></div></div>
                        <div class="info-change">4.6%</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">USA</div>
                        <div class="bar-track"><div class="bar-fill" style="width: 43%; background:var(--navy-light);"></div></div>
                        <div class="info-change">2.6%</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Eurozone</div>
                        <div class="bar-track"><div class="bar-fill accent" style="width: 15%;"></div></div>
                        <div class="info-change negative">0.9%</div>
                    </div>
                </div>
            </div>

            <p>China faces more significant headwinds, with growth projected to slow to 4.6 percent in 2025, representing a substantial deceleration from historical double-digit expansion. In stark contrast, India is maintaining strong momentum with growth exceeding 6 percent, positioning itself as one of the world's fastest-growing major economies.</p>

            <p>The Eurozone remains particularly vulnerable, with projected growth of just 0.9 percent in 2025 and a modest recovery to 1.4 percent in 2026. To put this in perspective, for every $1 trillion in economic activity in the Eurozone, the economy will only grow by $9 billion—a situation reflecting structural stagnation.</p>

            <blockquote class="pull-quote">This fragmented global growth pattern signals that the post-pandemic recovery phase has ended, and economies are entering a more competitive, slower-growth environment.</blockquote>
        `},{id:"tech-1",type:"standard",category:"Tech",title:"Artificial Intelligence Regulations Taking Shape Across Global Economies",excerpt:"The EU and US diverge on AI policy, creating a fragmented landscape for tech giants.",author:"Tech Bureau",time:"6 hrs ago",image:"/ai-regulations.jpg",readTime:"6 min read",contentHTML:`
            <p class="drop-cap">The world's major economies are racing to establish regulatory frameworks for artificial intelligence, reflecting both the technology's potential and its risks. The European Union has taken the most aggressive regulatory stance with its AI Act, which introduces comprehensive rules governing general-purpose AI models.</p>

            <div class="infographic-box">
                <div class="info-header">Regulatory Approaches Compared</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
                    <div style="background:#f0f9ff;padding:1rem;border-radius:0.5rem;border-left:4px solid #3b82f6;">
                        <div style="font-weight:700;margin-bottom:0.5rem;">🇪🇺 European Union</div>
                        <div style="font-size:0.9rem;color:var(--text-muted);">AI Act — Comprehensive rules, risk mitigation, transparency standards. Effective August 2025.</div>
                    </div>
                    <div style="background:#fef2f2;padding:1rem;border-radius:0.5rem;border-left:4px solid var(--red);">
                        <div style="font-weight:700;margin-bottom:0.5rem;">🇺🇸 United States</div>
                        <div style="font-size:0.9rem;color:var(--text-muted);">Executive Order 14179 — Innovation-first, minimal restrictions, defense priority.</div>
                    </div>
                </div>
            </div>

            <p>Providers of large AI models must now implement risk mitigation measures and comply with stringent transparency and copyright standards, with these rules coming into effect in August 2025.</p>

            <p>By contrast, the United States has adopted a lighter-touch approach. Executive Order 14179, issued in January 2025, reorients U.S. AI policy by removing federal policies perceived as impediments to innovation and prioritizing American dominance in AI technology.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--red);">AI Bills in the U.S.</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">Bills in 2024</span>
                        <span class="stat-big">700+</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">2025 (So Far)</span>
                        <span class="stat-big">40+</span>
                    </div>
                </div>
            </div>

            <p>South Korea has introduced a binding Basic AI Law that will come into force in January 2026, marking a significant milestone for Asia-Pacific regulation.</p>

            <blockquote class="pull-quote">The regulatory divergence is striking: while the EU emphasizes guardrails and systemic safety, the U.S. emphasizes innovation speed and competitive advantage.</blockquote>

            <p>This proliferation of regulations suggests that a globally coherent AI governance framework remains a distant prospect, with each region betting on its own strategic advantages.</p>
        `},{id:"business-1",type:"opinion",category:"Opinion",title:"The Silent Crisis: Mental Health Decline in Young Adults",excerpt:"With a Mind Health Quotient of just 38, young adults are facing a generational psychological crisis.",author:"Health Desk",time:"Just Now",image:"https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"6 min read",contentHTML:`
            <p class="drop-cap">A global mental health crisis is intensifying, with the Mental State of the World report revealing alarming trends among younger generations. Young adults aged 18-34 report an average Mind Health Quotient (MHQ) of just 38 on a 100-point scale, with 41 percent experiencing functionally debilitating distress.</p>

            <div class="infographic-box" style="background:var(--navy);color:white;">
                <div class="info-header" style="color:var(--red);">Mental Health by Generation</div>
                <div style="display:flex;align-items:flex-end;height:150px;gap:2rem;padding:1rem 0;">
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--red);margin-bottom:0.5rem;">38</span>
                        <div style="height:38px;background:var(--red);width:100%;border-radius:4px;"></div>
                        <span style="font-size:0.75rem;margin-top:0.5rem;opacity:0.7;">18-34 yrs</span>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--green);margin-bottom:0.5rem;">101</span>
                        <div style="height:101px;background:var(--green);width:100%;border-radius:4px;"></div>
                        <span style="font-size:0.75rem;margin-top:0.5rem;opacity:0.7;">55+ yrs</span>
                    </div>
                </div>
                <div style="text-align:center;font-size:0.8rem;opacity:0.7;margin-top:0.5rem;">Mind Health Quotient (MHQ) across 82 countries</div>
            </div>

            <p>This generational divide is striking. Older adults aged 55 and above report an average MHQ of 101 across 82 countries, close to the expected norm of 100. The mental health trajectory across life stages shows a dramatic 30-point drop among younger generations between 2019 and 2021, with minimal recovery since then.</p>

            <div class="infographic-box">
                <div class="info-header">U.S. Mental Health Snapshot</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">Adults with Mental Illness</span>
                        <span class="stat-big">23.4%</span>
                        <span class="stat-label">61.5 million people</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Serious Mental Illness</span>
                        <span class="stat-big">5.6%</span>
                        <span class="stat-label">14.6 million people</span>
                    </div>
                </div>
            </div>

            <p>The financial burden is staggering: mental health disorders generate economic costs exceeding $1 trillion per decade globally. The United Kingdom's National Health Service spent £12 billion specifically on mental health services in 2021-22, yet investment has not kept pace with rising need.</p>

            <blockquote class="pull-quote">This crisis demands urgent policy attention, as untreated mental illness undermines workforce productivity, family stability, and social cohesion across societies.</blockquote>
        `},{id:"space-1",type:"standard",category:"Startups & Tech",title:"Space Exploration Enters a New Era with Multiple National Programs Advancing",excerpt:"As nations race to the Moon and Mars, humanity stands on the brink of a multi-planetary future.",author:"Science Desk",time:"Dec 21, 2025",image:"https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"6 min read",contentHTML:`
            <p class="drop-cap">Space exploration is experiencing a renaissance as multiple nations advance ambitious programs. NASA's Artemis campaign is accelerating lunar missions as a foundation for eventual Mars exploration, with the Artemis II crewed test flight scheduled for early 2026. Through the Artemis Accords, nearly 60 nations have now committed to safe and transparent space exploration.</p>

            <div class="infographic-box">
                <div class="info-header">Key Space Missions Timeline</div>
                <div style="display:flex;flex-direction:column;gap:1rem;">
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <span style="background:var(--navy);color:white;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;">Q4 2025</span>
                        <div><strong>ISRO Gaganyaan</strong> — First uncrewed test flight</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <span style="background:var(--navy);color:white;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;">Early 2026</span>
                        <div><strong>NASA Artemis II</strong> — Crewed lunar test flight</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <span style="background:var(--navy);color:white;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;">2026</span>
                        <div><strong>ISRO Gaganyaan</strong> — India's first crewed mission</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <span style="background:var(--green);color:white;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;">2027</span>
                        <div><strong>Chandrayaan</strong> — Lunar sample-return mission</div>
                    </div>
                    <div style="display:flex;gap:1rem;align-items:center;">
                        <span style="background:var(--green);color:white;padding:0.25rem 0.75rem;border-radius:4px;font-size:0.75rem;font-weight:700;">2028-29</span>
                        <div><strong>JAXA-ISRO</strong> — Joint lunar south pole exploration</div>
                    </div>
                </div>
            </div>

            <h3>India's Historic Moment</h3>
            <p>India is pursuing particularly aggressive timelines through its ISRO. The Gaganyaan program is scheduled to launch its first uncrewed test flight in Q4 2025. If successful, the inaugural crewed Gaganyaan mission in 2026 would make India the fourth nation in history—after the United States, Soviet Union, and China—to independently send humans into space.</p>

            <div class="infographic-box">
                <div class="info-header">Nations with Independent Human Spaceflight</div>
                <div style="display:flex;gap:1rem;flex-wrap:wrap;">
                    <div style="padding:0.5rem 1rem;background:var(--navy);color:white;border-radius:9999px;font-size:0.85rem;">🇺🇸 USA</div>
                    <div style="padding:0.5rem 1rem;background:var(--navy);color:white;border-radius:9999px;font-size:0.85rem;">🇷🇺 Russia</div>
                    <div style="padding:0.5rem 1rem;background:var(--navy);color:white;border-radius:9999px;font-size:0.85rem;">🇨🇳 China</div>
                    <div style="padding:0.5rem 1rem;background:var(--green);color:white;border-radius:9999px;font-size:0.85rem;">🇮🇳 India (2026)</div>
                </div>
            </div>

            <blockquote class="pull-quote">"We are not just visiting; we are planning to stay." — NASA Administrator</blockquote>

            <p>NASA also successfully completed four Entry Descent and Landing technology tests in 2025, accelerating innovations for precision Mars landings. The convergence of these programs signals that space exploration has evolved from a Cold War competition into a coordinated international effort to establish long-term human presence beyond Earth.</p>
        `},{id:"tech-2",type:"standard",category:"Tech",title:"AI Job Market Experiences Explosive Growth",excerpt:"AI-related job postings surged 25.2% in Q1 2025, with median salary of $157,000.",author:"Tech Bureau",time:"12 hrs ago",image:"https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"5 min read",contentHTML:`
            <p class="drop-cap">The labor market for artificial intelligence professionals is experiencing unprecedented expansion. In the first quarter of 2025, AI-related job postings surged 25.2 percent compared to the same period in 2024, with a median salary of $157,000—substantially higher than the broader American workforce average.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--green);">AI Job Market Growth</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">Q1 2025 Growth</span>
                        <span class="stat-big positive">+25.2%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Median Salary</span>
                        <span class="stat-big">$157K</span>
                    </div>
                </div>
            </div>

            <h3>Generative AI Explosion</h3>
            <p>The growth is particularly pronounced in generative AI specialties. Job listings for generative AI engineers skyrocketed from just 55 positions in 2021 to nearly 10,000 by May 2025. This represents a compound annual growth rate of approximately 120 percent.</p>

            <div class="infographic-box">
                <div class="info-header">Generative AI Engineer Positions</div>
                <div style="display:flex;align-items:flex-end;height:120px;gap:2rem;padding:1rem 0;">
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--navy);margin-bottom:0.5rem;">55</span>
                        <div style="height:5px;background:var(--navy-light);width:100%;border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">2021</span>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--green);margin-bottom:0.5rem;">~10,000</span>
                        <div style="height:100px;background:var(--green);width:100%;border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">2025</span>
                    </div>
                </div>
            </div>

            <div class="infographic-box">
                <div class="info-header">Top AI Employers (Q1 2025)</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">Amazon</div>
                        <div class="bar-track"><div class="bar-fill" style="width:100%;background:var(--navy);"></div></div>
                        <div class="info-change">781 roles</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Apple</div>
                        <div class="bar-track"><div class="bar-fill" style="width:85%;background:var(--navy-light);"></div></div>
                        <div class="info-change">663 roles</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">TikTok</div>
                        <div class="bar-track"><div class="bar-fill" style="width:79%;background:var(--red);"></div></div>
                        <div class="info-change">617 roles</div>
                    </div>
                </div>
            </div>

            <p>Non-IT roles requiring generative AI capabilities grew 9 times between 2022 and 2024, while IT-related roles experienced a 35 times increase in demand. This suggests that AI competency is becoming a baseline requirement across industries.</p>
        `},{id:"business-2",type:"standard",category:"Business",title:"Green Energy Investments Surpass Fossil Fuels for the First Time",excerpt:"A historic shift in global capital allocation marks a turning point for the renewable energy sector.",author:"Business Desk",time:"Dec 19, 2025",image:"https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"5 min read",contentHTML:`
            <p class="drop-cap">Renewable energy capacity installation accelerated dramatically in 2024, with at least 240 gigawatts of utility-scale solar and wind capacity becoming operational globally. This is equivalent to adding the total electrical capacity of a large developed nation in a single year.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--green);">2024 Renewable Milestones</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">New Capacity Added</span>
                        <span class="stat-big" style="color:var(--green);">240 GW</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Global Pipeline</span>
                        <span class="stat-big">4.4 TW</span>
                        <span class="stat-label positive">+20% YoY</span>
                    </div>
                </div>
            </div>

            <h3>U.S. Historic Milestone</h3>
            <p>The United States achieved a historic milestone in 2024: for the first time, solar and wind power generation exceeded coal output in the first seven months of the year. The nation now operates 274 gigawatts of combined solar and wind capacity.</p>

            <div class="infographic-box">
                <div class="info-header">U.S. Clean Energy Deployment (2024)</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">Solar</div>
                        <div class="bar-track"><div class="bar-fill success" style="width:67%;"></div></div>
                        <div class="info-change">33 GW</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Storage</div>
                        <div class="bar-track"><div class="bar-fill" style="width:22%;background:var(--navy);"></div></div>
                        <div class="info-change">11 GW</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Wind</div>
                        <div class="bar-track"><div class="bar-fill" style="width:10%;background:var(--navy-light);"></div></div>
                        <div class="info-change">5 GW</div>
                    </div>
                </div>
                <div class="stat-label" style="margin-top:1rem;text-align:center;">Clean energy = 93% of all new capacity</div>
            </div>

            <p>India has maintained consistent momentum, adding at least 10 gigawatts of new solar capacity annually since 2021, and achieving over 109 gigawatts of total installed renewable capacity by December 2024.</p>

            <blockquote class="pull-quote">Even if the entire 4.4 terawatt pipeline reaches operational status by 2030, it would fall short of the 9 terawatt capacity required to meet COP28 commitments.</blockquote>
        `},{id:"world-2",type:"standard",category:"World",title:"Record Carbon Emissions Despite Renewable Energy Expansion",excerpt:"Global CO2 hit 37.4 gigatons in 2024, a 0.8% increase despite clean energy growth.",author:"Environment Corresp.",time:"Dec 18, 2025",image:"https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"7 min read",contentHTML:`
            <p class="drop-cap">The world's carbon dioxide emissions reached an unprecedented 37.4 gigatons in 2024, representing a 0.8 percent increase from 2023. This is particularly alarming given widespread renewable energy expansion.</p>

            <div class="infographic-box" style="background:#fef2f2;border:1px solid #fecaca;">
                <div class="info-header" style="color:var(--red);">Carbon Crisis in Numbers</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">2024 CO2 Emissions</span>
                        <span class="stat-big" style="color:var(--red);">37.4 GT</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Total with Land Use</span>
                        <span class="stat-big" style="color:var(--red);">41.6 GT</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Atmospheric CO2</span>
                        <span class="stat-big">422.5 ppm</span>
                        <span class="stat-label negative">+52% vs pre-industrial</span>
                    </div>
                </div>
            </div>

            <h3>Geographic Breakdown</h3>
            <p>The geographic breakdown reveals critical disparities:</p>
            
            <div class="infographic-box">
                <div class="info-header">Emissions by Major Economy (2024)</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">China</div>
                        <div class="bar-track"><div class="bar-fill accent" style="width:100%;"></div></div>
                        <div class="info-change">32% of global (+0.2%)</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">USA</div>
                        <div class="bar-track"><div class="bar-fill success" style="width:45%;"></div></div>
                        <div class="info-change positive">-0.6% (coal decline)</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">India</div>
                        <div class="bar-track"><div class="bar-fill" style="width:55%;background:var(--navy);"></div></div>
                        <div class="info-change negative">+4.6% (industrialization)</div>
                    </div>
                </div>
            </div>

            <p>This divergence highlights a painful truth: wealthy nations are beginning to decouple growth from emissions, while developing economies are still in the growth-intensive phase where carbon production remains tightly linked to economic progress.</p>

            <blockquote class="pull-quote">The gap between current emissions trajectories and climate targets has widened, making the 2030 net-zero goals increasingly out of reach.</blockquote>
        `},{id:"tech-3",type:"standard",category:"Tech",title:"Cybersecurity Threats Reach Unprecedented Scale",excerpt:"3,158 data breaches in the U.S. alone, compromising over 1.35 billion individuals.",author:"Tech Bureau",time:"2 days ago",image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"6 min read",contentHTML:`
            <p class="drop-cap">Cybersecurity threats in 2024 reached alarming proportions, with 3,158 data breaches occurring in the United States alone, compromising over 1.35 billion individuals across breaches, leakages, and exposures.</p>

            <div class="infographic-box" style="background:var(--navy);color:white;">
                <div class="info-header" style="color:var(--red);">2024 Cyber Threat Landscape</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label" style="color:rgba(255,255,255,0.7);">U.S. Data Breaches</span>
                        <span class="stat-big" style="color:var(--red);">3,158</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label" style="color:rgba(255,255,255,0.7);">Individuals Affected</span>
                        <span class="stat-big">1.35B</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label" style="color:rgba(255,255,255,0.7);">Avg. Cost per Breach</span>
                        <span class="stat-big">$4.88M</span>
                    </div>
                </div>
            </div>

            <h3>Attack Volume Explosion</h3>
            <p>Attack volume accelerated dramatically. Amazon reported that tracked potential cyber threats surged from 100 million to 750 million per day in just six to seven months—a 650 percent increase in threat volume.</p>

            <div class="infographic-box">
                <div class="info-header">Threat Growth Metrics</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">DDoS Attacks</div>
                        <div class="bar-track"><div class="bar-fill accent" style="width:46%;"></div></div>
                        <div class="info-change negative">+46% H1 2024</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Phishing (post-ChatGPT)</div>
                        <div class="bar-track"><div class="bar-fill accent" style="width:100%;"></div></div>
                        <div class="info-change negative">+4,151%</div>
                    </div>
                </div>
            </div>

            <p>The National Public Data breach was the second-largest in history, stealing 2.9 billion records from individuals in the United States, United Kingdom, and Canada.</p>

            <blockquote class="pull-quote">Despite enormous security investment, the velocity of attacks now exceeds organizations' ability to defend themselves comprehensively.</blockquote>
        `},{id:"business-3",type:"standard",category:"Business",title:"E-Commerce Sales Continue Accelerating, Driven by Mobile Shopping",excerpt:"Global e-commerce reached $6.09 trillion in 2024, with mobile driving 77% of traffic.",author:"Finance Desk",time:"Dec 17, 2025",image:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"5 min read",contentHTML:`
            <p class="drop-cap">Global e-commerce sales reached $6.09 trillion in 2024, growing 8.4 percent year-over-year, outpacing total retail growth of 4.9 percent. This divergence illustrates the irreversible shift in consumer behavior toward online purchasing.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--green);">E-Commerce Growth</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">2024 Sales</span>
                        <span class="stat-big" style="color:var(--green);">$6.09T</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">YoY Growth</span>
                        <span class="stat-big positive">+8.4%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">2028 Projection</span>
                        <span class="stat-big">$8.09T</span>
                    </div>
                </div>
            </div>

            <h3>Mobile Commerce Dominates</h3>
            <p>Mobile commerce is the primary growth driver, with mobile device sales projected to reach $2.07 trillion in 2024—a 21 percent increase from 2023. Mobile phones now account for 77 percent of e-commerce website visits.</p>

            <div class="infographic-box">
                <div class="info-header">E-Commerce Share of Retail</div>
                <div style="display:flex;align-items:flex-end;height:100px;gap:2rem;padding:1rem 0;">
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--navy);margin-bottom:0.5rem;">19%</span>
                        <div style="height:60px;background:var(--navy-light);width:100%;border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">2024</span>
                    </div>
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;text-align:center;">
                        <span style="font-weight:700;color:var(--green);margin-bottom:0.5rem;">22.5%</span>
                        <div style="height:90px;background:var(--green);width:100%;border-radius:4px;"></div>
                        <span class="stat-label" style="margin-top:0.5rem;">2028</span>
                    </div>
                </div>
            </div>

            <p>Geographic concentration remains pronounced: China, the United States, and Western Europe account for 80.5 percent of global e-commerce sales.</p>

            <blockquote class="pull-quote">Within four years, roughly one in four retail purchases will occur online.</blockquote>
        `},{id:"opinion-2",type:"standard",category:"Opinion",title:"India's Education System Serves 248 Million Students Amid Digital Transformation",excerpt:"Smartphone availability in rural India surged from 36% in 2018 to 67% in 2024.",author:"Education Desk",time:"Yesterday",image:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2600&q=80",readTime:"6 min read",contentHTML:`
            <p class="drop-cap">India operates one of the world's largest education systems, serving 248 million students across 1.472 million schools staffed by 98 million teachers as of the 2023-24 school year. This massive scale presents both extraordinary opportunities and significant challenges.</p>

            <div class="infographic-box">
                <div class="info-header" style="color:var(--navy);">India's Education Scale</div>
                <div class="stat-grid">
                    <div class="stat-item">
                        <span class="stat-label">Students</span>
                        <span class="stat-big">248M</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Schools</span>
                        <span class="stat-big">1.47M</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Teachers</span>
                        <span class="stat-big">98M</span>
                    </div>
                </div>
            </div>

            <h3>Digital Infrastructure Growth</h3>
            <p>Smartphone availability in rural Indian households has surged from 36 percent in 2018 to 67 percent in 2024. However, only 31 percent of students report regular device access for learning purposes.</p>

            <div class="infographic-box">
                <div class="info-header">School Infrastructure Progress (2019-2024)</div>
                <div class="bar-chart-container">
                    <div class="bar-row">
                        <div class="bar-label">Computers</div>
                        <div class="bar-track"><div class="bar-fill success" style="width:57%;"></div></div>
                        <div class="info-change">38.5% → 57.2%</div>
                    </div>
                    <div class="bar-row">
                        <div class="bar-label">Internet</div>
                        <div class="bar-track"><div class="bar-fill success" style="width:54%;"></div></div>
                        <div class="info-change">22.3% → 53.9%</div>
                    </div>
                </div>
            </div>

            <p>At the higher education level, enrollment reached 43.3 crore (433 million) students in 2021-22, representing a 26.5 percent increase from 34.2 crore in 2014-15. The gross enrollment ratio for the 18-23 age group increased from 23.7 percent to 28.4 percent.</p>

            <blockquote class="pull-quote">Achieving the 2035 target of 50% gross enrollment ratio will require doubling the educational network and infrastructure.</blockquote>
        `}];export{c as B,w as H,A as S,S as s};
