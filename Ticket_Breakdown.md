# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here



#### Ticket 1: 
###### Agent custom ID field to the database
**We have:** Facilities, Agents, and Shifts tables.
getShiftsByFacility(facilityId) => worked that quarter
generateReport(listOfShifts) => pdf

###### Acceptance Criteria:
A new field named "custom_id" is added to the "Agents" table in the database.
The custom_id field is able to store alphanumeric values with a maximum length of 32 characters. (custom_id hased with md5(name_city_facId))
The custom_id field should allow NULL values in case a custom ID has not been assigned by the Facility.

###### Implementation details:
ALTER the Agents table to add the custom_id field with the specified characteristics.
Verify the changes in the database to ensure the field has been added correctly.
"ALTER TABLE Agents ADD COLUMN custom_id VARCHAR(32) UNIQUE;"
###### Time/Effort estimate: 1 hours

------------


#### Ticket 2: 
Update the user interface to allow Facilities to set custom IDs for Agents

###### Acceptance Criteria:
A new section is added to the Facility's dashboard where they can view and edit the custom IDs for the Agents they work with.
The custom ID field should be editable for each Agent.
The updated information should be stored in the database.

###### Implementation details:
Identify/create that API can modify custom ID field.
Add a new section to the Facility's dashboard where they can view the custom IDs for Agents.
Allow the Facility to edit the custom ID field for each Agent.
Implement a function to update the custom ID information in the database when changes are made by the Facility.

###### Time/Effort estimate: 2-3 hours

------------


#### Ticket 3: 

Update the getShiftsByFacility function to use custom Agent IDs if available

###### Acceptance Criteria:
The getShiftsByFacility function now returns custom IDs for each Agent instead of their internal database IDs when the custom ID is available.
If a custom ID has not been assigned, the internal database ID should be used.

###### Implementation details:
Modify the getShiftsByFacility function to retrieve the custom ID for each Agent from the database if it is available.
If a custom ID is not available, retrieve the internal database ID for the Agent.
Return the custom IDs for each Agent in the Shift data returned by the function.
###### Time/Effort estimate: 1-2 hours

------------


#### Ticket 4: 
Update the generateReport function to use custom Agent IDs

###### Acceptance Criteria:
The generateReport function now uses custom Agent IDs in the reports generated for Facilities instead of the internal database IDs.
If a custom ID has not been assigned, the internal database ID should be used.

###### Implementation details:
Modify the generateReport function to use custom Agent IDs when they are available in the Shift data.
If a custom ID is not available, use the internal database ID for the Agent.
Ensure that the changes made to the generateReport function do not affect the rest of the report generation process.
###### Time/Effort estimate: 1-2 hours

------------


#### Ticket 5:
Write the test cases and Test the new feature

###### Acceptance Criteria:
The changes made in Tickets 1-4 have been thoroughly tested and found to be working correctly.
The new feature is ready for deployment.

###### Implementation details:
Test the new feature by creating Shifts, assigning Agents with and without custom IDs, and generating reports.
Verify that the custom IDs are correctly used in the reports when they are available, and that the internal database IDs are used when custom IDs are not available.
Ensure that the changes made in Tickets 1
###### Time/Effort estimate: 2-3 hours