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
