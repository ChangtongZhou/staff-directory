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
        * avatar_url: String
        * sex: String
        * startDate: Date
        * officePhone: String
        * cellPhone: String
        * SMS: String
        * email: String
        * manager: Ref manager(other staff) id, this id is given via frontend
        * directReports: Array (array of other staff's id)

* Relationship design:
    * Modeling one-to-many
        * manager: Denormalize from One -> Many, use parent reference
            * Because Read > Write 
        * direct reports: Denormalize from Many -> One, use array

* Reason:
https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2?_ga=2.60215789.1376636419.1535758765-876515714.1532816065

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
        * When a contact is clicked, it makes calls/send email
        * The staff information can be edited via an Edit button and then Save
        * Back button goes to the Home page
    * Direct reports - List of all direct reports
        * show direct reports' name, picture and his/her direct reports
        * When a direct report is clicked, it goes to that person's summary page
        * Back button goes to the original staff's summary page


        
