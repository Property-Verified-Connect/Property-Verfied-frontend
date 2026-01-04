const conversationFlows = {
  properties: [
    {
      question: "Hi! Which area are you searching property in?",
      options: ["Baner, Pune", "Hinjewadi, Pune", "Wakad, Pune", "Kharadi, Pune", "Other"],
      allowText: true
    },
    {
      question: "Great! What's your budget range?",
      options: ["40-60 Lakhs", "60-80 Lakhs", "80 Lakhs - 1 Cr", "1 Cr+"],
      allowText: true
    },
    {
      question: "Do you prefer apartment, villa, or plot?",
      options: ["1BHK Apartment", "2BHK Apartment", "3BHK Apartment", "Villa", "Plot"],
      allowText: false
    },
  ],
  budget: [
    {
      question: "Can I ask few financial questions to check your affordability?",
      options: ["Yes, let's proceed", "No, skip this"],
      allowText: false
    },
    {
      question: "What's your monthly income?",
      options: ["₹50,000-75,000", "₹75,000-1,00,000", "₹1,00,000-1,50,000", "₹1,50,000+"],
      allowText: true
    },
    {
      question: "Any EMIs or loans currently?",
      options: ["No EMIs", "₹10,000-20,000", "₹20,000-30,000", "₹30,000+"],
      allowText: true
    },
    {
      question: "What are your monthly household expenses?",
      options: ["₹20,000-30,000", "₹30,000-40,000", "₹40,000-50,000", "₹50,000+"],
      allowText: true
    },
    {
      question: "Do you plan co-buying with spouse/family?",
      options: ["Yes", "No, solo"],
      allowText: false
    },
  ],
  category: [
      {
      question: "Hi! Which area are you searching property in?",
      options:  ["Nagpur", "Mumbai", "Pune", "Nashik", "Other"],
      allowText: true
    },
    {
      question: "Let's find your community match. What's your profession?",
      options: ["Software Engineer", "Business Owner", "Doctor", "Teacher", "Government Employee", "Other"],
      allowText: true
    },
    {
      question: "Lifestyle type — quiet, social, or active?",
      options: ["Quiet", "Social", "Active"],
      allowText: false
    },
    {
      question: "Family type?",
      options: ["Single, living alone", "Couple", "Family with kids", "Joint family"],
      allowText: false
    },
    {
      question: "Any personal interest or mindset category?",
      options: ["Entrepreneurial", "Creative", "Tech-savvy", "Traditional", "Health-focused"],
      allowText: false
    },
  ],
  rent: [
  {
  question: "Looking for rental options? Which area are you interested in?",
  options: ["Nagpur", "Mumbai", "Pune", "Nashik", "Other"],
  allowText: true
},
{
  question: "Prefer shared rooms or private?",
  options: ["Private", "Shared"],
  allowText: false
},
{
  question: "What is your budget range?",
  options: ["₹5,000-10,000", "₹10,000-15,000", "₹15,000-20,000", "₹20,000+"],
  allowText: false
},
{
  question: "Do you prefer shared rooms or a full flat?",
  options: ["Room", "Apartment"],
  allowText: false
},
{
  question: "What is your profession?",
  options: ["IT Professional", "Govt employee", "Student", "Business", "Other"],
  allowText: true
},
{
  question: "Lifestyle preference — quiet or social?",
  options: ["Quiet", "Social"],
  allowText: false
},
{
  question: "What type of roommates do you prefer?",
  options: ["Quiet & focused", "Balanced mix", "Friendly & social"],
  allowText: true
},
{
  question: "What is your food preference?",
  options: ["Vegetarian", "Non-Vegetarian", "Eggetarian"],
  allowText: false
},
{
  question: "Do you smoke or drink?",
  options: ["Do Smoking", "Do Drinking", "Do Both", "Do None"],
  allowText: false
},
{
  question: "What is your religion? (Only for searching purposes)",
  options: [" Hindu", "Muslim", "Sikh", "Christian", " Jain / Buddhist", " Other belief / mixed background", "Prefer not to say"],
  allowText: true
}

  ],
  discuss: [
    {
      question: "Welcome to AI Discuss — your free talk zone! What would you like to discuss today?",
      options: ["Compare Properties", "Market Analysis", "Investment Advice", "Area Recommendations"],
      allowText: true
    },
  ],
};



export default conversationFlows;