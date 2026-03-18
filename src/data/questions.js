// 50 questions across 5 pages, 10 per page
// types: 'single' | 'multi' | 'text' | 'calendar' | 'sub'

export const PAGES = [
  {
    id: 1,
    title: 'General Health',
    questions: [
      {
        id: 1, number: 1, type: 'single',
        question: 'How would you rate your overall health today?',
        options: ['Excellent', 'Very good', 'Good', 'Fair', 'Poor'],
      },
      {
        id: 2, number: 2, type: 'single',
        question: 'How often do you experience physical pain?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      },
      {
        id: 3, number: 3, type: 'multi',
        question: 'Which areas of your body have you experienced pain in recently?',
        options: ['Head / neck', 'Back', 'Chest', 'Joints', 'Abdomen', 'Legs / feet', 'None'],
      },
      {
        id: 4, number: 4, type: 'single',
        question: 'How would you describe your energy levels on a typical day?',
        options: ['Very high', 'High', 'Moderate', 'Low', 'Very low'],
      },
      {
        id: 5, number: 5, type: 'sub',
        question: 'How often do you experience the following symptoms?',
        subQuestions: [
          { id: '5a', label: 'Headaches',         options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
          { id: '5b', label: 'Nausea or dizziness', options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
          { id: '5c', label: 'Shortness of breath', options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
        ],
      },
      {
        id: 6, number: 6, type: 'single',
        question: 'How many hours of sleep do you typically get per night?',
        options: ['Less than 5', '5–6 hours', '7–8 hours', '9–10 hours', 'More than 10'],
      },
      {
        id: 7, number: 7, type: 'single',
        question: 'How would you rate the quality of your sleep?',
        options: ['Very good', 'Good', 'Fair', 'Poor', 'Very poor'],
      },
      {
        id: 8, number: 8, type: 'calendar',
        question: 'When did you last have a physical exam with your doctor?',
      },
      {
        id: 9, number: 9, type: 'text',
        question: 'Describe any current physical symptoms you are experiencing.',
      },
      {
        id: 10, number: 10, type: 'single',
        question: 'Do you currently smoke or use tobacco products?',
        options: ['Yes, daily', 'Yes, occasionally', 'I used to but quit', 'Never'],
      },
    ],
  },

  {
    id: 2,
    title: 'Mental & Emotional Health',
    questions: [
      {
        id: 11, number: 11, type: 'single',
        question: 'Over the past 2 weeks, how often have you felt down, depressed, or hopeless?',
        options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'],
      },
      {
        id: 12, number: 12, type: 'single',
        question: 'How often do you feel anxious or overwhelmed?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      },
      {
        id: 13, number: 13, type: 'single',
        question: 'How would you rate your current stress level?',
        options: ['Very low', 'Low', 'Moderate', 'High', 'Very high'],
      },
      {
        id: 14, number: 14, type: 'multi',
        question: 'Which of the following have you experienced in the past month?',
        options: ['Difficulty sleeping', 'Loss of interest in activities', 'Difficulty concentrating', 'Changes in appetite', 'Feeling isolated', 'None of the above'],
      },
      {
        id: 15, number: 15, type: 'single',
        question: 'How well are you able to manage stress in your daily life?',
        options: ['Very well', 'Well', 'Somewhat', 'Not very well', 'Not at all'],
      },
      {
        id: 16, number: 16, type: 'sub',
        question: 'Over the past 2 weeks, how often have you experienced the following?',
        subQuestions: [
          { id: '16a', label: 'Feeling nervous or on edge',  options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '16b', label: 'Trouble relaxing',            options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '16c', label: 'Feeling easily irritated',   options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
        ],
      },
      {
        id: 17, number: 17, type: 'single',
        question: 'Do you currently see a mental health professional (therapist, counselor, psychiatrist)?',
        options: ['Yes, regularly', 'Yes, occasionally', 'No, but I would like to', 'No'],
      },
      {
        id: 18, number: 18, type: 'calendar',
        question: 'When did you last speak with a mental health provider?',
      },
      {
        id: 19, number: 19, type: 'text',
        question: 'Is there anything specific that is currently causing you stress or anxiety?',
      },
      {
        id: 20, number: 20, type: 'single',
        question: 'Overall, how satisfied are you with your emotional wellbeing?',
        options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very dissatisfied'],
      },
    ],
  },

  {
    id: 3,
    title: 'Lifestyle & Habits',
    questions: [
      {
        id: 21, number: 21, type: 'single',
        question: 'How many days per week do you engage in physical activity?',
        options: ['0 days', '1–2 days', '3–4 days', '5–6 days', 'Every day'],
      },
      {
        id: 22, number: 22, type: 'single',
        question: 'How would you describe your typical diet?',
        options: ['Very healthy', 'Mostly healthy', 'Mixed', 'Mostly unhealthy', 'Very unhealthy'],
      },
      {
        id: 23, number: 23, type: 'multi',
        question: 'Which of the following do you regularly consume?',
        options: ['Fruits & vegetables', 'Whole grains', 'Processed / fast food', 'Sugary drinks', 'Alcohol', 'Caffeine'],
      },
      {
        id: 24, number: 24, type: 'single',
        question: 'How many glasses of water do you drink per day?',
        options: ['Less than 2', '2–4 glasses', '5–7 glasses', '8 or more'],
      },
      {
        id: 25, number: 25, type: 'single',
        question: 'How often do you consume alcohol?',
        options: ['Never', 'Occasionally', '1–2 times per week', '3–5 times per week', 'Daily'],
      },
      {
        id: 26, number: 26, type: 'sub',
        question: 'How would you rate your current habits in the following areas?',
        subQuestions: [
          { id: '26a', label: 'Diet & nutrition', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
          { id: '26b', label: 'Physical activity', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
          { id: '26c', label: 'Sleep routine',     options: ['Excellent', 'Good', 'Fair', 'Poor'] },
          { id: '26d', label: 'Hydration',         options: ['Excellent', 'Good', 'Fair', 'Poor'] },
        ],
      },
      {
        id: 27, number: 27, type: 'single',
        question: 'Do you follow a specific diet or eating plan?',
        options: ['Yes, strictly', 'Yes, loosely', 'No, but I\'d like to', 'No'],
      },
      {
        id: 28, number: 28, type: 'calendar',
        question: 'When did you last have a dental checkup?',
      },
      {
        id: 29, number: 29, type: 'text',
        question: 'Describe any dietary restrictions or food allergies you have.',
      },
      {
        id: 30, number: 30, type: 'single',
        question: 'Overall, how would you rate your lifestyle habits?',
        options: ['Excellent', 'Good', 'Fair', 'Poor', 'Very poor'],
      },
    ],
  },

  {
    id: 4,
    title: 'Medical History',
    questions: [
      {
        id: 31, number: 31, type: 'multi',
        question: 'Which of the following conditions have you been diagnosed with?',
        options: ['Diabetes', 'High blood pressure', 'Heart disease', 'Asthma / COPD', 'Arthritis', 'Depression / anxiety', 'Cancer', 'None of the above'],
      },
      {
        id: 32, number: 32, type: 'single',
        question: 'How many prescription medications do you currently take?',
        options: ['None', '1–2', '3–5', '6–9', '10 or more'],
      },
      {
        id: 33, number: 33, type: 'single',
        question: 'How would you rate your ability to manage your medications as prescribed?',
        options: ['Very well', 'Well', 'Somewhat', 'Not very well', 'Not at all'],
      },
      {
        id: 34, number: 34, type: 'sub',
        question: 'Have you ever been diagnosed with or treated for the following?',
        subQuestions: [
          { id: '34a', label: 'Diabetes or pre-diabetes',    options: ['Yes, currently', 'Yes, in the past', 'No', 'Not sure'] },
          { id: '34b', label: 'High blood pressure',         options: ['Yes, currently', 'Yes, in the past', 'No', 'Not sure'] },
          { id: '34c', label: 'Heart disease or stroke',     options: ['Yes, currently', 'Yes, in the past', 'No', 'Not sure'] },
          { id: '34d', label: 'Kidney or liver disease',     options: ['Yes, currently', 'Yes, in the past', 'No', 'Not sure'] },
        ],
      },
      {
        id: 35, number: 35, type: 'single',
        question: 'Do you have any known drug allergies?',
        options: ['Yes', 'No', 'Not sure'],
      },
      {
        id: 36, number: 36, type: 'multi',
        question: 'Which of the following have you had in the past 5 years?',
        options: ['Surgery', 'Hospitalization', 'Emergency room visit', 'Imaging (MRI, CT scan)', 'Blood transfusion', 'None of the above'],
      },
      {
        id: 37, number: 37, type: 'calendar',
        question: 'When was your most recent hospitalization or ER visit?',
      },
      {
        id: 38, number: 38, type: 'single',
        question: 'Do you currently have a primary care provider?',
        options: ['Yes', 'No, but I\'m looking for one', 'No'],
      },
      {
        id: 39, number: 39, type: 'text',
        question: 'Please list any medications you are currently taking, including dosage if known.',
      },
      {
        id: 40, number: 40, type: 'single',
        question: 'How often do you take your medications exactly as prescribed?',
        options: ['Always', 'Most of the time', 'Sometimes', 'Rarely', 'Never / no medications'],
      },
    ],
  },

  {
    id: 5,
    title: 'Care & Support',
    questions: [
      {
        id: 41, number: 41, type: 'single',
        question: 'How supported do you feel by your healthcare team?',
        options: ['Very supported', 'Supported', 'Somewhat supported', 'Not very supported', 'Not at all supported'],
      },
      {
        id: 42, number: 42, type: 'single',
        question: 'How easy is it for you to access healthcare when you need it?',
        options: ['Very easy', 'Easy', 'Somewhat easy', 'Difficult', 'Very difficult'],
      },
      {
        id: 43, number: 43, type: 'multi',
        question: 'What barriers do you face in accessing healthcare?',
        options: ['Cost / insurance', 'Transportation', 'Long wait times', 'Language barriers', 'Work or schedule conflicts', 'No barriers'],
      },
      {
        id: 44, number: 44, type: 'sub',
        question: 'How satisfied are you with the following aspects of your care?',
        subQuestions: [
          { id: '44a', label: 'Communication with your provider', options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
          { id: '44b', label: 'Wait times for appointments',      options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
          { id: '44c', label: 'Quality of care received',         options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
        ],
      },
      {
        id: 45, number: 45, type: 'single',
        question: 'Do you have a trusted family member or friend who helps you manage your health?',
        options: ['Yes, regularly', 'Yes, sometimes', 'No, but I\'d like one', 'No, I manage on my own'],
      },
      {
        id: 46, number: 46, type: 'single',
        question: 'How confident are you in your ability to manage your own health?',
        options: ['Very confident', 'Confident', 'Somewhat confident', 'Not very confident', 'Not at all confident'],
      },
      {
        id: 47, number: 47, type: 'calendar',
        question: 'When is your next scheduled appointment with your care team?',
      },
      {
        id: 48, number: 48, type: 'text',
        question: 'What are your most important health goals for the next 6 months?',
      },
      {
        id: 49, number: 49, type: 'multi',
        question: 'Which of the following support services would you find most helpful?',
        options: ['Medication reminders', 'Nutrition coaching', 'Mental health support', 'Transportation assistance', 'Care coordination', 'Exercise guidance'],
      },
      {
        id: 50, number: 50, type: 'text',
        question: 'Is there anything else you would like your care team to know about you?',
      },
    ],
  },
]
