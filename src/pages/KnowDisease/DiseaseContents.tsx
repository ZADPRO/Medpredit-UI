export const sampleDiabetesData = [
  /* Disease 1: Diabetes Starts*/
    {
      DiseaseId: 1,
      DiseaseName: "Diabetes",
      DiseaseContent: [
        {
          AccordionId: 1,
          AccordionTitle: "Diabetes",
          AccordionInfo: [
            {
              questionId: 1,
              question: "What is Diabetes?",
              answers: [
                {
                  point:
                    ["Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy."],
                },
              ],
            },
            {
              questionId: 2,
              question: "What causes diabetes?",
              answers: [
                {
                  point:
                    ["Most of the food you eat is broken down into sugar (also called glucose) and released into your bloodstream."],
                },
                {
                  point:
                    ["The blood sugar level is regulated by certain hormones."],
                },
                {
                  point:
                    ["When your blood sugar goes up, it signals your pancreas to release insulin."],
                },
                {
                  point:
                    ["Insulin lowers the blood glucose level by pushing blood glucose into cells to be utilized as fuel for functioning or for storage for future use."],
                },
                {
                  point: "Blood sugar level may remain raised overtime due to",
                  subpoint: [
                    ["Disease of pancreas causing inadequate production or poor quality of insulin."],
                    ["Or the resistance in cells to accept the glucose loading into them as in case of Obesity."],
                  ],
                },
                {
                  point:
                    ["Increased sugar level in blood overtime causes some health problem such as damage to nerves, blood vessels leading to heart disease, kidney disease, vision loss etc..and it is termed as diabetes",
                    ]
                    },
                {
                  point: ["Blood sugar level may remain raised overtime due to"],
                  subpoint: [
                    ["Disease of pancreas causing inadequate production or poor quality of insulin."],
                    ["Or the resistance in cells to accept the glucose loading into them as in case of Obesity."],
                  ],
                },
              ],
            },
            {
              questionId: 3,
              question: "Type 1 Diabetes Mellitus",
              answers: [
                {
                  point:
                    ["If your pancreas does not make adequate or quality insulin then it is termed as Type I Diabetes."],
                },
                {
                  point:
                    ["It is mostly due to attack of the pancreatic tissue by immune cells."],
                },
                { point: ["Symptoms develop quickly."] },
                {
                  point:
                    ["Diagnosed mostly in children, teens and young adults."],
                },
              ],
            },
            {
              questionId: 4,
              question: "Type 2 Diabetes Mellitus",
              answers: [
                {
                  point:
                    ["If your body cells does not make use of insulin and become resistant to take up the glucose load then the condition is termed as Type 2 diabetes."],
                },
                {
                  point:
                    "It develops over many years and is usually diagnosed in adults.",
                },
                {
                  point:
                    "You may not notice any symptoms, so it’s important to get your blood sugar tested if you’re at risk.",
                },
              ],
            },
            {
              questionId: 5,
              question: "Gestational diabetes",
              answers: [
                {
                  point:
                    "Gestational diabetes develops in pregnant women who have never had diabetes before the pregnancy.",
                },
                {
                  point:
                    "It develops over many years and is usually diagnosed in adults.",
                },
                {
                  point:
                    "If you have gestational diabetes, your baby could be at higher risk for health problems.",
                },
              ],
            },
            {
              questionId: 6,
              question: "Who are all at risk of Getting Diabetes?",
              answers: [
                {
                  point:
                  ["You're at risk for developing ", <b key="bold">Type 1 DM</b>],
                },
                {
                  point:
                    [<b key="bold">If you Have Family history:</b>," Having a parent, brother, or sister with type 1 diabetes."],
                },
                {
                  point: "You’re at risk for developing Type 2 diabetes if you are:",
                  subpoint: [
                    "Leading Inactive / sedentary/ stressful life style,",
                    "Having unhealthy diet like - , high salt, refined sugar, deep fried oily junk food, with No or less of fruits and vegetables rich in fibres.",
                    "Overweight,",
                    "Aged 30 and above.",
                    "Having a parent, brother, or sister with type 2 diabetes",
                    "Ever had gestational diabetes",
                    "Having Hormone disorder like PCOS, Thyroid disorders etc"
                  ]
                },
              ],
            },
            {
              questionId: 7,
              question: "What are the symptoms of diabetes?",
              answers: [
                {
                  point: "Symptoms often develop over several years and can go on for a long time without being noticed"
                },
                {
                  point: "sometimes patients with Diabetes may not exhibit any noticeable symptoms at all."
                },
                {
                  point: "Most of the people with Diabetes have these following symptoms:",
                  subpoint: [
                    "Frequent urination,",
                    "Excessive thirst,",
                    "Increased hunger,",
                    "Excessive tiredness,",
                    "Blurred vision,",
                    "Generalised Tiredness,",
                    "Dizziness,",
                    "Numbness or Pin and pricking sensation of foot and hand,",
                    "Wound that does not heal."
                  ]
                },
              ],
            },
            {
              questionId: 8,
              question: "How Do I know if I am Diabetic?",
              answers: [
                {
                  point: ["Because symptoms can be hard to spot, it’s important to know the", <b key="bold">risk factors</b>,"and to seek Health advice from a physician to get your blood sugar tested if you have any of them."],
                },
                {
                  point: "A simple blood test will let you know if you have diabetes"
                },
              ],
            },
          ],
        },

        {
          AccordionId: 2,
          AccordionTitle: "Blood Test",
          AccordionInfo: [
            {
              questionId: 1,
              question: "What are all the blood test for diagnosing Diabetes?",
              answers: [
                {
                  point: "Blood sugar level may remain raised overtime due to",
                  subpoint: [
                    "Random Blood Sugar Test",
                    "Glucose Tolerance Test",
                    "Hb A1C Test",
                    "Fasting Blood Sugar Test",
                  ],
                },
              ],
            },
            {
              questionId: 2,
              question: "Random Blood Sugar Test",
              answers: [
                {
                  point:
                    "This measures your blood sugar at the time you’re tested. You can take this test at any time and don’t need to fast (not eat). A blood sugar level of 200 mg/dL or higher indicates you have diabetes.",
                },
              ],
            },
            {
              questionId: 3,
              question: "Glucose Tolerance Test",
              answers: [
                {
                  point:
                    "This measures your blood sugar before and after you drink a liquid that contains glucose.",
                },
                {
                  point:
                    "You'll fast (not eat) overnight before the test and have your blood drawn to determine your fasting blood sugar level.",
                },
                {
                  point:
                    "Then you'll drink the liquid and have your blood sugar level checked 1 hour, 2 hours, and possibly 3 hours afterward.",
                },
                {
                  point:
                    "At 2 hours, a blood sugar level of 140 mg/dL or lower is considered normal, 140 to 199 mg/dL indicates you have prediabetes, and 200 mg/dL or higher indicates you have diabetes.",
                },
              ],
            },
            {
              questionId: 4,
              question: "Fasting Blood Sugar Test",
              answers: [
                {
                  point:
                    "This measures your blood sugar after an overnight fast (not eating)",
                },
                {
                  point: "A fasting blood sugar level of",
                  subpoint: [
                    "110 mg/dL or lower is normal,",
                    "110 to 125 mg/dL indicates you have prediabetes, and",
                    "126 mg/dL or higher indicates you have diabetes."
                  ],
                },
              ],
            },
            {
              questionId: 5,
              question: "Hb A1C Test",
              answers: [
                {
                  point:
                    "The HbA1C test measures your average blood sugar level over the past 2 or 3 months.",
                },
                {
                  point: "An HbA1C test",
                  subpoint: [
                    "below 5.7% is normal,",
                    "between 5.7 and 6.4% indicates you have prediabetes, and",
                    "6.5% or higher indicates you have diabetes."
                  ],
                },
              ],
            },
          ],
        },

        {
          AccordionId: 3,
          AccordionTitle: "Remedies",
          AccordionInfo: [
            {
              questionId: 1,
              question: "How to check my blood sugar at home using Glucometer?",
              answers: [
                { point: "Step 1: Check and keep all items ready" },
                { point: "Step 2: Wash hand throughly" },
                {
                  point: "Step 3: Wear a glove if you are going to prick other",
                },
                { point: "Step 4: Wipe the area" },
                { point: "Step 5: Give a brisk prick into tip finger and do not squeeze." },
                { point: "Step 6: Insert the strip into glucometer" },
                { point: "Step 7: Apply blood to the strip" },
                { point: "Step 8: Record the reading" },
                { point: "Step 9: Don't dispose the soaked cotton, needle, strip into general waste." },
              ],
            },
            {
              questionId: 2,
              question: "What are all the complications due to Diabetes?",
              answers: [
                {
                  point:
                    ["Increased sugar level in blood overtime may damage the blood vessels."],
                },
                {
                  point: [<b key="bold">Microvascular Complications:</b>],
                  subpoint: [
                    ["Damage to small blood vessels supplying nerves, Eyes, Kidney, Joint"],
                    ["Neuropathy- numbness of limbs, pin and pricking sensation, erectile dysfunction, loose stool"],
                    ["Retinopathy- loss of vision, blurred vision"],
                    ["Nephropathy- wastage of protein in urine and kidney damage"]
                  ]
                },
                {
                  point: [<b key="bold">Macrovascular Complications:</b>],
                  subpoint: [
                    ["Damage to large blood vessels supplying Heart, limbs, Brain etc."],
                    [<b key="bold">Coronary Artery Disease</b>, "damage to blood vessel supplying heart"],
                    [<b key="bold">Peripheral arterial disease</b>, "damage to blood vessel supplying limbs"],
                    [<b key="bold">Cerebrovascular disease</b>, "damage to blood vessel supplying brain tissue"],
                  ]
                },
              ],
            },
            {
              questionId: 3,
              question: "What are all the tests done to detect the complications of Diabetes?",
              answers: [
                {
                  point: [<b key="bold">Kidney disease</b>, " - Urine sugar, albumin, USG abdomen"],
                },
                {
                  point: [<b key="bold">Heart Disease</b>, " - ECG, Thread mill test, ECHO"],
                },
                {
                  point: [<b key="bold">Eye disease</b>, " - Eye examination for Cataract, Eye pressure check up, Retinal examination"],
                },
                {
                  point: [<b key="bold">Foot examination for Nerve damage</b>]
                },
                {
                  point: [<b key="bold">Blood flow obstruction to lower limbs</b>, " - Doppler scan"],
                },
              ],
            },
            {
              questionId: 4,
              question: "How do I manage Diabetes?",
              answers: [
                {
                  point:
                    ["We can beat Diabetes and lead a healthy and long life by simple management techniques"],
                },
                {
                  point: ["Life style modifications"],
                  subpoint: [
                    ["To reduce the risk level."],
                    [<b key="bold">Knowledge regarding self management in Diabetes.</b>],
                  ]
                },
                {
                  point: [<b key="bold">Early Diagnosis</b>, " - of the disease and its complications"],
                  subpoint: [
                    ["Periodic health checkups and appropriate medications"]
                  ]
                }
              ],
            },
            {
              questionId: 5,
              question: "What is self management in Diabetes?",
              answers: [
                {
                  point:
                    ["Diabetes Self-Management helps people with diabetes to take the best care of themselves."]
                    
                  }
              ],
            },
            {
              questionId: 6,
              question: "Why self management in Diabetes so important?",
              answers: [
                {
                  point:
                    ["People who have the knowledge and support to manage their diabetes are healthier than those who do not."]
                    ,subpoint: []
                  },
                {
                  point:
                    ["Learning how to control your diabetes will save money and time, and help you have fewer emergency and hospital visits."]
                    ,subpoint: []
                  },
                {
                  point:
                    ["Knowing how and when to take your medication, how to monitor your blood sugar (glucose), and how to take care of yourself, helps you manage your diabetes better."]
                    ,subpoint: []
                  },
                {
                  point:
                    ["Managing your diabetes will help you avoid or delay serious health complications."]
                    ,subpoint: []
                  },
                {
                  point:
                    ["The skills you learn will help you take better care of yourself. Diabetes management starts with you."]
                    ,subpoint: []
                  },
              ],
            },
            {
              questionId: 7,
              question: "How to care of yourself and learn to live with diabetes?",
              answers: [
                {
                  point:
                    [<b key="bold">Life style modification</b>],
                  subpoint: [
                    ["Eat healthy: ", <a href="">Let's assess where you stand right now when it comes to nutrition</a>],
                    ["Be active: ", <a href="">Let's assess where you stand right now when it comes to physical activity</a>],
                    ["Keep your weight in check: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid smoking: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid excessive alcohol intake: ", <a href="">Let's assess where you stand right now</a>],
                    ["Manage your stress: ", <a href="">Let's assess where you stand right now</a>],
                    ["Adequate sleep: ", <a href="">Let's assess where you stand right now</a>],
                  ]
                },
                {
                  point:
                    [<b key="bold">Periodic health check up and appropriate treatment to keep within normal range of your"</b>],
                  subpoint: [
                    ["Blood sugar level: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Blood pressure: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Cholesterol level: ", <a href="">Let's check whether it is within normal limit</a>],
                  ]
                },
                {
                  point:[<b key="bold">Periodic Check up for screening complications</b>],
                  subpoint: []
                },
                {
                  point:[<b key="bold">Take your medicine regularly.</b>],
                  subpoint: []
                },
                {
                  point:
                    [<b key="bold">Solve problems</b>],
                  subpoint: [
                    ["setting objectives , achieving small targets, self rewards, Obstacles in achieving your objective etc."]
                  ]
                },
                {
                  point:
                    [<b key="bold">Be strong and positive</b>],
                  subpoint: [
                    ["Cope with the emotional side of diabetes-Fear, Depression and anxiety related to illness, stressors in adopting life style etc"]
                  ]
                },
                {
                  point:
                    [<b key="bold">Reduce your risk of other health problems</b>],
                  subpoint: [
                    ["Infection control- oral cavity, foot care, bowel care, skin care"],
                    ["Injury prevention"],
                    ["Hypertension"],
                    ["Thyroid dysfunction etc"]
                  ]
                },
              ],
            }
          ],
        },
      ],
    },
    /* Disease 1: Diabetes Ends*/

    /* Disease 2: Hypertension Starts*/
    {
      DiseaseId: 2,
      DiseaseName: "Hypertension",
      DiseaseContent: [
        {
          AccordionId: 1,
          AccordionTitle: "Hypertension",
          AccordionInfo: [
            {
              questionId: 1,
              question: "What is Blood pressure?",
              answers: [
                {
                  point:
                    ["Blood pressure is the pressure of blood pushing against the walls of your arteries."],
                },
                {
                  point:
                    ["Arteries carry blood from your heart to other parts of your body."],
                },
                {
                  point:
                    ["Your blood pressure normally rises and falls throughout the day."],
                },
              ],
            },
            {
              questionId: 2,
              question: "What do blood pressure numbers mean?",
              answers: [
                {
                  point:
                    ["Blood pressure is measured using two numbers:"],
                  subpoint: [
                    ["The first number, called ", <b key="bold">systolic blood pressure</b>, " measures the pressure in your arteries when your heart contracts."],
                    ["The second number, called ", <b key="bold">diastolic blood pressure</b>, "measures the pressure in your arteries when your heart rests between beats"],
                    ["If the measurement reads 120 systolic and 80 diastolic, you would say, “120 over 80,” or write, “120/80 mmHg.”"]
                  ]
                },
                {
                  point:
                    ["Arteries carry blood from your heart to other parts of your body."],
                },
                {
                  point:
                    ["Your blood pressure normally rises and falls throughout the day."],
                },
              ],
            },
            {
              questionId: 3,
              question: "What are normal blood pressure numbers?",
              answers: [
                {
                  point:
                    ["A normal blood pressure level is less than 120/80 mmHg."],
                  
                },
              ],
            },
            {
              questionId: 4,
              question: "What is hypertension?",
              answers: [
                {
                  point:
                    ["Hypertension, also called high blood pressure, is a condition when blood pressure is higher than normal."],
                },
                {
                  point:
                    ["Having blood pressure measures consistently above normal may result in a diagnosis of high blood pressure (or hypertension)."],
                },
              ]
            },
            {
              questionId: 5,
              question: "What are the different types of hypertension?",
              answers: [
                {
                  point:
                    ["It is classified into two types:"]
                },
                {
                  point:
                  [<b key="bold">Primary, or essential hypertension:</b>],
                  subpoint: [
                    ["Occurs when you have abnormally high blood pressure that's not the result of a medical condition."],
                    ["This form of high blood pressure is often due to obesity, family history and an unhealthy diet."],
                    ["The condition is reversible with medications and lifestyle changes."]
                  ]
                },
                {
                  point:
                  [<b key="bold">Secondary hypertension:</b>],
                  subpoint: [
                    ["Sometimes because of other medical conditions like kidney disorders, hormonal problems, heart diseases etc. ", <b key="bold">can also occur</b>],
                  ]
                },
              ]
            },
            {
              questionId: 6,
              question: "Who are all at risk of Getting hypertension?",
              answers: [
                {
                  point: ["You are at risk of getting Primary Hypertension if you are"],
                  subpoint: [
                    ["Leading physically Inactive lifestyle."],
                    ["Feeling stressful most often."],
                    ["Having unhealthy diet often, like, high salt, refined sugar, deep fried oily junk food, with No or less of fruits and vegetables rich in fibres."],
                    ["Overweight."],
                    ["Aged 18 and above."],
                    ["Having Family history of high blood pressure- a parent, brother, or sister with Hypertension."],
                    ["Pregnant women."],
                    ["Alcoholic."],
                    ["Tobacco user especially smoking."]
                  ]
                },
                {
                  point: ["You are at risk of getting Secondary Hypertension if you are"],
                  subpoint: [
                    ["Having Hormone disorder like PCOS, Thyroid disorders etc."],
                    ["People who have sleep apnea."],
                    ["Older age."]
                  ]
                },
              ]
            },
            {
              questionId: 7,
              question: "What are the symptoms of hypertension?",
              answers: [
                {
                  point: ["Symptoms often develop over several years and can go on for a long time without being noticed"],
                },
                {
                  point: ["Sometimes patients with Hypertension may not exhibit any noticeable symptoms at all."],
                },
                {
                  point: ["Most common symptoms are"],
                  subpoint: [
                    ["Severe headaches."],
                    ["Vision problems."],
                    ["Palpitation."],
                    ["Fatigue"],
                    ["Dizziness"],
                    ["Sweating"]
                  ]
                },
              ]
            },
            {
              questionId: 8,
              question: "How Do I know if I am having hypertension?",
              answers: [
                {
                  point: ["The best way to know if you have hypertension is ", <b key="bold">to get regular blood pressure readings.</b>],
                },
              ]
            },
            {
              questionId: 9,
              question: "What are all the tests done to detect the hypertension?",
              answers: [
                {
                  point: ["Home Blood Pressure Monitoring (HBPM)."],
                },
                {
                  point: ["Ambulatory Blood Pressure Monitoring (APBM)."],
                },
              ]
            },
            {
              questionId: 10,
              question: "What is HBPM?",
              answers: [
                {
                  point: ["Home Blood Pressure Monitoring (HBPM)."],
                  subpoint: [
                    ["Also known as Self-measured blood pressure (SMBP) refers to blood pressure (BP) measurements obtained by a patient outside of a physician's practice or clinical setting, usually at home."]
                  ]
                },
              ]
            },
            {
              questionId: 11,
              question: "How to measure Blood pressure at Home?",
              answers: [
                {
                  point: ["Prepare:"],
                  subpoint: [
                    ["Avoid caffeine, smoking and exercise for 30 minutes before measuring your blood pressure."],
                    ["Wait at least 30 minutes after a meal."],
                    ["If you're on blood pressure medication, measure your BP before you take our medication."],
                    ["Find a quiet space where you can sit comfortably without distraction."]
                  ]
                },
                {
                  point: ["Position:"],
                  image: {
                    url: "../src/assets/KnowAbout/position.png",
                    altText: "BP Measuring position"
                  }
                },
                {
                  point: ["Measure:"],
                  subpoint: [
                    ["Rest for five minutes while in position before starting."],
                    ["Take two or three measurements, one minute apart, twice daily for seven days."],
                    ["Keep your body relaxed and in position during measurements."],
                    ["Sit quietly with no distractions during measurements—avoid conversations, TV, phones and other devices."],
                    ["Record your measurements when finished."]
                  ]
                },
              ]
            },
            {
              questionId: 12,
              question: "What is the significance of High BP?",
              answers: [
                {
                  point: ["Persistently blood pressure can damage your health in many ways. It can seriously damage important organs like your heart, brain, kidneys, and eyes."]
                },
                {
                  point: ["The higher your blood pressure levels, the more risk you have for other health problems, such as ", <b key="bold">heart disease</b>, " and ", <b key="bold">stroke</b>]
                }
              ]
            },
            {
              questionId: 13,
              question: "What are all the complications due to hypertension?",
              answers: [
                {
                  point: [<b key="bold">Uncontrolled high blood pressure damages the vital organs</b>]
                },
                {
                  point: ["Blood vessels- Vasculopathy"],
                  subpoint: [
                    ["Thickening , narrowing, injury to inner lining of blood vessels, formation of blood clot resulting in reduced blood flow to organs"]
                  ]
                },
                {
                  point: ["Heart disease"],
                  subpoint: [
                    ["Enlargement of heart chambers"],
                    ["Thickening of heart wall"],
                    ["Heart failure- A condition when heart cannot pump out blood adequate to maintain circulation"],
                    ["Irregular heart beat"],
                    ["Damage to Blood vessel supplying nutrition and oxygen to heart- resulting in MI"]
                  ]
                },
                {
                  point: ["Kidney damage"],
                  subpoint: [
                    ["Weakened and narrowed blood vessels in your kidney."],
                    ["Protein leakage."],
                    ["Finally renal failure."]
                  ]
                },
                {
                  point: ["Eye damage"],
                  subpoint: [
                    ["Weakened and narrowed blood vessels in your eyes."],
                    ["Rupture of small capillaries."],
                    ["Leading to loss of vision."]
                  ]
                },
                {
                  point: ["Brian"]
                },
                {
                  point: ["Acute hypertensive Encephalopathy"],
                  subpoint: [
                    ["Impairment of brain function leading to coma due to sudden high raise in blood pressure."],
                    ["Rupture of small capillaries."],
                    ["Leading to loss of vision."]
                  ]
                },
                {
                  point: ["Stroke"],
                  subpoint: [
                    ["Due to rupture of blood vessels supplying brain."],
                    ["Due to reduced blood flow to brain tissue."]
                  ]
                },
                {
                  point: ["Vascular dementia"],
                  subpoint: [
                    ["Progressive retardation of functions (trouble in memory, learning , understanding and performing) due to degeneration of brain."]
                  ]
                }
              ]
            },
            {
              questionId: 14,
              question: "What are all the tests done to detect the complications of hypertension?",
              answers: [
                {
                  point: [<b>Hypertensive Vasculopathy</b>," - Measurement of the thickness of blood vessel wall and of the pulse-wave velocity in the common carotid artery."]
                },
                {
                  point: [<b>Kidney Disease</b>," - Urine sugar, albumin, USG abdomen."]
                },
                {
                  point: [<b>Heart Disease</b>," - ECG, Thread mill test, ECHO."]
                },
                {
                  point: [<b>Eye Disease</b>," - Retinal examination."]
                }
              ]
            },
            {
              questionId: 15,
              question: "How to care of myself and maintain Blood pressure under control?",
              answers: [
                {
                  point:
                    [<b key="bold">Life style modification</b>],
                  subpoint: [
                    ["Eat healthy: ", <a href="">Let's assess where you stand right now when it comes to nutrition</a>],
                    ["Be active: ", <a href="">Let's assess where you stand right now when it comes to physical activity</a>],
                    ["Keep your weight in check: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid smoking: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid excessive alcohol intake: ", <a href="">Let's assess where you stand right now</a>],
                    ["Manage your stress: ", <a href="">Let's assess where you stand right now</a>],
                    ["Adequate sleep: ", <a href="">Let's assess where you stand right now</a>],
                  ]
                },
                {
                  point:
                    [<b key="bold">Periodic health check up and appropriate treatment to keep within normal range of your"</b>],
                  subpoint: [
                    ["Blood sugar level: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Blood pressure: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Cholesterol level: ", <a href="">Let's check whether it is within normal limit</a>],
                  ]
                },
                {
                  point:[<b key="bold">Periodic Check up for screening complications</b>],
                  subpoint: []
                },
                {
                  point:[<b key="bold">Take your medicine regularly.</b>],
                  subpoint: []
                },
                {
                  point:
                    [<b key="bold">Solve problems</b>],
                  subpoint: [
                    ["setting objectives , achieving small targets, self rewards, Obstacles in achieving your objective etc."]
                  ]
                },
                {
                  point:
                    [<b key="bold">Be strong and positive</b>],
                  subpoint: [
                    ["Cope with the emotional side of diabetes-Fear, Depression and anxiety related to illness, stressors in adopting life style etc"]
                  ]
                },
                {
                  point:
                    [<b key="bold">Reduce your risk of other health problems</b>],
                  subpoint: [
                    ["Infection control- oral cavity, foot care, bowel care, skin care"],
                    ["Injury prevention"],
                    ["Hypertension"],
                    ["Thyroid dysfunction etc"]
                  ]
                },
              ],
            }
          ]
        }
      ]
    },
    /* Disease 2: Hypertension Ends*/
    /* Disease 3: Coronary Artery Disease Starts*/
    {
      DiseaseId: 3,
      DiseaseName: "Coronary Artery Disease",
      DiseaseContent: [
        {
          AccordionId: 1,
          AccordionTitle: "Coronary Artery Disease",
          AccordionInfo: [
            {
              questionId: 1,
              question: "What is coronary artery disease?",
              answers: [
                {
                  point: ["Coronary artery disease (CAD) is the most common type of heart disease caused by occlusion of the blood vessel supplying heart."]
                }
              ]
            },
            {
              questionId: 2,
              question: "What causes coronary artery disease?",
              answers: [
                {
                  point: ["CAD is caused by ", <b>plaque</b>," buildup in the walls of the arteries that supply blood to the heart (called coronary arteries) and other parts of the body."]
                },
                {
                  point: [<b>plaque</b>," is made up of deposits of cholesterol and other substances in the artery. Plaque buildup causes the inside of the arteries to narrow over time, which can partially or totally block the blood flow. This process is called , ", <b>atherosclerosis</b>]
                }
              ]
            },
            {
              questionId: 3,
              question: "What is the role of cholesterol in causing coronary artery disease?",
              answers: [
                {
                  point: ["Cholesterol is a waxy, fat-like substance made by the liver or found in certain foods."]
                },
                {
                  point: ["Your liver makes enough for your body's needs from the food you eat."]
                },
                {
                  point: ["Your body often get more cholesterol from the foods you eat."]
                },
                {
                  point: ["If you take in more cholesterol than the body can use, the extra cholesterol can build up in the walls of the arteries, including those of the heart."]
                },
                {
                  point: ["This leads to narrowing of the arteries and can decrease the blood flow to the heart, brain, kidneys, and other parts of the body."]
                }
              ]
            },
            {
              questionId: 4,
              question: "What do you mean by good or bad Cholesterol?",
              answers: [
                {
                  point: ["The two main type of cholesterol found in the blood are:"],
                  subpoint: [
                    ["Low density lipoprotein (LDL) attached cholesterol and"],
                    ["High density lipoprotein (HDL) attached cholesterol"]
                  ]
                },
                {
                  point: [<b>Lipoproteins</b>," are substance produced in liver to transport cholesterol (as fats insoluble in blood) to and from liver through blood to all organs."]
                },
                {
                  point: [<b>High level LDL</b>, " attached cholesterol is considered to be bad as it transport cholesterol from liver to other organs and the excess cholesterol can build up in the walls of the arteries causing plaque."]
                },
                {
                  point: ["High fat intake in food increases LDL cholesterol level."]
                },
                {
                  point: [<b>High level HDL</b>, " attached cholesterol is considered safe as it scavenges the extra cholesterol from arteries and other organs to liver hence it provides some protection against heart disease."]
                },
                {
                  point: ["Physical activity increases the HDL Level."]
                },
              ]
            },
            {
              questionId: 5,
              question: "Who are all at the risks of getting coronary artery disease?",
              answers: [
                {
                  point: ["You are at the risk of getting CAD if you are:"],
                },
                {
                  point: ["Using ", <b>Tobacco</b>],
                  subpoint: [
                    ["Tobacco usage increases the risk for heart disease and heart attack by following ways"],
                    ["Cigarette smoking can damage the heart and blood vessels, which increases your risk for heart conditions such as atherosclerosis and heart attack."],
                    ["Nicotine raises blood pressure."],
                    ["Carbon monoxide from cigarette smoke reduces the amount of oxygen that your blood can carry."],
                    ["Exposure to secondhand smoke can also increase the risk for heart disease, even for nonsmokers."]
                  ]
                },
                {
                  point: ["Leading Inactive / sedentary/ stressful life style"]
                },
                {
                  point: ["Overweight"]
                },
                {
                  point: ["Aged 30 and above"]
                },
                {
                  point: ["Having a parent, brother, or sister with CAD"]
                },
                {
                  point: ["Drinking too much alcohol"]
                },
                {
                  point: ["Long standing high blood pressure"]
                },
                {
                  point: ["Uncontrolled Diabetes Mellitus"]
                },
                {
                  point: ["High level of Cholesterol level in blood"]
                },
              ]
            },
            {
              questionId: 6,
              question: "What are the symptoms of coronary heart disease?",
              answers: [
                {
                  point: ["Chest pain and discomfort, is the most common and important symptom of CAD it is also called as ",<b>Angina</b>],
                },
                {
                  point: [<b>Characteristic feature of typical Anginal chest pain are</b>],
                  subpoint: [
                    ["Compressing type of vague Central chest or left sided pain that often radiates to left shoulder , arm, forearm to neck, to jaw or to the back."],
                    ["Often associated with shortness of breath, excessive sweating, dizziness, weakness and vomiting sensation."],
                    ["The pain will be aggravated by exertion partially relieved by rest."]
                  ]
                },
                {
                  point: [<b>What do you mean by Heart attack?</b>],
                  subpoint: [
                    ["It is a serious life threatening condition caused when the coronary artery is completely occluded by plague and blood clot resulting in death of the heart tissue due to lack of oxygen and nutrition."],
                    ["Often associated with shortness of breath, excessive sweating, dizziness, weakness and vomiting sensation."],
                    ["The pain will be aggravated by exertion partially relieved by rest."]
                  ]
                },
                {
                  point: [<b>What is 'Silent attack'?</b>],
                  subpoint: [
                    ["Heart attack that present without chest pain is referred to as silent attack."],
                    ["It is common in diabetic where the pain sensation carrying nerves are damaged due to high sugar level."],
                    ["It may present as chest tightness, shortness of breath, palpitation, sweating on exertion etc."]
                  ]
                },
              ]
            },
            {
              questionId: 7,
              question: "What should I do if someone had symptoms of heart attack?",
              answers: [
                {
                  point: ["Call 108 or Ambulance immediately."],
                },
                {
                  point: ["Alert Medical emergency team if any available."]
                },
                {
                  point: ["Make the patient to sit in a chair with back rest and arm rest."]
                },
                {
                  point: ["Calm down the patient and advice to take deep breath."]
                },
                {
                  point: ["Ventilate the room by opening windows, put fan, avoid crowding around etc."]
                },
                {
                  point: ["Take to tertiary care hospital within the Golden Hour"]
                },
                {
                  point: ["Check if any emergency medicine is available with the patient if he/she is known heart patient."]
                }
              ]
            },
            {
              questionId: 8,
              question: "What is GOLDEN HOUR in heart attack and why is it important?",
              answers: [
                {
                  point: ["The first hour after the onset of a heart attack."],
                },
                {
                  point: ["Appropriate treatment within this hours can minimize the life threatening complications."]
                }
              ]
            },
            {
              questionId: 9,
              question: "How is coronary artery disease diagnosed?",
              answers: [
                {
                  point: [<b>ECG or EKG Electrocardiogram:</b>],
                  subpoint: [
                    ["Measures the electrical activity, rate, and regularity of your heartbeat."],
                    ["It is simple and short procedure detects abnormal electrical activity due to heart attack and find time of onset"]
                  ]
                },
                {
                  point: [<b>Echocardiogram:</b>],
                  subpoint: [
                    ["It Uses ultrasound (special sound wave) to create a picture of the heart."],
                    ["Detect abnormality in movement of heart pumping action and valves"]
                  ]
                },
                {
                  point: [<b>Exercise stress test or Treadmill test TMT:</b>],
                  subpoint: [
                    ["Measures your heart rate while you walk on a treadmill.This helps to determine how well your heart is working when it has to pump more blood."],
                  ]
                },
                {
                  point: [<b>Cardiac catheterization:</b>],
                  subpoint: [
                    ["It is done by inserting a thin, flexible tube through an artery in the groin, arm, or neck to reach the heart."],
                    [" the heart and the strength of blood flow through heart's chambers as well as collect blood samples from the heart or inject dye into the arteries of the heart (coronary arteries)"]
                  ]
                },
                {
                  point: [<b>Coronary angiogram:</b>],
                  subpoint: [
                    ["Monitors blockage and flow of blood through the coronary arteries."],
                    ["Uses X-rays to detect dye injected via cardiac catheterization"]
                  ]
                },
              ]
            },
            {
              questionId: 10,
              question: "How to prevent getting heart attack?",
              answers: [
                {
                  point:
                    [<b key="bold">Life style modification</b>],
                  subpoint: [
                    ["Eat healthy: ", <a href="">Let's assess where you stand right now when it comes to nutrition</a>],
                    ["Be active: ", <a href="">Let's assess where you stand right now when it comes to physical activity</a>],
                    ["Keep your weight in check: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid smoking: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid excessive alcohol intake: ", <a href="">Let's assess where you stand right now</a>],
                    ["Manage your stress: ", <a href="">Let's assess where you stand right now</a>],
                    ["Adequate sleep: ", <a href="">Let's assess where you stand right now</a>],
                  ]
                },
                {
                  point:
                    [<b key="bold">Periodic health check up and appropriate treatment to keep within normal range of your"</b>],
                  subpoint: [
                    ["Blood sugar level: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Blood pressure: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Cholesterol level: ", <a href="">Let's check whether it is within normal limit</a>],
                  ]
                }
              ],
            },
            {
              questionId: 11,
              question: "How is coronary artery disease diagnosed?",
              answers: [
                {
                  point: ["If you have CAD, your health care team may suggest the following steps to help lower your risk for heart attack or worsening heart disease:"],
                },
                {
                  point: [<b>Life style modification</b>],
                  subpoint: [
                    ["Avoid high salt, refined sugar, deep fried oily junk food. Balanced Diet with fruits and vegetables rich in fibres reduces the risk of stroke"],
                    ["Avoid using tobacco"],
                    ["Avoid excessive alcohol intake"],
                    ["Avoid stress, adequate sleep"],
                    ["Physical fitness- regular exercise"],
                  ]
                },
                {
                  point: [<b>Periodic health check up and appropriate treatment to keep within normal range of your</b>],
                  subpoint: [
                    ["Blood pressure"],
                    ["Blood sugar level"],
                    ["Cholesterol level"],
                  ]
                },
                {
                  point: [<b>Surgical procedures to help restore blood flow to the heart</b>]
                },
                {
                  point: [<b>Take your medicine regularly</b>],
                },
                {
                  point: [<b>Cope with the emotional side of coronary artery disease-
                    Depression and anxiety related to illness, stressors in
                    adopting life style</b>],
                },
                {
                  point: [<b>Reduce your risk of other health problems</b>],
                },
                {
                  point: [<b>Example:</b> , " co morbid illness like kidney disease, Eye disease, stroke etc."]
                }
              ]
            },
          ]
        }
      ]
    },
    /* Disease 3: Coronary Artery Disease Ends*/

    /* Disease 4: Stroke Starts*/
    {
      DiseaseId: 4,
      DiseaseName: "Stroke",
      DiseaseContent: [
        {
          AccordionId: 1,
          AccordionTitle: "Stroke",
          AccordionInfo: [
            {
              questionId: 1,
              question: "What is stroke?",
              answers: [
                {
                  point: ["Damage to the brain due to interruption of its blood supply."],
                }
              ]
            },
            {
              questionId: 2,
              question: "What causes stroke?",
              answers: [
                {
                  point: ["Damage of Brain tissue due to"],
                  subpoint: [
                    ["Any blockage , leaking or bursting of a blood vessel supplying brain."]
                  ]
                }
              ]
            },
            {
              questionId: 3,
              question: "What are the two types of stroke?",
              answers: [
                {
                  point: [<b>Ischemic Stroke</b>],
                  subpoint: [
                    ["Occurs when blood clots or other particles block the blood vessels to the brain. Fatty deposits called plaque can also cause blockages by building up in the blood vessels."]
                  ]
                },
                {
                  point: [<b>Hemorrhagic Stroke</b>],
                  subpoint: [
                    ["Occurs when a blood vessel bursts in the brain. Blood builds up and damages surrounding brain tissue."]
                  ]
                },
                {
                  point: ["Both types of stroke damage brain cells. Symptoms of that damage start to show in the parts of the body controlled by those brain cells."],
                }
              ]
            },
            {
              questionId: 4,
              question: "Who are all at the risks of getting stroke?",
              answers: [
                {
                  point: ["You are at the risk of getting CAD if you are"]
                },
                {
                  point: ["Using ", <b>Tobacco</b>],
                  subpoint: [
                    ["Tobacco usage increases the risk for heart disease and heart attack by following ways"],
                    ["Cigarette smoking can damage the heart and blood vessels, which increases your risk for heart conditions such as atherosclerosis and heart attack."],
                    ["Nicotine raises blood pressure."],
                    ["Carbon monoxide from cigarette smoke reduces the amount of oxygen that your blood can carry."],
                    ["Exposure to secondhand smoke can also increase the risk for heart disease, even for nonsmokers."]
                  ]
                },
                {
                  point: ["Leading Inactive / sedentary/ stressful life style"],
                },
                {
                  point: [<b>Having unhealthy diet like</b>, " high salt, refined sugar, deep fried oily junk food, with No or less of fruits and vegetables rich in fibres."],
                },
                {
                  point: ["Leading Inactive / sedentary/ stressful life style"],
                },
                {
                  point: ["Overweight"]
                },
                {
                  point: ["Aged 30 and above"]
                },
                {
                  point: ["Having a parent, brother, or sister with CAD"]
                },
                {
                  point: ["Drinking too much alcohol"]
                },
                {
                  point: ["Long standing high blood pressure"]
                },
                {
                  point: ["Uncontrolled Diabetes Mellitus"]
                },
                {
                  point: ["High level of Cholesterol level in blood"]
                },
              ]
            },
            {
              questionId: 5,
              question: "What are the symptoms of stroke?",
              answers: [
                {
                  point: ["The following symptoms can occur in stroke:"],
                  subpoint: [
                    ["Sudden severe Headache"],
                    ["Dizziness"],
                    ["Confusion"],
                    ["Sudden muscle weakness causing difficulty to use the hand(s) or leg(s) or paralysis."],
                    ["Sudden trouble walking"],
                    ["Slurred speech,- sudden trouble speaking"],
                    ["Sudden trouble seeing"],
                    ["Deviation of cheek"],
                    ["Drooling of saliva"],
                    ["Sudden loss of consciousness"],
                  ]
                },
              ]
            },
            {
              questionId: 6,
              question: "What is TIA and why is it significant?",
              answers: [
                {
                  point: ["Transient Ischemic attack:"],
                  subpoint: [
                    ["If your symptoms go away after a few minutes, you may have had a transient ischemic attack (TIA)."],
                    ["Because TIAs clear up in few minutes, many people ignore them. But this is a warning sign of stroke, as TIA is a condition that often evolve into stroke if no proper medical attention is given"],
                   ]
                },
              ]
            },
            {
              questionId: 7,
              question: "What should I do if someone had symptoms of stroke?",
              answers: [
                {
                  point: [<b>Call</b>, " 108 or Ambulance immediately."],
                },
                
                {
                  point: [<b>Alert</b>, " Medical emergency team if any available."],
                },
                {
                  point: ["Make the patient to sit in a chair with back rest and arm rest."],
                },
                {
                  point: [<b>Calm down</b>, " 108 or Ambulance immediately."],
                },
                {
                  point: [<b>Ventilate</b>, " the room by opening windows, putting fan, avoid crowding around etc."],
                },
                {
                  point: [<b>Note down</b>, " the event - like if any seizures, if any injury due to fall, duration of unconsciousness, involuntary urination and note down the time of the appearance of symptom. As these information are vital for deciding the treatment."],
                },
                {
                  point: [<b>Take</b>, " to tertiary care hospital within the Golden Hour."],
                },
              ]
            },
            {
              questionId: 8,
              question: "What is F.A.S.T in stroke?",
              answers: [
                {
                  point: [<b>F - Face: ask the person to smile.</b>, " Look for - drooping on one side of the face and deviation of angle of mouth."],
                },
                {
                  point: [<b>A - Arms: Ask the person to raise both arms.</b>, " Look for - arm drift downward on any one side."],
                },
                {
                  point: [<b>S - Speech: Ask the person to repeat a simple phrase.</b>],
                  subpoint: [
                    ["Look for - Is the speech slurred or strange"]
                  ]
                },
                {
                  point: [<b>T - Time.</b>],
                  subpoint: [
                    ["If you see any of these signs then call 108 or ambulance right away in time"]
                  ]
                },
              ]
            },
            {
              questionId: 9,
              question: "What is GOLDEN HOUR in stroke and why is this period so important?",
              answers: [
                {
                  point: ["First 4.5 hours: ", <b>Time lost is brain lost</b>]
                },
                {
                  point: ["Every minute counts."]
                },
                {
                  point: ["To stay alive your brain needs oxygen."]
                },
                {
                  point: ["Although your brain makes up only 2% of your body weight, it uses 20% of the oxygen you breathe."]
                },
                {
                  point: ["Your arteries deliver oxygen-rich blood to all parts of your brain."]
                },
                {
                  point: ["If something happens to block the flow of blood, brain cells start to die within minutes because they can't get oxygen."]
                },
                {
                  point: ["Appropriate treatment within this hours minimize complications."]
                },
              ]
            },
            {
              questionId: 10,
              question: "How is stroke diagnosed?",
              answers: [
                {
                  point: ["Your doctor can perform several tests to diagnose stroke, such as"]
                },
                {
                  point: [<b>Brain Imaging:</b>],
                  subpoint: [
                    ["Magnetic resonance imaging (MRI) scan"],
                    ["Computed tomography (CT) scan"]
                  ]
                },
                {
                  point: [<b>Tests of the brain's electrical activity, and</b>]
                },
                {
                  point: [<b>Blood flow tests- Doppler, angiogram etc</b>]
                },
              ]
            },
            {
              questionId: 11,
              question: "How to prevent getting heart attack?",
              answers: [
                {
                  point:
                    [<b key="bold">Life style modification</b>],
                  subpoint: [
                    ["Eat healthy: ", <a href="">Let's assess where you stand right now when it comes to nutrition</a>],
                    ["Be active: ", <a href="">Let's assess where you stand right now when it comes to physical activity</a>],
                    ["Keep your weight in check: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid smoking: ", <a href="">Let's assess where you stand right now</a>],
                    ["Avoid excessive alcohol intake: ", <a href="">Let's assess where you stand right now</a>],
                    ["Manage your stress: ", <a href="">Let's assess where you stand right now</a>],
                    ["Adequate sleep: ", <a href="">Let's assess where you stand right now</a>],
                  ]
                },
                {
                  point:
                    [<b key="bold">Periodic health check up and appropriate treatment to keep within normal range of your"</b>],
                  subpoint: [
                    ["Blood sugar level: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Blood pressure: ", <a href="">Let's check whether it is within normal limit</a>],
                    ["Cholesterol level: ", <a href="">Let's check whether it is within normal limit</a>],
                  ]
                }
              ],
            },
            {
              questionId: 12,
              question: "How to give care to the patients with stroke?",
              answers: [
                {
                  point: ["Home based palliative care for bedridden patients."]
                },
                {
                  point: ["Encourage daily rehabilitation exercise."]
                },
                {
                  point: ["Adherence to prescribed medications."]
                },
                {
                  point: ["Prevent complications"],
                  subpoint: [
                    ["Further damage causing stiffness and deformity."],
                    ["Respiratory complication- Infection, aspiration."],
                    ["GI care- Reflux, Dyspepsia."],
                    ["Urinary Bladder - learn how to give catheter care."],
                    ["Bed sore prevention and care Using appropriate bed and change in body position."]
                  ]
                },
                {
                  point: ["Provide them wholesome diet."]
                },
                {
                  point: ["Focus on positive memories."]
                },
                {
                  point: ["Attend regular visit to healthcare provider."]
                },
              ]
            },
          ]
        }
      ]
    }
  ];