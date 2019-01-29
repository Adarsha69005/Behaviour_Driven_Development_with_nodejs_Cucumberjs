Feature: Create, read, update and delete User profiles


   In order to interact into our website
   Test user should be created.

    Scenario: Store and Retrive a User Profile
        Given that I have set up User Profile
        When I store a user profile into the database
        Then I should be able to retrieve that user profile using it's ID
        And The user should contain the set of required information

    Scenario: Update and Retrieve a User Profile
        Given that I have set up User Profile
        When I store a user profile into the database
        And I update that user profile
        Then I should be able to retrieve that user profile using it's ID
        And The user should contain the set of required information
        And The user should contain the updated information

    Scenario: Delete a user profile and verify deletion
        Given that I have set up User Profile
        When I store a user profile into the database
        And I delete that user profile
        Then I should not be able to retrieve that user profile from the users using it's ID
 


    