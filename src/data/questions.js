// Health Risk Assessment (HRA)
// Based on validated instruments: HEDIS, PHQ-9, GAD-7, PROMIS, AHA HRA, CMS SDOH
// 5 sections · 10 questions each · 50 questions total
// types: 'single' | 'multi' | 'text' | 'calendar' | 'sub'

export const PAGES = [
  {
    id: 1,
    title: 'General Health',
    questions: [
      {
        id: 1, number: 1, type: 'single', required: true,
        question: 'In general, how would you rate your overall health?',
        options: ['Excellent', 'Very good', 'Good', 'Fair', 'Poor'],
      },
      {
        id: 2, number: 2, type: 'single',
        question: 'Compared to one year ago, how would you rate your health in general now?',
        options: ['Much better than a year ago', 'Somewhat better than a year ago', 'About the same', 'Somewhat worse than a year ago', 'Much worse than a year ago'],
      },
      {
        id: 3, number: 3, type: 'single',
        question: 'How many days during the past 30 days was your physical health not good?',
        options: ['None', '1–5 days', '6–10 days', '11–20 days', 'More than 20 days'],
      },
      {
        id: 4, number: 4, type: 'single',
        question: 'How many days during the past 30 days was your mental health not good?',
        options: ['None', '1–5 days', '6–10 days', '11–20 days', 'More than 20 days'],
      },
      {
        id: 5, number: 5, type: 'single',
        question: 'How many days during the past 30 days did poor physical or mental health keep you from doing your usual activities?',
        options: ['None', '1–5 days', '6–10 days', '11–20 days', 'More than 20 days'],
      },
      {
        id: 6, number: 6, type: 'single', required: true,
        question: 'How many hours of sleep do you get on a typical night?',
        options: ['Less than 5 hours', '5–6 hours', '7–8 hours', '9 or more hours'],
      },
      {
        id: 7, number: 7, type: 'single',
        question: 'How would you rate your sleep quality?',
        options: ['Very good', 'Fairly good', 'Fairly bad', 'Very bad'],
      },
      {
        id: 8, number: 8, type: 'single',
        question: 'How would you rate your ability to perform everyday physical activities such as walking, climbing stairs, or carrying groceries?',
        options: ['No difficulty', 'A little difficulty', 'Some difficulty', 'A lot of difficulty', 'Unable to do'],
      },
      {
        id: 9, number: 9, type: 'calendar',
        question: 'When did you last visit a doctor, nurse, or other health professional for a routine checkup?',
      },
      {
        id: 10, number: 10, type: 'text',
        question: 'Is there anything about your health you would like your care team to know before we continue?',
      },
    ],
  },

  {
    id: 2,
    title: 'Chronic Conditions & Medications',
    questions: [
      {
        id: 11, number: 11, type: 'multi', required: true,
        question: 'Have you ever been told by a doctor or health professional that you have any of the following conditions?',
        options: ['High blood pressure', 'High cholesterol', 'Diabetes or pre-diabetes', 'Heart disease or heart attack', 'Asthma or COPD', 'Arthritis', 'Chronic kidney disease', 'Cancer (current or past)', 'Obesity', 'None of the above'],
      },
      {
        id: 12, number: 12, type: 'sub',
        question: 'Have you been told by a doctor, nurse, or other health professional that you have or had any of the following?',
        subQuestions: [
          { id: '12a', label: 'High blood pressure (hypertension)', options: ['Yes', 'No', 'Not sure'] },
          { id: '12b', label: 'High blood sugar or diabetes',        options: ['Yes', 'No', 'Not sure'] },
          { id: '12c', label: 'A heart attack or angina',            options: ['Yes', 'No', 'Not sure'] },
          { id: '12d', label: 'A stroke or TIA',                     options: ['Yes', 'No', 'Not sure'] },
        ],
      },
      {
        id: 13, number: 13, type: 'single', required: true,
        question: 'Do you currently take any prescription medications?',
        options: ['Yes, one or more daily', 'Yes, but only as needed', 'No'],
      },
      {
        id: 14, number: 14, type: 'single',
        question: 'How often do you take your medications exactly as prescribed by your doctor?',
        options: ['Always', 'Most of the time', 'Sometimes', 'Rarely', 'I do not take prescription medications'],
      },
      {
        id: 15, number: 15, type: 'multi',
        question: 'What are the main reasons you sometimes miss taking your medications? (Select all that apply)',
        options: ['I forget', 'Side effects', 'Cost / can\'t afford them', 'I feel better and think I don\'t need them', 'I don\'t have a way to pick them up', 'I have no problem taking my medications'],
      },
      {
        id: 16, number: 16, type: 'single',
        question: 'Do you currently have a primary care provider (doctor, nurse practitioner, or physician assistant)?',
        options: ['Yes', 'No, but I am looking for one', 'No'],
      },
      {
        id: 17, number: 17, type: 'single',
        question: 'How well do you feel your chronic health conditions are currently being managed?',
        options: ['Very well', 'Well', 'Somewhat well', 'Not well', 'I have no chronic conditions'],
      },
      {
        id: 18, number: 18, type: 'multi',
        question: 'Have you had any of the following healthcare encounters in the past 12 months?',
        options: ['Emergency room visit', 'Hospitalization (overnight stay)', 'Specialist visit', 'Urgent care visit', 'Telehealth visit', 'None of the above'],
      },
      {
        id: 19, number: 19, type: 'calendar',
        question: 'When were you most recently hospitalized or seen in an emergency room?',
      },
      {
        id: 20, number: 20, type: 'text',
        question: 'Please list any current diagnoses or medical conditions, including any medications and dosages you are currently taking.',
      },
    ],
  },

  {
    id: 3,
    title: 'Mental & Behavioral Health',
    questions: [
      {
        id: 29, number: 21, type: 'conditional', required: true,
        question: 'Are you a smoker?',
        options: ['Yes', 'No'],
        skipValue: 'No',
        followUps: [
          {
            id: '29a', number: '21a', type: 'single',
            question: 'How long have you been smoking?',
            options: ['Less than 1 year', '1–5 years', '6–10 years', '11–20 years', 'More than 20 years'],
          },
          {
            id: '29b', number: '21b', type: 'single',
            question: 'About how many cigarettes do you smoke per day?',
            options: ['1–5', '6–10', '11–20', 'More than 20', "I don't smoke cigarettes"],
          },
          {
            id: '29c', number: '21c', type: 'multi',
            question: 'What do you usually smoke?',
            options: ['Cigarettes', 'Cigars', 'Pipe', 'E-cigarettes / vaping', 'Other'],
          },
          {
            id: '29d', number: '21d', type: 'single',
            question: 'Do you smoke other tobacco products?',
            options: ['Yes', 'No'],
          },
        ],
      },
      {
        id: 21, number: 22, type: 'sub', required: true,
        question: 'Over the last 2 weeks, how often have you been bothered by any of the following problems? (PHQ-4)',
        subQuestions: [
          { id: '21a', label: 'Little interest or pleasure in doing things',  options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '21b', label: 'Feeling down, depressed, or hopeless',         options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '21c', label: 'Feeling nervous, anxious, or on edge',         options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '21d', label: 'Not being able to stop or control worrying',   options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
        ],
      },
      {
        id: 22, number: 23, type: 'sub',
        question: 'Over the last 2 weeks, how often have you been bothered by any of the following?',
        subQuestions: [
          { id: '22a', label: 'Trouble falling or staying asleep, or sleeping too much', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '22b', label: 'Feeling tired or having little energy',                   options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '22c', label: 'Poor appetite or overeating',                             options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
          { id: '22d', label: 'Trouble concentrating on things',                         options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
        ],
      },
      {
        id: 23, number: 24, type: 'single',
        question: 'How would you rate your current overall stress level?',
        options: ['No stress', 'Low stress', 'Moderate stress', 'High stress', 'Very high stress'],
      },
      {
        id: 24, number: 25, type: 'single',
        question: 'How well are you able to manage stress in your daily life?',
        options: ['Very well', 'Well', 'Somewhat well', 'Not very well', 'Not at all well'],
      },
      {
        id: 25, number: 26, type: 'multi',
        question: 'Which of the following have you experienced during the past month?',
        options: ['Difficulty sleeping', 'Loss of interest in activities you used to enjoy', 'Withdrawing from friends or family', 'Changes in appetite or weight', 'Difficulty concentrating or making decisions', 'None of the above'],
      },
      {
        id: 26, number: 27, type: 'single',
        question: 'Are you currently seeing a mental health professional (therapist, counselor, or psychiatrist)?',
        options: ['Yes, regularly', 'Yes, occasionally', 'No, but I would like to', 'No'],
      },
      {
        id: 27, number: 28, type: 'single',
        question: 'In the past year, have you used alcohol or drugs more than you intended to, or in a way that caused problems for you?',
        options: ['Yes', 'No', 'Prefer not to answer'],
      },
      {
        id: 28, number: 29, type: 'single',
        question: 'How often do you have a drink containing alcohol?',
        options: ['Never', 'Monthly or less', '2–4 times per month', '2–3 times per week', '4 or more times per week'],
      },
      {
        id: 30, number: 30, type: 'text',
        question: 'Is there anything specific that is causing you stress, anxiety, or affecting your mental health that you would like your care team to know about?',
      },
    ],
  },

  {
    id: 4,
    title: 'Lifestyle & Prevention',
    questions: [
      {
        id: 31, number: 31, type: 'single', required: true,
        question: 'On average, how many days per week do you engage in moderate or vigorous physical activity (e.g., brisk walking, jogging, cycling) for at least 30 minutes?',
        options: ['0 days', '1–2 days', '3–4 days', '5–6 days', 'Every day'],
      },
      {
        id: 32, number: 32, type: 'single',
        question: 'How would you describe your typical diet?',
        options: ['Very healthy', 'Mostly healthy', 'Mixed — healthy and unhealthy', 'Mostly unhealthy', 'Very unhealthy'],
      },
      {
        id: 33, number: 33, type: 'sub',
        question: 'How often do you typically consume the following?',
        subQuestions: [
          { id: '33a', label: 'Fruits and vegetables',             options: ['Daily', '4–6 times per week', '1–3 times per week', 'Rarely or never'] },
          { id: '33b', label: 'Sugary drinks (soda, juice, etc.)', options: ['Daily', '4–6 times per week', '1–3 times per week', 'Rarely or never'] },
          { id: '33c', label: 'Fast food or processed foods',      options: ['Daily', '4–6 times per week', '1–3 times per week', 'Rarely or never'] },
          { id: '33d', label: 'Water (8+ glasses per day)',        options: ['Daily', '4–6 times per week', '1–3 times per week', 'Rarely or never'] },
        ],
      },
      {
        id: 34, number: 34, type: 'single',
        question: 'What is your current body weight status as told to you by a healthcare provider?',
        options: ['Underweight', 'Normal weight', 'Overweight', 'Obese', 'I don\'t know'],
      },
      {
        id: 35, number: 35, type: 'sub',
        question: 'Have you received the following preventive screenings or vaccinations in the recommended timeframe?',
        subQuestions: [
          { id: '35a', label: 'Blood pressure check',           options: ['Yes, within the past year', 'Yes, 1–3 years ago', 'No / not sure'] },
          { id: '35b', label: 'Cholesterol (lipid panel)',      options: ['Yes, within the past year', 'Yes, 1–3 years ago', 'No / not sure'] },
          { id: '35c', label: 'Blood glucose (diabetes) test',  options: ['Yes, within the past year', 'Yes, 1–3 years ago', 'No / not sure'] },
          { id: '35d', label: 'Flu vaccine (this season)',      options: ['Yes, within the past year', 'Yes, 1–3 years ago', 'No / not sure'] },
        ],
      },
      {
        id: 36, number: 36, type: 'single',
        question: 'Are you up to date on cancer screenings recommended for your age and sex (e.g., mammogram, colonoscopy, Pap smear, prostate exam)?',
        options: ['Yes, I am up to date', 'Some, but not all', 'No', 'Not applicable to me', 'I\'m not sure'],
      },
      {
        id: 37, number: 37, type: 'single',
        question: 'How often do you wear a seatbelt when riding in a car?',
        options: ['Always', 'Most of the time', 'Sometimes', 'Rarely', 'Never'],
      },
      {
        id: 38, number: 38, type: 'single',
        question: 'How would you rate your overall lifestyle habits (diet, exercise, sleep, and avoiding harmful substances)?',
        options: ['Excellent', 'Good', 'Fair', 'Poor'],
      },
      {
        id: 39, number: 39, type: 'calendar',
        question: 'When did you last have a dental checkup or cleaning?',
      },
      {
        id: 40, number: 40, type: 'text',
        question: 'Are there any specific lifestyle changes you would like help making to improve your health?',
      },
    ],
  },

  {
    id: 5,
    title: 'Social Health & Support',
    questions: [
      {
        id: 41, number: 41, type: 'single',
        question: 'How often do you feel lonely or isolated?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
      },
      {
        id: 42, number: 42, type: 'single',
        question: 'Do you have someone you can count on for help if you need it — such as a family member, friend, or neighbor?',
        options: ['Yes, definitely', 'Yes, somewhat', 'Not sure', 'No'],
      },
      {
        id: 43, number: 43, type: 'multi', required: true,
        question: 'In the past year, have any of the following made it hard for you to take care of your health? (Select all that apply)',
        options: ['I didn\'t have enough money for food', 'I didn\'t have enough money for medications', 'I had trouble getting transportation to appointments', 'I didn\'t have stable housing', 'I was unable to take time off work or school', 'Language or communication barriers', 'None of the above'],
      },
      {
        id: 44, number: 44, type: 'single',
        question: 'In the past year, have you or anyone in your household experienced food insecurity (not having enough food to eat)?',
        options: ['Yes, often', 'Yes, sometimes', 'No'],
      },
      {
        id: 45, number: 45, type: 'single',
        question: 'What is your current housing situation?',
        options: ['Own or rent a stable home', 'Living with family or friends temporarily', 'Living in transitional or temporary housing', 'Experiencing homelessness', 'Prefer not to say'],
      },
      {
        id: 46, number: 46, type: 'single',
        question: 'How easy is it for you to get to medical appointments (e.g., transportation, distance)?',
        options: ['Very easy', 'Easy', 'Sometimes difficult', 'Often difficult', 'Very difficult'],
      },
      {
        id: 47, number: 47, type: 'sub',
        question: 'How satisfied are you with the following aspects of your healthcare?',
        subQuestions: [
          { id: '47a', label: 'Communication with your care team',  options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
          { id: '47b', label: 'Ease of scheduling appointments',     options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
          { id: '47c', label: 'Overall quality of care received',    options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
          { id: '47d', label: 'Affordability of your care',          options: ['Very satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
        ],
      },
      {
        id: 48, number: 48, type: 'single',
        question: 'How confident are you in managing your own health, including understanding your conditions and following your care plan?',
        options: ['Very confident', 'Confident', 'Somewhat confident', 'Not very confident', 'Not at all confident'],
      },
      {
        id: 49, number: 49, type: 'multi',
        question: 'Which of the following support services would you find most helpful?',
        options: ['Help understanding my diagnosis or treatment', 'Medication management support', 'Nutrition or diet coaching', 'Mental health counseling', 'Exercise or fitness guidance', 'Transportation to appointments', 'Financial assistance programs', 'None at this time'],
      },
      {
        id: 50, number: 50, type: 'text',
        question: 'What are your most important health goals over the next 6–12 months? Is there anything else you would like your care team to know?',
      },
    ],
  },
]
