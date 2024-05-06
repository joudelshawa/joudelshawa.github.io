/**
 * Hey dumdum. For the date field, if it's a single date, just put it as a string. If it has a start and end date, put it as a tuple.
 */

const milestones: Milestone[] = [
  {
    text: "Participated in the AI4Good Lab",
    date: "May 2021", // ! Single date
    href: "https://google.com",
  },

  {
    text: "Conducted research with IBM in collaboration with Western University under the supervision of Dr. Kostas Kontogiannis",
    date: ["May 2021", "Aug 2021"],
  },

  {
    text: "Won the Edmonton Accelerator Award for SoQuo in the AI4Good Lab 🥳",
    date: "Jun 2021",
  },

  {
    text: "Mentor for the Women in Technology's Ada Mentorship Program",
    date: ["Sep 2021", "Apr 2022"],
    href: "https://google.com",
  },

  {
    text: "Communications Director for the UWO Computer Science Undergraduate Society",
    date: ["Jun 2021", "Apr 2022"], // ! Start and end date
  },

  {
    text: "Received the RBC Scholarship in Data Science 🥳",
    date: "Nov 2021",
  },

  {
    text: "Won HackWestern 8's Best Use of DashaAI for BankYeller 🥳",
    date: "Nov 2021",
  },

  {
    text: "Marketing Director for the Women+ in Technology Society",
    date: ["May 2022", "Apr 2023"],
    href: "https://google.com",
  },

  {
    text: "Worked at RBC Amplify",
    date: ["Apr 2022", "Aug 2022"],
  },

  {
    text: "Completed the General Assembly Product Management Bootcamp",
    date: "Apr 2022",
  },

  {
    text: "Mentored for the AI4Good Lab",
    date: "Jun 2022",
  },

  {
    text: "Starred in RBC Amplify's Promo Video for 2023",
    date: "Jun 2022",
  },
]

export default milestones
