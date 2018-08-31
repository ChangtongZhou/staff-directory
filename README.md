# Staff-directory:

## Description:
This is a staff management application created with MERN Stack (MongoDB, Express, React/Redux, Node.js) for employee directory.

## Functions:

## App Architecture:

### Database Design and Reasons:
* Use MongoDB
* Documents:
    * Staffs:
        * name: String
        * title: String
        * sex: String
        * startDate: Date
        * officePhone: String
        * cellPhone: String
        * SMS: String
        * email: String
        * manager: Ref manager id
        * directReports: Array
        * numOfDirectReports: Number

### REST API Specification


### Each API function


### UI Design:
* Use Material-UI
* Web pages:
    * Home page - List of all staffs:
        * A list with name, picture, title, number of direct reports
        * Functions: sorting, searching, endless/infinite scrolling
        * When a staff is clicked, it goes to his/her summary in the list
        * Add button to add a new staff
    * Staff summary - detailed information about the staff
        * When manager is clicked, it goes to the manager's summary page
        * When direct reports is clicked, it goes to the direct report list page
        * WHen a contact is clicked, it makes calls/send email
        * The staff information can be edited via an Edit button and then Save
        * Back button goes to the Home page
    * Direct reports - List of all direct reports
        * show direct reports' name, picture and his/her direct reports
        * When a direct report is clicked, it goes to that person's summary page
        * Back button goes to the original staff's summary page


        
