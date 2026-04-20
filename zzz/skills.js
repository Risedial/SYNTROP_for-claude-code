export const skills = [
  {
    id: "skill-cpr-adult-1rescuer",
    skillName: "Adult CPR — 1 Rescuer",
    category: "CPR",
    objective: "Evaluator assesses whether the rescuer can independently perform the complete adult CPR sequence — from scene safety through EMS activation and sustained compressions-to-ventilations — at correct rate, depth, and ratio.",
    steps: [
      "1. Ensure scene safety — scan for traffic, electrical hazards, unstable surfaces, or ongoing threats before approaching.",
      "2. Tap the patient's shoulders firmly and shout 'Are you okay?' to check for responsiveness.",
      "3. If unresponsive, shout for help and direct a bystander to call 9-1-1 and retrieve an AED.",
      "4. If alone, call 9-1-1 yourself (speakerphone if available) before beginning CPR, unless the patient is a child or infant — in that case perform 2 minutes of CPR first.",
      "5. Position the patient supine on a firm, flat surface. Kneel at the patient's side, level with the chest.",
      "6. Open the airway using head-tilt chin-lift: place one hand on the forehead, two fingers under the bony part of the chin, and tilt the head back to a neutral-plus position.",
      "7. Look, listen, and feel for normal breathing for no more than 10 seconds. Agonal gasps do not count as normal breathing.",
      "8. If no normal breathing, give 2 rescue breaths: create a seal over the patient's mouth, pinch the nose, and deliver each breath over 1 second — just enough to see chest rise.",
      "9. Place the heel of your dominant hand on the centre of the chest (lower half of the sternum). Place your other hand on top, interlace fingers, and keep fingers off the ribs.",
      "10. Position shoulders directly over hands, arms straight, and compress the chest 2–2.4 inches (5–6 cm) at a rate of 100–120 compressions per minute.",
      "11. Allow full chest recoil after each compression — do not lean on the chest.",
      "12. Deliver 30 compressions, then 2 rescue breaths (30:2 ratio). One cycle = 30 compressions + 2 breaths.",
      "13. Continue CPR cycles without stopping until: the AED arrives and is ready to use, another trained rescuer takes over, the patient shows obvious signs of life, or EMS personnel assume care.",
      "14. When the AED arrives, apply pads as soon as possible and follow AED prompts without interrupting CPR until the AED says 'Analyzing.'"
    ],
    commonErrors: [
      "Compression depth insufficient — hands move but chest does not compress 2–2.4 inches; often caused by locked elbows bending under load.",
      "Incomplete chest recoil — rescuer leans on chest between compressions, preventing venous return.",
      "Ventilations delivered too forcefully or too quickly, causing gastric inflation and regurgitation risk.",
      "Pauses longer than 10 seconds between compressions and ventilations, significantly reducing coronary perfusion pressure.",
      "Checking pulse for longer than 10 seconds or rechecking pulse repeatedly, delaying return to compressions."
    ],
    evaluationCriteria: [
      "Scene safety verbalized or demonstrated before patient contact.",
      "Responsiveness checked with tap-and-shout before initiating CPR.",
      "9-1-1 called (or directed to a bystander) prior to or immediately at onset of CPR.",
      "Compression rate maintained between 100–120 per minute (evaluator counts over 30-second interval).",
      "Compression depth reaches 2–2.4 inches on every compression (evaluator may use feedback device).",
      "Full chest recoil observed between compressions — no sustained pressure on sternum.",
      "30:2 compression-to-ventilation ratio maintained consistently throughout assessment.",
      "Each rescue breath delivered over approximately 1 second with visible chest rise."
    ]
  },
  {
    id: "skill-cpr-adult-2rescuer",
    skillName: "Adult CPR — 2 Rescuer",
    category: "CPR",
    objective: "Evaluator assesses whether both rescuers can coordinate roles, maintain 30:2 ratio with minimal interruption, and execute a seamless compressor switch without exceeding a 10-second pause.",
    steps: [
      "1. Rescuer 1 arrives first: ensure scene safety, check responsiveness (tap and shout), activate EMS, and begin 30 compressions at the correct rate and depth.",
      "2. Rescuer 2 arrives: immediately retrieves or prepares the AED and takes position at the patient's head.",
      "3. Rescuer 2 opens the airway (head-tilt chin-lift), prepares a barrier device, and delivers 2 rescue breaths after every 30 compressions from Rescuer 1.",
      "4. Both rescuers verbally confirm the 30:2 ratio and establish a counting rhythm — Rescuer 1 counts aloud to keep both synchronized.",
      "5. Rescuer 2 monitors compression quality from the head position and provides feedback if depth or rate drifts.",
      "6. After every 5 cycles (approximately 2 minutes), Rescuer 2 calls the switch: 'Switching after this breath.'",
      "7. Rescuer 1 delivers 2 breaths; Rescuer 2 moves to the chest and locates hand position. Rescuer 1 moves to the head. The switch must be completed within 10 seconds.",
      "8. Rescuer 2 (now compressor) resumes compressions immediately and counts aloud. Rescuer 1 (now ventilator) reassumes airway management.",
      "9. When the AED is ready, Rescuer 2 applies pads while Rescuer 1 continues compressions. Pause CPR only when the AED says 'Analyzing.'",
      "10. Resume CPR immediately after shock delivery or if no shock advised — compressor begins compressions first, ventilator opens airway second.",
      "11. Continue rotating roles every 2 minutes (5 cycles) to prevent compressor fatigue.",
      "12. Cease CPR only upon AED achieving ROSC indication, patient shows obvious signs of life, or EMS assumes care."
    ],
    commonErrors: [
      "Compressor fails to count aloud, causing ventilator to deliver breaths out of sync or too early.",
      "Switch takes longer than 10 seconds, resulting in significant drop in coronary perfusion pressure.",
      "Ventilator forgets to open the airway between breaths, delivering air into a closed or partially closed airway.",
      "Rescuers talk during compressions rather than at designated transition points, creating unnecessary pauses.",
      "New compressor resumes at incorrect hand placement after the switch — fails to re-locate lower half of sternum."
    ],
    evaluationCriteria: [
      "Role assignment communicated verbally within the first 30 seconds of two-rescuer operation.",
      "Compression rate remains 100–120 per minute regardless of which rescuer is compressing.",
      "30:2 ratio maintained — ventilator does not deliver breaths during compressions.",
      "Compressor switch completed within 10 seconds without an extended pause in compressions.",
      "Chest recoil is complete after each compression by both rescuers.",
      "Each rescue breath by the ventilator produces visible chest rise.",
      "AED pads applied without stopping compressions until 'Analyzing' prompt is given."
    ]
  },
  {
    id: "skill-cpr-child-1rescuer",
    skillName: "Child CPR — 1 Rescuer",
    category: "CPR",
    objective: "Evaluator assesses whether the rescuer applies child-specific CPR adaptations — including 2 minutes of CPR before calling EMS when alone, one-hand compression option, and age-appropriate depth — throughout the full sequence.",
    steps: [
      "1. Ensure scene safety before approaching.",
      "2. Tap the child's shoulder and shout 'Are you okay?' to check responsiveness.",
      "3. If unresponsive and alone, shout for help. If no one responds, perform 2 minutes (5 cycles) of CPR before leaving to call 9-1-1.",
      "4. If a bystander is present, direct them to call 9-1-1 and get an AED immediately while you begin CPR.",
      "5. Position the child supine on a firm surface. Kneel at the child's side.",
      "6. Open the airway using head-tilt chin-lift. In children, avoid over-extending the head — a neutral-plus position is sufficient.",
      "7. Look, listen, and feel for normal breathing for no more than 10 seconds. Agonal gasps are not normal breathing.",
      "8. Deliver 2 rescue breaths: seal over the mouth, pinch nose, blow over 1 second just until chest rises. Avoid over-inflating.",
      "9. Place the heel of one hand on the lower half of the sternum. A second hand may be placed on top for a larger child if needed.",
      "10. Compress to a depth of approximately 2 inches (5 cm) at a rate of 100–120 compressions per minute.",
      "11. Allow full chest recoil after each compression without leaning on the chest.",
      "12. Deliver 30 compressions followed by 2 rescue breaths (30:2 ratio).",
      "13. After 5 cycles (approximately 2 minutes), if alone, call 9-1-1 now if not yet done and return immediately to CPR.",
      "14. When AED arrives, use pediatric pads or pediatric mode if available. If not, adult pads may be used — ensure pads do not touch each other.",
      "15. Continue CPR until AED is ready to analyze, signs of life appear, or EMS assumes care."
    ],
    commonErrors: [
      "Calling 9-1-1 before completing 2 minutes of CPR when alone with a child — priority reversal from adult protocol causes critical delay in CPR for the most likely reversible cause (respiratory).",
      "Over-tilting the head during head-tilt chin-lift, which can kink a child's more pliable trachea.",
      "Using two-hand adult technique on a small child, causing excessive force and potential injury.",
      "Delivering rescue breaths too forcefully, causing gastric inflation and regurgitation.",
      "Failing to switch to pediatric AED pads or mode when available."
    ],
    evaluationCriteria: [
      "Rescuer verbalizes or demonstrates 2-minute CPR-first rule when alone before calling 9-1-1.",
      "Compression depth reaches approximately 2 inches on every compression.",
      "Compression rate maintained between 100–120 per minute.",
      "One-hand technique used appropriately for the patient's size; two hands acceptable for larger children.",
      "Full chest recoil between every compression — no leaning observed.",
      "30:2 ratio consistently maintained.",
      "Rescue breaths are gentle — only enough to see chest rise, not forceful over-inflation.",
      "Pediatric AED pads or mode selected when available."
    ]
  },
  {
    id: "skill-cpr-infant-1rescuer",
    skillName: "Infant CPR — 1 Rescuer",
    category: "CPR",
    objective: "Evaluator assesses whether the rescuer applies infant-specific CPR technique — including the 2-finger or chest encirclement method, brachial pulse check, mouth-to-mouth-and-nose seal, and correct depth — throughout the complete sequence.",
    steps: [
      "1. Ensure scene safety before approaching.",
      "2. Tap the sole of the infant's foot and shout 'Are you okay?' or use stimulation appropriate to the infant's age.",
      "3. If unresponsive: shout for help. If alone, perform 2 minutes of CPR before calling 9-1-1.",
      "4. If a bystander is present, direct them to call 9-1-1 and retrieve an AED while you begin CPR.",
      "5. Place the infant on a firm, flat surface (or cradle the infant on your forearm for transport if necessary).",
      "6. Open the airway using a gentle head-tilt chin-lift — only to a neutral or very slightly extended position. Do not over-tilt.",
      "7. Look, listen, and feel for normal breathing for no more than 10 seconds.",
      "8. Deliver 2 rescue breaths: create a seal over both the mouth AND nose simultaneously, blow gently over 1 second until you see the chest rise.",
      "9. For compressions: place 2 fingers on the centre of the chest just below the nipple line (2-finger technique). Alternatively, use the 2-thumb chest encirclement technique if a second rescuer supports the back.",
      "10. Compress to a depth of approximately 1.5 inches (4 cm) at a rate of 100–120 compressions per minute.",
      "11. Allow full chest recoil after each compression.",
      "12. Deliver 30 compressions followed by 2 rescue breaths (30:2 ratio for 1-rescuer).",
      "13. After 5 cycles, call 9-1-1 if alone and not yet done; return immediately to CPR.",
      "14. When checking pulse, use the brachial artery (inner upper arm) — not the carotid or radial — and check for no more than 10 seconds.",
      "15. When AED arrives, use infant/pediatric pads if available. Place one pad on the chest and one on the back if pads are too large to fit without touching."
    ],
    commonErrors: [
      "Over-tilting the infant's head, kinking the airway — the infant trachea is highly compressible.",
      "Creating a mouth-only seal and missing the nose, leading to insufficient breath delivery and air leak.",
      "Using an adult AED pad configuration instead of pediatric or anterior-posterior placement for infants.",
      "Compressing too deeply beyond 1.5 inches or using full hand pressure, risking internal organ injury.",
      "Checking carotid pulse instead of brachial pulse — carotid is difficult to locate reliably in infants."
    ],
    evaluationCriteria: [
      "Airway opened to neutral or very slight extension — no hyperextension observed.",
      "Mouth-to-mouth-AND-nose seal demonstrated for rescue breaths.",
      "2-finger or 2-thumb encirclement technique used for compressions.",
      "Compression depth reaches approximately 1.5 inches — not deeper.",
      "Compression rate maintained between 100–120 per minute.",
      "Full chest recoil between each compression without leaning.",
      "30:2 ratio maintained throughout.",
      "Brachial pulse check location demonstrated correctly if pulse check is performed."
    ]
  },
  {
    id: "skill-aed-operation",
    skillName: "AED Operation — Full Sequence",
    category: "AED",
    objective: "Evaluator assesses whether the rescuer can power on the AED, apply electrodes correctly, clear the patient for analysis and shock, deliver the shock safely, and resume CPR immediately — including the child/infant pad modification.",
    steps: [
      "1. Retrieve the AED. Open the case and power on the device by pressing the ON button or lifting the lid (model-dependent). The AED will begin providing audio and/or visual prompts.",
      "2. Expose the patient's bare chest. Remove all clothing and underwire bras. Dry excess moisture with a cloth. Remove any medication patches from the pad placement sites.",
      "3. Apply the first electrode pad to the patient's upper-right chest — below the right collarbone, right of the sternum.",
      "4. Apply the second electrode pad to the patient's lower-left chest — below and to the left of the left nipple, on the lateral chest wall.",
      "5. For a child (age 1–8) or infant: use pediatric pads or set the AED to pediatric mode if available. If only adult pads are available, place one pad on the centre of the chest and one on the centre of the back (anterior-posterior placement) to ensure pads do not touch.",
      "6. Connect the electrode cable to the AED if not pre-connected.",
      "7. Announce loudly: 'Analyzing — stand clear!' and visually confirm no one is touching the patient.",
      "8. Allow the AED to complete its rhythm analysis without interruption. Do not touch or move the patient.",
      "9. If the AED advises a shock: announce 'Shock advised — stand clear! I'm clear, you're clear, everybody clear!' Visually scan from head to foot to confirm no contact.",
      "10. Press the SHOCK button when the AED prompts. The patient's muscles will contract briefly.",
      "11. Immediately resume CPR — begin compressions first, starting within 10 seconds of shock delivery. Do not pause to check for a pulse.",
      "12. If the AED advises 'No shock advised': immediately resume CPR and continue for 2 minutes before the next analysis cycle.",
      "13. Continue CPR and AED analysis cycles (2 minutes CPR → analyze → shock if advised → CPR) until EMS arrives or the patient shows clear signs of life.",
      "14. Do not turn off the AED or remove the pads once applied — leave the device running throughout resuscitation."
    ],
    commonErrors: [
      "Failing to call 'Clear!' loudly enough or neglecting to visually scan — risk of shocking a rescuer in contact with the patient.",
      "Touching the patient during AED analysis, which can cause a false reading or inadvertent shock.",
      "Delaying CPR after shock delivery to check pulse — more than 10-second pause significantly reduces survival outcome.",
      "Placing adult pads too close together on a small child such that pads overlap or are within 1 inch of each other, requiring anterior-posterior repositioning.",
      "Not drying a wet chest before pad application, which can cause poor adhesion or arcing between pads."
    ],
    evaluationCriteria: [
      "AED powered on and pads applied to correct anatomical positions without prompting.",
      "Chest prepared — clothing removed, chest dried, patches removed — before pad application.",
      "Loud verbal 'Clear!' call and visual scan of patient contact completed before shock delivery.",
      "Shock button pressed only after AED prompt and confirmed clearance.",
      "CPR resumed within 10 seconds of shock delivery, starting with compressions.",
      "Correct pediatric pad placement (anterior-posterior or pediatric pads) demonstrated when child/infant patient is specified.",
      "AED left powered on with pads attached throughout entire resuscitation sequence."
    ]
  },
  {
    id: "skill-recovery-position",
    skillName: "Recovery Position — Adult",
    category: "Airway",
    objective: "Evaluator assesses whether the rescuer can move an unconscious, breathing adult into a stable lateral recovery position that maintains an open airway and allows drainage of fluids, without causing additional injury.",
    steps: [
      "1. Confirm the patient is unconscious but breathing normally. Do not place an apnoeic (not breathing) patient in the recovery position — begin CPR.",
      "2. Ensure scene safety and activate EMS if not already done.",
      "3. Kneel beside the patient. Remove glasses or bulky items from pockets that could cause injury.",
      "4. Place the patient's near arm (closest to you) at a right angle to the body, elbow bent, palm facing up.",
      "5. Bring the far arm across the patient's chest and hold the back of their hand against the near cheek, palm outward.",
      "6. With your other hand, pull up the far knee so the foot is flat on the ground.",
      "7. While keeping the patient's hand pressed against their cheek, pull the bent knee toward you to roll the patient onto their side facing you.",
      "8. Adjust the upper knee so it is bent at a right angle to stabilize the patient and prevent rolling.",
      "9. Tilt the head back slightly and adjust the hand under the cheek to keep the airway open and the head tilted.",
      "10. Check that the airway is open and that the mouth is angled downward to allow fluid drainage.",
      "11. Monitor breathing continuously. If breathing stops at any point, roll the patient supine and begin CPR immediately.",
      "12. If the patient must remain in recovery position for more than 30 minutes, roll to the opposite side to prevent pressure injury.",
      "13. Stay with the patient and reassure until EMS arrives."
    ],
    commonErrors: [
      "Placing a non-breathing patient in the recovery position instead of starting CPR — the most dangerous error.",
      "Failing to tilt the head back after positioning, allowing the tongue to re-occlude the airway.",
      "Upper leg not bent at a right angle, causing the patient to roll either fully prone or supine.",
      "Not monitoring breathing continuously after positioning — patient's condition can deteriorate rapidly.",
      "Moving a patient with suspected spinal injury into standard recovery position without modifying technique for spinal precautions."
    ],
    evaluationCriteria: [
      "Patient's breathing confirmed before recovery position is initiated — CPR not indicated.",
      "Near arm positioned at right angle before rolling to serve as a rotation stop.",
      "Patient rolled smoothly onto side without head dropping unsupported.",
      "Upper knee bent to 90 degrees, providing stable lateral position.",
      "Head tilted back and mouth angled downward after final positioning.",
      "Rescuer monitors breathing and states action plan if breathing stops.",
      "Spinal precautions verbalized if mechanism of injury suggests possible spinal injury."
    ]
  },
  {
    id: "skill-choking-management",
    skillName: "Choking Management — Adult Conscious, Adult Unconscious, Infant",
    category: "Airway",
    objective: "Evaluator assesses whether the rescuer can recognize complete airway obstruction and apply the correct intervention sequence for a conscious adult, unconscious adult, and infant, including the transition from conscious to unconscious management.",
    steps: [
      "1. ADULT CONSCIOUS — Confirm complete obstruction: ask 'Are you choking?' If the patient cannot speak, cough, or breathe, act immediately.",
      "2. Call or direct someone to call 9-1-1.",
      "3. Lean the patient forward and deliver 5 firm back blows between the shoulder blades using the heel of your hand.",
      "4. Check the patient's mouth after each set of back blows — if an object is visible, remove it. Never perform a blind finger sweep.",
      "5. If obstruction remains after 5 back blows: stand behind the patient, locate the navel and the bottom of the sternum. Position fist (thumb side in) just above the navel and below the xiphoid process.",
      "6. Deliver 5 abdominal thrusts — pull inward and upward in a J-stroke motion.",
      "7. Continue alternating 5 back blows and 5 abdominal thrusts until the object is expelled, the patient becomes unconscious, or the patient can speak/breathe/cough.",
      "8. ADULT UNCONSCIOUS (patient loses consciousness during choking) — lower the patient carefully to the ground. Call 9-1-1 if not already done.",
      "9. Begin CPR — deliver 30 compressions at correct rate and depth.",
      "10. Before delivering rescue breaths, look into the mouth for a visible object. If seen, remove it with a finger sweep. Do not perform a blind finger sweep.",
      "11. Attempt 2 rescue breaths. If chest does not rise, re-tilt the head and attempt again.",
      "12. Continue the CPR cycle, checking for visible objects before each set of ventilations, until the object is expelled or EMS arrives.",
      "13. INFANT CHOKING — Confirm complete obstruction: infant cannot cry, cough, or breathe.",
      "14. Call or direct someone to call 9-1-1.",
      "15. Hold the infant face-down on your forearm, supporting the head lower than the chest. Deliver 5 firm back blows between the shoulder blades using 2–3 fingers.",
      "16. Turn the infant face-up on your forearm, head still lower than chest. Deliver 5 chest thrusts using 2 fingers on the centre of the chest just below the nipple line.",
      "17. Check the mouth after each cycle — remove any visible object. Do not perform blind finger sweeps.",
      "18. Continue alternating 5 back blows and 5 chest thrusts until the object is expelled or the infant becomes unconscious.",
      "19. If the infant becomes unconscious: begin infant CPR sequence, checking for visible objects before each ventilation attempt."
    ],
    commonErrors: [
      "Performing blind finger sweeps — these can push the object deeper into the airway.",
      "Using abdominal thrusts on infants — chest thrusts are required for infants due to anatomical risk of abdominal organ injury.",
      "Delivering abdominal thrusts too low (over the navel) rather than above the navel and below the xiphoid.",
      "Failing to transition to CPR when the choking patient loses consciousness — stopping interventions at that point.",
      "Not looking into the mouth before each ventilation attempt during unconscious adult choking CPR."
    ],
    evaluationCriteria: [
      "Complete airway obstruction confirmed (patient cannot speak, cough, or breathe) before intervention.",
      "Correct sequence demonstrated for adult conscious: 5 back blows alternating with 5 abdominal thrusts.",
      "Transition to CPR with mouth check demonstrated when adult loses consciousness.",
      "Infant back blows delivered with infant face-down and head lower than chest.",
      "Chest thrusts (not abdominal) used for infant — correct finger placement on chest.",
      "No blind finger sweeps performed at any point — objects removed only when visible.",
      "9-1-1 activation demonstrated or verbalized at appropriate point in each scenario."
    ]
  },
  {
    id: "skill-bleeding-control",
    skillName: "Bleeding Control — Direct Pressure, Tourniquet, Wound Packing",
    category: "Bleeding",
    objective: "Evaluator assesses whether the rescuer can control life-threatening extremity and truncal bleeding using direct pressure, wound packing, and tourniquet application in the correct order and technique for the injury presented.",
    steps: [
      "1. Ensure scene safety and don gloves or improvised hand protection before patient contact.",
      "2. Expose the wound — cut or remove clothing as necessary to visualize the injury site.",
      "3. DIRECT PRESSURE — For any bleeding wound: place a sterile dressing or clean cloth directly over the wound. Apply firm, continuous pressure with both hands.",
      "4. Maintain pressure without lifting the dressing. If blood soaks through, add another dressing on top — do not remove the first.",
      "5. If bleeding is controlled, secure the dressing with a bandage and monitor continuously.",
      "6. WOUND PACKING — For deep cavity wounds (junctional wounds at groin/armpit, or deep lacerations) where surface pressure alone is insufficient: pack gauze or cloth directly into the wound cavity.",
      "7. Use fingers to push gauze tightly into the wound, layer by layer, filling the cavity completely.",
      "8. Apply firm direct pressure over the packed wound for at least 3–5 minutes without releasing.",
      "9. TOURNIQUET — For severe, life-threatening extremity bleeding uncontrolled by direct pressure, or for traumatic amputation: apply tourniquet high on the limb (as high as possible on the thigh or upper arm).",
      "10. If using a commercial tourniquet (e.g. CAT): thread the band around the limb, tighten the band until snug, then twist the windlass rod until bleeding stops. Lock the windlass and secure the clip.",
      "11. If improvised: use a wide, non-elastic band (belt, folded triangular bandage — never wire or rope). Apply 2–3 inches above the wound. Tie a half-knot, place a rigid stick or pen on top, tie a full knot over the stick. Twist until bleeding stops.",
      "12. Note the time of tourniquet application and communicate it to EMS. Write the time on the patient's skin or the tourniquet if possible.",
      "13. Do not remove or loosen the tourniquet once applied — this decision is made by medical personnel.",
      "14. Call 9-1-1 immediately for all severe bleeding. Apply supplemental oxygen if available and monitor for shock signs.",
      "15. Keep the patient warm, calm, and still. Reassess and document changes for EMS handoff."
    ],
    commonErrors: [
      "Removing the first dressing to check the wound, which disrupts clot formation and restarts bleeding.",
      "Applying a tourniquet too close to the wound — it must be above the wound, proximal on the limb, not directly on a joint.",
      "Using a narrow improvised tourniquet (wire, rope, shoelace), which creates a pressure point that damages tissue without occluding arterial flow.",
      "Failing to note tourniquet time — this is a critical handoff data point for the receiving hospital.",
      "Applying insufficient pressure during wound packing — superficial packing without full cavity fill does not stop deep bleeding."
    ],
    evaluationCriteria: [
      "Scene safety confirmed and hand protection applied before patient contact.",
      "Wound fully exposed before intervention.",
      "Direct pressure applied with both hands — firm and continuous, no premature release.",
      "Second dressing applied on top of soaked dressing without removing first.",
      "Wound packing technique demonstrated — gauze pushed to bottom of cavity and built up in layers.",
      "Tourniquet placed high on the limb (as high as possible), not directly over a joint or directly at the wound edge.",
      "Tourniquet tightened until bleeding visibly stops.",
      "Time of tourniquet application noted and communicated.",
      "9-1-1 activated for severe bleeding scenario."
    ]
  },
  {
    id: "skill-shock-management",
    skillName: "Shock Management",
    category: "Shock",
    objective: "Evaluator assesses whether the rescuer can recognize the signs of shock, apply correct positioning and warming interventions, and escalate to EMS while continuously monitoring the patient.",
    steps: [
      "1. Ensure scene safety. Don PPE if available.",
      "2. Perform a primary survey (DRABC). Address life-threatening airway, breathing, or bleeding issues before treating for shock.",
      "3. Recognize shock signs: pale, cool, clammy skin; rapid weak pulse; rapid shallow breathing; altered level of consciousness; anxiety or restlessness; thirst; nausea.",
      "4. Call 9-1-1 immediately — shock is a life-threatening emergency requiring hospital-level intervention.",
      "5. Control any obvious source of bleeding using direct pressure or tourniquet.",
      "6. Position the patient supine (lying flat on their back) on a firm surface.",
      "7. Elevate the legs 8–12 inches (20–30 cm) to assist venous return — ONLY if no spinal injury, pelvic fracture, lower limb fracture, or breathing difficulty is suspected.",
      "8. If the patient has a suspected spinal injury, keep them flat and do not move them.",
      "9. If the patient has chest injury, breathing difficulty, or is unconscious, position them in the most comfortable position — do not elevate legs.",
      "10. Keep the patient warm: cover with a blanket, coat, or any available insulating material. Insulate from cold ground.",
      "11. Loosen any restrictive clothing at the neck, chest, and waist.",
      "12. Reassure the patient — tell them help is coming and keep them calm to reduce oxygen demand.",
      "13. Do not give food, water, or any oral fluids — the patient may require surgery.",
      "14. Monitor level of consciousness, pulse, and breathing every 2–3 minutes. Report changes to EMS on arrival.",
      "15. For anaphylactic shock: assist or administer epinephrine auto-injector (EpiPen) immediately if available and prescribed. Call 9-1-1. Lay patient supine with legs elevated. Be prepared to perform CPR if patient deteriorates."
    ],
    commonErrors: [
      "Elevating legs in a patient with suspected spinal injury, pelvic fracture, or breathing difficulty — can worsen these conditions.",
      "Giving oral fluids to a shocked patient — risks aspiration and complicates surgical management.",
      "Positioning the patient upright or seated for comfort — reduces venous return and worsens shock.",
      "Failing to maintain warmth — hypothermia accelerates coagulopathy and worsens shock outcome.",
      "Not calling 9-1-1 early enough — shock is rapidly fatal without definitive care; EMS should be activated at first recognition."
    ],
    evaluationCriteria: [
      "At least three shock recognition signs verbalized or demonstrated in assessment.",
      "9-1-1 activated immediately upon shock recognition.",
      "Patient positioned supine with legs elevated correctly — contraindications verbalized.",
      "Warmth measures applied — blanket or insulation placed over and under patient.",
      "Oral fluids withheld — reason verbalized if asked.",
      "Patient monitored continuously with reassessment intervals stated.",
      "Anaphylaxis scenario: epinephrine auto-injector use described or demonstrated correctly."
    ]
  },
  {
    id: "skill-splinting",
    skillName: "Splinting — Upper and Lower Limb",
    category: "Injuries",
    objective: "Evaluator assesses whether the rescuer can immobilize a suspected fracture or dislocation in the position found using an appropriate improvised or commercial splint, without causing unnecessary movement or compromising circulation.",
    steps: [
      "1. Ensure scene safety. Perform primary survey — address life-threatening issues first.",
      "2. Assess the injured limb: note the mechanism of injury, location of pain/deformity, swelling, bruising, and limb position.",
      "3. Assess circulation, sensation, and movement (CSM) distal to the injury BEFORE splinting: check capillary refill, skin colour, pulse (radial for arm, pedal for leg), sensation in fingers/toes, and ability to move distal digits.",
      "4. Do NOT attempt to straighten or realign a fracture or dislocation. Splint in the position found.",
      "5. UPPER LIMB (arm/wrist): select a rigid or semi-rigid splinting material (rolled newspaper, magazine, SAM splint, board) long enough to immobilize the joint above and below the injury.",
      "6. Pad the splint material with clothing or bandage to prevent pressure points, especially over bony prominences.",
      "7. Apply the splint along the length of the limb and secure with triangular bandages, strips of cloth, or roller bandage — tie knots over the splint, not over the injury site.",
      "8. Support an arm fracture with a sling (arm supported at 90 degrees) and secure with a swathe around the body to prevent movement.",
      "9. LOWER LIMB (ankle/leg): use splinting material long enough to span from above the knee to below the foot for a leg injury; or from below the knee to past the heel and toes for an ankle.",
      "10. Pad the splint as above. Apply and secure without pulling or repositioning the limb.",
      "11. IMPROVISED SPLINT: use a jacket, rolled blanket, pillow (pillow splint for ankle), or adjacent uninjured limb as the splinting medium. Secure with available fabric strips.",
      "12. Re-assess CSM distal to the injury AFTER splinting. If circulation is compromised (pale, pulseless, or numb digits), loosen the bandaging immediately.",
      "13. Elevate the splinted limb if possible to reduce swelling, unless contraindicated.",
      "14. Apply ice (wrapped to prevent frostbite) to reduce swelling — 20 minutes on, 20 minutes off.",
      "15. Call 9-1-1 or arrange transport to a hospital for all suspected fractures and dislocations."
    ],
    commonErrors: [
      "Attempting to straighten a deformed fracture or reduce a dislocation — this risks vascular and nerve injury.",
      "Splint too short — does not immobilize the joints above and below the fracture, allowing movement at the injury site.",
      "Bandaging too tightly, compromising distal circulation — the most dangerous post-splinting complication.",
      "Failing to assess CSM before and after splinting — changes indicating vascular compromise require immediate intervention.",
      "Not padding the splint over bony prominences, creating pressure necrosis sites."
    ],
    evaluationCriteria: [
      "CSM assessment performed distal to the injury before splinting is initiated.",
      "Fracture or dislocation splinted in the position found — no realignment attempted.",
      "Splint extends to immobilize the joint above and below the injury site.",
      "Padding applied over bony prominences and along the splint length.",
      "Bandaging secured firmly but not tightly — fingers or toes remain palpable and warm.",
      "CSM re-assessed after splinting — response to compromised CSM verbalized.",
      "Sling and swathe applied for upper limb fractures.",
      "EMS activated or transport arranged."
    ]
  },
  {
    id: "skill-primary-survey",
    skillName: "Primary Survey — DRABC",
    category: "Assessment",
    objective: "Evaluator assesses whether the rescuer performs a systematic DRABC primary survey — identifying and addressing each life-threatening priority in the correct sequence before moving to the next.",
    steps: [
      "1. D — DANGER: Stop at a safe distance. Scan the scene for hazards: traffic, electricity, fire, unstable structures, toxic substances, violence. Do not approach until the scene is safe or the hazard is controlled.",
      "2. Verbalize any hazards identified and your response to them before approaching.",
      "3. R — RESPONSE: Approach the patient carefully. Tap the shoulders firmly and shout 'Are you okay?' or use an appropriate stimulus for infants (tap sole of foot).",
      "4. If the patient responds (moans, opens eyes, speaks): manage as a conscious patient — perform secondary survey, call EMS if needed.",
      "5. If no response: call loudly for bystander help and proceed immediately to Airway.",
      "6. A — AIRWAY: Place the patient supine. Open the airway using head-tilt chin-lift (or jaw thrust if spinal injury is suspected — do not move the head).",
      "7. Look into the mouth for visible obstructions (vomit, foreign objects, blood). Remove any visible obstruction with a finger sweep if accessible.",
      "8. B — BREATHING: Keep the airway open and assess breathing for no more than 10 seconds: look for chest rise, listen for breath sounds, feel for air movement on your cheek.",
      "9. If breathing normally: proceed to Circulation and call EMS.",
      "10. If not breathing normally (or only agonal gasps): call 9-1-1 immediately (or direct a bystander). Begin rescue breathing or CPR depending on whether there is a pulse.",
      "11. If the patient is breathing but unconscious: place in recovery position after completing circulation check.",
      "12. C — CIRCULATION: Check for severe external bleeding — rapidly scan from head to toe for life-threatening blood loss.",
      "13. Control severe bleeding immediately using direct pressure, wound packing, or tourniquet.",
      "14. Check for a carotid pulse (adults/children) or brachial pulse (infants) — no more than 10 seconds.",
      "15. If no pulse and not breathing: begin CPR and call for AED.",
      "16. EMS DECISION: Activate 9-1-1 for: unresponsiveness, absent or abnormal breathing, absent pulse, life-threatening bleeding, or any situation you cannot manage. Stay on the line with dispatch.",
      "17. Reassess DRABC continuously — patient condition can change rapidly."
    ],
    commonErrors: [
      "Skipping scene safety and approaching a hazardous scene — rescuer becomes a second victim.",
      "Spending more than 10 seconds checking breathing or pulse, causing critical delays before CPR.",
      "Performing head-tilt chin-lift on a patient with suspected spinal injury — jaw thrust must be used instead.",
      "Moving to secondary survey before life-threatening issues from the primary survey are addressed.",
      "Failing to activate EMS early — calling 9-1-1 should happen as soon as an unresponsive patient is identified."
    ],
    evaluationCriteria: [
      "Scene safety assessment verbalized or demonstrated before patient contact.",
      "All five DRABC steps performed in correct sequence without prompting.",
      "Airway opening technique appropriate for patient (head-tilt chin-lift vs jaw thrust based on MOI).",
      "Breathing assessment completed within 10 seconds.",
      "Pulse check completed within 10 seconds at correct location for patient age.",
      "Severe bleeding identified and controlled before completing survey.",
      "9-1-1 activated at the appropriate point — not delayed beyond identification of unresponsiveness.",
      "Recovery position applied for unconscious breathing patient; CPR initiated for pulseless non-breathing patient."
    ]
  },
  {
    id: "skill-secondary-survey",
    skillName: "Secondary Survey — Head-to-Toe Assessment and SAMPLE History",
    category: "Assessment",
    objective: "Evaluator assesses whether the rescuer performs a complete, systematic head-to-toe physical examination and collects a structured SAMPLE history to identify injuries or conditions not detected in the primary survey.",
    steps: [
      "1. Complete the primary survey (DRABC) and address all life threats before beginning the secondary survey.",
      "2. Inform the patient (if conscious) of what you are doing: 'I'm going to do a head-to-toe check to look for injuries.'",
      "3. Begin SAMPLE history (can be conducted simultaneously with physical exam if a second rescuer is available):",
      "   S — Symptoms: 'What are you feeling? Where does it hurt? When did it start?'",
      "   A — Allergies: 'Do you have any known allergies to medications or anything else?'",
      "   M — Medications: 'Are you currently taking any medications, including over-the-counter or supplements?'",
      "   P — Past medical history: 'Do you have any medical conditions, previous surgeries, or similar episodes?'",
      "   L — Last oral intake: 'When did you last eat or drink? What was it?'",
      "   E — Events leading up: 'What were you doing when this happened? What happened just before?'",
      "4. HEAD: Look and feel for deformity, lacerations, bruising, swelling, or depressed skull. Check ears and nose for blood or clear fluid (potential CSF).",
      "5. EYES: Check pupils — are they equal and reactive to light (PEARL)? Check for foreign bodies or injury.",
      "6. MOUTH: Check for airway patency, loose teeth, bleeding, vomit, unusual odours.",
      "7. NECK: Check for deformity, tenderness, tracheal deviation, distended neck veins, or medical alert jewellery.",
      "8. CHEST: Look for symmetrical rise and fall, bruising, paradoxical movement (flail chest), penetrating wounds. Palpate for tenderness and crepitus.",
      "9. ABDOMEN: Inspect for bruising, distension, penetrating wounds. Palpate all four quadrants gently for tenderness or rigidity.",
      "10. PELVIS: Apply gentle inward and downward pressure on the iliac crests to check for instability or tenderness.",
      "11. LOWER LIMBS: Check each leg from hip to foot — deformity, swelling, bruising, tenderness. Assess CSM (sensation, movement, capillary refill) distally.",
      "12. UPPER LIMBS: Check each arm from shoulder to fingers — deformity, swelling, tenderness. Assess CSM distally.",
      "13. LOG ROLL (if spinal injury suspected and additional rescuers available): with spinal precautions, roll the patient to inspect the back for wounds, bruising, or deformity. Maintain cervical alignment throughout.",
      "14. Reassess vital signs: breathing rate, pulse rate and quality, level of consciousness (AVPU: Alert, Voice, Pain, Unresponsive).",
      "15. Document all findings, SAMPLE history, and vital sign baselines. Communicate all findings clearly to EMS on arrival."
    ],
    commonErrors: [
      "Beginning the secondary survey before completing and stabilizing the primary survey — head-to-toe exam must not precede life-threat management.",
      "Skipping SAMPLE history elements — particularly medications and allergies, which are critical for EMS and hospital treatment decisions.",
      "Palpating the pelvis with excessive force — this can convert an unstable pelvic fracture into a life-threatening haemorrhage.",
      "Failing to check CSM distal to suspected fractures — vascular compromise can develop or worsen during the survey.",
      "Not documenting or communicating baseline vital signs and SAMPLE findings to EMS, forcing them to restart the assessment."
    ],
    evaluationCriteria: [
      "Primary survey confirmed complete before secondary survey begins.",
      "All six SAMPLE elements collected and recorded or verbalized.",
      "Head-to-toe assessment conducted in systematic order without skipping a body region.",
      "Pupils assessed for equality and reactivity.",
      "Chest assessed for symmetry, paradoxical movement, and penetrating wounds.",
      "CSM assessed distally on all four limbs.",
      "Pelvis checked with appropriate (gentle) technique.",
      "AVPU level of consciousness recorded.",
      "All findings communicated in a structured handoff report for EMS."
    ]
  }
];
