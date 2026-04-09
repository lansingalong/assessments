// Health Risk Assessment (HRA)
// Based on validated instruments: SF-36, HEDIS, PHQ-2, GAD-2, AUDIT-C, CDC STEADI, CMS SDOH
// 3 sections · 33 questions (including follow-ups) · types: 'single' | 'multi' | 'text' | 'calendar' | 'sub' | 'conditional' | 'nested'

export const PAGES = [
  {
    id: 1,
    title: 'Medical History & Current Health',
    questions: [
      {
        id: 1, number: 1, type: 'single', required: true,
        question: 'In general, how would you rate your overall health?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
      },
      {
        id: 2, number: 2, type: 'single', required: true,
        question: 'Compared to one year ago, how would you rate your health in general now?',
        options: ['Much better than one year ago', 'Somewhat better than one year ago', 'About the same', 'Somewhat worse than one year ago', 'Much worse than one year ago'],
      },
      {
        id: 3, number: 3, type: 'conditional', required: true,
        question: 'In the past 12 months, have you visited an emergency department?',
        options: ['No', 'Yes, 1 time', 'Yes, 2 or more times'],
        skipValue: 'No',
        followUps: [
          {
            id: '3f', number: 4, type: 'single',
            question: 'What was the primary reason for your most recent emergency department visit?',
            options: ['Injury or accident', 'Worsening of a chronic condition', 'Uncontrolled pain', 'Difficulty breathing', 'Chest pain or heart-related concern', 'Other reason'],
          },
        ],
      },
      {
        id: 5, number: 5, type: 'single', required: true,
        question: 'In the past 12 months, how many times have you been admitted to a hospital overnight or longer?',
        options: ['None', '1 time', '2–3 times', '4 or more times'],
      },
      {
        id: 6, number: 6, type: 'single', required: true,
        question: 'Do you have a primary care provider (PCP) that you see for routine care?',
        options: ['Yes', 'No'],
      },
      {
        id: 7, number: 7, type: 'multi', required: true,
        question: 'Have you been told by a doctor or health professional that you have any of the following conditions? (Select all that apply)',
        options: ['Diabetes or pre-diabetes', 'Heart disease or heart failure', 'High blood pressure', 'Asthma or COPD', 'Arthritis or chronic joint pain', 'Depression or anxiety', 'Chronic kidney disease', 'Cancer (current or history)', 'None of the above'],
      },
      {
        id: 8, number: 8, type: 'conditional', required: true,
        question: 'How many prescription medications do you currently take on a regular basis?',
        options: ['None', '1–3 medications', '4–6 medications', '7 or more medications'],
        skipValue: 'None',
        followUps: [
          {
            id: '8f', number: 9, type: 'single',
            question: 'How often do you have difficulty remembering to take your medications as prescribed?',
            options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Almost always'],
          },
        ],
      },
      {
        id: 10, number: 10, type: 'text', required: false,
        question: 'Please list any known allergies (medications, food, latex, or environmental). If none, write "None."',
      },
      {
        id: 11, number: 11, type: 'calendar',
        question: 'When did you last visit a doctor, nurse, or other health professional for a routine checkup?',
      },
      {
        id: 12, number: 12, type: 'single',
        question: 'Is there anything about your health you would like your care team to know before we continue?',
        options: ['No, nothing at this time', 'Yes, I have something to share with my care team'],
      },
    ],
  },

  {
    id: 2,
    title: 'Functional Status & Lifestyle',
    questions: [
      {
        id: 13, number: 13, type: 'nested', required: true,
        question: 'Are you currently experiencing any pain or discomfort on most days?',
        options: ['Yes', 'No'],
        expandValue: 'Yes',
        subQuestions: [
          {
            id: '13a', type: 'multi', required: true,
            question: 'What type of pain are you experiencing? (Select all that apply)',
            options: ['Sharp or stabbing pain', 'Dull or aching pain', 'Burning or tingling', 'Throbbing pain', 'Joint stiffness or muscle tension', 'Other'],
          },
          {
            id: '13b', type: 'single', required: true,
            question: 'Does this pain limit your ability to perform daily activities such as walking, bathing, or household tasks?',
            options: ['Yes', 'Somewhat', 'No'],
          },
        ],
      },
      {
        id: 14, number: 14, type: 'single', required: true,
        question: 'In a typical week, how many days do you engage in at least 30 minutes of moderate physical activity (such as walking, gardening, or light exercise)?',
        options: ['0 days', '1–2 days', '3–4 days', '5 or more days'],
      },
      {
        id: 15, number: 15, type: 'single', required: true,
        question: 'How would you describe your eating habits?',
        options: ['Balanced diet with fruits, vegetables, and whole grains', 'Mostly healthy with occasional processed foods', 'Average — mix of healthy and unhealthy foods', 'Mostly processed, fast food, or skipped meals'],
      },
      {
        id: 16, number: 16, type: 'single', required: true,
        question: 'On average, how many hours of sleep do you get per night?',
        options: ['Less than 5 hours', '5–6 hours', '7–8 hours', 'More than 8 hours'],
      },
      {
        id: 17, number: 17, type: 'conditional', required: true,
        question: 'Do you currently use any tobacco or nicotine products (cigarettes, e-cigarettes, chewing tobacco, etc.)?',
        options: ['Never used', 'Former user (quit more than 6 months ago)', 'Current user'],
        skipValue: 'Never used',
        followUps: [
          {
            id: '17f', number: 18, type: 'single',
            question: 'Would you be interested in receiving tobacco cessation support or resources?',
            options: ['Yes, I would like help quitting', 'Not right now, but maybe later', 'No, I am not interested'],
          },
        ],
      },
      {
        id: 19, number: 19, type: 'single', required: true,
        question: 'How often do you have a drink containing alcohol?',
        options: ['Never', 'Monthly or less', '2–4 times a month', '2–3 times a week', '4 or more times a week'],
      },
      {
        id: 20, number: 20, type: 'single', required: true,
        question: 'Have you fallen or felt unsteady while walking or standing in the past 12 months?',
        options: ['No falls and no balance concerns', 'No falls, but I sometimes feel unsteady', 'Yes, I fell but was not injured', 'Yes, I fell and was injured'],
      },
      {
        id: 21, number: 21, type: 'multi', required: false,
        question: 'Do you need help with any of the following activities? (Select all that apply)',
        options: ['Bathing, dressing, or personal hygiene', 'Preparing meals', 'Light housework or chores', 'Getting to appointments or errands', 'Taking medications correctly', 'Managing bills or finances', 'I do not need help with any of these'],
      },
      {
        id: 22, number: 22, type: 'single', required: true,
        question: 'Do you feel physically and emotionally safe where you currently live?',
        options: ['Yes', 'No', 'I prefer not to answer'],
      },
      {
        id: 23, number: 23, type: 'text', required: false,
        question: 'Is there anything else about your daily life or health habits you would like your care team to know?',
      },
    ],
  },

  {
    id: 3,
    title: 'Behavioral Health & Social Determinants',
    questions: [
      {
        id: 24, number: 24, type: 'single', required: true,
        question: 'Have you seen a doctor, therapist, or counselor for a mental or behavioral health concern in the past 12 months?',
        options: ['Yes', 'No, but I feel I could benefit from it', 'No, and I do not feel I need to'],
      },
      {
        id: 25, number: 25, type: 'conditional', required: true,
        question: 'Over the past 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
        skipValue: 'Not at all',
        followUps: [
          {
            id: '25f', number: 26, type: 'single',
            question: 'Are you currently receiving any treatment, therapy, or counseling for your emotional or mental health?',
            options: ['Yes, I am currently in treatment', 'No, but I would like to be connected to services', 'No, and I am not interested at this time'],
          },
        ],
      },
      {
        id: 27, number: 27, type: 'single', required: true,
        question: 'Over the past 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      },
      {
        id: 28, number: 28, type: 'single', required: true,
        question: 'How often do you feel isolated, lonely, or that you lack companionship?',
        options: ['Hardly ever', 'Some of the time', 'Often'],
      },
      {
        id: 29, number: 29, type: 'single', required: true,
        question: 'If you needed help during an illness or emergency, do you have someone you could count on?',
        options: ['Yes', 'Maybe, but I am not sure', 'No'],
      },
      {
        id: 30, number: 30, type: 'single', required: true,
        question: 'Within the past 12 months, have you ever worried that your food would run out before you had money to buy more?',
        options: ['Never', 'Sometimes true', 'Often true'],
      },
      {
        id: 31, number: 31, type: 'single', required: true,
        question: 'In the past 12 months, has a lack of reliable transportation kept you from medical appointments, meetings, work, or getting things needed for daily living?',
        options: ['No', 'Yes, it has kept me from things I need to do sometimes', 'Yes, it is a frequent problem for me'],
      },
      {
        id: 32, number: 32, type: 'multi', required: false,
        question: 'Which of the following health goals are most important to you right now? (Select all that apply)',
        options: ['Managing a chronic condition', 'Losing weight or improving nutrition', 'Being more physically active', 'Improving my mental health or reducing stress', 'Quitting tobacco', 'Reducing or managing pain', 'Staying independent at home', 'No specific goals at this time'],
      },
      {
        id: 33, number: 33, type: 'text', required: false,
        question: 'Is there anything else you would like your care team to know about your health, your needs, or your goals?',
      },
    ],
  },
]

// ── Comprehensive Assessment ──────────────────────────────────────────────────
const PAGES_COMPREHENSIVE = [
  {
    id: 1,
    title: 'Health Overview',
    questions: [
      { id: 101, number: 1, type: 'single', required: true,
        question: 'How would you rate your overall physical health today?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
      { id: 102, number: 2, type: 'single', required: true,
        question: 'How would you rate your overall mental and emotional health today?',
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
      { id: 103, number: 3, type: 'multi', required: true,
        question: 'Which of the following chronic conditions have you been diagnosed with? (Select all that apply)',
        options: ['Diabetes', 'Heart disease', 'High blood pressure', 'COPD or asthma', 'Depression or anxiety', 'Cancer', 'Kidney disease', 'None of the above'] },
      { id: 104, number: 4, type: 'single', required: true,
        question: 'How often do you see your primary care provider?',
        options: ['At least every 3 months', 'Every 6 months', 'Once a year', 'Less than once a year or no PCP'] },
      { id: 105, number: 5, type: 'single', required: true,
        question: 'In the past 6 months, were you hospitalized overnight?',
        options: ['No', 'Yes, once', 'Yes, more than once'] },
      { id: 106, number: 6, type: 'single', required: true,
        question: 'How confident are you in managing your health conditions on your own?',
        options: ['Very confident', 'Somewhat confident', 'Not very confident', 'Not confident at all'] },
    ],
  },
  {
    id: 2,
    title: 'Care Needs & Goals',
    questions: [
      { id: 107, number: 7, type: 'multi', required: true,
        question: 'Which areas of your health do you most want support with? (Select all that apply)',
        options: ['Managing medications', 'Understanding my diagnosis', 'Eating healthier', 'Becoming more active', 'Mental health support', 'Finding community resources', 'No specific area at this time'] },
      { id: 108, number: 8, type: 'single', required: true,
        question: 'Do you have a caregiver or family member who helps with your health care?',
        options: ['Yes, regularly', 'Yes, occasionally', 'No'] },
      { id: 109, number: 9, type: 'single', required: true,
        question: 'How comfortable are you using technology (phones, apps, internet) for health purposes?',
        options: ['Very comfortable', 'Somewhat comfortable', 'Not comfortable', 'I do not have access to technology'] },
      { id: 110, number: 10, type: 'single', required: true,
        question: 'How satisfied are you with the care you currently receive?',
        options: ['Very satisfied', 'Somewhat satisfied', 'Neutral', 'Somewhat dissatisfied', 'Very dissatisfied'] },
      { id: 111, number: 11, type: 'text', required: false,
        question: 'What is the most important health goal you would like to achieve in the next 3 months?' },
    ],
  },
]

// ── Functional Status Assessment ─────────────────────────────────────────────
const PAGES_FUNCTIONAL = [
  {
    id: 1,
    title: 'Activities of Daily Living',
    questions: [
      { id: 201, number: 1, type: 'single', required: true,
        question: 'Are you able to bathe or shower independently?',
        options: ['Yes, without any help', 'Yes, with some assistance', 'No, I need full assistance'] },
      { id: 202, number: 2, type: 'single', required: true,
        question: 'Are you able to dress and undress independently?',
        options: ['Yes, without any help', 'Yes, with some assistance', 'No, I need full assistance'] },
      { id: 203, number: 3, type: 'single', required: true,
        question: 'Are you able to eat meals independently?',
        options: ['Yes, without any help', 'Yes, with some assistance', 'No, I need full assistance'] },
      { id: 204, number: 4, type: 'single', required: true,
        question: 'Are you able to use the toilet independently?',
        options: ['Yes, without any help', 'Yes, with some assistance', 'No, I need full assistance'] },
      { id: 205, number: 5, type: 'single', required: true,
        question: 'How would you describe your ability to walk around inside your home?',
        options: ['No difficulty', 'Some difficulty but manage independently', 'Need assistance from a person or device', 'Unable to walk independently'] },
    ],
  },
  {
    id: 2,
    title: 'Instrumental Activities & Mobility',
    questions: [
      { id: 206, number: 6, type: 'multi', required: true,
        question: 'Which of the following tasks do you need help with? (Select all that apply)',
        options: ['Managing medications', 'Preparing meals', 'Light housekeeping', 'Shopping for groceries', 'Managing finances', 'Using the phone or computer', 'I do not need help with any of these'] },
      { id: 207, number: 7, type: 'single', required: true,
        question: 'Are you able to climb a flight of stairs?',
        options: ['Yes, without difficulty', 'Yes, with difficulty', 'No, I cannot climb stairs'] },
      { id: 208, number: 8, type: 'single', required: true,
        question: 'Do you use any assistive devices? (cane, walker, wheelchair, etc.)',
        options: ['No', 'Yes, a cane', 'Yes, a walker', 'Yes, a wheelchair or scooter', 'Yes, other device'] },
      { id: 209, number: 9, type: 'single', required: true,
        question: 'Over the past month, have limitations in your physical ability prevented you from doing activities you enjoy?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
      { id: 210, number: 10, type: 'text', required: false,
        question: 'Are there any specific activities or tasks you are having difficulty with that you would like help addressing?' },
    ],
  },
]

// ── SDOH Assessment ───────────────────────────────────────────────────────────
const PAGES_SDOH = [
  {
    id: 1,
    title: 'Housing, Food & Financial Security',
    questions: [
      { id: 301, number: 1, type: 'single', required: true,
        question: 'What best describes your current housing situation?',
        options: ['I own or rent a stable home', 'I live with family or friends temporarily', 'I am in transitional or temporary housing', 'I am experiencing homelessness'] },
      { id: 302, number: 2, type: 'single', required: true,
        question: 'In the past 12 months, have you been worried about losing your housing?',
        options: ['Never', 'Sometimes', 'Often'] },
      { id: 303, number: 3, type: 'single', required: true,
        question: 'In the past 12 months, how often did you worry that food would run out before you had money to buy more?',
        options: ['Never', 'Sometimes', 'Often'] },
      { id: 304, number: 4, type: 'single', required: true,
        question: 'How difficult is it for you to cover basics like food, housing, and medical care with your current income?',
        options: ['Not difficult at all', 'Somewhat difficult', 'Very difficult'] },
      { id: 305, number: 5, type: 'multi', required: false,
        question: 'Are you currently receiving any of the following? (Select all that apply)',
        options: ['Medicaid / Medicare', 'SNAP / food assistance', 'Housing assistance', 'Utility assistance', 'None of these'] },
    ],
  },
  {
    id: 2,
    title: 'Transportation, Safety & Social Support',
    questions: [
      { id: 306, number: 6, type: 'single', required: true,
        question: 'In the past 12 months, has lack of transportation kept you from medical appointments or other necessities?',
        options: ['No', 'Yes, occasionally', 'Yes, frequently'] },
      { id: 307, number: 7, type: 'single', required: true,
        question: 'Do you feel safe in your home and neighborhood?',
        options: ['Yes, I feel safe', 'Somewhat safe', 'No, I do not feel safe'] },
      { id: 308, number: 8, type: 'single', required: true,
        question: 'How often do you feel lonely or socially isolated?',
        options: ['Rarely or never', 'Sometimes', 'Often or always'] },
      { id: 309, number: 9, type: 'single', required: true,
        question: 'Do you have people in your life you can rely on for emotional or practical support?',
        options: ['Yes, I have strong support', 'I have some support', 'I have little or no support'] },
      { id: 310, number: 10, type: 'text', required: false,
        question: 'Is there any social or community need you would like us to help connect you with?' },
    ],
  },
]

// ── Pediatric HRA ─────────────────────────────────────────────────────────────
const PAGES_PEDIATRIC = [
  {
    id: 1,
    title: "Child's Health & Development",
    questions: [
      { id: 401, number: 1, type: 'single', required: true,
        question: "How would you describe your child's overall health?",
        options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
      { id: 402, number: 2, type: 'single', required: true,
        question: 'Is your child up to date on all recommended vaccinations?',
        options: ['Yes', 'No', 'Unsure'] },
      { id: 403, number: 3, type: 'single', required: true,
        question: 'Has your child had a well-child visit with their pediatrician in the past 12 months?',
        options: ['Yes', 'No', 'Scheduled but not yet done'] },
      { id: 404, number: 4, type: 'multi', required: false,
        question: 'Has your child been diagnosed with any of the following? (Select all that apply)',
        options: ['Asthma', 'ADHD or developmental delay', 'Allergies', 'Anxiety or depression', 'Obesity', 'Diabetes', 'None of the above'] },
      { id: 405, number: 5, type: 'single', required: true,
        question: 'How many hours per day does your child spend on screens (TV, tablet, phone, video games)?',
        options: ['Less than 1 hour', '1–2 hours', '3–4 hours', 'More than 4 hours'] },
      { id: 406, number: 6, type: 'single', required: true,
        question: 'Does your child participate in regular physical activity or sports?',
        options: ['Yes, daily', 'Yes, a few times a week', 'Occasionally', 'Rarely or never'] },
    ],
  },
  {
    id: 2,
    title: 'Family Health & Safety',
    questions: [
      { id: 407, number: 7, type: 'single', required: true,
        question: 'Does your child have a safe environment at home (no exposure to violence, substance use, or abuse)?',
        options: ['Yes', 'Somewhat', 'No, there are concerns'] },
      { id: 408, number: 8, type: 'single', required: true,
        question: 'Does your child have access to healthy food at home?',
        options: ['Yes, consistently', 'Sometimes', 'No'] },
      { id: 409, number: 9, type: 'single', required: true,
        question: 'Do you have concerns about your child\'s behavior, emotions, or school performance?',
        options: ['No concerns', 'Some concerns', 'Significant concerns'] },
      { id: 410, number: 10, type: 'single', required: true,
        question: 'How confident are you in managing your child\'s health needs?',
        options: ['Very confident', 'Somewhat confident', 'Not confident — I need more support'] },
      { id: 411, number: 11, type: 'text', required: false,
        question: 'Is there anything specific about your child\'s health or wellbeing you would like to discuss with the care team?' },
    ],
  },
]

// ── Oncology HRA ──────────────────────────────────────────────────────────────
const PAGES_ONCOLOGY = [
  {
    id: 1,
    title: 'Treatment & Symptoms',
    questions: [
      { id: 501, number: 1, type: 'single', required: true,
        question: 'What is your current cancer treatment status?',
        options: ['Currently in active treatment', 'In remission', 'Completed treatment (no evidence of disease)', 'Receiving palliative or supportive care only', 'Newly diagnosed, treatment not started'] },
      { id: 502, number: 2, type: 'multi', required: true,
        question: 'Which of the following treatments are you currently receiving or have recently completed? (Select all that apply)',
        options: ['Chemotherapy', 'Radiation therapy', 'Surgery', 'Immunotherapy', 'Hormone therapy', 'Targeted therapy', 'None currently'] },
      { id: 503, number: 3, type: 'multi', required: true,
        question: 'Are you currently experiencing any of the following symptoms? (Select all that apply)',
        options: ['Fatigue', 'Pain', 'Nausea or vomiting', 'Loss of appetite', 'Difficulty sleeping', 'Shortness of breath', 'Numbness or tingling', 'None of the above'] },
      { id: 504, number: 4, type: 'single', required: true,
        question: 'How would you rate your pain level on average over the past week?',
        options: ['No pain (0)', 'Mild (1–3)', 'Moderate (4–6)', 'Severe (7–10)'] },
      { id: 505, number: 5, type: 'single', required: true,
        question: 'How is your appetite compared to before your diagnosis?',
        options: ['About the same', 'Somewhat reduced', 'Significantly reduced', 'I have no appetite'] },
    ],
  },
  {
    id: 2,
    title: 'Quality of Life & Emotional Health',
    questions: [
      { id: 506, number: 6, type: 'single', required: true,
        question: 'How has your cancer diagnosis or treatment affected your daily activities?',
        options: ['No impact — I do everything I used to', 'Some impact — I have modified some activities', 'Significant impact — my activities are greatly limited', 'I am unable to perform most daily activities'] },
      { id: 507, number: 7, type: 'single', required: true,
        question: 'Over the past 2 weeks, how often have you felt anxious, worried, or overwhelmed about your condition?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
      { id: 508, number: 8, type: 'single', required: true,
        question: 'Do you have a strong support system (family, friends, counselor) to help you through treatment?',
        options: ['Yes, I have strong support', 'I have some support', 'I have very little support', 'I feel I am facing this alone'] },
      { id: 509, number: 9, type: 'single', required: true,
        question: 'Are you currently connected to any cancer support services or programs?',
        options: ['Yes', 'No, but I am interested', 'No, and I am not interested at this time'] },
      { id: 510, number: 10, type: 'text', required: false,
        question: 'Is there anything about your cancer treatment, symptoms, or quality of life that you would like to discuss with your care team?' },
    ],
  },
]

// ── Fall Risk Assessment ──────────────────────────────────────────────────────
const PAGES_FALL_RISK = [
  {
    id: 1,
    title: 'Fall History & Physical Function',
    questions: [
      { id: 601, number: 1, type: 'single', required: true,
        question: 'Have you fallen in the past 12 months?',
        options: ['No', 'Yes, once', 'Yes, 2 or more times'] },
      { id: 602, number: 2, type: 'single', required: true,
        question: 'Are you afraid of falling?',
        options: ['Not at all', 'Somewhat', 'Very afraid'] },
      { id: 603, number: 3, type: 'single', required: true,
        question: 'Do you feel unsteady when standing or walking?',
        options: ['Never', 'Sometimes', 'Often', 'Always'] },
      { id: 604, number: 4, type: 'single', required: true,
        question: 'Do you use any walking aids? (cane, walker, etc.)',
        options: ['No', 'Yes, sometimes', 'Yes, always'] },
      { id: 605, number: 5, type: 'multi', required: true,
        question: 'Do you have any of the following conditions that may increase fall risk? (Select all that apply)',
        options: ['Dizziness or lightheadedness', 'Vision problems', 'Hearing problems', 'Foot pain or numbness', 'Joint pain or weakness', 'Memory problems', 'None of the above'] },
    ],
  },
  {
    id: 2,
    title: 'Medications & Home Environment',
    questions: [
      { id: 606, number: 6, type: 'single', required: true,
        question: 'Do you take 4 or more prescription medications daily?',
        options: ['No', 'Yes'] },
      { id: 607, number: 7, type: 'multi', required: false,
        question: 'Do you take any of the following types of medications? (Select all that apply)',
        options: ['Sleep aids', 'Blood pressure medications', 'Diuretics ("water pills")', 'Anti-anxiety or antidepressants', 'Pain medications', 'None of these'] },
      { id: 608, number: 8, type: 'multi', required: true,
        question: 'Are any of the following present in your home? (Select all that apply)',
        options: ['Loose rugs or mats', 'Poor lighting in hallways or stairways', 'No grab bars in bathroom', 'Cluttered walkways', 'Steep or uneven stairs', 'None of these hazards'] },
      { id: 609, number: 9, type: 'single', required: true,
        question: 'Do you exercise or do physical activity to help with balance and strength?',
        options: ['Yes, regularly', 'Yes, occasionally', 'No'] },
      { id: 610, number: 10, type: 'text', required: false,
        question: 'Please describe your most recent fall (if any) or any concerns about your balance or safety at home.' },
    ],
  },
]

// ── Fall Risk Prevention ──────────────────────────────────────────────────────
const PAGES_FALL_PREVENTION = [
  {
    id: 1,
    title: 'Current Safety Practices',
    questions: [
      { id: 701, number: 1, type: 'single', required: true,
        question: 'Have you spoken with your doctor or pharmacist about your fall risk?',
        options: ['Yes', 'No', 'I was not aware I should'] },
      { id: 702, number: 2, type: 'single', required: true,
        question: 'Have you had your vision checked in the past year?',
        options: ['Yes', 'No', 'I wear corrective lenses and they are up to date'] },
      { id: 703, number: 3, type: 'single', required: true,
        question: 'Do you have grab bars or handrails installed in your bathroom and stairways?',
        options: ['Yes, both', 'Yes, one of them', 'No'] },
      { id: 704, number: 4, type: 'single', required: true,
        question: 'Are all walking paths in your home clear of clutter, cords, and rugs?',
        options: ['Yes, all clear', 'Mostly clear', 'No, there are hazards'] },
      { id: 705, number: 5, type: 'single', required: true,
        question: 'Do you participate in any balance or strengthening exercises? (e.g., Tai Chi, physical therapy)',
        options: ['Yes, regularly', 'Yes, occasionally', 'No, but I am interested', 'No'] },
    ],
  },
  {
    id: 2,
    title: 'Education & Action Plan',
    questions: [
      { id: 706, number: 6, type: 'single', required: true,
        question: 'Are you aware of fall prevention resources in your community?',
        options: ['Yes', 'No', 'Somewhat'] },
      { id: 707, number: 7, type: 'single', required: true,
        question: 'Do you have a plan for what to do if you fall and cannot get up?',
        options: ['Yes, I have a plan', 'Somewhat — I have thought about it', 'No plan'] },
      { id: 708, number: 8, type: 'multi', required: false,
        question: 'Which of the following fall prevention steps would you be willing to take? (Select all that apply)',
        options: ['Install grab bars in bathroom', 'Remove trip hazards from home', 'Attend a balance/exercise class', 'Review medications with my doctor', 'Get a medical alert device', 'I am already taking all precautions'] },
      { id: 709, number: 9, type: 'single', required: true,
        question: 'How confident are you that you can reduce your risk of falling?',
        options: ['Very confident', 'Somewhat confident', 'Not confident', 'I did not know I could reduce my risk'] },
      { id: 710, number: 10, type: 'text', required: false,
        question: 'Is there anything specific you would like help with to prevent falls at home?' },
    ],
  },
]

// ── Transitions of Care 1 (TOC) Pre-Discharge ─────────────────────────────────
const PAGES_TOC_PREDISCHARGE = [
  {
    id: 1,
    title: 'Discharge Understanding & Readiness',
    questions: [
      { id: 801, number: 1, type: 'single', required: true,
        question: 'Do you understand the reason for your hospitalization?',
        options: ['Yes, fully', 'Somewhat', 'No, I need more explanation'] },
      { id: 802, number: 2, type: 'single', required: true,
        question: 'Do you understand your discharge instructions and what you need to do when you get home?',
        options: ['Yes, completely', 'Mostly', 'No, I am confused about the instructions'] },
      { id: 803, number: 3, type: 'single', required: true,
        question: 'Do you understand the medications you are being sent home with?',
        options: ['Yes, I understand all of them', 'I understand some of them', 'No, I need help understanding my medications'] },
      { id: 804, number: 4, type: 'single', required: true,
        question: 'Do you have a follow-up appointment scheduled with your doctor after discharge?',
        options: ['Yes, already scheduled', 'I need help scheduling one', 'No, I was not told to schedule one'] },
      { id: 805, number: 5, type: 'single', required: true,
        question: 'Do you have someone who can help you at home after discharge?',
        options: ['Yes, a family member or friend', 'Yes, a hired caregiver', 'No, I will be on my own'] },
    ],
  },
  {
    id: 2,
    title: 'Post-Discharge Planning & Support',
    questions: [
      { id: 806, number: 6, type: 'single', required: true,
        question: 'Will you have reliable transportation to your follow-up appointment(s)?',
        options: ['Yes', 'No, I need help arranging transportation', 'I do not have an appointment yet'] },
      { id: 807, number: 7, type: 'single', required: true,
        question: 'Will you be able to fill your prescriptions before or right after discharge?',
        options: ['Yes', 'I am not sure', 'No, I may have difficulty'] },
      { id: 808, number: 8, type: 'multi', required: false,
        question: 'Which of the following services might you need after discharge? (Select all that apply)',
        options: ['Home health nursing', 'Physical or occupational therapy', 'Meal delivery', 'Medical equipment (walker, hospital bed, etc.)', 'Social work support', 'None at this time'] },
      { id: 809, number: 9, type: 'single', required: true,
        question: 'Do you feel ready and safe to go home?',
        options: ['Yes, I feel ready', 'Somewhat ready', 'No, I have concerns about going home'] },
      { id: 810, number: 10, type: 'text', required: false,
        question: 'Do you have any questions or concerns about your discharge or what happens next?' },
    ],
  },
]

// ── Transitions of Care 3 (TOC) Home Visit ────────────────────────────────────
const PAGES_TOC_HOMEVISIT = [
  {
    id: 1,
    title: 'Recovery & Home Environment',
    questions: [
      { id: 901, number: 1, type: 'single', required: true,
        question: 'How are you feeling since you were discharged from the hospital?',
        options: ['Much better', 'Somewhat better', 'About the same', 'Worse than when I left the hospital'] },
      { id: 902, number: 2, type: 'single', required: true,
        question: 'Have you experienced any new or worsening symptoms since coming home?',
        options: ['No new symptoms', 'Some new symptoms — mild', 'Significant new symptoms'] },
      { id: 903, number: 3, type: 'multi', required: false,
        question: 'Have you experienced any of the following since discharge? (Select all that apply)',
        options: ['Fever', 'Difficulty breathing', 'Chest pain', 'Wound or incision problems', 'Severe pain', 'Confusion or dizziness', 'None of the above'] },
      { id: 904, number: 4, type: 'single', required: true,
        question: 'Do you feel safe and comfortable in your home environment?',
        options: ['Yes', 'Somewhat', 'No, I have safety concerns'] },
      { id: 905, number: 5, type: 'single', required: true,
        question: 'Are you able to perform basic self-care (bathing, dressing, meals) at home?',
        options: ['Yes, independently', 'Yes, with some help', 'No, I need significant assistance'] },
    ],
  },
  {
    id: 2,
    title: 'Medications, Follow-up & Needs',
    questions: [
      { id: 906, number: 6, type: 'single', required: true,
        question: 'Are you taking all prescribed medications as directed?',
        options: ['Yes, as directed', 'Mostly, with a few missed doses', 'No, I am having difficulty with my medications'] },
      { id: 907, number: 7, type: 'single', required: true,
        question: 'Were you able to fill all your prescriptions after discharge?',
        options: ['Yes, all of them', 'Some of them', 'No, I have not been able to fill them'] },
      { id: 908, number: 8, type: 'single', required: true,
        question: 'Have you attended your follow-up appointment(s) with your doctor?',
        options: ['Yes, I have been to all appointments', 'I have an appointment scheduled', 'No, I have not been able to go', 'I was not given a follow-up appointment'] },
      { id: 909, number: 9, type: 'multi', required: false,
        question: 'Do you need any of the following right now? (Select all that apply)',
        options: ['Help understanding my medications', 'Home health nurse visits', 'Physical therapy at home', 'Transportation to appointments', 'Help with meals or groceries', 'Emotional or mental health support', 'None at this time'] },
      { id: 910, number: 10, type: 'text', required: false,
        question: 'Is there anything about your recovery at home you would like your care team to know?' },
    ],
  },
]

// ── Assessment map (name → pages) ────────────────────────────────────────────
export const ASSESSMENTS = {
  'Health Risk Assessment': PAGES,
  'Comprehensive Assessment': PAGES_COMPREHENSIVE,
  'Functional Status Assessment': PAGES_FUNCTIONAL,
  'Social Determinants of Health (SDOH) Assessment': PAGES_SDOH,
  'Pediatric HRA': PAGES_PEDIATRIC,
  'Oncology HRA': PAGES_ONCOLOGY,
  'Fall Risk Assessment': PAGES_FALL_RISK,
  'Fall Risk Prevention': PAGES_FALL_PREVENTION,
  'Transitions of Care 1 (TOC) Pre-Discharge': PAGES_TOC_PREDISCHARGE,
  'Transitions of Care 3 (TOC) Home Visit': PAGES_TOC_HOMEVISIT,
}
