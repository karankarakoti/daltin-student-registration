const LinkPrefix = ["http", "www", "mailto", "tel", "sms", "mailTo"]

const Titles = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
  { value: "Miss", label: "Miss" }
]

const Genders = [  
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" }
]

const MartialStatus = [  
  { value: "Unmarried", label: "Unmarried" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" }
]

module.exports = {
  LinkPrefix, 
  Titles,
  Genders,
  MartialStatus
}