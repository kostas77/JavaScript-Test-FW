Feature: Global Header
  As a customer, I want to be able to use the Elsevier.com home page
  To navigate the site, view my cart, view my profile and use search

  # Dropdown Menus
  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: Dropdown menus can be expanded and collapsed
    Given I have navigated to the home page
    When  the first dropdown trigger is clicked
    Then  the first dropdown list expands
    When  the first dropdown trigger is clicked
    Then  the first dropdown list collapses

    When  the first dropdown list is expanded
    And   the second dropdown trigger is clicked
    Then  the first dropdown list collapses

    When  the first dropdown list is expanded
    And   the search icon is clicked
    Then  the first dropdown list collapses

    When  the first dropdown list is expanded
    And   the footer is clicked
    Then  the first dropdown list collapses

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: Dropdown menus contain at least one navigational link
    Given I have navigated to the home page
    And   the first dropdown list is expanded
    Then  the first dropdown list contains at least one link

  # bigSearch
  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: bigSearch can be expanded and collapsed on desktop
    Given I have navigated to the home page
    When  the search icon is clicked
    Then  bigSearch expands
    When  the search icon is clicked
    Then  bigSearch collapses

    When  bigSearch is expanded
    And   the first dropdown trigger is clicked
    Then  bigSearch collapses

    When  bigSearch is expanded
    And   the overlay is clicked
    Then  bigSearch collapses

  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: bigSearch can be expanded and collapsed on mobile/tablet
    Given I have navigated to the home page
    When  the search icon is clicked
    Then  bigSearch expands
    When  the search icon is clicked
    Then  bigSearch collapses

    When  bigSearch is expanded
    And   the overlay is clicked
    Then  bigSearch collapses

  # Cart Widget
  @ElcmE2E @ElcmE2Emob @ElcmE2EGlobalHeaderMobile @ElcmE2EGlobalHeader
  Scenario: Clicking the cart widget takes me to the Cart page
    Given I have navigated to the home page
    When  I click the cart icon
    Then  I am taken to the cart page

  @ElcmE2E @ElcmE2Emob @ElcmE2EGlobalHeader @ElcmE2EGlobalHeaderMobile
  Scenario: The cart widget displays the number of items my cart when I have items in my cart
    Given I am based in US
    When  I add the following product types in the cart:
      | Quantity | Product Type           |
      | 1        | Print book             |
      | 1        | Delta personal journal |
    And   I have navigated to the home page
    Then  the cart widget displays that I have 2 items in my cart

  # Profile
  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: Clicking the sign in icon takes me to the account login page when I'm not logged in
    Given I am not logged in
    And   I have navigated to the home page
    When  I click the sign in icon
    Then  I am taken to the account login page

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: The profile icon replaces the sign in icon when I'm logged in
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    Then  the sign in icon is hidden
    And   the profile icon is visible

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: The profile dropdown can be expanded and collapsed when I'm logged in
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    When  I click the profile icon
    Then  the profile dropdown expands
    When  I click the profile icon
    Then  the profile dropdown collapses

    When  the profile dropdown is expanded
    And   the search icon is clicked
    Then  the profile dropdown collapses

    When  the profile dropdown is expanded
    And   the first dropdown trigger is clicked
    Then  the profile dropdown collapses

    When  the profile dropdown is expanded
    And   the footer is clicked
    Then  the profile dropdown collapses

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: The profile icon displays my intials when I'm logged in
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    Then  the profile icon contains my initials

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: The profile dropdown contains my initials, full name and email address when I'm logged in
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the profile dropdown is expanded
    Then  the profile dropdown contains my initials, full name and email address

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: Clicking the profile dropdown view account button takes me to the account page
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the profile dropdown is expanded
    When  the profile dropdown view account button is clicked
    Then  I am taken to the account page

  @ElcmE2E @ElcmE2EGlobalHeader
  Scenario: The profile dropdown sign out button has the correct link
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the profile dropdown is expanded
    Then  the profile dropdown sign out button has the correct link

  # Scroll Prevention
  @ElcmE2E @ElcmE2Emob @ElcmE2EGlobalHeaderMobile @ElcmE2EGlobalHeader
  Scenario: Scroll is prevented when bigSearch is expanded
    Given I have navigated to the home page
    And   I have captured the y position of the hero banner
    And   bigSearch is expanded
    When  I attempt to scroll down 100px
    Then  the hero banner is still in the same y position

    When  the overlay is clicked
    And   bigSearch collapses
    And   I attempt to scroll down 100px
    Then  the hero banner y position has moved up by 100px

  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: Scroll is prevented when the mobile menu is expanded
    Given I have navigated to the home page
    And   I have captured the y position of the hero banner
    And   the mobile menu is expanded
    When  I attempt to scroll down 100px
    Then  the hero banner is still in the same y position

    When  the overlay is clicked
    Then  the mobile menu collapses
    When  I attempt to scroll down 100px
    Then  the hero banner y position has moved up by 100px

  # Mobile Menu
  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: The mobile menu can be expanded and collapsed
    Given I have navigated to the home page
    When  the open mobile menu button is clicked
    Then  the mobile menu expands
    When  the close mobile menu button is clicked
    Then  the mobile menu collapses

    When  the mobile menu is expanded
    And   the overlay is clicked
    Then  the mobile menu collapses

  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: The mobile menu contains my initials and email address when I'm logged in
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the mobile menu is expanded
    Then  the mobile menu contains my initials and email address

  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: Clicking the mobile menu view account button takes me to the account page
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the mobile menu is expanded
    When  the mobile menu view account button is clicked
    Then  I am taken to the account page

  @ElcmE2Emob @ElcmE2EGlobalHeaderMobile
  Scenario: The mobile menu sign out button has the correct link
    Given I am an existing customer based in US
    And   I am logged in
    And   I have navigated to the home page
    And   the mobile menu is expanded
    Then  the mobile menu sign out button has the correct link

  # Site Search
  @ElcmE2E @SiteSearchE2E @ElcmE2ESiteSearch
  # ToDo: ELSE-160 Will need updating when we go live with Search App
  Scenario: Customer can perform a search from the global header
    Given I have navigated to the home page
    When  I perform a search for "robot" from the global header
    Then  the returned search item total includes the search term (old search)

  @ElcmE2E @SiteSearchE2E @ElcmE2ESiteSearch
  # ToDo: ELSE-160 Remove once Old Site Search is decommissioned
  Scenario: Hash tags in the search term do not break the customer's search
    Given I have navigated to the home page
    When  I perform a search for "#robot" from the global header
    Then  the returned search item total includes the search term (old search)
    And   the first search result includes the search term without hashes (old search)

  @ElcmE2E @SiteSearchE2E @ElcmE2ESiteSearch
  # ToDo: ELSE-160 Remove once Old Site Search is decommissioned
  Scenario: Download results do not break the customer's search
    Given I have navigated to the home page
    When  I perform a search for ".pdf" from the global header
    Then  there is at least 1 search result (old search)

  # Social media bar
  @ElcmE2E @ElcmE2EConnect
  Scenario: User can see the sticky social media bar on article pages
    When I visit an article page
    Then I see the article actions bar at the bottom of the page
