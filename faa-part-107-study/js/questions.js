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
    explanation: "The certificate requires age 16. The ACS notes that an applicant must be at least 14 to take the knowledge test.",
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
    explanation: "The study guide says decreasing or rapidly falling pressure usually indicates approaching bad weather and possibly severe storms, while rising pressure generally indicates fair weather.",
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
      "Illness, Medication, Stress, Alcohol, Fatigue, Emotion",
      "Instruments, Maps, Speed, Altitude, Fuel, Engine",
      "Intent, Method, Safety, Altitude, Flight, Environment",
      "Inspection, Monitoring, Safety, Fuel, Equipment"
    ],
    answer: 0,
    explanation: "IMSAFE is a personal fitness self-check: Illness, Medication, Stress, Alcohol, Fatigue, and Emotion, as listed in the FAA Remote Pilot Study Guide.",
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
    explanation: "Anti-authority rejects rules and instructions. The study guide's antidote is 'Follow the rules. They are usually right.'",
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
    question: "Which is a common symptom of hyperventilation?",
    choices: ["Visual impairment and lightheadedness", "Increased appetite", "Warm, dry skin only", "Slow, shallow breathing"],
    answer: 0,
    explanation: "Hyperventilation (excessive rate and depth of breathing) lowers carbon dioxide in the blood. Symptoms include visual impairment, lightheadedness, and tingling, and it can lead to unconsciousness.",
    ref: "Study guide Ch. 9; ACS UA.V.E.K4"
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
      "Notice to Airmen (also called Notice to Air Missions)",
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
    explanation: "The study guide says remote pilots should know traffic patterns and radio procedures, always look for other aircraft, and yield right of way to manned aircraft. Radio broadcasts are recommended but not required for remote pilots.",
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
  },

  // ---------- Added from the FAA Remote Pilot Study Guide, ACS, and cheat sheets ----------
  {
    id: "regs-21", topic: "regs",
    question: "Which sUAS category has a weight limit of less than 0.55 lb?",
    choices: ["Category 1", "Category 2", "Category 3", "No category has a weight limit"],
    answer: 0,
    explanation: "Category 1 is limited to less than 0.55 lb. Categories 2 and 3 are limited to less than 55 lb.",
    ref: "Categories cheat sheet; ACS UA.I.E.K3"
  },
  {
    id: "regs-22", topic: "regs",
    question: "Which sUAS category may NOT conduct sustained flights over an open-air assembly of people?",
    choices: ["Category 1", "Category 2", "Category 3", "None of the categories"],
    answer: 2,
    explanation: "Categories 1 and 2 may fly sustained operations over an open-air assembly if they meet Remote ID requirements. Category 3 may not.",
    ref: "Categories cheat sheet; ACS UA.I.E.K3"
  },
  {
    id: "regs-23", topic: "regs",
    question: "After failing the knowledge test, how long must an applicant wait before retaking it?",
    choices: ["24 hours", "7 calendar days", "14 calendar days", "30 calendar days"],
    answer: 2,
    explanation: "An applicant who fails must wait 14 calendar days before retaking the test, and must submit the AKTR before retesting.",
    ref: "107.71; ACS Appendix 1"
  },
  {
    id: "regs-24", topic: "regs",
    question: "How long is an applicant barred from applying for or taking a Part 107 test after cheating or other unauthorized conduct on a knowledge test?",
    choices: ["30 days", "90 days", "One year", "Permanently"],
    answer: 2,
    explanation: "Cheating or unauthorized conduct can lead to certificate revocation and a one-year bar on applying for or taking any Part 107 test.",
    ref: "107.69; ACS Appendix 2"
  },
  {
    id: "ops-09", topic: "ops",
    question: "During an inflight emergency such as a battery fire, may the remote pilot exceed 400 ft AGL?",
    choices: [
      "Yes, if needed to maneuver to a safe landing area",
      "No, never under any circumstance",
      "Only with written ATC approval",
      "Only over water"
    ],
    answer: 0,
    explanation: "The study guide notes a remote pilot may need to climb above 400 ft AGL to reach a safe landing area in an emergency. A report to the FAA is needed only if the FAA asks for one.",
    ref: "Study guide Ch. 5; 107.21"
  },
  {
    id: "ops-10", topic: "ops",
    question: "Which people must be briefed on the flight and the planned emergency procedures?",
    choices: [
      "Only the remote pilot",
      "All crew members, including visual observers and any non-certificated person who manipulates the flight controls",
      "Only certificated pilots",
      "No one; the briefing is optional"
    ],
    answer: 1,
    explanation: "The study guide requires all crew members to be briefed, including visual observers and any non-certificated person allowed to manipulate the flight controls.",
    ref: "Study guide Ch. 5; ACS UA.I.B.K4a"
  },
  {
    id: "ops-11", topic: "ops",
    question: "Which is a safety hazard of lithium batteries used in sUAS?",
    choices: [
      "Fire risk if damaged, overcharged, or improperly stored or charged",
      "Longer life when punctured",
      "No hazard when fully charged",
      "Freezing and expansion at low temperature"
    ],
    answer: 0,
    explanation: "Damaged, overcharged, or mishandled lithium batteries can overheat and catch fire. Follow safe charging, storage, and transport practices.",
    ref: "ACS UA.V.C.K2"
  },
  {
    id: "ops-12", topic: "ops",
    question: "What is a likely effect of losing GPS signal during flight?",
    choices: [
      "Loss of position hold and possible drift, so the pilot may need to fly manually",
      "Automatic landing at the nearest airport",
      "Increased battery endurance",
      "No effect if the aircraft has a compass"
    ],
    answer: 0,
    explanation: "Without GPS the aircraft can drift and lose position hold, and automated return-to-home may not work. The pilot should be ready to fly manually.",
    ref: "ACS UA.V.C.K4"
  },
  {
    id: "ops-13", topic: "ops",
    question: "Which sUAS categories require a Manufacturer's Declaration of Compliance (DoC)?",
    choices: ["Category 1 only", "Categories 2 and 3", "Categories 1, 2, and 3", "None"],
    answer: 1,
    explanation: "Category 1 needs no Means of Compliance (MoC) or DoC. Categories 2 and 3 require both.",
    ref: "Categories cheat sheet; ACS UA.V.F.K7"
  },
  {
    id: "airspace-09", topic: "airspace",
    question: "What does MOA stand for on a sectional chart?",
    choices: ["Military Operations Area", "Major Obstruction Advisory", "Mountain Overflight Area", "Minimum Operating Altitude"],
    answer: 0,
    explanation: "A Military Operations Area separates military training, such as fast jets at low altitude, from IFR traffic. You can fly in a MOA without approval, but exercise caution.",
    ref: "Study guide Ch. 2; special-use airspace summary"
  },
  {
    id: "airspace-10", topic: "airspace",
    question: "On a chart, what does an 'A' prefix followed by a number (for example, A-211) indicate?",
    choices: [
      "An alert area with high volumes of pilot training or unusual aerial activity",
      "An airport with an instrument approach",
      "An area open only to agricultural aircraft",
      "An area of automated weather reporting"
    ],
    answer: 0,
    explanation: "Alert areas warn nonparticipating pilots of high pilot-training activity or unusual aerial activity. You can fly there without approval, but exercise caution.",
    ref: "Study guide Ch. 2; special-use airspace summary"
  },
  {
    id: "airspace-11", topic: "airspace",
    question: "What does a 'W' prefix followed by a number (for example, W-237) designate?",
    choices: ["Warning area", "Weather station", "Wilderness area", "Wind shear zone"],
    answer: 0,
    explanation: "Warning areas contain hazardous activity similar to restricted areas and can extend 3 NM off the U.S. coast. You need approval before flying there.",
    ref: "Study guide Ch. 2; special-use airspace summary"
  },
  {
    id: "airspace-12", topic: "airspace",
    question: "Over wilderness areas, National Parks, or NOAA marine areas, what altitude is the study guide's threshold for requesting operation?",
    choices: ["Above 400 ft AGL", "Above 2,000 ft AGL", "Above 5,000 ft MSL", "Above 10,000 ft MSL"],
    answer: 1,
    explanation: "The study guide lists operating above 2,000 ft AGL over these areas as requiring a request.",
    ref: "Study guide Ch. 2"
  },
  {
    id: "airspace-13", topic: "airspace",
    question: "Class C airspace generally extends up to what altitude above airport elevation?",
    choices: ["1,200 ft", "2,500 ft", "4,000 ft", "10,000 ft"],
    answer: 2,
    explanation: "Class C extends from the surface to 4,000 ft above airport elevation. Its outer circle runs from 1,200 to 4,000 ft. Remote pilots need ATC authorization.",
    ref: "Study guide Ch. 2"
  },
  {
    id: "airspace-14", topic: "airspace",
    question: "Class D airspace generally extends from the surface to how far above airport elevation?",
    choices: ["1,200 ft", "2,500 ft", "4,000 ft", "700 ft"],
    answer: 1,
    explanation: "Class D extends from the surface to 2,500 ft above airport elevation around towered airports. Remote pilots need ATC authorization.",
    ref: "Study guide Ch. 2; Airspace cheat sheet"
  },
  {
    id: "airspace-15", topic: "airspace",
    question: "Can a remote pilot fly in a Military Operations Area (MOA) without approval?",
    choices: [
      "Yes, but exercise caution",
      "No, approval is always required",
      "Only at night",
      "Only with a visual observer"
    ],
    answer: 0,
    explanation: "MOAs do not require approval, but fast military aircraft may operate at very low altitude, so exercise caution.",
    ref: "Special-use airspace summary"
  },
  {
    id: "airspace-16", topic: "airspace",
    question: "Which special-use airspace is flyable without approval, with activity stopped when spotters see an aircraft in the area?",
    choices: ["Prohibited area", "Restricted area", "Controlled firing area", "Warning area"],
    answer: 2,
    explanation: "Controlled firing areas contain activity hazardous to nonparticipants. Spotters stop the activity when they see an aircraft, and CFAs are not depicted on the chart.",
    ref: "Study guide Ch. 2; special-use airspace summary"
  },
  {
    id: "airspace-17", topic: "airspace",
    question: "Which special-use airspace can you NOT fly in without approval?",
    choices: ["Alert area", "Military Operations Area", "Controlled firing area", "Prohibited area"],
    answer: 3,
    explanation: "Prohibited areas (P-) are established for security reasons, and flight is not allowed without approval. Alert areas, MOAs, and CFAs can be flown without approval.",
    ref: "Special-use airspace summary"
  },
  {
    id: "weather-13", topic: "weather",
    question: "In the METAR wind group 14021G26KT, what does G26 mean?",
    choices: ["Wind gusts to 26 knots", "Wind from 260 degrees", "Visibility of 26 miles", "Ceiling of 2,600 feet"],
    answer: 0,
    explanation: "The wind is from 140 degrees at 21 knots, with peak gusts to 26 knots. The letter G marks the gust value.",
    ref: "Study guide Ch. 3a"
  },
  {
    id: "weather-14", topic: "weather",
    question: "In a METAR remark, what does A2970 represent?",
    choices: ["Altimeter setting of 29.70 inHg", "Air temperature of 29.7 °C", "Airport elevation of 2,970 ft", "Visibility of 2.97 statute miles"],
    answer: 0,
    explanation: "The letter A marks the altimeter setting in inches of mercury, so A2970 is 29.70 inHg.",
    ref: "Study guide Ch. 3a"
  },
  {
    id: "weather-15", topic: "weather",
    question: "Which two conditions are necessary for structural icing in flight?",
    choices: [
      "Visible moisture and a temperature of 0 °C or colder where the moisture strikes the aircraft",
      "Clear skies and temperatures above 15 °C",
      "Calm winds and low humidity",
      "Low pressure and high altitude only"
    ],
    answer: 0,
    explanation: "Structural icing needs visible water such as rain or cloud droplets, and a temperature of 0 °C or colder where the moisture strikes the aircraft.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-16", topic: "weather",
    question: "Wind at mountaintop level in excess of 25 knots suggests what?",
    choices: ["Some turbulence", "Smooth, stable air", "Fog formation", "Icing only"],
    answer: 0,
    explanation: "The study guide says 25 knots at mountaintop level suggests some turbulence. Wind over 40 knots across a mountain barrier calls for caution.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-17", topic: "weather",
    question: "In which thunderstorm stage do all thunderstorm hazards reach their greatest intensity?",
    choices: ["Mature stage", "Cumulus stage", "Dissipating stage", "Stratus stage"],
    answer: 0,
    explanation: "Downdrafts, strong gusty surface winds, and precipitation peak in the mature stage. The cumulus stage is updraft-dominated, and the dissipating stage leaves harmless remnants.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-18", topic: "weather",
    question: "A microburst can cause headwind losses of approximately how many knots?",
    choices: ["5 to 10 knots", "30 to 90 knots", "100 to 150 knots", "1 to 2 knots"],
    answer: 1,
    explanation: "A typical microburst produces downdrafts up to 6,000 fpm and headwind losses of 30 to 90 knots, which seriously degrade performance.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-19", topic: "weather",
    question: "Cumulonimbus clouds can contain updrafts and downdrafts that exceed what rate?",
    choices: ["300 fpm", "1,000 fpm", "3,000 fpm", "10,000 fpm"],
    answer: 2,
    explanation: "The study guide notes that updrafts and downdrafts in cumulonimbus clouds can exceed 3,000 fpm.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-20", topic: "weather",
    question: "What is a temperature inversion?",
    choices: [
      "Temperature increasing with altitude",
      "Temperature decreasing with altitude at the standard lapse rate",
      "Temperature equal to the dew point",
      "Temperature always below freezing"
    ],
    answer: 0,
    explanation: "In an inversion, air temperature increases with altitude. Inversions can trap moisture and pollutants, which reduces visibility.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "weather-21", topic: "weather",
    question: "How often are Terminal Aerodrome Forecasts (TAFs) normally issued?",
    choices: ["Once a day", "Twice a day", "Four times a day", "Every hour"],
    answer: 2,
    explanation: "TAFs are issued four times a day, at 0000, 0600, 1200, and 1800Z.",
    ref: "Study guide Ch. 3a"
  },
  {
    id: "weather-22", topic: "weather",
    question: "For aviation purposes, what is a ceiling?",
    choices: [
      "The lowest layer of clouds reported as broken or overcast, or the vertical visibility into an obscuration",
      "The highest cloud layer reported",
      "Surface visibility",
      "The altitude of the freezing level"
    ],
    answer: 0,
    explanation: "A ceiling is the lowest broken or overcast layer, or the vertical visibility into fog or haze.",
    ref: "Study guide Ch. 3b"
  },
  {
    id: "perf-06", topic: "performance",
    question: "In a coordinated level turn at a 60° bank, the load factor is approximately?",
    choices: ["1 G", "2 Gs", "3 Gs", "5.76 Gs"],
    answer: 1,
    explanation: "At a 60° bank the load factor is 2 Gs. At 80° it is 5.76 Gs.",
    ref: "Study guide Ch. 4"
  },
  {
    id: "perf-07", topic: "performance",
    question: "An aircraft with a 50-knot unaccelerated stall speed is loaded to 4 Gs. What is its stall speed?",
    choices: ["25 knots", "50 knots", "100 knots", "200 knots"],
    answer: 2,
    explanation: "Stall speed rises with the square root of the load factor. The square root of 4 is 2, so 50 kt × 2 = 100 kt.",
    ref: "Study guide Ch. 4"
  },
  {
    id: "perf-08", topic: "performance",
    question: "Which term describes an aircraft's capability to respond to the pilot's control, especially regarding flight path and attitude?",
    choices: ["Controllability", "Maneuverability", "Stability", "Load factor"],
    answer: 0,
    explanation: "Controllability is the aircraft's response to pilot control. Maneuverability is the ability to be maneuvered easily while withstanding the stresses of maneuvers.",
    ref: "Study guide Ch. 4"
  },
  {
    id: "nav-05", topic: "nav",
    question: "Lines of longitude (meridians) run in which direction?",
    choices: ["East-west, parallel to the equator", "North-south, from pole to pole", "Diagonally across the chart", "Only around the equator"],
    answer: 1,
    explanation: "Meridians run from the North Pole to the South Pole and are measured east and west from the Prime Meridian.",
    ref: "Study guide Ch. 11"
  },
  {
    id: "nav-06", topic: "nav",
    question: "On a sectional chart, how is magnetic variation shown?",
    choices: ["Broken magenta isogonic lines", "Solid blue circles", "Dotted green rings", "Red arrows along airways"],
    answer: 0,
    explanation: "Isogonic lines connect points of equal magnetic variation and are drawn as broken magenta lines.",
    ref: "Study guide Ch. 11"
  },
  {
    id: "nav-07", topic: "nav",
    question: "How often is the Chart Supplement U.S. revised?",
    choices: ["Every 7 days", "Every 56 days", "Every 6 months", "Once a year"],
    answer: 1,
    explanation: "The Chart Supplement U.S. (formerly the Airport/Facility Directory) is revised every 56 days.",
    ref: "Study guide Ch. 11"
  },
  {
    id: "nav-08", topic: "nav",
    question: "How far horizontally should skeletal antenna structures be avoided?",
    choices: ["At least 500 ft", "At least 1,000 ft", "At least 2,000 ft", "At least 5,000 ft"],
    answer: 2,
    explanation: "Guy wires can extend about 1,500 ft horizontally, so the study guide advises at least 2,000 ft of horizontal separation, with extreme caution below 2,000 ft AGL.",
    ref: "Study guide Ch. 11"
  },
  {
    id: "comms-06", topic: "comms",
    question: "When an ATIS is updated, what changes?",
    choices: ["Its letter code, such as Alpha changing to Bravo", "The airport name", "The runway length", "The tower frequency"],
    answer: 0,
    explanation: "Each ATIS update gets the next letter in the alphabet, so ATIS Alpha is replaced by ATIS Bravo.",
    ref: "Study guide Ch. 11"
  },
  {
    id: "comms-07", topic: "comms",
    question: "A non-towered airport has no UNICOM or FSS. Which frequency should be used?",
    choices: ["122.9 MULTICOM", "121.5 Guard", "118.0 Ground", "135.0 Clearance"],
    answer: 0,
    explanation: "The MULTICOM frequency of 122.9 is used at non-towered airports that have no FSS or UNICOM.",
    ref: "Study guide Ch. 7"
  },
  {
    id: "comms-08", topic: "comms",
    question: "At a non-towered airport, when does the study guide recommend an inbound aircraft make its first 'broadcast in the blind'?",
    choices: ["10 miles out", "1 mile out", "50 miles out", "Only on final approach"],
    answer: 0,
    explanation: "The guide describes broadcasting about 10 miles from the airport, stating the airport name, position, and intentions.",
    ref: "Study guide Ch. 7"
  },
  {
    id: "comms-09", topic: "comms",
    question: "How is the registration N123AB pronounced in aviation radio phraseology?",
    choices: [
      "November One-Two-Three-Alpha-Bravo",
      "Nine-One-Two-Three-A-B",
      "Niner One Two Three Able Baker",
      "Number 123 Alpha Bravo"
    ],
    answer: 0,
    explanation: "Aviation uses the ICAO phonetic alphabet, so N is 'November' and each digit is spoken individually.",
    ref: "Study guide Ch. 7"
  },
  {
    id: "comms-10", topic: "comms",
    question: "At most non-towered airports, which frequency is UNICOM usually on?",
    choices: ["122.8", "122.9", "121.5", "118.1"],
    answer: 0,
    explanation: "Most non-towered airports use UNICOM on 122.8, but always confirm on the sectional chart or Chart Supplement.",
    ref: "Study guide Ch. 7"
  },
  {
    id: "adm-08", topic: "adm",
    question: "Which is a fundamental principle of risk management?",
    choices: [
      "Accept no unnecessary risk",
      "Accept any risk if the mission is important",
      "Make all risk decisions at the highest management level",
      "Manage risk only during preflight planning"
    ],
    answer: 0,
    explanation: "The study guide's first principle is to accept no unnecessary risk. Risk management applies at every stage of the flight, not only preflight.",
    ref: "Study guide Ch. 10"
  },
  {
    id: "adm-09", topic: "adm",
    question: "In the 3P model, what does 3P stand for?",
    choices: ["Perceive, Process, Perform", "Plan, Prepare, Proceed", "Preflight, Pre-takeoff, Postflight", "Pilot, Plane, Passengers"],
    answer: 0,
    explanation: "The 3P model is Perceive the circumstances, Process their impact on safety, and Perform the best course of action.",
    ref: "Study guide Ch. 10"
  },
  {
    id: "adm-10", topic: "adm",
    question: "What is the first step of the DECIDE model?",
    choices: ["Detect", "Decide", "Do", "Evaluate"],
    answer: 0,
    explanation: "DECIDE stands for Detect, Estimate, Choose, Identify, Do, Evaluate. Detect comes first.",
    ref: "Study guide Ch. 10, Figure 10-5"
  },
  {
    id: "adm-11", topic: "adm",
    question: "Which operational pitfall describes fixation on the original destination despite changing conditions?",
    choices: ["Get-there-itis", "Duck-under syndrome", "Mindset", "Peer pressure"],
    answer: 0,
    explanation: "Get-there-itis is a fixation on the original goal or destination while disregarding alternatives.",
    ref: "Study guide Ch. 10, Figure 10-6"
  },
  {
    id: "adm-12", topic: "adm",
    question: "Which hazardous attitude is expressed as 'What's the use?'",
    choices: ["Resignation", "Macho", "Invulnerability", "Impulsivity"],
    answer: 0,
    explanation: "Resignation's antidote is 'I'm not helpless. I can make a difference.'",
    ref: "Study guide Ch. 10, Figure 10-2"
  },
  {
    id: "adm-13", topic: "adm",
    question: "Situational awareness is best described as:",
    choices: [
      "Accurate perception and understanding of all factors that affect safety before, during, and after flight",
      "Having the correct map on the controller",
      "Knowing how many runways an airport has",
      "Reading the flight manual once before flight"
    ],
    answer: 0,
    explanation: "Situational awareness means perceiving and understanding the factors in the five risk elements (flight, pilot, aircraft, environment, and type of operation).",
    ref: "Study guide Ch. 10"
  },
  {
    id: "physio-05", topic: "physio",
    question: "After starting a new prescription or over-the-counter medication, how long should a pilot wait after the first dose before flying?",
    choices: ["2 hours", "8 hours", "48 hours", "7 days"],
    answer: 2,
    explanation: "The study guide advises waiting at least 48 hours after the first dose before flying, to check for side effects.",
    ref: "Study guide Ch. 9"
  },
  {
    id: "physio-06", topic: "physio",
    question: "About what percentage of body weight loss triggers the thirst mechanism?",
    choices: ["0.5%", "2%", "5%", "10%"],
    answer: 1,
    explanation: "Most people become thirsty at about a 1.5-quart fluid deficit, or about 2% of body weight. The thirst mechanism comes late, so drink before you feel thirsty.",
    ref: "Study guide Ch. 9"
  },
  {
    id: "physio-07", topic: "physio",
    question: "What is a recommended way to treat hyperventilation?",
    choices: [
      "Breathe normally; breathing into a paper bag or talking aloud can help",
      "Breathe as fast and deeply as possible",
      "Hold your breath until you feel better",
      "Drink alcohol to calm down"
    ],
    answer: 0,
    explanation: "Restoring normal carbon dioxide levels is the goal. Slowing breathing, breathing into a paper bag, or talking aloud helps.",
    ref: "Study guide Ch. 9"
  },
  {
    id: "physio-08", topic: "physio",
    question: "How much water per hour does the study guide recommend for severe heat stress?",
    choices: ["One quart per hour", "One cup per hour", "Two cups per day", "One pint per hour"],
    answer: 0,
    explanation: "The guide recommends one quart per hour for severe heat stress and one pint per hour for moderate stress.",
    ref: "Study guide Ch. 9"
  }
];
