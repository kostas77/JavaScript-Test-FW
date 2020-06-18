Feature: Elsevier eCommerce account menus functionality
  As an Elsevier customer
  I want to be able to navigate around the My Account section
  So that I can manage my account details

  @eCommerceMenusE2E @eCommerceMenusE2Emob @logOut
  Scenario: An existing customer can access each of the pages within the My Accounts section
    Given I am an existing customer based in US
  # And   I am on the Elsevier home page
    And   I am logged in
    When  I navigate to the following sections:
      | My Account Section   |
      | Address Book         |
      | Change Password      |
      | Online Subscriptions |
      | Order History        |
      | Personal Details     |
    Then  I am taken to the correct page

  @wip
  Scenario: An anonymous customer can navigate around the eCommerce pages using the available options
    Given I am on the Elsevier home page
    And   I am not logged in
    And   I open the Cart menu
    When  I navigate to the following sections:
      | Menu Option      |
      | View Cart        |
      | Register/Login   |
      | Help and Contact |
    Then  I am taken to the correct page

  @wip
  Scenario: A logged in customer can navigate around the eCommerce pages using the available options
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    When  I open the Cart menu
    Then  The following options are displayed:
      | Menu Option      |
      | View Cart        |
      | Account          |
      | Help and Contact |
      | What is this?    |
      | Logout           |
    And   I am taken to the correct page

  Scenario: Customer can update their shipping address
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    And   I have a shipping address already defined
    When  I update my shipping address
    Then  The new shipping address is displayed in the Address Book page

  Scenario: Customer can update their billing address
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    And   I have a billing address already defined
    When  I update my billing address
    Then  The new billing address is displayed in the Address Book page

  Scenario: Customer can change their password
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    When  I change my password
    Then  A new password is setup successfully

  Scenario: Customer can download e-books from Order History page
    Given I have successfully completed an e-book order
    When  I choose to download the product again from the Order History page
    Then  The product is successfully downloaded

  @eCommerceMenusE2E @email
  Scenario: Customer can receive a verification e-mail
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    When  I navigate to the following sections:
      | Personal Details |
    And   I click on the Send verification email link
    Then  A verification e-mail is sent successfully

#  Scenario: Unsuccessful order is displayed in the My Orders section of the customer account details
#    Given I have failed to complete an order
#    When  I check for the order on the Order History page
#    Then  The order is shown with the correct order number
#    And   The order is shown with the status "Cancelled"

# -------------------------Production E2E Tests---------------------------

  @PROD @eCommerceMenusPROD
  Scenario: Customer can receive a verification e-mail
    Given I am an existing customer based in US
    And   I am on the Elsevier home page
    And   I am logged in
    When  I navigate to the following sections:
      | Personal Details |
    And   I click on the Send verification email link
    Then  A verification e-mail is sent successfully
