Feature: Accessibility
  As a customer, I want to be able to navigate easily using accessibility functions

  @ElcmE2E @ElcmE2Emob @ElcmE2EA11y @ElcmE2EA11yMobile
  Scenario: Clicking the back to top button takes me to the top of the page
    Given I have navigated to the home page
    And   the back to top button is not visible
    When  I scroll to the bottom of the page
    Then  the scroll to top button is visible
    When  I click the back to top button
    Then  I have scrolled to the top of the page

  @ElcmE2E @ElcmE2EA11y
  Scenario: Pressing the tab key followed by the enter key takes me to the content of the page
    Given I have navigated to the home page
    When  I press the tab key
    Then  the skip to content link is focused
    When  I press enter on the skip to content link
    Then  the main page content is focused

  @ElcmE2E @ElcmE2Emob @ElcmE2EA11y @ElcmE2EA11yMobile
  Scenario: Clicking in page navigation scrolls the page to the correct position
    Given I have navigated to the kitchen sink page
    And   I have captured the expected scroll position of the typography heading
    When  I click the typography link
    Then  the page scrolls to the expected position

  @ElcmE2E @ElcmE2Emob @ElcmE2EA11y @ElcmE2EA11yMobile
  Scenario: Location Selector link in footer navigates to the correct page
    Given I have navigated to the home page
    And   I scroll to the bottom of the page
    When  I click the location selector link in the footer
    Then  I am taken to the location selector page

  @ElcmE2E @ElcmE2Emob @ElcmE2EA11y @ElcmE2EA11yMobile
  Scenario: Location Selector links set redirect cookies as expected
    Given I have navigated to the location selector page
    When  I click the Spanish site link
    Then  I am taken to the Elsevier Spanish site
    When  I navigate to the global site
    Then  I am automatically redirected to the Elsevier Spanish site
