# ToDo: ELSE-160 This will need updating when we go live with Search App as it's currently using the test search URL
Feature: Site Search
  As a customer, I want to be able to search Elsevier.com

  Background:
    Given I have navigated to the search page

  @ElcmE2E @SiteSearchE2E
  Scenario: Customer can perform a search
    When I search for "robot"
    Then there is at least 1 search result
    And  the first search result includes the search term

  @ElcmE2E @SiteSearchE2E
  Scenario: Download results do not break the customer's search
    When I search for ".pdf"
    Then there is at least 1 search result
