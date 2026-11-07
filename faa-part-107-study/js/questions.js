// Original practice questions for the FAA Part 107 (remote pilot) knowledge test.
// These are written for study and are NOT copied from the FAA's question pool.
// Always confirm details against 14 CFR Part 107 and the current FAA Remote Pilot
// Study Guide (FAA-G-8082-22) before relying on them.
//
// Fields:
//   id          unique string
//   topic       one of the TOPICS ids in js/logic.js
//   question    prompt text
//   choices     exactly 4 strings
//   answer      index (0-3) of the correct choice
//   explanation why the answer is correct
//   ref         regulation or study-guide reference (optional)

const QUESTION_BANK = [
  // ---------- Regulations (Part 107) ----------
  {
    id: "regs-01", topic: "regs",
    question: "What is the maximum altitude a small UAS may be operated at, unless it is within 400 feet of a structure?",
    choices: ["200 ft AGL", "400 ft AGL", "500 ft AGL", "1,000 ft AGL"],
    answer: 1,
    explanation: "The limit is 400 ft above ground level. Near a structure you may fly up to 400 ft above that structure's top, while staying within 400 ft of it.",
    ref: "107.51"
  },
  {
    id: "regs-02", topic: "regs",
    question: "What is the maximum groundspeed for a small UAS operated under Part 107?",
    choices: ["50 knots", "87 knots (100 mph)", "120 knots", "150 knots"],
    answer: 1,
    explanation: "The limit is 87 knots, which is about 100 mph.",
    ref: "107.51"
  },
  {
    id: "regs-03", topic: "regs",
    question: "What is the minimum age to obtain a Part 107 remote pilot certificate?",
    choices: ["14", "16", "18", "21"],
    answer: 1,
    explanation: "An applicant must be at least 16 years old and pass the aeronautical knowledge test.",
    ref: "14 CFR Part 107, remote pilot certification"
  },
  {
    id: "regs-04", topic: "regs",
    question: "What is the maximum takeoff weight of a small UAS under Part 107, including payload?",
    choices: ["25 lb", "35 lb", "55 lb", "75 lb"],
    answer: 2,
    explanation: "The sUAS, including anything attached to or carried by it, must weigh less than 55 lb at takeoff.",
    ref: "Part 107 definition of small UAS"
  },
  {
    id: "regs-05", topic: "regs",
    question: "How often must a certificated remote pilot complete recurrent knowledge training?",
    choices: ["Every 12 calendar months", "Every 24 calendar months", "Every 36 calendar months", "Every 5 years"],
    answer: 1,
    explanation: "Recurrent training is required every 24 calendar months to keep the certificate current.",
    ref: "14 CFR Part 107, recurrent training"
  },
  {
    id: "regs-06", topic: "regs",
    question: "How many small UAS may one remote pilot in command operate at the same time?",
    choices: ["One", "Two", "Three", "As many as visual observers can watch"],
    answer: 0,
    explanation: "A remote pilot may control only one sUAS at a time, regardless of how many observers are present.",
    ref: "107.35"
  },
  {
    id: "regs-07", topic: "regs",
    question: "Within how many days must you report to the FAA an accident that causes serious injury or more than $500 in property damage?",
    choices: ["2 days", "5 days", "10 days", "30 days"],
    answer: 2,
    explanation: "Report within 10 days. Serious injury, loss of consciousness, or property damage (other than the sUAS) over $500 are reportable.",
    ref: "107.9"
  },
  {
    id: "regs-08", topic: "regs",
    question: "What must the remote pilot do before every flight?",
    choices: [
      "File a flight plan with the FAA",
      "Perform a preflight inspection to confirm the sUAS is in condition for safe operation",
      "Get a weather briefing from Flight Service",
      "Notify the local airport manager in writing"
    ],
    answer: 1,
    explanation: "Part 107 requires a preflight inspection, including the control station, to confirm the sUAS is safe to operate.",
    ref: "107.49"
  },
  {
    id: "regs-09", topic: "regs",
    question: "A manned aircraft approaches your sUAS. What must you do?",
    choices: [
      "Maintain course, since the sUAS has priority",
      "Yield right of way and maneuver to avoid the manned aircraft",
      "Climb to a higher altitude",
      "Land immediately regardless of location"
    ],
    answer: 1,
    explanation: "Always yield right of way to manned aircraft and do not interfere with their operations.",
    ref: "107.37"
  },
  {
    id: "regs-10", topic: "regs",
    question: "Under what condition may a small UAS be operated from a moving vehicle?",
    choices: [
      "Anytime, if the vehicle is moving slowly",
      "Only over a sparsely populated area",
      "Only on a highway",
      "Never"
    ],
    answer: 1,
    explanation: "Operation from a moving vehicle is allowed only over a sparsely populated area.",
    ref: "107.25"
  },
  {
    id: "regs-11", topic: "regs",
    question: "What does visual line of sight (VLOS) require?",
    choices: [
      "Viewing the sUAS through binoculars or FPV goggles",
      "Viewing the sUAS unaided, other than with corrective lenses",
      "Viewing the sUAS only through its camera feed",
      "Keeping the sUAS within one mile of the pilot"
    ],
    answer: 1,
    explanation: "VLOS means the pilot or visual observer can see the sUAS with the unaided eye (corrective lenses are allowed). Binoculars and FPV goggles are not.",
    ref: "107.31"
  },
  {
    id: "regs-12", topic: "regs",
    question: "How long must a remote pilot wait after consuming alcohol before serving as remote pilot in command?",
    choices: ["2 hours", "4 hours", "8 hours", "12 hours"],
    answer: 2,
    explanation: "There must be at least 8 hours between drinking alcohol and the flight. Acting as a remote pilot while under the influence of alcohol is also prohibited.",
    ref: "107.27"
  },
  {
    id: "regs-13", topic: "regs",
    question: "At what blood alcohol concentration or higher is operating a small UAS prohibited?",
    choices: ["0.02", "0.04", "0.06", "0.08"],
    answer: 1,
    explanation: "A blood alcohol concentration of 0.04 or greater is prohibited, and the 8-hour rule also applies.",
    ref: "107.27"
  },
  {
    id: "regs-14", topic: "regs",
    question: "What is required to conduct night operations under Part 107?",
    choices: [
      "Nothing beyond the basic certificate",
      "Completion of updated knowledge training and anti-collision lighting visible for at least 3 statute miles",
      "An FAA waiver for every night flight",
      "A separate night-rated remote pilot certificate"
    ],
    answer: 1,
    explanation: "Night operations require updated knowledge training and anti-collision lights visible for at least 3 statute miles.",
    ref: "107.29"
  },
  {
    id: "regs-15", topic: "regs",
    question: "Under Part 107, daylight operations are permitted during which period?",
    choices: [
      "Official sunrise to official sunset",
      "30 minutes before official sunrise to 30 minutes after official sunset",
      "One hour before sunrise to one hour after sunset",
      "Only when the sun is fully above the horizon"
    ],
    answer: 1,
    explanation: "Daylight operation covers the period from 30 minutes before official sunrise to 30 minutes after official sunset (civil twilight).",
    ref: "107.29"
  },
  {
    id: "regs-16", topic: "regs",
    question: "At what weight must a small UAS be registered with the FAA?",
    choices: [
      "Over 250 grams (0.55 lb)",
      "Over 1 lb",
      "Over 55 lb",
      "There is no weight threshold"
    ],
    answer: 0,
    explanation: "Aircraft weighing more than 250 grams (0.55 lb) must be registered under Part 48, even if the pilot holds a Part 107 certificate.",
    ref: "Part 48"
  },
  {
    id: "regs-17", topic: "regs",
    question: "What is Remote ID?",
    choices: [
      "A GPS service that finds lost drones",
      "A broadcast of the sUAS identification, location, and control station information during flight",
      "A license number printed on the pilot's card",
      "A flight plan filed with air traffic control"
    ],
    answer: 1,
    explanation: "Remote ID broadcasts identification, location, altitude, and control station location so the aircraft can be identified in flight.",
    ref: "Part 89"
  },
  {
    id: "regs-18", topic: "regs",
    question: "Which operation generally requires a waiver under Part 107?",
    choices: [
      "Flying at 350 ft AGL",
      "Flying beyond visual line of sight",
      "Flying in daylight",
      "Flying in Class G airspace"
    ],
    answer: 1,
    explanation: "Beyond visual line of sight (BVLOS) operations require a waiver. Class G airspace and 350 ft AGL are within the standard rules.",
    ref: "107.31"
  },
  {
    id: "regs-19", topic: "regs",
    question: "Who may serve as a visual observer?",
    choices: [
      "Only a licensed pilot",
      "Any person designated by the remote pilot who helps maintain visual line of sight and communicates with the remote pilot",
      "Only another certificated remote pilot",
      "No one; visual observers are prohibited"
    ],
    answer: 1,
    explanation: "A visual observer is any designated person who helps the remote pilot see the aircraft and stays in communication with the pilot.",
    ref: "107.33"
  },
  {
    id: "regs-20", topic: "regs",
    question: "Under the basic rules of Part 107, which people may you NOT fly over?",
    choices: [
      "Only people in a stadium",
      "People not directly participating in the operation, unless an applicable exception applies",
      "Children only",
      "Anyone within 100 feet"
    ],
    answer: 1,
    explanation: "The basic rule prohibits flying over people not directly participating in the operation. Subpart D categories and waivers can change this.",
    ref: "107.39"
  },

  // ---------- Airspace ----------
  {
    id: "airspace-01", topic: "airspace",
    question: "What is required to operate a small UAS in Class B airspace?",
    choices: [
      "Nothing; it is uncontrolled",
      "Prior authorization from air traffic control",
      "A NOTAM only",
      "A phone call to the tower on arrival"
    ],
    answer: 1,
    explanation: "Operations in Class B, Class C, and Class D airspace require prior ATC authorization.",
    ref: "107.41"
  },
  {
    id: "airspace-02", topic: "airspace",
    question: "Which class of airspace is generally uncontrolled and does not require ATC authorization?",
    choices: ["Class B", "Class C", "Class D", "Class G"],
    answer: 3,
    explanation: "Class G is uncontrolled airspace, so no ATC authorization is needed to operate there.",
    ref: "Aeronautical Information Manual"
  },
  {
    id: "airspace-03", topic: "airspace",
    question: "What does LAANC provide?",
    choices: [
      "Near-real-time ATC authorization in controlled airspace for qualifying sUAS flights",
      "A weather forecast for drone flights",
      "Remote ID broadcast",
      "Automatic airspace shutdown when a manned aircraft is nearby"
    ],
    answer: 0,
    explanation: "LAANC (Low Altitude Authorization and Notification Capability) provides near-real-time authorization in controlled airspace for qualifying flights.",
    ref: "FAA LAANC program"
  },
  {
    id: "airspace-04", topic: "airspace",
    question: "What does a 'P' prefix on a special use airspace designation (for example, P-56) indicate?",
    choices: ["Prohibited area", "Practice area", "Parachute area", "Passenger zone"],
    answer: 0,
    explanation: "P-areas are prohibited areas. Flight is not allowed there except as authorized by the controlling agency.",
    ref: "Special use airspace (AIM Chapter 3)"
  },
  {
    id: "airspace-05", topic: "airspace",
    question: "What is a TFR?",
    choices: [
      "Temporary Flight Restriction",
      "Traffic Flow Route",
      "Terminal Flight Review",
      "Transponder Frequency Registration"
    ],
    answer: 0,
    explanation: "A Temporary Flight Restriction is issued by NOTAM and limits flight in a defined area for a set time.",
    ref: "NOTAM / TFR procedures"
  },
  {
    id: "airspace-06", topic: "airspace",
    question: "You are within 400 ft of a structure that is 300 ft AGL. What is the maximum altitude you may fly?",
    choices: ["400 ft AGL", "600 ft AGL", "700 ft AGL", "1,000 ft AGL"],
    answer: 2,
    explanation: "Near a structure you may fly up to 400 ft above the structure's top: 300 ft + 400 ft = 700 ft AGL.",
    ref: "107.51"
  },
  {
    id: "airspace-07", topic: "airspace",
    question: "Operations within the surface area of Class E airspace designated for an airport require what?",
    choices: [
      "Nothing",
      "Prior ATC authorization",
      "Only a weather check",
      "A filed flight plan"
    ],
    answer: 1,
    explanation: "Operations in the surface area of Class E airspace designated for an airport require prior ATC authorization.",
    ref: "107.41"
  },
  {
    id: "airspace-08", topic: "airspace",
    question: "What does a restricted area (designated with an 'R' prefix) mean?",
    choices: [
      "Airspace where flight is restricted and access requires permission from the controlling agency",
      "Airspace with no restrictions",
      "Airspace reserved only for helicopters",
      "Airspace that is open to all aircraft at any time"
    ],
    answer: 0,
    explanation: "Restricted areas contain hazardous activity. Entry requires permission from the controlling agency, and restrictions may apply only at certain times.",
    ref: "Special use airspace (AIM Chapter 3)"
  },

  // ---------- Weather ----------
  {
    id: "weather-01", topic: "weather",
    question: "What are the standard sea-level conditions used in aviation?",
    choices: ["29.92 inHg and 15°C", "29.00 inHg and 20°C", "30.50 inHg and 10°C", "29.92 inHg and 0°C"],
    answer: 0,
    explanation: "Standard sea-level pressure is 29.92 inHg and standard temperature is 15°C (59°F).",
    ref: "FAA Pilot's Handbook of Aeronautical Knowledge, Ch. 4"
  },
  {
    id: "weather-02", topic: "weather",
    question: "The standard temperature lapse rate is approximately:",
    choices: ["1°C per 1,000 ft", "2°C per 1,000 ft", "5°C per 1,000 ft", "10°C per 1,000 ft"],
    answer: 1,
    explanation: "Temperature decreases about 2°C for each 1,000 feet of altitude in the standard atmosphere.",
    ref: "FAA Pilot's Handbook of Aeronautical Knowledge, Ch. 4"
  },
  {
    id: "weather-03", topic: "weather",
    question: "Which condition increases density altitude?",
    choices: ["Low temperature", "High humidity", "Low elevation", "High barometric pressure"],
    answer: 1,
    explanation: "High humidity makes the air less dense, which raises density altitude. High temperature, high elevation, and low pressure also raise it.",
    ref: "Density altitude (PHAK Ch. 4)"
  },
  {
    id: "weather-04", topic: "weather",
    question: "Which is a hazard of thunderstorms to a small UAS?",
    choices: [
      "Microburst downdrafts and wind shear",
      "Ground fog",
      "Dew formation",
      "Haze"
    ],
    answer: 0,
    explanation: "Thunderstorms produce microbursts, wind shear, lightning, hail, and turbulence, all of which can cause loss of control.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "weather-05", topic: "weather",
    question: "Wind direction is reported as the direction the wind is blowing:",
    choices: ["To", "From", "Across the flight path", "At the surface only"],
    answer: 1,
    explanation: "Wind is always named for the direction it comes from. For example, a north wind blows from the north toward the south.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "weather-06", topic: "weather",
    question: "Radiation fog typically forms under which conditions?",
    choices: [
      "Clear, calm nights with the temperature near the dew point",
      "Strong winds over open water",
      "Ahead of a cold front in the afternoon",
      "Above a cloud deck at high altitude"
    ],
    answer: 0,
    explanation: "Radiation fog forms when the ground cools on clear, calm nights and the air near the surface cools to its dew point.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "weather-07", topic: "weather",
    question: "How do cold temperatures affect LiPo batteries?",
    choices: [
      "They increase capacity and voltage",
      "They reduce available capacity and voltage",
      "They have no effect",
      "They cause the battery to overheat"
    ],
    answer: 1,
    explanation: "Cold reduces battery capacity and voltage, so flight time drops and the aircraft may shut down sooner than expected.",
    ref: "Manufacturer guidance; general operations"
  },
  {
    id: "weather-08", topic: "weather",
    question: "A narrowing spread between temperature and dew point most suggests:",
    choices: [
      "Clear skies and increasing visibility",
      "Possible fog, low clouds, or precipitation",
      "Decreasing humidity",
      "A rise in density altitude"
    ],
    answer: 1,
    explanation: "When the temperature and dew point come close together, the air is near saturation, so fog, low clouds, or precipitation become more likely.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "weather-09", topic: "weather",
    question: "Cumulonimbus clouds are associated with:",
    choices: [
      "Thunderstorms and turbulence",
      "Fair weather only",
      "Stable air with smooth ride",
      "Clear skies"
    ],
    answer: 0,
    explanation: "Cumulonimbus clouds are towering storm clouds that bring thunderstorms, lightning, gusty winds, and severe turbulence.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "weather-10", topic: "weather",
    question: "What is the minimum visibility required for small UAS operations under Part 107?",
    choices: ["1 statute mile", "3 statute miles", "5 statute miles", "10 statute miles"],
    answer: 1,
    explanation: "Flight visibility from the control station must be at least 3 statute miles.",
    ref: "107.51"
  },
  {
    id: "weather-11", topic: "weather",
    question: "What is the minimum cloud clearance required under Part 107?",
    choices: [
      "Clear of clouds, 500 ft below and 2,000 ft horizontally",
      "Clear of clouds, 100 ft below and 500 ft horizontally",
      "Clear of clouds, 1,000 ft above and below",
      "There is no cloud requirement"
    ],
    answer: 0,
    explanation: "The sUAS must remain 500 ft below clouds and 2,000 ft horizontally from clouds.",
    ref: "107.51"
  },
  {
    id: "weather-12", topic: "weather",
    question: "Falling barometric pressure most often indicates:",
    choices: [
      "Improving weather",
      "An approaching low-pressure system and possibly deteriorating weather",
      "A stable high-pressure system",
      "Decreasing winds aloft"
    ],
    answer: 1,
    explanation: "Falling pressure usually means a low-pressure system is approaching, which often brings clouds, precipitation, and wind changes.",
    ref: "PHAK Ch. 12"
  },

  // ---------- Loading & Performance ----------
  {
    id: "perf-01", topic: "performance",
    question: "A small UAS weighs 48 lb empty and carries an 8 lb payload. Is it compliant with the 55 lb limit?",
    choices: [
      "Yes, 48 lb is under 55 lb",
      "No, the total is 56 lb, which exceeds 55 lb",
      "Yes, payloads are excluded from the limit",
      "Only with an FAA waiver for payload"
    ],
    answer: 1,
    explanation: "Payload counts toward the total. 48 + 8 = 56 lb, which is over the 55 lb limit.",
    ref: "Part 107 definition of small UAS"
  },
  {
    id: "perf-02", topic: "performance",
    question: "A small UAS flies at a steady 20 mph for 15 minutes. About how far did it travel?",
    choices: ["3 miles", "5 miles", "7.5 miles", "15 miles"],
    answer: 1,
    explanation: "15 minutes is 0.25 hours. 20 mph × 0.25 h = 5 miles.",
    ref: "Basic calculation"
  },
  {
    id: "perf-03", topic: "performance",
    question: "High density altitude primarily reduces:",
    choices: [
      "Rotor thrust and climb performance",
      "Battery color",
      "Radio frequency range",
      "GPS accuracy"
    ],
    answer: 0,
    explanation: "Thinner air produces less lift and thrust from the propellers, so climb rate and hover performance decline.",
    ref: "PHAK Ch. 4"
  },
  {
    id: "perf-04", topic: "performance",
    question: "Adding payload to a small UAS generally does what to flight endurance?",
    choices: ["Increases it", "Decreases it", "Has no effect", "Affects only camera quality"],
    answer: 1,
    explanation: "A heavier aircraft draws more power, so battery endurance and flight time decrease.",
    ref: "General aircraft performance"
  },
  {
    id: "perf-05", topic: "performance",
    question: "An improperly balanced payload (center of gravity out of limits) can cause:",
    choices: [
      "Improved stability",
      "Reduced stability and poor handling",
      "Faster battery charging",
      "A higher service ceiling"
    ],
    answer: 1,
    explanation: "An off-center load can make the aircraft unstable and hard to control. Check the balance before every flight.",
    ref: "Manufacturer guidance; preflight inspection"
  },

  // ---------- Operations & Emergencies ----------
  {
    id: "ops-01", topic: "ops",
    question: "If the control link is lost, what should the aircraft's failsafe generally do?",
    choices: [
      "Continue the mission as planned",
      "Return to home or hover, as set in the configured failsafe",
      "Fly toward the nearest airport",
      "Descend and land wherever it is, regardless of people below"
    ],
    answer: 1,
    explanation: "Know your aircraft's lost-link behavior and set it before flight. Return-to-home or hover are the usual failsafes. Always check that people and obstacles are clear.",
    ref: "Operational risk management"
  },
  {
    id: "ops-02", topic: "ops",
    question: "You get a low-battery warning during a flight. What is the best action?",
    choices: [
      "Continue to finish the mission",
      "Land or return to home promptly",
      "Increase speed to reach the destination sooner",
      "Ignore the warning until the battery is empty"
    ],
    answer: 1,
    explanation: "Land or return home before the battery reaches its critical level, because a sudden power loss can cause a crash.",
    ref: "Operational risk management"
  },
  {
    id: "ops-03", topic: "ops",
    question: "Lightning is observed near your operating area. What should you do?",
    choices: [
      "Continue, since sUAS are not affected by lightning",
      "Land and stay clear of the storm until conditions clear",
      "Climb above the storm",
      "Keep flying low to avoid the lightning"
    ],
    answer: 1,
    explanation: "Thunderstorms and lightning are a serious hazard. Land the aircraft and wait for the storm to clear.",
    ref: "PHAK Ch. 12"
  },
  {
    id: "ops-04", topic: "ops",
    question: "What is the main purpose of crew resource management (CRM)?",
    choices: [
      "Using all available resources to make safe, effective decisions",
      "Assigning blame to crew members after an incident",
      "Reducing the need for preflight checks",
      "Replacing the checklist"
    ],
    answer: 0,
    explanation: "CRM uses teamwork, communication, and every available resource, including people and information, to make safe decisions.",
    ref: "AC 120-51 (CRM concepts)"
  },
  {
    id: "ops-05", topic: "ops",
    question: "What is a visual observer's role?",
    choices: [
      "To operate the aircraft in place of the remote pilot",
      "To help the remote pilot maintain visual line of sight and warn of hazards",
      "To monitor airline traffic only",
      "To record flight data for the FAA"
    ],
    answer: 1,
    explanation: "A visual observer helps the remote pilot keep the sUAS in sight and reports hazards. The observer does not control the aircraft.",
    ref: "107.33"
  },
  {
    id: "ops-06", topic: "ops",
    question: "A compass shows interference from nearby metal structures. What should you do?",
    choices: [
      "Ignore it",
      "Move away from the interference and recalibrate before flying",
      "Fly faster to get through the area",
      "Turn off all lights on the aircraft"
    ],
    answer: 1,
    explanation: "Compass interference can cause the aircraft to drift or fly erratically. Move away from the source and recalibrate.",
    ref: "Manufacturer guidance; preflight inspection"
  },
  {
    id: "ops-07", topic: "ops",
    question: "During an emergency, how far may a remote pilot deviate from Part 107 rules?",
    choices: [
      "Any extent, without reporting",
      "Only to the extent necessary to handle the emergency",
      "Entirely, if the pilot holds a manned pilot certificate",
      "Only with written ATC approval"
    ],
    answer: 1,
    explanation: "A deviation is allowed only as far as necessary to handle the emergency. It may need to be reported to the FAA on request.",
    ref: "107.21"
  },
  {
    id: "ops-08", topic: "ops",
    question: "Which item belongs in a standard preflight check?",
    choices: [
      "Checking battery charge, GPS lock, and propellers for damage",
      "Filing an instrument flight plan",
      "Renewing your medical certificate",
      "Calibrating a transponder"
    ],
    answer: 0,
    explanation: "A preflight check confirms battery level, GPS and satellite lock, propeller and airframe condition, and that the aircraft is ready for flight.",
    ref: "107.49"
  },

  // ---------- Aeronautical Decision-Making ----------
  {
    id: "adm-01", topic: "adm",
    question: "What does PAVE stand for in risk assessment?",
    choices: [
      "Pilot, Aircraft, enVironment, External pressures",
      "Plan, Attitude, Visibility, Equipment",
      "Preflight, Altitude, Velocity, Elevation",
      "Power, Air, Vector, Ensure"
    ],
    answer: 0,
    explanation: "PAVE is a risk checklist: Pilot (you), Aircraft, enVironment (weather and terrain), and External pressures (schedule, people, and other demands).",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-02", topic: "adm",
    question: "What does the IMSAFE checklist cover?",
    choices: [
      "Illness, Medication, Stress, Alcohol, Fatigue, Eating/Emotion",
      "Instruments, Maps, Speed, Altitude, Fuel, Engine",
      "Intent, Method, Safety, Altitude, Flight, Environment",
      "Inspection, Monitoring, Safety, Fuel, Equipment"
    ],
    answer: 0,
    explanation: "IMSAFE is a personal fitness self-check: Illness, Medication, Stress, Alcohol, Fatigue, and Eating/Emotional state.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-03", topic: "adm",
    question: "The attitude 'I can do it' describes which hazardous attitude?",
    choices: ["Anti-authority", "Impulsivity", "Invulnerability", "Macho"],
    answer: 3,
    explanation: "'I can do it' is the Macho attitude, which leads pilots to take unnecessary risks to prove themselves.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-04", topic: "adm",
    question: "The attitude 'It won't happen to me' describes which hazardous attitude?",
    choices: ["Invulnerability", "Resignation", "Impulsivity", "Anti-authority"],
    answer: 0,
    explanation: "'It won't happen to me' is the Invulnerability attitude, which causes pilots to underestimate risk.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-05", topic: "adm",
    question: "The attitude 'Don't tell me what to do' describes which hazardous attitude?",
    choices: ["Anti-authority", "Macho", "Resignation", "Impulsivity"],
    answer: 0,
    explanation: "Anti-authority rejects rules and instructions. The antidote is 'Rules are made to be followed.'",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-06", topic: "adm",
    question: "What is the purpose of a go/no-go decision?",
    choices: [
      "To decide whether a flight should proceed based on defined limits and conditions",
      "To choose the camera settings",
      "To approve the flight plan with the FAA",
      "To select the paint scheme for the aircraft"
    ],
    answer: 0,
    explanation: "A go/no-go decision compares conditions and your readiness against your personal and aircraft limits before you launch.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "adm-07", topic: "adm",
    question: "Which technique is an effective way to reduce operational risk?",
    choices: [
      "Using a written checklist and a preflight plan",
      "Flying faster to finish before the weather arrives",
      "Skipping the battery check to save time",
      "Ignoring warnings from the aircraft"
    ],
    answer: 0,
    explanation: "Checklists and planning catch problems before they become emergencies. Shortcuts and ignored warnings increase risk.",
    ref: "PHAK Ch. 17"
  },

  // ---------- Physiology & Medical ----------
  {
    id: "physio-01", topic: "physio",
    question: "How long does it take the human eye to fully dark-adapt?",
    choices: ["About 1 minute", "About 5 minutes", "About 30 minutes", "About 2 hours"],
    answer: 2,
    explanation: "Full dark adaptation takes roughly 30 minutes. Bright lights, including phone screens, can reset it, which matters for night operations.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "physio-02", topic: "physio",
    question: "Which medical condition can produce a false sensation of motion or spinning?",
    choices: ["Vertigo", "Sunburn", "Mild thirst", "Hiccups"],
    answer: 0,
    explanation: "Vertigo causes false sensations of motion and can cause disorientation. A pilot with vertigo should not fly.",
    ref: "PHAK Ch. 17"
  },
  {
    id: "physio-03", topic: "physio",
    question: "A medication you take causes drowsiness. What should you do before operating a small UAS?",
    choices: [
      "Operate normally",
      "Not operate while impaired by the medication",
      "Take a double dose to stay alert",
      "Operate only if the medication is over the counter"
    ],
    answer: 1,
    explanation: "Never fly while impaired by medication. Drowsiness, dizziness, and slowed reactions all reduce your ability to control the aircraft safely.",
    ref: "107.27; PHAK Ch. 17"
  },
  {
    id: "physio-04", topic: "physio",
    question: "Fatigue primarily affects which pilot abilities?",
    choices: [
      "Reaction time and decision-making",
      "Fuel consumption",
      "Battery voltage",
      "Wind measurement"
    ],
    answer: 0,
    explanation: "Fatigue slows reaction time, weakens judgment, and reduces attention, which increases the chance of errors.",
    ref: "PHAK Ch. 17"
  },

  // ---------- Charts & Navigation ----------
  {
    id: "nav-01", topic: "nav",
    question: "What is the scale of a standard VFR sectional chart?",
    choices: ["1:250,000", "1:500,000", "1:1,000,000", "1:100,000"],
    answer: 1,
    explanation: "Sectional charts are drawn at 1:500,000 scale.",
    ref: "Aeronautical chart user's guide"
  },
  {
    id: "nav-02", topic: "nav",
    question: "How many satellites are minimally needed for a 3-D GPS position fix?",
    choices: ["2", "3", "4", "6"],
    answer: 2,
    explanation: "Four satellites are needed to determine latitude, longitude, and altitude (a 3-D fix).",
    ref: "GPS fundamentals"
  },
  {
    id: "nav-03", topic: "nav",
    question: "Zulu time is equivalent to which time standard?",
    choices: ["UTC", "Local standard time", "Eastern Daylight Time", "Pacific Time"],
    answer: 0,
    explanation: "Zulu (Z) time is Coordinated Universal Time (UTC), the standard reference time in aviation.",
    ref: "PHAK Ch. 9"
  },
  {
    id: "nav-04", topic: "nav",
    question: "Lines of latitude run in which direction?",
    choices: [
      "North-south, meeting at the poles",
      "East-west, parallel to the equator",
      "Diagonally across the chart",
      "Toward the magnetic north pole"
    ],
    answer: 1,
    explanation: "Latitude lines are parallel to the equator and run east-west. Longitude lines (meridians) run north-south.",
    ref: "PHAK Ch. 9"
  },

  // ---------- Airport Ops & Communications ----------
  {
    id: "comms-01", topic: "comms",
    question: "At an uncontrolled airport, which frequency do you use to announce your position and intentions?",
    choices: ["CTAF", "ATIS", "Guard 121.5 only", "Ground control"],
    answer: 0,
    explanation: "The Common Traffic Advisory Frequency (CTAF) is used at uncontrolled airports to broadcast position and intentions.",
    ref: "AIM Chapter 4"
  },
  {
    id: "comms-02", topic: "comms",
    question: "What is a NOTAM?",
    choices: [
      "Notice to Air Missions",
      "Notice to Aircraft Maintenance",
      "Notification of Traffic and Maps",
      "Non-Operational Airport Map"
    ],
    answer: 0,
    explanation: "A NOTAM (Notice to Air Missions) warns of temporary hazards, changes, and restrictions such as TFRs.",
    ref: "AIM Chapter 5"
  },
  {
    id: "comms-03", topic: "comms",
    question: "You are operating near an airport traffic pattern. What should you do?",
    choices: [
      "Fly through the pattern without coordinating",
      "Stay clear of the traffic pattern and avoid interfering with manned aircraft",
      "Land on the runway to get out of the way",
      "Fly at 1,000 ft to stay above the pattern"
    ],
    answer: 1,
    explanation: "Do not interfere with manned traffic. Stay out of the pattern and yield right of way to manned aircraft.",
    ref: "107.37; 107.41"
  },
  {
    id: "comms-04", topic: "comms",
    question: "What does ATIS provide?",
    choices: [
      "Recorded airport weather and runway information",
      "Radar vectors for arriving aircraft",
      "Clearances to enter Class B airspace",
      "Maintenance records for the aircraft"
    ],
    answer: 0,
    explanation: "ATIS (Automatic Terminal Information Service) is a recording of current weather, active runways, and other airport information.",
    ref: "AIM Chapter 4"
  },
  {
    id: "comms-05", topic: "comms",
    question: "Class D airspace typically surrounds which type of airport?",
    choices: [
      "An airport with an operating control tower",
      "An uncontrolled grass airstrip",
      "A heliport on a mountain",
      "A military training area"
    ],
    answer: 0,
    explanation: "Class D airspace surrounds towered airports, and operations there require prior ATC authorization.",
    ref: "107.41; AIM Chapter 3"
  }
];
